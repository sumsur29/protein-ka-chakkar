# Protein Ka Chakkar — Telegram Bot 💪

A daily protein tips bot for Indian families. 90 days of desi recipes, protein facts, smart swaps, and Bollywood-style motivation.

## How it works

1. User sends `/start` to the bot
2. Every morning at 8 AM IST, the bot sends one protein tip
3. 90 days of pre-written content (Hinglish, warm tone, practical tips)
4. Users can check `/progress`, get `/today`'s tip, or `/share` with family

## Setup (5 minutes)

### 1. Create a Telegram Bot

1. Open Telegram, search for `@BotFather`
2. Send `/newbot`
3. Name: `Protein Ka Chakkar`
4. Username: `protein_ka_chakkar_bot` (or any available name)
5. Copy the **bot token** you receive

### 2. Deploy to Vercel

1. Push this code to a new GitHub repo
2. Import in Vercel (vercel.com/new)
3. Add environment variable: `TELEGRAM_BOT_TOKEN` = your bot token
4. Deploy

### 3. Register Webhook

After deploying, visit:
```
https://your-app.vercel.app/api/setup
```
This tells Telegram to send messages to your Vercel function.

### 4. Test

Send `/start` to your bot on Telegram. You should get the welcome message!

## Commands

- `/start` — Subscribe to daily tips
- `/today` — Get today's tip
- `/day 15` — Get a specific day's tip
- `/progress` — See progress (day X/90)
- `/stop` — Unsubscribe
- `/share` — Get share link
- `/help` — Command list

## Cron Schedule

Daily messages are sent at 8 AM IST (2:30 AM UTC) via Vercel Cron.

The cron is configured in `vercel.json`:
```json
{ "schedule": "30 2 * * *" }
```

## Storage

For MVP: Uses in-memory storage (resets on cold start).

For production: Add Vercel KV:
1. Go to Vercel Dashboard → Storage → Create KV
2. Link to your project
3. The bot auto-detects KV and uses it

## Content

90 days of messages in `messages.js`:
- Week 1-2: Basics & easy swaps
- Week 3: Brand recommendations 
- Week 4-6: Recipes
- Week 7-8: Myths & advanced
- Week 9-10: Family strategies
- Week 11-13: Pro tips & graduation

## Links

- Telegram Community: https://t.me/protein_ka_chakkar
- Protein Tracker App: protein-tracker.vercel.app
