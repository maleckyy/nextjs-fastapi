import requests

class OllamaProvider:
    def __init__(self, model: str = "llama2"):
        self.model = model
        self.url = "http://localhost:11434/api/generate"

    def complete(self, prompt: str, **kwargs) -> str:
        response = requests.post(self.url, json={
            "model": self.model,
            "prompt": prompt,
            "stream": False,
        })
        response.raise_for_status()
        return response.json()["response"]
