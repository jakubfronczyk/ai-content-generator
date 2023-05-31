from typing import List
from dotenv import load_dotenv
import os
import openai
import argparse  # creating command-line interfaces (CLIs) with argument parsing capabilities.
import re

# Load environment variables from .env file
load_dotenv('.env')

MAX_INPUT_LENGHT = 12
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")
    if validate_length(user_input):
        generate_branding_snippet(user_input)
        generate_keywords(user_input)
    else:
        raise ValueError(f"Input length is to long. Must be under {MAX_INPUT_LENGHT}")


def validate_length(prompt:str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGHT


def generate_branding_snippet(prompt: str) -> str:
    # Set your API key from the environment variable
    openai.api_key = os.getenv("OPEN_API_KEY")

    enriched_prompt = f"Generate upbeat branding snippet for {prompt}: "
    print(enriched_prompt)

    # Use your API key to make API calls
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Welcome to our branding studio! I'm here to help you create an amazing brand."},
            {"role": "user", "content": enriched_prompt},
        ],
        max_tokens=32,
        stop=None,
        temperature=0.7 
    )

    # Extract output text
    branding_text: str = response.choices[0].message.content

    # Strip whitespaces
    branding_text = branding_text.strip()

    # Add ... to truncated statements
    last_char = branding_text[-1]
    if last_char not in {".", "!", "?"}:
        branding_text += "..."
    
    print(f"Snippet: {branding_text}")
    return branding_text


def generate_keywords(prompt: str) -> List[str]:
    # Set your API key from the environment variable
    openai.api_key = os.getenv("OPEN_API_KEY")

    enriched_prompt = f"Generate related branding keywords for {prompt}: "
    print(enriched_prompt)

    # Use your API key to make API calls
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Welcome to our branding studio! I'm here to help you create an amazing brand."},
            {"role": "user", "content": enriched_prompt},
        ],
        max_tokens=32,
        stop=None,
        temperature=0.7 
    )

    # Extract output text
    keywords_text = response.choices[0].message.content


    # Strip whitespaces
    keywords_text = keywords_text.strip()

    # Split keywords into a list
    keywords_list = keywords_text.split("\n")

    # Remove leading numbers and dots, and strip whitespace from each keyword
    keywords_list = [keyword.lstrip("1234567890. ").lower().strip() for keyword in keywords_list if not keyword.startswith('8.')]

    print(f"Keywords: {keywords_list}")
    return keywords_list




if __name__ == "__main__":
    main()