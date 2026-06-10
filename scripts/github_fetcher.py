import os
import requests
import base64

USERNAME = "VEDANTDHAVAN"

TOKEN = os.getenv("GITHUB_TOKEN")

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/vnd.github+json"
}


def get_repositories():
    repos = []
    page = 1

    while True:
        url = (
            f"https://api.github.com/users/"
            f"{USERNAME}/repos?per_page=100&page={page}"
        )

        response = requests.get(
            url,
            headers=HEADERS
        )

        data = response.json()

        if not data:
            break

        repos.extend(data)

        page += 1

    return repos


def get_readme(repo_name):

    url = (
        f"https://api.github.com/repos/"
        f"{USERNAME}/{repo_name}/readme"
    )

    response = requests.get(
        url,
        headers=HEADERS
    )

    if response.status_code != 200:
        return ""

    content = response.json()["content"]

    return base64.b64decode(content)\
        .decode("utf-8", errors="ignore")

def get_events():

    url = (
        f"https://api.github.com/users/"
        f"{USERNAME}/events"
    )

    return requests.get(
        url,
        headers=HEADERS
    ).json()