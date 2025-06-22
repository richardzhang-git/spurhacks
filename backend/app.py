import random
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from google import genai
from google.genai import types
import base64
import json
from datetime import date, timedelta

app = Flask(__name__)

# CORS configuration
CORS(app)

@app.before_request
def log_request():
    print(f"\n--- Incoming Request: {request.method} {request.path}")
    for h, v in request.headers:
        print(f"{h}: {v}")

@app.after_request
def log_response(response):
    print(f"--- Response Headers:")
    for h, v in response.headers:
        print(f"{h}: {v}")
    return response

@app.route('/getbb', methods=['POST', 'OPTIONS'])
def getbb():
    data = request.get_json()
    b64image = data["image"]
    header, b64_data = b64image.split(",", 1)
    image_data = base64.b64decode(b64_data)
    return detectBB(image_data)

@app.route('/getitem', methods=['POST', 'OPTIONS'])
def getitem():
    data = request.get_json()
    b64image = data["image"]
    header, b64_data = b64image.split(",", 1)
    image_data = base64.b64decode(b64_data)
    return detectItem(image_data)

@app.route('/getbarcode', methods=['POST', 'OPTIONS'])
def getbarcode():
    b64image = request.args.get("image")
    if b64image.startswith("data:image"):
        header, b64_data = b64image.split(",", 1)
        file_format = header.split("/")[1].split(";")[0]
        filename = f"output.{file_format}"
    else:
        b64_data = b64image
        filename = "output.png"
    print(filename)
    with open(filename, "wb") as f:
        f.write(base64.b64decode(b64_data))

def detectItem(image_bytes):
    key = "AIzaSyDMD99XhnZERlMD0Q3lUC1CLvWbtkQTGV0"
    client = genai.Client(api_key=key)
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type='image/png',
            ),
            'What food or ingredient is in the image? Please provide a concise and short answer, preferable just the food/ingredient\'s name'
        ]
    )
    return jsonify(response.text)


@app.route('/guessTime', methods=['POST', 'OPTIONS'])
def guessTime():
    data = request.get_json(silent=True)
    shelf_life_days = random.randint(9, 10)
    expiry_date = date.today() + timedelta(days=shelf_life_days)
    return jsonify({"date": expiry_date.isoformat()})

def recipePrompt(ingredients: list[str], expiry_dates: list[str], num: int):
    prompt = f'''List {num} popular recipes, and include the amounts of ingredients and the steps to make the recipe.
    Include as many of the following ingredients as you can: '''
    for i in range(len(ingredients)):
        prompt += f"\n{ingredients[i]} (expires {expiry_dates[i]})"
    prompt += '''
    Prioritize ingredients with earlier expiry dates.
    Produce JSON matching this specification
    Recipe = { "recipeName": string, "ingredients": array<string> , "steps": string}
    Return: array<Recipe>'''
    return prompt

@app.route('/getrecipes', methods=['POST'])
def get_recipes():
    try:
        data = request.get_json(force=True) or {}
        print(data)
        ingredients_arr = data.get("ingredients", [])
        print("hi", ingredients_arr)
        ingredients = []
        exp_dates = []
        for d in ingredients_arr:
            ingredients.append(d['ingredient'])
            exp_dates.append(d['expiry'])
        print(ingredients, exp_dates)
        prompt = recipePrompt(ingredients, exp_dates, 3)
        key = "AIzaSyDMD99XhnZERlMD0Q3lUC1CLvWbtkQTGV0"
        client = genai.Client(api_key=key)
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        response = response.text[7:-3]
        response = json.loads(response)
        for i in range(3):
            recipe = response[i]
            recipe["steps"] = [i[3:] for i in recipe["steps"].split("\n")]
            response[i] = recipe
        return jsonify({"responses": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


def detectBB(image_bytes):
    key = "AIzaSyDMD99XhnZERlMD0Q3lUC1CLvWbtkQTGV0"
    client = genai.Client(api_key=key)
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type='image/png',
            ),
            '''There is text in the image that represents the best before/expiry date of an item. Please return the date in the format: YYYY-MM-DD.'''
        ]
    )
    return jsonify({"result": response.text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
