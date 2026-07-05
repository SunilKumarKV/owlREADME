# Contributing to OwlREADME

Thank you for your interest in contributing to OwlREADME! As an open-source project, we welcome improvements in code quality, accessibility, styling, and feature additions.

---

## 🛠️ Local Development Setup

1. **Prerequisites**: Ensure you have Node.js (v18+) and `pnpm` installed.
2. **Fork the repository**: Create a copy of the project under your own GitHub account.
3. **Clone the fork**:
   ```bash
   git clone https://github.com/your-username/owlreadme.git
   cd owlreadme
   ```
4. **Install dependencies**:
   ```bash
   pnpm install
   ```
5. **Set up env variables**: Create a `.env.local` containing `GEMINI_API_KEY` to test AI features.
6. **Spin up dev server**:
   ```bash
   pnpm run dev
   ```

---

## 🌿 Branch Naming Conventions

To keep the repository history readable and structured, please name branches according to these prefixes:

- `feat/` for new features (e.g. `feat/oauth-github-auth`)
- `fix/` for bug fixes (e.g. `fix/pdf-cors-styles`)
- `docs/` for documentation changes (e.g. `docs/update-install-guide`)
- `refactor/` for code refactoring (e.g. `refactor/theme-variables`)
- `test/` for adding or improving tests

---

## ✍️ Commit Conventions

We follow a structured commit message format inspired by **Conventional Commits**:

```text
<type>(<scope>): <short description>
```

### Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation-only changes
- `style`: Changes that do not affect the meaning of the code (formatting, white-space, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Maintenance tasks, package upgrades, configuration changes

### Examples:
- `feat(api): secure Gemini prompts behind Next route proxy`
- `fix(a11y): couple input labels with input ids`
- `docs(readme): add environment variables instructions`

---

## 🔄 Pull Request Process

1. **Create a feature branch**: Cut your branch from the `main` branch.
2. **Implement changes**: Follow our coding guidelines (TypeScript, Tailwind, and React 19 rules).
3. **Verify build correctness**:
   Ensure the application builds successfully without type warnings:
   ```bash
   pnpm build
   ```
4. **Commit & Push**: Commit your changes with conventional messages and push the branch to your fork.
5. **Open a Pull Request**: Target the `main` branch of the upstream repository.
6. **Review**: Maintainers will review your code. Address any requested changes.
7. **Merge**: Once approved, your PR will be squash-merged into main.

---

## 🌍 Community Resources

| Resource | Description |
| --- | --- |
| [Community Guidelines](docs/community-guidelines.md) | Values, dos & don'ts, and mentorship info |
| [Good First Issues](docs/good-first-issues.md) | Curated beginner-friendly tasks with hints |
| [GitHub Labels](docs/labels.md) | Label reference for issues and PRs |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Community standards and enforcement |
| [GitHub Discussions](https://github.com/SunilKumarKV/owlreadme/discussions) | Questions, ideas, show-and-tell |
