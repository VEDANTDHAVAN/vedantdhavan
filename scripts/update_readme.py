from readme_generator import (
    build_projects_markdown, build_focus_section,
    build_activity_section, build_weekly_section
)

from github_fetcher import get_repositories, get_events

repos = get_repositories()
events = get_events()

projects = build_projects_markdown()
focus = build_focus_section(repos)
activity = build_activity_section(events)
weekly = build_weekly_section(events)

with open(
    "README.md",
    "r",
    encoding="utf-8"
) as f:

    readme = f.read()


def replace_section(
    content,
    start,
    end,
    new_content
):

    before = content.split(start)[0]

    after = content.split(end)[1]

    return (
        before
        + start
        + "\n"
        + new_content
        + "\n"
        + end
        + after
    )


readme = replace_section(
    readme,
    "<!-- PROJECTS_START -->",
    "<!-- PROJECTS_END -->",
    projects
)

readme = replace_section(
    readme,
    "<!-- FOCUS_START -->",
    "<!-- FOCUS_END -->",
    focus
)

readme = replace_section(
    readme,
    "<!-- ACTIVITY_START -->",
    "<!-- ACTIVITY_END -->",
    activity
)

readme = replace_section(
    readme,
    "<!-- WEEKLY_START -->",
    "<!-- WEEKLY_END -->",
    weekly
)

with open(
    "README.md",
    "w",
    encoding="utf-8"
) as f:

    f.write(readme)