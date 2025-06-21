from flask import Flask, render_template, request, jsonify
from google import genai
import base64
import json

app = Flask(__name__)

@app.route('/getbb')
def getbb():
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

	image_data = base64.b64decode(b64image)
	print(b64image)
	with open("output.png", "wb") as f:
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
	return json.loads(response.text[7:-3].strip())

print(getRecipes()[0])