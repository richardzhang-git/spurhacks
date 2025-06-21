from flask import Flask, request
from flask_cors import CORS
from google import genai
from google.genai import types
import base64
import json

app = Flask(__name__)
CORS(app)

@app.route('/getbb', methods=["POST"])
def getbb():
	b64image = request.get_json("image")["image"]
	header, b64_data = b64image.split(",", 1)
	file_format = header.split("/")[1].split(";")[0]
	filename = f"output.{file_format}"

	image_data = base64.b64decode(b64_data)
	# print(b64image)
	with open(filename, "wb") as f:
		f.write(image_data)
	return image_data

@app.route('/getbarcode')
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
	return response.text


def recipePrompt(ingredients:list[str], expiry_dates:list[str], num:int):
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

def getRecipes():
	key = "AIzaSyDMD99XhnZERlMD0Q3lUC1CLvWbtkQTGV0"
	client = genai.Client(api_key=key)
	prompt = recipePrompt(["eggs", "milk"], ["2025-04-27","2026-03-31"], 3)
	response = client.models.generate_content(
		model="gemini-2.5-flash", contents=prompt
	)
	# print(response.text[7:-3].strip())
	return {"responses": json.loads(response.text[7:-3].strip())}

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
			'''There is text in the image that represent the best before/expiry rate of an item. Please represent the date in the following format:
			YYYY-MM-DD
			as a string.
			'''

		]
	)
	return response.text
