# 🏷️ GitHub Labels Reference

This document describes all GitHub labels used in the OwlRoadmap repository to organize issues and pull requests.

---

## 🐛 Type Labels

| Label | Color | Description |
| --- | --- | --- |
| `bug` | `#d73a4a` | Something isn't working as expected |
| `enhancement` | `#a2eeef` | New feature or improvement request |
| `documentation` | `#0075ca` | Improvements or additions to documentation |
| `question` | `#d876e3` | Further information is requested |
| `duplicate` | `#cfd3d7` | This issue or PR already exists |
| `wontfix` | `#ffffff` | This will not be worked on |
| `invalid` | `#e4e669` | This doesn't seem right |

---

## 🚦 Status Labels

| Label | Color | Description |
| --- | --- | --- |
| `needs-triage` | `#e99695` | Newly opened — needs review and categorization |
| `needs-discussion` | `#f9d0c4` | Requires community or maintainer input before proceeding |
| `in-progress` | `#0052cc` | Actively being worked on |
| `blocked` | `#b60205` | Cannot proceed — waiting on something external |
| `ready-for-review` | `#0e8a16` | PR or issue is ready for a maintainer review |
| `waiting-on-author` | `#e4e669` | Waiting on the contributor to respond or push changes |

---

## 🌱 Contributor Labels

| Label | Color | Description |
| --- | --- | --- |
| `good first issue` | `#7057ff` | Great for newcomers — small scope, well-defined |
| `help wanted` | `#008672` | Extra attention needed — open for community contributions |
| `mentor available` | `#5319e7` | A maintainer is available to guide the contributor |

---

## 🔧 Area Labels

| Label | Color | Description |
| --- | --- | --- |
| `area: readme-builder` | `#bfd4f2` | Related to the README builder feature |
| `area: roadmap-builder` | `#bfd4f2` | Related to the Roadmap builder feature |
| `area: github-integration` | `#bfd4f2` | Related to GitHub API / repo analyzer |
| `area: ai-assistant` | `#bfd4f2` | Related to the Owl AI assistant |
| `area: export-studio` | `#bfd4f2` | Related to Export Studio |
| `area: analytics` | `#bfd4f2` | Related to the Analytics Dashboard |
| `area: workspaces` | `#bfd4f2` | Related to the multi-workspace system |
| `area: themes` | `#bfd4f2` | Related to theme/styling |
| `area: a11y` | `#bfd4f2` | Accessibility improvements |
| `area: performance` | `#bfd4f2` | Performance optimizations |
| `area: devops` | `#bfd4f2` | CI/CD, deployment, and infrastructure |

---

## 🚀 Priority Labels

| Label | Color | Description |
| --- | --- | --- |
| `priority: critical` | `#b60205` | Production-breaking issue — fix immediately |
| `priority: high` | `#d93f0b` | Important — should be addressed in the next release |
| `priority: medium` | `#fbca04` | Should be addressed soon but not blocking |
| `priority: low` | `#0e8a16` | Nice to have — can be addressed in future releases |

---

## 🛠️ How to Apply Labels

- **Maintainers**: Apply type + status + area labels when triaging issues.
- **Contributors**: You may suggest labels in your issue or PR description but cannot self-assign.
- **Automation**: The `needs-triage` label is automatically applied to all new issues via GitHub Actions.

---

## 📥 Creating Labels

To create all these labels in your repository at once, use the [GitHub CLI](https://cli.github.com/):

```bash
# Example: create a label
gh label create "good first issue" --color "7057ff" --description "Great for newcomers — small scope, well-defined"
```

Or use the **Labels** page in your repository settings to create them manually.
