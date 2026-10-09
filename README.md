# StoryTog — Collaborative Storytelling

**Write the next chapter, together.**

StoryTog is a collaborative storytelling platform where writers create stories chapter by chapter. A user starts a story by publishing its first chapter. Other writers can propose the next chapter, and the story's existing authors decide together whether it becomes part of the narrative.

**[Explore StoryTog](https://storytog.netlify.app)** · **[Backend repository](https://github.com/NITSOMA/storytog)**

## How StoryTog works

1. **Start a story.** Register an account, create a story, and publish its opening chapter.
2. **Propose a continuation.** Another writer creates a proposed next chapter and submits it for review.
3. **Review and vote.** The story's existing authors evaluate the proposal.
4. **Continue together.** A proposed chapter needs approval from **more than half of the existing authors** to be accepted. For example, a story with four authors needs three approvals.

## Features

- Account registration, sign-in, and user profiles
- Story discovery and reading
- Story creation and chapter writing
- Chapter proposals and author review
- Majority-based approval for new chapters
- Comments and notifications

## Built with

- **Angular 21** and **TypeScript**
- **Angular Router** for navigation
- **Angular HttpClient** and **RxJS** for API communication
- **Vitest** for frontend tests

The frontend communicates with a separate Django REST Framework backend, which manages accounts, stories, chapter requests, and voting.

## Run locally

**Prerequisites:** Node.js and npm compatible with Angular 21, plus a running [StoryTog backend](https://github.com/NITSOMA/storytog).

```bash
git clone https://github.com/NITSOMA/storytogFront.git
cd storytogFront
npm ci
npm start
```

Open **http://localhost:4200**.

For local development, `src/environments/environment.development.ts` sets the API URL to `http://localhost:8000`. Update it if your backend runs at a different address. The production environment uses `/api`, which is resolved through the deployed site's configuration.

## Useful commands

```bash
npm start       # Start the development server
npm run build   # Create a production build
npm test        # Run frontend tests
```

## Project organization

The Angular application organizes its pages and features into components, with dedicated services for API requests, route guards for protected navigation, an HTTP interceptor for authentication, and TypeScript models for application data.

## Deployment

The frontend is hosted on **Netlify**. The backend is hosted separately on **Render**.

---

**Backend source:** [github.com/NITSOMA/storytog](https://github.com/NITSOMA/storytog)
