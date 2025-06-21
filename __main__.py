import webbrowser
import os

file_path = os.path.abspath("index.html")
webbrowser.open(f"file://{file_path}")

