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
            "description": repo["description"] or "No description",
            "homepage": repo["homepage"],
            "score": result,
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
        )

        if project["homepage"]:
            output.append(
                f"🌐 Demo: {project['homepage']}\n"
            )

        output.append("\n")

    return "".join(output)

def build_focus_section(repos):

    focus_topics = {}

    for repo in repos:

        text = (
            repo["name"] + " " +
            (repo["description"] or "")
        ).lower()

        keywords = {
            "Agentic AI": [
                "agent",
                "agentic",
                "workflow"
            ],
            "GraphRAG": [
                "graphrag",
                "rag"
            ],
            "AI Evaluation": [
                "benchmark",
                "evaluation"
            ],
            "Full-Stack AI": [
                "nextjs",
                "react",
                "fastapi"
            ],
            "Automation": [
                "automation",
                "orchestrator"
            ]
        }

        for focus, terms in keywords.items():

            for term in terms:

                if term in text:

                    focus_topics[focus] = (
                        focus_topics.get(focus, 0)
                        + 1
                    )

    ranked = sorted(
        focus_topics.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return "\n".join(
        f"- {item[0]}"
        for item in ranked[:5]
    )

def build_activity_section(events):

    seen = set()
    activity = []

    for event in events:
        repo = event["repo"]["name"]
        
        if repo in seen:
            continue

        seen.add(repo)

        event_type = event["type"]

        mapping = {
            "PushEvent": "Updated",
            "CreateEvent": "Created",
            "PullRequestEvent": "Worked on PR",
            "IssuesEvent": "Updated issue"
        }

        action = mapping.get(
            event_type,
            "Worked on"
        )

        activity.append(
            f"- {action} {repo.split('/')[-1]}"
        )

    return "\n".join(activity[:5])

def build_weekly_section(events):
    repos = set()
    push_events = 0

    for event in events:
        repos.add(
            event["repo"]["name"]
        )

        if event["type"] == "PushEvent":
            push_events += 1

    return (
        f"- {push_events} push commits\n"
        f"- {len(repos)} repositories updated"
    )