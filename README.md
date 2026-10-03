# TaskFlow

TaskFlow is a React task manager with a Redux Toolkit client and an Express API. User accounts and tasks are held in server memory and are reset when the server restarts.

## Run locally

1. Copy `server/.env.example` to `server/.env` and set `JWT_SECRET` to a long random value.
2. Install server dependencies with `npm.cmd --prefix server install`.
3. Start the API with `npm.cmd --prefix server start`.
4. In another terminal, install root dependencies with `npm.cmd install` and start Vite with `npm.cmd run dev`.

The API defaults to `http://localhost:3000`. To use another port, set `PORT` for the server and `VITE_API_URL` in the root `.env.local` file, for example `VITE_API_URL=http://localhost:3100`.

The API defaults to `http://localhost:3000`. To use another port, set `PORT` for the server and `VITE_API_URL` in the root `.env.local` file, for example `VITE_API_URL=http://localhost:3100`.
