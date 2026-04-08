// Protein Ka Chakkar — Telegram Bot
// Runs on Vercel serverless functions
// Uses Vercel KV (or JSON file) for subscriber storage

const MESSAGES = require("./messages");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ============ TELEGRAM API HELPERS ============

async function sendMessage(chatId, text, opts = {}) {
  const body = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...opts,
  };
  const res = await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function sendWithButtons(chatId, text, buttons) {
  return sendMessage(chatId, text, {
    reply_markup: {
      inline_keyboard: buttons,
    },
  });
}

// ============ STORAGE (Vercel KV or in-memory for now) ============
// For production, use Vercel KV. For MVP, we use a simple JSON approach via Vercel Blob or KV.
// This implementation uses the Vercel KV store.

// Subscriber format: { chatId, name, startDate, dayNumber, active, subscribedBy }

// For MVP without KV, we'll use a simple Map and note that 
// production should use @vercel/kv
const subscribers = new Map();

// KV helpers (swap these for real KV in production)
async function getSubscribers() {
  if (process.env.KV_REST_API_URL) {
    // Use Vercel KV
    const { kv } = require("@vercel/kv");
    const subs = await kv.get("subscribers");
    return subs || {};
  }
  // Fallback: in-memory (resets on cold start — fine for testing)
  return Object.fromEntries(subscribers);
}

async function saveSubscribers(subs) {
  if (process.env.KV_REST_API_URL) {
    const { kv } = require("@vercel/kv");
    await kv.set("subscribers", subs);
    return;
  }
  // Fallback: in-memory
  for (const [k, v] of Object.entries(subs)) {
    subscribers.set(k, v);
  }
}

async function getSubscriber(chatId) {
  const subs = await getSubscribers();
  return subs[chatId] || null;
}

async function upsertSubscriber(chatId, data) {
  const subs = await getSubscribers();
  subs[chatId] = { ...(subs[chatId] || {}), ...data };
  await saveSubscribers(subs);
}

async function removeSubscriber(chatId) {
  const subs = await getSubscribers();
  delete subs[chatId];
  await saveSubscribers(subs);
}

// ============ BOT COMMANDS ============

async function handleStart(chatId, from) {
  const name = from.first_name || "Friend";
  
  await upsertSubscriber(chatId.toString(), {
    chatId: chatId.toString(),
    name,
    startDate: new Date().toISOString().slice(0, 10),
    dayNumber: 0,
    active: true,
    joinedAt: new Date().toISOString(),
  });

  const welcome = `🙏 <b>Namaste ${name}!</b>

Welcome to <b>Protein Ka Chakkar</b> 💪

Main hoon aapka daily protein guide. Har subah aapko ek tip bhejunga — desi recipes, protein facts, smart food swaps.

<b>Ye bot kiske liye hai?</b>
👉 Aap apne liye use kar sakte hain
👉 Ya apne parents/family ko subscribe kara sakte hain — unhe roz ek chhoti si protein tip milegi!

<b>Kya milega?</b>
📅 90 din ka protein course
🍳 15+ desi recipes
🧠 Myth busters
💰 Budget-friendly tips
👨‍👩‍👧 Family strategies

Kal subah se aapka pehla tip aayega! 🌅

Type /help for all commands.

🔗 Protein Tracker bhi try karein: protein-tracker.vercel.app`;

  await sendWithButtons(chatId, welcome, [
    [{ text: "📤 Share with family", url: "https://t.me/protein_ka_chakkar" }],
    [{ text: "📱 Open Protein Tracker", url: "https://protein-tracker.vercel.app" }],
  ]);
}

async function handleHelp(chatId) {
  const text = `📋 <b>Commands:</b>

/start — Subscribe to daily tips
/today — Get today's tip now
/day [number] — Get a specific day's tip (e.g. /day 5)
/progress — See your progress
/stop — Unsubscribe
/share — Get share link
/help — This menu

Questions? Join: t.me/protein_ka_chakkar 💬`;

  await sendMessage(chatId, text);
}

async function handleToday(chatId) {
  const sub = await getSubscriber(chatId.toString());
  if (!sub) {
    await sendMessage(chatId, "Pehle /start karo subscribe karne ke liye! 🙏");
    return;
  }

  const day = sub.dayNumber || 1;
  const msg = MESSAGES.find((m) => m.day === day);
  if (!msg) {
    await sendMessage(chatId, "Aapka 90 din ka course complete ho gaya hai! 🎓🎉\n\nCommunity join karein: t.me/protein_ka_chakkar");
    return;
  }

  const header = `📅 <b>Day ${msg.day}/90 — ${msg.title}</b>\n\n`;
  await sendMessage(chatId, header + msg.msg);
}

async function handleDay(chatId, dayNum) {
  const num = parseInt(dayNum);
  if (!num || num < 1 || num > 90) {
    await sendMessage(chatId, "Day 1 se 90 ke beech ka number do. Example: /day 15");
    return;
  }
  const msg = MESSAGES.find((m) => m.day === num);
  if (!msg) {
    await sendMessage(chatId, "Ye day available nahi hai.");
    return;
  }
  const header = `📅 <b>Day ${msg.day}/90 — ${msg.title}</b>\n\n`;
  await sendMessage(chatId, header + msg.msg);
}

async function handleProgress(chatId) {
  const sub = await getSubscriber(chatId.toString());
  if (!sub) {
    await sendMessage(chatId, "Pehle /start karo! 🙏");
    return;
  }

  const day = sub.dayNumber || 0;
  const pct = Math.round((day / 90) * 100);
  const bar = "█".repeat(Math.floor(pct / 5)) + "░".repeat(20 - Math.floor(pct / 5));

  const text = `📊 <b>${sub.name} ka Progress</b>

Day: <b>${day}/90</b>
Progress: [${bar}] ${pct}%

${day === 0 ? "Kal se aapka pehla tip aayega! 🌅" : ""}
${day >= 90 ? "🎓 COURSE COMPLETE! Mogambo khush hua! 🏆" : ""}
${day > 0 && day < 90 ? `Next tip: Kal subah 8 AM ⏰` : ""}

Joined: ${sub.startDate || "Today"}

📱 Track your protein: protein-tracker.vercel.app`;

  await sendMessage(chatId, text);
}

async function handleStop(chatId) {
  await upsertSubscriber(chatId.toString(), { active: false });
  await sendMessage(chatId, "😢 Aapko miss karenge! \n\nJab bhi wapas aana ho, /start type karein.\n\nProtein Ka Chakkar hamesha aapke liye hai! 🙏");
}

async function handleShare(chatId) {
  const text = `📤 <b>Share Protein Ka Chakkar!</b>

Apne parents, friends, family ko ye link bhejiye:

👉 https://t.me/protein_ka_chakkar

Ya ye message forward karein:

"Roz subah ek protein tip milti hai — desi recipes, health facts, budget tips. Free hai! Join karo: https://t.me/protein_ka_chakkar 💪🇮🇳"`;

  await sendWithButtons(chatId, text, [
    [{ text: "📤 Share Link", url: "https://t.me/share/url?url=https://t.me/protein_ka_chakkar&text=Roz%20subah%20ek%20protein%20tip!%20Desi%20recipes,%20health%20facts.%20Free%20hai!%20💪🇮🇳" }],
  ]);
}

// ============ WEBHOOK HANDLER ============

async function handleWebhook(body) {
  // Handle regular messages
  if (body.message) {
    const msg = body.message;
    const chatId = msg.chat.id;
    const text = (msg.text || "").trim();
    const from = msg.from || {};

    if (text === "/start") return handleStart(chatId, from);
    if (text === "/help") return handleHelp(chatId);
    if (text === "/today") return handleToday(chatId);
    if (text === "/progress") return handleProgress(chatId);
    if (text === "/stop") return handleStop(chatId);
    if (text === "/share") return handleShare(chatId);
    if (text.startsWith("/day")) {
      const parts = text.split(" ");
      return handleDay(chatId, parts[1]);
    }

    // Default response for unknown messages
    await sendMessage(chatId, "🙏 /help type karein commands dekhne ke liye!\n\nYa /today type karein aaj ka tip paane ke liye 💪");
    return;
  }

  // Handle callback queries (button clicks)
  if (body.callback_query) {
    const cbq = body.callback_query;
    const chatId = cbq.message.chat.id;
    const data = cbq.data;

    // Answer callback to remove loading state
    await fetch(`${API}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: cbq.id }),
    });

    // Handle callback data if needed
    return;
  }
}

// ============ CRON: SEND DAILY MESSAGES ============

async function sendDailyMessages() {
  const subs = await getSubscribers();
  let sent = 0;
  let errors = 0;

  for (const [chatId, sub] of Object.entries(subs)) {
    if (!sub.active) continue;

    const nextDay = (sub.dayNumber || 0) + 1;
    if (nextDay > 90) continue; // Course complete

    const msg = MESSAGES.find((m) => m.day === nextDay);
    if (!msg) continue;

    try {
      const header = `📅 <b>Day ${msg.day}/90 — ${msg.title}</b>\n\n`;
      await sendMessage(chatId, header + msg.msg);

      // Update day number
      sub.dayNumber = nextDay;
      sent++;

      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 100));
    } catch (e) {
      console.error(`Error sending to ${chatId}:`, e.message);
      errors++;
    }
  }

  // Save updated subscriber data
  await saveSubscribers(subs);

  return { sent, errors, total: Object.keys(subs).length };
}

// ============ VERCEL API ROUTES ============

// Webhook endpoint: POST /api/bot
module.exports.webhook = async function (req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ ok: true, message: "Bot is running! 💪" });
  }

  try {
    await handleWebhook(req.body);
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Webhook error:", e);
    res.status(200).json({ ok: true }); // Always return 200 to Telegram
  }
};

// Cron endpoint: GET /api/cron
module.exports.cron = async function (req, res) {
  // Verify cron secret (optional but recommended)
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const result = await sendDailyMessages();
    console.log("Daily messages sent:", result);
    res.status(200).json({ ok: true, ...result });
  } catch (e) {
    console.error("Cron error:", e);
    res.status(500).json({ error: e.message });
  }
};

// Setup endpoint: GET /api/setup — sets the webhook URL
module.exports.setup = async function (req, res) {
  const webhookUrl = `https://${req.headers.host}/api/bot`;
  
  const result = await fetch(`${API}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: webhookUrl,
      allowed_updates: ["message", "callback_query"],
    }),
  });
  
  const data = await result.json();
  res.status(200).json({ ok: true, webhook: webhookUrl, telegram: data });
};
