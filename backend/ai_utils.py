import os
# import openai
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)
# openai.api_key = os.getenv("OPENAI_API_KEY")

async def summarize_and_tag(content: str) -> dict:
    """
    Calls OpenAI ChatCompletion to generate a one-sentence summary and three tags for the given note content.
    Returns a dict with 'summary' (str) and 'tags' (List[str]).
    """
    prompt = f"""
Please provide a one-sentence summary and three comma-separated tags for the following care note:

{content}

Summary:"""

    resp = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You summarize care notes."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.5,
        max_tokens=100
    )
    text = resp.choices[0].message.content.strip()

    if "Tags:" in text:
        summary_part, tags_part = text.split("Tags:")
        summary = summary_part.strip()
        tags = [t.strip() for t in tags_part.split(",")]
    else:
        summary = text
        tags = []

    return {"summary": summary, "tags": tags}