# Create Next App Starter

A Nextjs starter project


## Tech Stack

- [NextJS v12](https://nextjs.org/) project - bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- React & React DOM v18
- Type Checker - TypeScript v4.7.4
- Lint - ESlint v8, AirBnB & Eslint-config-next
- Format - Prettier

## Usage

Inside the project directory run using `npm` or `yarn`:

- `dev` - runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `build` - builds the app for production to the `build` folder.
- `start` - Runs the built app in production mode.
- `lint` - ESlint configured for Next. Use `.eslintrc.json` to setup & `.eslintignore` to ignore files.

### Run

```bash
yarn dev
# or
npm run dev
```

Entry point `pages/index.tsx`.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Eslint configurations

Lint set according to Airbnb and NextJS style guides.
## Format configurations

[Prettier](https://prettier.io/) is set using my opinionated [rules](https://prettier.io/docs/en/configuration.html) inside config file `.prettierrc`
