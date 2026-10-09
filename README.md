# StoryTog — Frontend

The Angular frontend for **StoryTog**, a collaborative storytelling platform where registered users start stories by publishing the first chapter, and other writers propose chapters to continue them. Proposed chapters are accepted when **more than half of the existing story authors approve**.

**Live application:** https://storytog.netlify.app  
**Backend repository:** https://github.com/NITSOMA/storytog

## Features

Based on the current source code, the frontend includes:

- User registration, login, and profile pages
- Browsing and reading stories
- Story creation and chapter-related workflows
- Submission of proposed next chapters for author review
- Majority-based approval: more than 50% of existing authors must approve a proposed chapter
- Comments and notifications
- Author information and story-related navigation

> Add real screenshots here, ideally a home page, story detail page, and a writing or chapter-request workflow.

## How collaborative writing works

1. A registered user creates a story and publishes its first chapter.
2. Another user writes a proposed next chapter and submits a request.
3. Existing story authors review and vote on the proposed chapter.
4. The chapter can be accepted once approvals exceed 50% of existing authors (for example, 3 approvals out of 4 authors).

## Tech stack

- Angular 21
- TypeScript 5.9
- Angular Router and HttpClient
- RxJS
- Vitest for unit testing

## Getting started

### Requirements

- Node.js and npm versions compatible with Angular 21
- A running StoryTog backend API

```bash
git clone https://github.com/NITSOMA/storytogFront.git
cd storytogFront
npm ci
npm start
```

Open http://localhost:4200.

The frontend uses an injected `APP_CONFIG` token with an `apiUrl` property. Configure the API base URL in the application configuration for your environment before starting the app.

## Commands

```bash
npm start        # local development server
npm run build    # production build
npm test         # unit tests
```

## Architecture

The `src/app` folder separates routed components, HTTP services, guards, an authentication interceptor, and TypeScript models. `StoryService` communicates with the backend's story and social endpoints.

## Deployment

The frontend is deployed on Netlify. The backend is deployed separately; API URL and cross-origin authentication settings must match the deployed environment.

## Related repository

[StoryTog backend](https://github.com/NITSOMA/storytog)
