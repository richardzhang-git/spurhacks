from google import genai

key = "you thought"
client = genai.Client(api_key=key)

response = client.models.generate_content(
    model="gemini-2.5-flash", contents="Explain how AI works in a few words"
)
print(response.text)

from google.genai import types

with open('sample.png', 'rb') as f:
  image_bytes = f.read()

response = client.models.generate_content(
model='gemini-2.5-flash',
contents=[
  types.Part.from_bytes(
    data=image_bytes,
    mime_type='image/png',
  ),
  'What object is in the image? Please provide a concise and short answer, preferable just the object\'s name'
]
)
print(response.text)