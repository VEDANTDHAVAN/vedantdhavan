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

    reasons = []

    # ----------------
    # Live Demo
    # ----------------

    homepage = repo.get("homepage")

    if homepage:

        score += 50
        reasons.append("live_demo")

        for domain in LIVE_DOMAINS:

            if domain in homepage:
                score += 20
                reasons.append("hosted")

    # ----------------
    # Stars
    # ----------------

    stars = repo["stargazers_count"]

    score += stars * 2

    if stars > 0:
        reasons.append("starred")

    # ----------------
    # Topics
    # ----------------

    topics = repo.get("topics", [])

    score += len(topics) * 3

    # ----------------
    # Recent Activity
    # ----------------

    updated = datetime.fromisoformat(
        repo["updated_at"].replace("Z", "+00:00")
    )

    days_old = (
        datetime.now(timezone.utc) - updated
    ).days

    if days_old <= 30:
        score += 30
        reasons.append("active")

    elif days_old <= 90:
        score += 15

    # ----------------
    # README Analysis
    # ----------------

    text = (
        repo["name"]
        + " "
        + (repo["description"] or "")
        + " "
        + readme
    ).lower()

    matches = 0

    for keyword in SHOWCASE_KEYWORDS:

        if keyword in text:

            score += 10

            matches += 1

    if matches:
        reasons.append(
            f"{matches}_keywords"
        )

    # ----------------
    # Size
    # ----------------

    score += min(
        repo["size"] / 100,
        20
    )

    return {
        "score": round(score, 2),
        "reasons": reasons
    }