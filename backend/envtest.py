import os
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

# Check if the key is loaded
api_key = os.getenv("OPENAI_API_KEY")
print("API Key Loaded:", api_key)

# Optional: show first few characters of the key for verification
if api_key:
    print("API Key starts with:", api_key[:8])
else:
    print("API Key is still None. Check .env file.")