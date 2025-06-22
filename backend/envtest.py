from dotenv import load_dotenv
import os

load_dotenv() # Load variables from .env

api_key = os.getenv("MY_API_KEY")
print(f"API Key: {api_key}")