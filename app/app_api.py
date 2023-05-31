from fastapi import FastAPI
from app import generate_branding_snippet, generate_keywords

app = FastAPI()


@app.get("/generate_snippet")
async def generate_branding_snippet_route(prompt: str):
    snippet = generate_branding_snippet(prompt).strip("\\")
    return {"snippet": snippet}


@app.get("/generate_keywords")
async def generate_keywords_route(prompt: str):
    keywords = generate_keywords(prompt)
    filtered_keywords = [keyword for keyword in keywords if keyword]
    return {"keywords": filtered_keywords}
