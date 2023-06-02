from fastapi import FastAPI, HTTPException
from app import generate_branding_snippet, generate_keywords
from mangum import Mangum

app = FastAPI()

handler = Mangum(app)
MAX_INPUT_LENGHT = 12


@app.get("/generate_snippet")
async def generate_branding_snippet_route(prompt: str):
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": []}


@app.get("/generate_keywords")
async def generate_keywords_route(prompt: str):
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": None, "keywords": keywords}


@app.get("/generate_snippet_keywords")
async def generate_snippet_keywords(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": snippet, "keywords": keywords}

def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGHT:
        raise HTTPException(
            status_code=400, 
            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGHT} characters."
            )
    pass