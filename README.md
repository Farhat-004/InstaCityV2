# InstaCityV2 Frontend

The frontend for InstaCityV2 is a Vite-powered React application written in TypeScript. It provides the social feed experience for browsing posts, viewing profiles, creating and editing posts, commenting, liking posts, and managing authentication and profile settings.

This README covers the frontend in the `icv2` directory only. The frontend expects the InstaCityV2 backend API to be running and reachable through the configured environment variable.

## Features

- Public and authenticated home feed
- Infinite loading of posts
- Post details with comments and likes
- Create, edit, and delete posts
- Image uploads through Cloudinary
- User profiles and profile settings
- Login, registration, and logout flows
- Axios authentication and token refresh handling
- Toast notifications for user feedback
- Responsive layout for desktop and mobile screens

## Technology Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack React Query
- Axios
- Tailwind CSS
- React Toastify
- Cloudinary Upload API

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- A running InstaCityV2 backend API
- A Cloudinary account and unsigned upload preset for image uploads

Check your installed versions with:

```bash
node --version
npm --version
```

## Installation

From the frontend directory:

```bash
cd icv2
npm install
```

Create a local environment file named `.env` in the `icv2` directory. Do not commit this file if it contains environment-specific values.

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### Environment variables

| Variable                        | Required              | Purpose                                                                            |
| ------------------------------- | --------------------- | ---------------------------------------------------------------------------------- |
| `VITE_BACKEND_URL`              | Yes                   | Base URL of the backend API, including protocol and port when running locally.     |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Yes for image uploads | Cloudinary unsigned upload preset used by the create post and profile image flows. |
| `VITE_CLOUDINARY_CLOUD_NAME`    | Yes for image uploads | Cloudinary cloud name used to build the upload endpoint.                           |

Vite exposes variables to browser code only when they use the `VITE_` prefix. Never put private credentials, database passwords, or server-only secrets in this file.

## Development

Start the Vite development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal, normally:

```text
http://localhost:5173
```

The backend must be available at the URL configured by `VITE_BACKEND_URL`. Restart the Vite server after changing `.env` values.

## Scripts

| Command           | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `npm run dev`     | Starts the Vite development server.                                            |
| `npm run build`   | Runs the TypeScript project build and creates the production bundle in `dist`. |
| `npm run lint`    | Runs ESLint across the frontend.                                               |
| `npm run preview` | Serves the production bundle locally after building.                           |

Before deploying, run:

```bash
npm run build
```

The deployment platform should use `icv2` as the project root, install dependencies with `npm install` or `npm ci`, and publish the generated `dist` directory.

## Application Routes

| Route                | Purpose                                       |
| -------------------- | --------------------------------------------- |
| `/`                  | Home feed with posts and infinite loading.    |
| `/post/:postId`      | Post details, likes, comments, and sharing.   |
| `/create-post`       | Create a post with an image and caption.      |
| `/edit-post/:postId` | Edit an existing post.                        |
| `/profile/:userId`   | View a user's profile.                        |
| `/settings`          | Update profile information and avatar.        |
| `/login`             | Sign in to an account.                        |
| `/register`          | Create a new account.                         |
| `/logout`            | Sign out of the current account.              |
| `/likes`             | Feed route currently mapped to the home page. |

## Project Structure

```text
icv2/
├── public/                 Static public assets
├── src/
│   ├── actions/            Fetch helpers for feed and current-user data
│   ├── assets/             Imported frontend assets
│   ├── components/         Reusable UI components
│   ├── contexts/           React context definitions
│   ├── hooks/              API, authentication, query, and toast hooks
│   ├── pages/              Route-level page components
│   ├── providers/          Application providers such as authentication
│   ├── utils/              Shared types and utility functions
│   ├── Router.tsx          Browser route configuration
│   └── main.tsx            Application entry point and providers
├── .env                    Local environment variables, not committed
├── index.html              Vite HTML entry point
├── package.json            Frontend scripts and dependencies
├── tailwind.config.js      Tailwind content configuration
├── tsconfig.json           TypeScript project references
└── vite.config.ts          Vite and React configuration
```

## Frontend Architecture

### Application entry point

`src/main.tsx` creates the React root and wraps the application with:

- `QueryClientProvider` for server-state caching and fetching
- `AuthProvider` for the current authentication state
- `RouterProvider` for application navigation
- `ToastContainer` for notifications

### Routing

Routes are defined in `src/Router.tsx`. The main application shell is rendered for the primary routes, while login, registration, and logout have their own page flows.

### Authentication

Authentication state is stored in `AuthContext` and managed by `AuthProvider`. The Axios instance in `src/hooks/useAxios.tsx` attaches the access token to requests and attempts to refresh an expired token through the backend token endpoint.

The current auth state is held in memory. Refreshing the browser clears that state unless persistence is added later.

### API data

TanStack React Query manages asynchronous server data and cache invalidation. Fetching and mutation helpers are located in:

- `src/actions/fetch/`
- `src/hooks/useFetchData.tsx`
- `src/hooks/usePostData.tsx`
- `src/hooks/useAxios.tsx`

### Image uploads

Images are uploaded directly to Cloudinary using the configured cloud name and unsigned upload preset. The resulting image URL is then sent to the backend when creating a post or updating a profile avatar.

## Backend API Expectations

The frontend expects the backend URL to expose routes for:

- Authentication: `/auth/login`, `/auth/signup`, `/auth/token`
- Posts: `/posts`, `/posts/:postId`, and post like/comment operations
- Users: `/users/me`, `/users/:userId`, and profile update operations

The frontend uses bearer-token authentication for protected Axios requests. Ensure the backend allows requests from the deployed frontend origin and supports the required CORS configuration.

## Production Deployment

1. Set the frontend project root to `icv2` in the deployment service.
2. Add the three `VITE_` environment variables in the deployment settings.
3. Use `npm ci` when deploying from the committed lockfile, or `npm install` when appropriate for the platform.
4. Use `npm run build` as the build command.
5. Publish the `dist` directory.
6. Configure the hosting provider to redirect unknown routes to `index.html` so React Router routes work after a page refresh.
7. Set `VITE_BACKEND_URL` to the deployed backend URL, not `localhost`.
8. Configure the backend CORS allowlist to include the deployed frontend URL.

Environment variables are compiled into the frontend bundle at build time. Changing them on the server after the build will not change an already-built bundle; rebuild the frontend after updating them.

## Troubleshooting

### `Cannot find module 'axios'`

Make sure the command is running from `icv2` and install the frontend dependencies:

```bash
cd icv2
npm install
npm run build
```

Axios must be listed in `dependencies` because it is imported by the browser application at runtime.

### API requests fail locally

Check that:

- The backend is running.
- `VITE_BACKEND_URL` points to the correct protocol, host, and port.
- The backend permits the frontend origin through CORS.
- The Vite server was restarted after changing `.env`.

### Images do not upload

Check the Cloudinary cloud name and unsigned upload preset. The preset must allow unsigned browser uploads, and the `VITE_` variables must be available during the frontend build.

### Refreshing a nested route returns 404

Configure the hosting provider's SPA fallback so routes such as `/post/:postId` and `/profile/:userId` serve `index.html`.

### TypeScript errors during deployment

Run the same production command locally from the frontend directory:

```bash
cd icv2
npm run build
```

Do not run the command from the repository root unless that root has its own frontend package configuration.

## Code Quality Notes

- Keep frontend changes inside `icv2`.
- Prefer the shared types in `src/utils/types.ts` for API and component contracts.
- Keep API calls in the existing actions and hooks instead of duplicating request logic in pages.
- Avoid committing `.env` files or compiled `dist` output unless the deployment workflow explicitly requires it.
- Run `npm run build` before opening a deployment or pull request.

## License

See the repository license file for project licensing information.
