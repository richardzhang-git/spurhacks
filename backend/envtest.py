from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins

@app.route('/getrecipes', methods=['POST'])
def get_recipes():
    data = request.get_json() or {}
    ingredients = data.get("ingredients", [])

    # Dummy response using the received ingredients
    recipes = [
        {
            "recipeName": "Sample Recipe",
            "ingredients": [item.get("ingredient", "") for item in ingredients],
            "steps": [
                "Step 1: Do something",
                "Step 2: Do something else",
                "Step 3: Finish up"
            ],
        }
    ]
    return jsonify({"responses": recipes})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)