# Shortscut

**Shortscut** is an AI-powered podcast clipping tool built with a modern tech stack including **Next.js**, **Tailwind CSS**, **ShadCN UI**, **Modal**, **AWS S3**, **Auth.js**, **Inngest**, and **Gemini**.

This application allows users to upload podcasts or videos, automatically identifies viral moments using AI, generates short clips with integrated subtitles, and enables users to download them from a centralized dashboard.

---

## ✨ Features

* 🎿 Upload podcast videos
* 🧠 AI-powered viral moment detection
* ✂️ Automatic clipping of highlight moments
* ✍️ Subtitle generation
* 📅 Download clips from your dashboard
* 🔀 Asynchronous, decoupled backend architecture using **Inngest** and **Modal**
* 💳 Integrated sandbox Stripe payments (for demonstration)

---

##  Project Structure

Create a directory named `shortscut` and clone both the frontend and backend repositories inside it:

```
shortscut/
🔻 shortscut-frontend/
🔻 shortscut-backend/
```

---

## Getting Started

###  Frontend Setup

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/ojasKooL/shortscut-frontend
   cd shortscut-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

---

###  Inngest Development Server

Start the local Inngest development server:

```bash
npx inngest-cli@latest
```

---

### Stripe Webhook Setup (Sandbox)

To test payments locally:

1. Login to Stripe:

   ```bash
   stripe login
   ```

2. Start listening and forward webhooks to your local server:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

---

### Backend Deployment (Modal)

1. Clone the backend repository:

   ```bash
   git clone https://github.com/ojasKooL/shortscut-backend
   cd shortscut-backend
   ```

2. Deploy the backend to **Modal**:

   ```bash
   modal deploy main.py
   ```

---

## Tech Stack

* **Frontend**: Next.js, Tailwind CSS, ShadCN UI
* **Auth**: Auth.js
* **AI Models**: Gemini via Modal
* **Cloud Backend**: Modal, AWS S3
* **Queue/Event System**: Inngest
* **Payments**: Stripe (Sandbox)

---

##  AI Model Attribution

This project uses [lr-asd](https://github.com/Junhua-Liao/LR-ASD) for speaker diarization as part of the AI processing pipeline.

---

##  License

This project is for demonstration and educational purposes.

---

## Contact
Email: kulkarniojas027@gmail.com

---
