# Telegram AI Bot on Vercel

A simple Telegram chatbot hosted on Vercel that forwards user messages to an external AI API and returns the AI response back to the chat.

## Project Structure

- `api/webhook.js` - Vercel serverless webhook entrypoint for Telegram updates.
- `src/ai.js` - Sends user text to the AI API and returns the AI response.
- `src/telegram.js` - Sends messages and typing indicators to Telegram.
- `package.json` - Node project configuration.
- `vercel.json` - Vercel build and route configuration.

## Setup

1. Copy `.env.example` to `.env` and configure:
   - `TELEGRAM_BOT_TOKEN` - your Telegram bot token.
   - `AI_API_URL` - AI API endpoint.

Example `.env`:

```env
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
AI_API_URL=https://apis.prexzyvilla.site/ai/gpt-5
```

2. Install dependencies:

```bash
npm install
```

## Running Locally

You can test the webhook locally with a tool like `ngrok` and a Telegram webhook configured to point to your local server.

```bash
node api/webhook.js
```

## Vercel Deployment

This project is configured for deployment on Vercel using the Node builder.

- `vercel.json` routes `/api/*` requests to `api/*.js`
- `api/webhook.js` handles `POST` requests from Telegram

## How It Works

1. Telegram sends an update to your webhook.
2. `api/webhook.js` extracts the incoming message text.
3. `src/ai.js` forwards the text to the AI API.
4. `src/telegram.js` sends the AI response back to Telegram.

## Notes

- The webhook only accepts `POST` requests.
- If AI API or Telegram requests fail, the bot logs the error and returns a generic message.
- Make sure Telegram webhook is set to the deployed Vercel function URL.

## License

MIT
