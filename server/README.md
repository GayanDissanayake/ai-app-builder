# Server

This folder contains the backend API for the AI App Builder project.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   node index.js
   ```

## Configuration

- The server runs on port 5050 by default (see `index.js`).
- CORS is enabled for cross-origin requests.

## Endpoints

- `GET /` — Returns `API Running` to verify the server is working.

## Development

- Update or add routes in `index.js` as needed.
- Use environment variables for sensitive data and configuration.

## License

MIT
