from github_fetcher import (
    get_repositories,
    get_readme
)

from project_ranker import (
    score_repo
)


def get_top_projects():

    repos = get_repositories()

    ranked = []

    for repo in repos:

        if repo["fork"]:
            continue

        readme = get_readme(
            repo["name"]
        )

        result = score_repo(
            repo,
            readme
        )

        ranked.append({
            "name": repo["name"],
            "url": repo["html_url"],
            "description":
                repo["description"] or
                "No description",
            "homepage":
                repo["homepage"],
            "score":
                result["score"],
            "reasons":
                result["reasons"]
        })

    ranked.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return ranked[:5]

def build_projects_markdown():

    projects = get_top_projects()

    output = []

    for project in projects:

        output.append(
            f"### 🚀 {project['name']}\n"
            f"{project['description']}\n\n"
            f"**Score:** {project['score']}\n"
        )

        if project["homepage"]:

            output.append(
                f"🌐 Demo: {project['homepage']}\n"
            )

        output.append("\n")

    return "".join(output)