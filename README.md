# Event Management System

A static event registration site built with HTML, CSS, and JavaScript. The site is in `ERS/`.

## Run locally

Open `ERS/index.html` in a browser. No build step or package installation is required.

## Test

Requires Node.js 22 or newer. Tests use Node's built-in test runner and need no dependencies.

```powershell
npm run check
npm test
```

## CI and deployment

GitHub Actions checks JavaScript syntax and runs the tests for pushes and pull requests targeting `main`. A successful push to `main` deploys the `ERS/` site to GitHub Pages.

In the GitHub repository, open **Settings > Pages** and set **Build and deployment** to **GitHub Actions**. After the CI/CD change is merged into `main`, each successful push publishes the site. The Pages URL appears in the workflow's deployment summary.