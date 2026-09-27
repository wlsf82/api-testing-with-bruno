# Emoji API

A small REST API for a catalog of emojis, built for the [API Testing with Bruno](https://talkingabouttesting.school/courses/api-testing-with-bruno) course at Talking About Testing School. You can list, read, create, update, and delete emojis. It exists to be tested, not to run in production: all data lives in memory, and **restarting the API resets all data** to the 50 emojis it starts with.

## Requirements

- [Node.js](https://nodejs.org/) 20 or newer
- npm (installed with Node.js)

## Running the API

```bash
npm install
npm start
```

When it is up, the terminal prints:

```text
Emoji API listening on http://localhost:3001
```

- Interactive documentation (Swagger UI): <http://localhost:3001/api-docs/>
- The OpenAPI description: <http://localhost:3001/openapi.json>

To use another port, set the `PORT` environment variable (`PORT=4000 npm start`).

## Credentials

Reading is open to anyone. Creating, updating, and deleting need a bearer token from `POST /login`:

| Username | Password |
| --- | --- |
| `tester` | `bruno-rocks` |

## Endpoints

| Method | Path | Needs a token? |
| --- | --- | --- |
| `GET` | `/health` | No |
| `GET` | `/emojis` | No |
| `GET` | `/emojis/:id` | No |
| `POST` | `/login` | No |
| `POST` | `/emojis` | Yes |
| `PUT` | `/emojis/:id` | Yes |
| `PATCH` | `/emojis/:id` | Yes |
| `DELETE` | `/emojis/:id` | Yes |

The details (parameters, bodies, and every error) are in the Swagger UI.

## License

[MIT](./LICENSE)
