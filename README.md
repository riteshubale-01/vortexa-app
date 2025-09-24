
# vortexa-app
=======
# Vortexa: Reddit-like Feed with Real-Time AI Sentiment Dashboard

## Features
- Reddit-style feed with multimedia posts (images, videos, audio)
- AI sentiment classification (Positive/Neutral/Negative, confidence, explanation)
- Trending post ingestion from X (Twitter) and Reddit
- AI Daily News auto-posting
- Real-time dashboard with charts and live updates
- Content moderation (AI-powered)
- Follow system
- Welcome emails (AI-generated)
- Minimalist, animated UI

## Folder Structure
- `backend/` — Node.js + Express API, WebSocket, AI integration
- `frontend/` — React app, charts, media upload, live updates
- `database/` — MongoDB models, seed scripts
- `.env.example` — Environment variable template

## Quick Start

### 1. Clone & Install
```sh
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Setup Environment
- Copy `.env.example` to `.env` in the root and fill in your keys.

### 3. Start MongoDB
Make sure MongoDB is running locally or update `MONGODB_URI` in `.env`.

### 4. Run Backend
```sh
cd backend
npm run dev
```

### 5. Run Frontend
```sh
cd ../frontend
npm start
```

### 6. Access App
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Deployment
- Deploy backend (Railway/Render)
- Deploy frontend (Vercel/Netlify)
- Set environment variables in dashboard

## Notes
- Replace all placeholder values in `.env` before running in production.
- For OpenAI/HuggingFace, get your API key and set it in `.env`.
- For email, use a real SMTP provider (Gmail, SendGrid, etc).

---

**Enjoy your hackathon!**

