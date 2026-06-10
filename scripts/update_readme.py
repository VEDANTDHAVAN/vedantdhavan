from readme_generator import (
    build_projects_markdown
)

projects = build_projects_markdown()

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

with open(
    "README.md",
    "w",
    encoding="utf-8"
) as f:

    f.write(readme)