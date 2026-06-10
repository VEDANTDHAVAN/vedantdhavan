from datetime import datetime, timezone

SHOWCASE_KEYWORDS = [
    "agent",
    "agentic",
    "llm",
    "rag",
    "graphrag",
    "automation",
    "workflow",
    "orchestrator",
    "retrieval",
    "evaluation",
    "benchmark",
    "security",
    "ai",
    "machine learning",
]

LIVE_DOMAINS = [
    "vercel.app",
    "netlify.app",
    "railway.app",
    "render.com",
]


def score_repo(repo, readme):

    score = 0

    homepage = repo.get("homepage")

    if homepage:

        score += 50

        for domain in LIVE_DOMAINS:

            if domain in homepage:
                score += 20

    score += repo["stargazers_count"] * 2

    score += len(repo.get("topics", [])) * 3

    updated = datetime.fromisoformat(
        repo["updated_at"].replace("Z", "+00:00")
    )

    days_old = (
        datetime.now(timezone.utc) - updated
    ).days

    if days_old <= 30:
        score += 30

    elif days_old <= 90:
        score += 15

    text = (
        repo["name"]
        + " "
        + (repo["description"] or "")
        + " "
        + readme
    ).lower()

    for keyword in SHOWCASE_KEYWORDS:

        if keyword in text:
            score += 10

    score += min(repo["size"] / 100, 20)

    # Portfolio penalty
    if repo["name"].lower() == "vedantdhavan":
        score -= 40

    return score