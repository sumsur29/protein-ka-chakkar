// Protein Ka Chakkar — Telegram Bot v2
const MESSAGES = require("./messages");
const RECIPES = require("./recipes");
const MIDDAY_NUDGES = require("./nudges");
const PRODUCTS = require("./products");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const TG_GROUP = "https://t.me/protein_hi_protein";
const TRACKER_URL = "https://protein-tracker-one.vercel.app";

// ============ TELEGRAM HELPERS ============
async function sendMessage(chatId, text, opts = {}) {
  const chunks = [];
  let rem = text;
  while (rem.length > 4000) { let s = rem.lastIndexOf("\n", 4000); if (s < 1000) s = 4000; chunks.push(rem.slice(0, s)); rem = rem.slice(s); }
  chunks.push(rem);
  let last;
  for (const chunk of chunks) {
    const r = await fetch(`${API}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text: chunk, parse_mode: "HTML", ...opts }) });
    last = await r.json();
  }
  return last;
}
async function sendWithButtons(chatId, text, buttons) { return sendMessage(chatId, text, { reply_markup: { inline_keyboard: buttons } }); }

// ============ STORAGE ============
const subscribers = new Map();
async function getSubscribers() { if (process.env.KV_REST_API_URL) { const { kv } = require("@vercel/kv"); return (await kv.get("subscribers")) || {}; } return Object.fromEntries(subscribers); }
async function saveSubscribers(subs) { if (process.env.KV_REST_API_URL) { const { kv } = require("@vercel/kv"); await kv.set("subscribers", subs); return; } for (const [k, v] of Object.entries(subs)) subscribers.set(k, v); }
async function getSubscriber(chatId) { const s = await getSubscribers(); return s[chatId] || null; }
async function upsertSubscriber(chatId, data) { const s = await getSubscribers(); s[chatId] = { ...(s[chatId] || {}), ...data }; await saveSubscribers(s); }

// ============ PROTEIN DATABASE ============
const PROTEIN_DB = {
  // === DAL & PULSES (cooked Indian style) ===
  "chana": { protein: 10, cal: 180, serving: "1 bowl cooked", veg: true },
  "chole": { protein: 10, cal: 180, serving: "1 bowl cooked", veg: true },
  "chana half bowl": { protein: 5, cal: 90, serving: "½ bowl", veg: true },
  "rajma": { protein: 9, cal: 170, serving: "1 bowl cooked", veg: true },
  "rajma half bowl": { protein: 5, cal: 85, serving: "½ bowl", veg: true },
  "moong dal": { protein: 7, cal: 120, serving: "1 bowl cooked", veg: true },
  "moong dal half": { protein: 4, cal: 60, serving: "½ bowl", veg: true },
  "toor dal": { protein: 7, cal: 130, serving: "1 bowl cooked", veg: true },
  "arhar dal": { protein: 7, cal: 130, serving: "1 bowl cooked", veg: true },
  "masoor dal": { protein: 7, cal: 115, serving: "1 bowl cooked", veg: true },
  "urad dal": { protein: 8, cal: 140, serving: "1 bowl cooked", veg: true },
  "chana dal": { protein: 8, cal: 135, serving: "1 bowl cooked", veg: true },
  "dal": { protein: 7, cal: 125, serving: "1 bowl cooked (avg)", veg: true },
  "dal makhani": { protein: 8, cal: 220, serving: "1 bowl cooked", veg: true },
  "dal fry": { protein: 7, cal: 150, serving: "1 bowl cooked", veg: true },
  "dal tadka": { protein: 7, cal: 140, serving: "1 bowl cooked", veg: true },
  "sprouts": { protein: 9, cal: 100, serving: "1 bowl", veg: true },
  "ankurit": { protein: 9, cal: 100, serving: "1 bowl", veg: true },
  "lobia": { protein: 8, cal: 140, serving: "1 bowl cooked", veg: true },
  "black eyed peas": { protein: 8, cal: 140, serving: "1 bowl cooked", veg: true },

  // === DAIRY ===
  "paneer": { protein: 14, cal: 265, serving: "100g (~8 cubes)", veg: true },
  "paneer 8 cubes": { protein: 14, cal: 265, serving: "100g (~8 cubes)", veg: true },
  "paneer 4 cubes": { protein: 7, cal: 130, serving: "~50g (4 cubes)", veg: true },
  "cottage cheese": { protein: 14, cal: 265, serving: "100g", veg: true },
  "paneer bhurji": { protein: 18, cal: 320, serving: "1 plate (~120g)", veg: true },
  "dahi": { protein: 8, cal: 120, serving: "1 bowl (200g)", veg: true },
  "curd": { protein: 8, cal: 120, serving: "1 bowl (200g)", veg: true },
  "yogurt": { protein: 8, cal: 120, serving: "1 bowl (200g)", veg: true },
  "hung curd": { protein: 10, cal: 100, serving: "1 bowl", veg: true },
  "greek yogurt": { protein: 15, cal: 130, serving: "1 cup (125g)", veg: true },
  "milk": { protein: 8, cal: 150, serving: "1 glass (250ml)", veg: true },
  "doodh": { protein: 8, cal: 150, serving: "1 glass (250ml)", veg: true },
  "milk 500ml": { protein: 16, cal: 300, serving: "500ml (large glass)", veg: true },
  "lassi": { protein: 8, cal: 180, serving: "1 glass", veg: true },
  "chaach": { protein: 5, cal: 60, serving: "1 glass", veg: true },
  "buttermilk": { protein: 5, cal: 60, serving: "1 glass", veg: true },
  "cheese": { protein: 5, cal: 70, serving: "1 slice (20g)", veg: true },
  "cheese slice": { protein: 5, cal: 70, serving: "1 slice (20g)", veg: true },

  // === BRANDED PRODUCTS ===
  "amul protein milk": { protein: 20, cal: 160, serving: "1 bottle (250ml)", veg: true },
  "amul protein lassi": { protein: 20, cal: 170, serving: "1 bottle (250ml)", veg: true },
  "amul protein shake": { protein: 20, cal: 180, serving: "1 bottle (200ml)", veg: true },
  "amul greek yogurt": { protein: 14, cal: 120, serving: "1 cup (125g)", veg: true },
  "amul paneer": { protein: 18, cal: 290, serving: "100g", veg: true },
  "epigamia": { protein: 15, cal: 130, serving: "1 cup (120g)", veg: true },
  "epigamia protein yogurt": { protein: 15, cal: 130, serving: "1 cup (120g)", veg: true },
  "epigamia protein milk": { protein: 20, cal: 160, serving: "1 bottle (250ml)", veg: true },
  "protinex": { protein: 17, cal: 200, serving: "2 scoops + milk", veg: true },
  "yoga bar": { protein: 20, cal: 280, serving: "1 bar (60g)", veg: true },
  "yoga bar protein bar": { protein: 20, cal: 280, serving: "1 bar (60g)", veg: true },
  "ritebite": { protein: 20, cal: 260, serving: "1 bar (70g)", veg: true },
  "ritebite max protein": { protein: 20, cal: 260, serving: "1 bar (70g)", veg: true },
  "true elements muesli": { protein: 15, cal: 200, serving: "50g", veg: true },
  "mother dairy protein": { protein: 18, cal: 170, serving: "1 bottle (250ml)", veg: true },
  "mother dairy shake": { protein: 18, cal: 170, serving: "1 bottle (250ml)", veg: true },
  "go protein": { protein: 20, cal: 180, serving: "1 bottle (200ml)", veg: true },
  "go protein milkshake": { protein: 20, cal: 180, serving: "1 bottle (200ml)", veg: true },

  // === PROTEIN POWDERS ===
  "whey protein": { protein: 24, cal: 120, serving: "1 scoop (~30g)", veg: true },
  "protein powder": { protein: 24, cal: 120, serving: "1 scoop (~30g)", veg: true },
  "on gold standard": { protein: 24, cal: 120, serving: "1 scoop (31g)", veg: true },
  "on whey": { protein: 24, cal: 120, serving: "1 scoop (31g)", veg: true },
  "on gold standard 1.5 scoop": { protein: 36, cal: 180, serving: "1.5 scoops", veg: true },
  "muscleblaze biozyme": { protein: 25, cal: 130, serving: "1 scoop (33g)", veg: true },
  "mb biozyme": { protein: 25, cal: 130, serving: "1 scoop (33g)", veg: true },
  "mb biozyme 1.5 scoop": { protein: 38, cal: 195, serving: "1.5 scoops", veg: true },
  "muscleblaze raw whey": { protein: 24, cal: 120, serving: "1 scoop (33g)", veg: true },
  "mb raw whey": { protein: 24, cal: 120, serving: "1 scoop (33g)", veg: true },
  "myprotein": { protein: 21, cal: 103, serving: "1 scoop (25g)", veg: true },
  "myprotein impact whey": { protein: 21, cal: 103, serving: "1 scoop (25g)", veg: true },
  "nakpro": { protein: 24, cal: 125, serving: "1 scoop (33g)", veg: true },
  "nakpro perform": { protein: 24, cal: 125, serving: "1 scoop (33g)", veg: true },
  "as-it-is whey": { protein: 24, cal: 117, serving: "1 scoop (30g)", veg: true },
  "as it is": { protein: 24, cal: 117, serving: "1 scoop (30g)", veg: true },
  "oziva": { protein: 25, cal: 160, serving: "1 scoop (40g)", veg: true },
  "oziva plant protein": { protein: 25, cal: 160, serving: "1 scoop (40g)", veg: true },
  "boldfit": { protein: 24, cal: 130, serving: "1 scoop (33g)", veg: true },
  "boldfit whey": { protein: 24, cal: 130, serving: "1 scoop (33g)", veg: true },
  "fast&up plant": { protein: 30, cal: 175, serving: "1 scoop (45g)", veg: true },
  "fast and up": { protein: 30, cal: 175, serving: "1 scoop (45g)", veg: true },
  "avvatar": { protein: 24, cal: 128, serving: "1 scoop (32g)", veg: true },
  "avvatar whey": { protein: 24, cal: 128, serving: "1 scoop (32g)", veg: true },
  "plix": { protein: 25, cal: 145, serving: "1 scoop (35g)", veg: true },
  "plix plant protein": { protein: 25, cal: 145, serving: "1 scoop (35g)", veg: true },
  "sattu": { protein: 20, cal: 170, serving: "2 tbsp (40g)", veg: true },
  "sattu powder": { protein: 20, cal: 170, serving: "2 tbsp (40g)", veg: true },

  // === SOY & NUTS ===
  "soy chunks": { protein: 26, cal: 170, serving: "50g dry", veg: true },
  "soya chunks": { protein: 26, cal: 170, serving: "50g dry", veg: true },
  "soya": { protein: 26, cal: 170, serving: "50g dry", veg: true },
  "tofu": { protein: 10, cal: 80, serving: "100g", veg: true },
  "soy milk": { protein: 7, cal: 80, serving: "1 glass", veg: true },
  "peanuts": { protein: 7, cal: 170, serving: "30g (handful)", veg: true },
  "moongfali": { protein: 7, cal: 170, serving: "30g (handful)", veg: true },
  "almonds": { protein: 6, cal: 170, serving: "15 pcs", veg: true },
  "badam": { protein: 6, cal: 170, serving: "15 pcs", veg: true },
  "peanut butter": { protein: 8, cal: 190, serving: "2 tbsp (32g)", veg: true },
  "cashews": { protein: 5, cal: 160, serving: "15 pcs", veg: true },
  "kaju": { protein: 5, cal: 160, serving: "15 pcs", veg: true },
  "roasted chana": { protein: 10, cal: 190, serving: "50g", veg: true },
  "bhuna chana": { protein: 10, cal: 190, serving: "50g", veg: true },
  "flax seeds": { protein: 5, cal: 110, serving: "2 tbsp", veg: true },
  "alsi": { protein: 5, cal: 110, serving: "2 tbsp", veg: true },
  "hemp seeds": { protein: 10, cal: 115, serving: "3 tbsp", veg: true },
  "chia seeds": { protein: 4, cal: 100, serving: "2 tbsp", veg: true },
  "walnuts": { protein: 4, cal: 130, serving: "7 halves", veg: true },
  "akhrot": { protein: 4, cal: 130, serving: "7 halves", veg: true },

  // === GRAINS & ROTIS ===
  "roti": { protein: 3, cal: 100, serving: "1 pc (wheat)", veg: true },
  "chapati": { protein: 3, cal: 100, serving: "1 pc", veg: true },
  "wheat roti": { protein: 3, cal: 100, serving: "1 pc", veg: true },
  "jowar roti": { protein: 4, cal: 110, serving: "1 pc", veg: true },
  "bajra roti": { protein: 4, cal: 120, serving: "1 pc", veg: true },
  "ragi roti": { protein: 3, cal: 105, serving: "1 pc", veg: true },
  "multigrain roti": { protein: 5, cal: 115, serving: "1 pc", veg: true },
  "protein atta roti": { protein: 6, cal: 120, serving: "1 pc", veg: true },
  "paratha": { protein: 4, cal: 180, serving: "1 pc", veg: true },
  "rice": { protein: 4, cal: 200, serving: "1 bowl", veg: true },
  "chawal": { protein: 4, cal: 200, serving: "1 bowl", veg: true },
  "brown rice": { protein: 5, cal: 215, serving: "1 bowl", veg: true },
  "poha": { protein: 5, cal: 250, serving: "1 plate", veg: true },
  "upma": { protein: 5, cal: 230, serving: "1 bowl", veg: true },
  "idli": { protein: 4, cal: 120, serving: "2 pcs", veg: true },
  "dosa": { protein: 5, cal: 170, serving: "1 pc", veg: true },
  "besan chilla": { protein: 10, cal: 200, serving: "2 pcs", veg: true },
  "moong dal chilla": { protein: 12, cal: 200, serving: "2 pcs", veg: true },
  "oats": { protein: 5, cal: 155, serving: "40g", veg: true },
  "daliya": { protein: 6, cal: 180, serving: "1 bowl", veg: true },
  "quinoa": { protein: 8, cal: 220, serving: "1 bowl cooked", veg: true },
  "khichdi": { protein: 10, cal: 250, serving: "1 bowl", veg: true },
  "chickpea pasta": { protein: 14, cal: 350, serving: "100g dry", veg: true },
  "lentil pasta": { protein: 13, cal: 340, serving: "100g dry", veg: true },
  "soy pasta": { protein: 20, cal: 330, serving: "100g dry", veg: true },

  // === GLOBAL / FUSION ===
  "paneer wrap": { protein: 16, cal: 380, serving: "1 wrap", veg: true },
  "paneer burrito": { protein: 18, cal: 450, serving: "1 pc", veg: true },
  "falafel wrap": { protein: 12, cal: 400, serving: "1 wrap", veg: true },
  "falafel": { protein: 6, cal: 170, serving: "3 pcs", veg: true },
  "hummus": { protein: 8, cal: 180, serving: "4 tbsp", veg: true },
  "grilled sandwich": { protein: 12, cal: 350, serving: "1 pc", veg: true },
  "grilled cheese sandwich": { protein: 12, cal: 350, serving: "1 pc", veg: true },
  "paneer sandwich": { protein: 14, cal: 320, serving: "1 pc", veg: true },
  "veg sandwich": { protein: 7, cal: 220, serving: "1 pc", veg: true },
  "sandwich": { protein: 8, cal: 280, serving: "1 pc (veg)", veg: true },
  "pb sandwich": { protein: 12, cal: 350, serving: "1 pc (2 tbsp PB)", veg: true },
  "peanut butter sandwich": { protein: 12, cal: 350, serving: "1 pc (2 tbsp PB)", veg: true },
  "greek salad paneer": { protein: 15, cal: 280, serving: "1 bowl", veg: true },
  "burrito bowl": { protein: 14, cal: 400, serving: "1 bowl (rajma)", veg: true },
  "pasta alfredo": { protein: 16, cal: 480, serving: "1 plate (paneer)", veg: true },
  "paneer pizza": { protein: 10, cal: 280, serving: "1 slice", veg: true },
  "pizza": { protein: 10, cal: 280, serving: "1 slice", veg: true },
  "pasta": { protein: 8, cal: 350, serving: "1 plate", veg: true },
  "maggi": { protein: 5, cal: 310, serving: "1 pack", veg: true },
  "noodles": { protein: 5, cal: 300, serving: "1 plate", veg: true },
  "burger": { protein: 12, cal: 400, serving: "1 pc (veg)", veg: true },
  "wrap": { protein: 14, cal: 380, serving: "1 pc (paneer)", veg: true },
  "momos": { protein: 8, cal: 200, serving: "6 pcs (veg)", veg: true },
  "veg momos": { protein: 8, cal: 200, serving: "6 pcs", veg: true },

  // === SNACKS ===
  "samosa": { protein: 3, cal: 250, serving: "1 pc", veg: true },
  "dhokla": { protein: 7, cal: 160, serving: "4 pcs", veg: true },
  "chana chaat": { protein: 10, cal: 200, serving: "1 bowl", veg: true },
  "thepla": { protein: 5, cal: 200, serving: "2 pcs", veg: true },
  "makhana": { protein: 5, cal: 100, serving: "1 bowl", veg: true },
  "fox nuts": { protein: 5, cal: 100, serving: "1 bowl", veg: true },

  // === NON-VEG ===
  "egg": { protein: 6, cal: 70, serving: "1 boiled", veg: false },
  "anda": { protein: 6, cal: 70, serving: "1 boiled", veg: false },
  "boiled egg": { protein: 6, cal: 70, serving: "1 pc", veg: false },
  "omelette": { protein: 12, cal: 180, serving: "2 eggs", veg: false },
  "egg bhurji": { protein: 14, cal: 200, serving: "2 eggs", veg: false },
  "anda bhurji": { protein: 14, cal: 200, serving: "2 eggs", veg: false },
  "egg curry": { protein: 14, cal: 250, serving: "2 eggs", veg: false },
  "chicken breast": { protein: 31, cal: 165, serving: "100g", veg: false },
  "chicken": { protein: 25, cal: 260, serving: "100g (avg)", veg: false },
  "chicken curry": { protein: 22, cal: 300, serving: "1 bowl", veg: false },
  "chicken tikka": { protein: 24, cal: 240, serving: "6 pcs", veg: false },
  "tandoori chicken": { protein: 25, cal: 260, serving: "2 pcs", veg: false },
  "butter chicken": { protein: 20, cal: 400, serving: "1 bowl", veg: false },
  "chicken biryani": { protein: 22, cal: 500, serving: "1 plate", veg: false },
  "biryani": { protein: 22, cal: 500, serving: "1 plate (chicken)", veg: false },
  "fish": { protein: 20, cal: 200, serving: "1 fillet (100g)", veg: false },
  "fish fry": { protein: 20, cal: 230, serving: "1 pc", veg: false },
  "fish curry": { protein: 18, cal: 250, serving: "1 bowl", veg: false },
  "prawns": { protein: 20, cal: 100, serving: "100g", veg: false },
  "jhinga": { protein: 20, cal: 100, serving: "100g", veg: false },
  "mutton": { protein: 25, cal: 400, serving: "1 bowl curry", veg: false },
  "mutton curry": { protein: 25, cal: 400, serving: "1 bowl", veg: false },
  "keema": { protein: 22, cal: 350, serving: "1 bowl", veg: false },
  "chicken momos": { protein: 12, cal: 250, serving: "6 pcs", veg: false },
  "chicken sandwich": { protein: 20, cal: 380, serving: "1 pc", veg: false },
  "chicken wrap": { protein: 22, cal: 400, serving: "1 wrap", veg: false },
  "chicken burger": { protein: 20, cal: 450, serving: "1 pc", veg: false },
  "shawarma": { protein: 22, cal: 420, serving: "1 roll (chicken)", veg: false },
  "chicken shawarma": { protein: 22, cal: 420, serving: "1 roll", veg: false },
};

// ============ MYTHS ============
const MYTHS = [
  { myth: "Protein sirf gym walon ke liye hai", truth: "GALAT! Protein sabke liye hai — bachche, adults, seniors. Gym na jaao toh bhi daily protein chahiye!", emoji: "🏋️" },
  { myth: "Zyada protein se kidney kharab hoti hai", truth: "Healthy logo ke liye GALAT. Normal intake (1g/kg) se koi problem nahi. Ye myth extreme bodybuilding se aayi hai.", emoji: "🫘" },
  { myth: "Plant protein kamzor hai", truth: "GALAT! Soy protein almost as good as whey. Dal + chawal = complete protein. India vegetarian hai aur healthy hai!", emoji: "🌱" },
  { myth: "Protein powder harmful hai", truth: "Quality powder safe hai — sirf concentrated doodh protein hai. FSSAI certified check karo!", emoji: "💪" },
  { myth: "Dal mein bahut protein hota hai", truth: "Partially GALAT. Cooked bowl mein sirf 7-8g. Paneer (14g) aur chana (10g) better hain!", emoji: "🥣" },
  { myth: "Protein se weight badhta hai", truth: "GALAT! Protein se muscle badhta hai, fat nahi. High protein = naturally kam khaate ho!", emoji: "⚖️" },
  { myth: "Non-veg waale hi strong hote hain", truth: "GALAT! Paneer, soya, dal, chana — complete protein sources. Variety khaao, strong bano!", emoji: "🇮🇳" },
  { myth: "Protein se body builder ban jaate hain", truth: "GALAT! Muscles ke liye protein + heavy training + years chahiye. Normal protein = healthy body, not bodybuilder!", emoji: "😄" },
  { myth: "Bachche ko protein supplement do", truth: "Normal khaane se enough hota hai. Doodh, dahi, paneer, dal roz do. Supplements sirf doctor ki salah pe!", emoji: "👧" },
  { myth: "Protein ka koi time hota hai", truth: "Best approach: har meal mein thoda thoda. Body ek baar mein limited absorb karti hai!", emoji: "⏰" },
];

// ============ PARENT TIPS ============
const PARENT_TIPS = [
  `👴 <b>Haddiyan aur Protein</b>\n\nHaddi ka 50% structure PROTEIN se banta hai. Sirf calcium nahi, protein bhi chahiye!\n\n50+ mein har saal 1-2% muscle kam hoti hai. Zyada protein se ye slow hota hai.\n\n<b>Bolein:</b> "Doctor kehte hain 50+ mein extra protein chahiye. Roz ek bowl dahi aur paneer zaroor khao." 🙏`,
  `💤 <b>Din bhar thakaan?</b>\n\nKam protein = kam energy, kamzori\n\n<b>Simple test:</b> 1 hafte besan chilla nashte mein khilao. Energy level dekho!\n\n<b>Bolein:</b> "Mummy try karo ek hafte — besan chilla subah. Farak zaroor dikhega!" ✨`,
  `💇 <b>Baal jhad rahe hain?</b>\n\nBaal = 95% protein (keratin)\nKam protein = weak hair, dull skin\n\n<b>Bolein:</b> "Baalon ke liye bahar ka serum nahi, andar se protein chahiye. Roz dahi + paneer khao!" 💅`,
  `🍬 <b>Chai ke saath kya?</b>\n\nBiscuit = 1g protein, 80cal (mostly sugar!)\nMakhana = 5g protein, 100cal\n\n<b>Karo ye:</b> Biscuit ka dabba hatao, roasted makhana rakh do. Slowly habit change hogi! 🫙`,
  `🛡️ <b>Immunity aur Protein</b>\n\nAntibodies = protein se bante hain!\nKam protein = weak immunity\n\n<b>Bolein:</b> "Papa, haldi doodh se bhi zyada zaruri hai roz 60g protein. Doodh + dahi + dal + paneer — immunity ka asli formula!" 🙏`,
  `👨‍⚕️ <b>ICMR kya kehta hai?</b>\n\nAdult women: 55g/day\nAdult men: 60g/day\nSeniors (60+): 65-70g/day\n\nMost Indians sirf 40g kha rahe hain — 30% kam!\n\n<b>Bolein:</b> "Ye government ka data hai — 70% Indians mein protein ki kami hai. Hum check karein?" 📊`,
  `🌅 <b>Ek chhota sa change</b>\n\nParents ka nashta: Chai + biscuit = 2g protein ❌\nBetter: Chai + besan chilla = 7g protein ✅\n\n<b>Trick:</b> Lecture mat do, bana ke de do! Taste accha laga toh habit ban jaayegi 🍳`,
  `🦵 <b>Ghutne dard?</b>\n\nKamzor muscles = joints pe zyada load = dard\nStrong muscles = kam pressure = kam dard\n\n<b>Bolein:</b> "Doctor ne bola ghutne ke liye sirf calcium nahi, protein bhi chahiye. Please roz paneer ya dahi khao!" 🙏`,
];

const QUICK_TIPS = [
  "🥛 Raat ko doodh ki jagah dahi khao — same protein, better digestion!",
  "🫘 Aloo ki jagah chana daalo kisi bhi sabzi mein — 3x protein!",
  "🥜 Chai ke saath biscuit nahi, makhana ya roasted chana khao!",
  "🧀 Paneer crumble karo, cubes mat — zyada lagta hai, kam mein kaam!",
  "🥤 Sattu + nimbu + namak = ₹5 ka protein shake!",
  "🌱 Sprouts bhigona free hai. Raat ko bhigo, kal protein ready!",
  "🥣 Dal mein chana dal mila do — taste same, protein 40% zyada!",
  "🍳 Nashte mein 2 ande ya besan chilla — din ka 20% target done!",
  "🥛 Amul Protein Milk = ₹30 mein 20g protein. Best value!",
  "🫓 Wheat roti (3g) → Multigrain (5g) → Protein atta (6g). Upgrade!",
  "📊 Jo measure hota hai wo improve hota hai. Aaj protein count karo!",
  "💧 Zyada protein = zyada paani. Har 20g ke saath 1 extra glass!",
  "🥗 Restaurant mein paneer tikka order karo, butter masala nahi!",
  "🍌 PB + banana + milk = 16g protein smoothie. 3 min!",
  "🏷️ Label padho — 'per serving' dekho, 'per 100g' nahi!",
  "😴 Raat ko protein khaao — muscles neend mein repair hoti hain!",
  "🥣 Khichdi = complete protein. India ka superfood!",
  "⚖️ Weight loss? Protein badhao! High protein = naturally kam khaate ho!",
  "🧠 PB: 8g protein, 190cal. Chicken breast: 31g, 165cal. Ratio matters!",
  "🛒 Monthly ₹500-700 extra mein family ka protein 30-40% badh sakta hai!",
];

// ============ HANDLERS ============
async function handleStart(chatId, from) {
  const name = from.first_name || "Friend";
  await upsertSubscriber(chatId.toString(), { chatId: chatId.toString(), name, startDate: new Date().toISOString().slice(0, 10), dayNumber: 0, active: true, joinedAt: new Date().toISOString() });
  await sendWithButtons(chatId, `🙏 <b>Namaste ${name}!</b>\n\nWelcome to <b>Protein Ka Chakkar</b> 💪\n\nHar subah ek protein tip — desi recipes, facts, smart swaps.\n\n<b>Try these commands:</b>\n🍳 /recipes — 100 desi protein recipes\n🏷️ /products — Indian protein products guide\n💡 /tip — Random protein hack\n🔍 /ask paneer — Protein in any food\n🧠 /myth — Bust a myth\n👨‍👩‍👧 /parenttip — Convince parents\n📊 /log — Open tracker\n📅 /today — Today's tip\n\n<b>3 daily nudges:</b>\n🌅 8 AM — Daily protein tip\n☀️ 1 PM — Midday hack/quiz\n🌙 8 PM — Log your protein\n\nKal subah se shuru! 🌅`, [
    [{ text: "👥 Join Community", url: TG_GROUP }],
    [{ text: "📱 Protein Tracker", url: TRACKER_URL }],
  ]);
}

async function handleHelp(chatId) {
  await sendMessage(chatId, `📋 <b>All Commands:</b>\n\n<b>Daily Course:</b>\n/today — Today's tip\n/day 15 — Specific day\n/progress — Your progress\n\n<b>Recipes & Tips:</b>\n/recipes — 100 protein recipes\n/recipe 1 — Full recipe\n/tip — Random hack\n/parenttip — Tips for parents\n\n<b>Products & Lookup:</b>\n/products — Indian protein products guide\n/products milk — Protein milks\n/products bar — Protein bars\n/ask paneer — Protein check\n/ask maggi — Any food lookup\n\n<b>Learn:</b>\n/myth — Bust a myth\n\n<b>Track & Share:</b>\n/log — Open tracker\n/share — Share with family\n/stop — Unsubscribe\n\n💬 Community: ${TG_GROUP}`);
}

async function handleRecipes(chatId, page) {
  const cats = [
    { label: "🌅 BREAKFAST", id: "breakfast" },
    { label: "☀️ LUNCH", id: "lunch" },
    { label: "🌙 DINNER", id: "dinner" },
    { label: "🥤 DRINKS & SHAKES", id: "drinks" },
    { label: "🍿 SNACKS", id: "snacks" },
    { label: "🌍 GLOBAL & FUSION", id: "global" },
  ];

  // If page specified, show that category
  if (page && page !== "all") {
    const cat = cats.find(c => c.id === page);
    if (!cat) { await sendMessage(chatId, `Category nahi mila. Try: /recipes breakfast, /recipes lunch, /recipes dinner, /recipes drinks, /recipes snacks, /recipes global`); return; }
    const items = RECIPES.filter(r => r.cat === page);
    let text = `${cat.label} — ${items.length} recipes\n\n`;
    items.forEach((r, i) => {
      const idx = RECIPES.indexOf(r) + 1;
      text += `${idx}. ${r.emoji} <b>${r.name}</b> — ${r.protein}g (${r.time})\n`;
    });
    text += `\n👇 Full recipe: /recipe [number]`;
    await sendMessage(chatId, text);
    return;
  }

  // Show overview
  let text = `🍳 <b>100 Protein Recipes!</b>\n`;
  for (const cat of cats) {
    const items = RECIPES.filter(r => r.cat === cat.id);
    text += `\n<b>${cat.label}</b> (${items.length} recipes)\n`;
    items.slice(0, 3).forEach(r => {
      const idx = RECIPES.indexOf(r) + 1;
      text += `  ${idx}. ${r.emoji} ${r.name} — ${r.protein}g\n`;
    });
    if (items.length > 3) text += `  ... aur ${items.length - 3} more → /recipes ${cat.id}\n`;
  }
  text += `\n<b>Total: ${RECIPES.length} recipes!</b>\n\n👇 Full recipe: /recipe [number]\n📂 Category: /recipes breakfast`;
  await sendMessage(chatId, text);
}

async function handleRecipeDetail(chatId, num) {
  const i = parseInt(num) - 1;
  if (isNaN(i) || i < 0 || i >= RECIPES.length) { await sendMessage(chatId, `Recipe 1 se ${RECIPES.length} likho. Example: /recipe 1`); return; }
  await sendMessage(chatId, RECIPES[i].recipe);
}

async function handleTip(chatId) {
  await sendMessage(chatId, `💡 <b>Quick Tip</b>\n\n${QUICK_TIPS[Math.floor(Math.random() * QUICK_TIPS.length)]}\n\nEk aur? /tip 🔄`);
}

async function handleAsk(chatId, query) {
  if (!query || !query.trim()) { await sendMessage(chatId, `🔍 Kisi bhi food ka protein check karo:\n\n/ask paneer\n/ask chicken breast\n/ask maggi\n/ask dal\n/ask peanut butter`); return; }
  const q = query.toLowerCase().trim();
  let match = PROTEIN_DB[q], matchName = q;
  if (!match) { for (const [n, d] of Object.entries(PROTEIN_DB)) { if (n.includes(q) || q.includes(n)) { match = d; matchName = n; break; } } }
  if (match) {
    const veg = match.veg ? "🟢 Veg" : "🔴 Non-Veg";
    const ratio = Math.round(match.cal / match.protein);
    const eff = ratio <= 10 ? "✅ Excellent!" : ratio <= 20 ? "👍 Good" : "⚠️ High cal — use wisely";
    await sendMessage(chatId, `🔍 <b>${matchName.charAt(0).toUpperCase() + matchName.slice(1)}</b>\n\n💪 Protein: <b>${match.protein}g</b>\n🔥 Calories: <b>${match.cal}</b>\n📏 Serving: ${match.serving}\n${veg}\n\n📊 ${ratio} cal/g protein — ${eff}\n\nKuch aur? /ask [food]`);
  } else {
    await sendMessage(chatId, `🤔 "${query}" nahi mila.\n\nTry: /ask paneer, /ask dal, /ask chicken, /ask maggi\n\nYa community mein poochho: ${TG_GROUP}`);
  }
}

async function handleMyth(chatId) {
  const m = MYTHS[Math.floor(Math.random() * MYTHS.length)];
  await sendMessage(chatId, `${m.emoji} <b>MYTH BUSTER!</b>\n\n❌ "${m.myth}"\n\n✅ ${m.truth}\n\nEk aur? /myth 🧠`);
}

async function handleParentTip(chatId) {
  const t = PARENT_TIPS[Math.floor(Math.random() * PARENT_TIPS.length)];
  await sendMessage(chatId, `${t}\n\n👨‍👩‍👧 Aur tips? /parenttip\n📤 Forward this to parents!`);
}

// === /products ===
async function handleProducts(chatId, subcat) {
  const cats = PRODUCTS.categories;
  const items = PRODUCTS.items;

  if (subcat && subcat !== "all") {
    const cat = cats.find(c => c.id === subcat);
    if (!cat) {
      const catList = cats.map(c => `/products ${c.id}`).join("\n");
      await sendMessage(chatId, `Category nahi mila. Try:\n\n${catList}`);
      return;
    }
    const catItems = items.filter(i => i.cat === subcat);
    let text = `${cat.emoji} <b>${cat.label}</b>\n\n`;
    catItems.forEach((p, i) => {
      const pricePerG = p.price ? `₹${(p.price / p.protein).toFixed(1)}/g` : "—";
      text += `<b>${i+1}. ${p.brand} — ${p.name}</b>\n`;
      text += `   💪 ${p.protein}g protein | 🔥 ${p.cal} cal | 💰 ₹${p.price || "?"}\n`;
      text += `   📏 ${p.serving} | ${p.rating}\n`;
      text += `   📊 Cost: ${pricePerG} protein\n`;
      text += `   💬 ${p.verdict}\n\n`;
    });
    await sendMessage(chatId, text);
    return;
  }

  // Overview
  let text = `🏷️ <b>Indian Protein Products Guide</b>\n\n`;
  text += `Real brands, real products, honest reviews.\n\n`;
  for (const cat of cats) {
    const catItems = items.filter(i => i.cat === cat.id);
    const best = catItems.reduce((a, b) => (a.rating >= b.rating ? a : b), catItems[0]);
    text += `${cat.emoji} <b>${cat.label}</b> (${catItems.length} products)\n`;
    text += `   Top pick: ${best.brand} ${best.name}\n`;
    text += `   → /products ${cat.id}\n\n`;
  }
  text += `<b>Total: ${items.length} products reviewed!</b>\n\n`;
  text += `💡 Tip: /products milk — see all protein milk options\n`;
  text += `🔍 /ask [brand name] — quick protein lookup`;
  await sendMessage(chatId, text);
}

async function handleLog(chatId) {
  await sendWithButtons(chatId, `📊 <b>Protein Tracker</b>\n\nDaily protein track karo — 80+ Indian foods, calories, veg/non-veg filter.\n\nTap to open 👇`, [
    [{ text: "📱 Open Tracker", url: TRACKER_URL }],
    [{ text: "👥 Community", url: TG_GROUP }],
  ]);
}

async function handleToday(chatId) {
  const sub = await getSubscriber(chatId.toString());
  if (!sub) { await sendMessage(chatId, "Pehle /start karo! 🙏"); return; }
  const day = sub.dayNumber || 1;
  const msg = MESSAGES.find(m => m.day === day);
  if (!msg) { await sendMessage(chatId, `90 din complete! 🎓 Community: ${TG_GROUP}`); return; }
  await sendMessage(chatId, `📅 <b>Day ${msg.day}/90 — ${msg.title}</b>\n\n${msg.msg}`);
}

async function handleDay(chatId, n) {
  const num = parseInt(n);
  if (!num || num < 1 || num > 90) { await sendMessage(chatId, "/day 1 se /day 90 tak. Example: /day 15"); return; }
  const msg = MESSAGES.find(m => m.day === num);
  if (!msg) { await sendMessage(chatId, "Not available."); return; }
  await sendMessage(chatId, `📅 <b>Day ${msg.day}/90 — ${msg.title}</b>\n\n${msg.msg}`);
}

async function handleProgress(chatId) {
  const sub = await getSubscriber(chatId.toString());
  if (!sub) { await sendMessage(chatId, "Pehle /start karo! 🙏"); return; }
  const d = sub.dayNumber || 0, pct = Math.round((d / 90) * 100);
  const bar = "█".repeat(Math.floor(pct / 5)) + "░".repeat(20 - Math.floor(pct / 5));
  await sendMessage(chatId, `📊 <b>${sub.name} ka Progress</b>\n\n<b>${d}/90</b> [${bar}] ${pct}%\n\n${d === 0 ? "Kal se shuru! 🌅" : d >= 90 ? "🎓 COMPLETE! Mogambo khush hua! 🏆" : "Next: Kal 8 AM ⏰"}\n\n📱 ${TRACKER_URL}`);
}

async function handleStop(chatId) {
  await upsertSubscriber(chatId.toString(), { active: false });
  await sendMessage(chatId, `😢 Miss karenge! Wapas aana ho → /start\n\n${TG_GROUP} 🙏`);
}

async function handleShare(chatId) {
  await sendWithButtons(chatId, `📤 <b>Share karo!</b>\n\n🤖 Bot: @protein_ka_chakkar_bot\n👥 Community: ${TG_GROUP}\n📱 Tracker: ${TRACKER_URL}`, [
    [{ text: "📤 Share", url: `https://t.me/share/url?url=https://t.me/protein_ka_chakkar_bot&text=Roz%20ek%20protein%20tip!%20Recipes,%20myths,%20parent%20tips.%20Free!%20💪🇮🇳` }],
    [{ text: "👥 Community", url: TG_GROUP }],
  ]);
}

// ============ WEBHOOK ============
async function handleWebhook(body) {
  if (body.message) {
    const msg = body.message, chatId = msg.chat.id, text = (msg.text || "").trim(), from = msg.from || {};
    if (text === "/start") return handleStart(chatId, from);
    if (text === "/help") return handleHelp(chatId);
    if (text === "/today") return handleToday(chatId);
    if (text === "/progress") return handleProgress(chatId);
    if (text === "/stop") return handleStop(chatId);
    if (text === "/share") return handleShare(chatId);
    if (text === "/recipes" || text.startsWith("/recipes ")) return handleRecipes(chatId, text.split(" ")[1] || null);
    if (text === "/products" || text.startsWith("/products ")) return handleProducts(chatId, text.split(" ")[1] || null);
    if (text === "/tip") return handleTip(chatId);
    if (text === "/myth") return handleMyth(chatId);
    if (text === "/parenttip") return handleParentTip(chatId);
    if (text === "/log") return handleLog(chatId);
    if (text.startsWith("/recipe ")) return handleRecipeDetail(chatId, text.split(" ")[1]);
    if (text.startsWith("/day")) return handleDay(chatId, text.split(" ")[1]);
    if (text.startsWith("/ask")) return handleAsk(chatId, text.slice(4).trim());
    // Natural language food lookup
    if (text.length > 1 && !text.startsWith("/")) {
      const q = text.toLowerCase();
      if (Object.keys(PROTEIN_DB).find(k => k.includes(q) || q.includes(k))) return handleAsk(chatId, text);
    }
    await sendMessage(chatId, `🙏 Try:\n🍳 /recipes\n🏷️ /products\n💡 /tip\n🔍 /ask [food]\n🧠 /myth\n👨‍👩‍👧 /parenttip\n📊 /log\n📅 /today\n\n/help for all 💪`);
  }
  if (body.callback_query) {
    await fetch(`${API}/answerCallbackQuery`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ callback_query_id: body.callback_query.id }) });
  }
}

// ============ EVENING NUDGE MESSAGES ============
const EVENING_NUDGES = [
  `🌙 <b>Din khatam ho raha hai!</b>\n\nAaj kitna protein khaaya? Track karo!\n\n📱 https://protein-tracker-one.vercel.app\n\nLog karo before you forget! 📊`,
  `🌙 <b>Raat ka protein check!</b>\n\nAaj ka target hit hua?\n\nQuick count karo:\nNashta: ___g\nLunch: ___g\nSnack: ___g\nDinner: ___g\n\n📱 Track karo: https://protein-tracker-one.vercel.app 🎯`,
  `🌙 <b>Protein log time!</b>\n\nDin bhar kya khaaya? Yaad karo aur log karo.\n\n2 min lagenge, lekin data se improvement aata hai!\n\n📱 https://protein-tracker-one.vercel.app\n\nJo measure hota hai wo improve hota hai! 📊`,
  `🌙 <b>End of day reminder!</b>\n\nAgar aaj protein kam khaaya, koi baat nahi.\nKal se phir try karo! 💪\n\nLekin pehle LOG karo aaj ka:\n📱 https://protein-tracker-one.vercel.app\n\nHonesty = progress! ✅`,
  `🌙 <b>Quick audit!</b>\n\nAaj ye khaaya?\n✅ Nashte mein protein?\n✅ Lunch mein dal/paneer/chana?\n✅ Snack mein kuch healthy?\n✅ Dinner mein dahi/dal?\n\n4/4 = Champion! 🏆\n3/4 = Great! 👍\n2/4 = Improving! 💪\n1/4 = Kal better hoga! 🌅\n\nTrack karo: https://protein-tracker-one.vercel.app`,
  `🌙 <b>Protein diary!</b>\n\nAaj ka best protein moment kya tha?\n\n🍳 Accha nashta?\n🥣 Power lunch?\n🥗 Smart snack?\n🧀 Protein-rich dinner?\n\nLog karo, celebrate karo! \n📱 https://protein-tracker-one.vercel.app 🎉`,
  `🌙 <b>Sone se pehle!</b>\n\nAaj log karo, kal plan karo.\n\n📊 Track today: https://protein-tracker-one.vercel.app\n\nKal ka plan:\n🌅 Nashta: ?\n☀️ Lunch: ?\n🍿 Snack: ?\n🌙 Dinner: ?\n\nPlanning = winning! 🧠`,
];

// ============ CRON: MORNING (8 AM IST) — Daily 90-day tip ============
async function sendDailyMessages() {
  const subs = await getSubscribers();
  let sent = 0, err = 0;
  for (const [chatId, sub] of Object.entries(subs)) {
    if (!sub.active) continue;
    const next = (sub.dayNumber || 0) + 1;
    if (next > 90) continue;
    const msg = MESSAGES.find(m => m.day === next);
    if (!msg) continue;
    try {
      await sendMessage(chatId, `📅 <b>Day ${msg.day}/90 — ${msg.title}</b>\n\n${msg.msg}`);
      sub.dayNumber = next; sent++;
      await new Promise(r => setTimeout(r, 100));
    } catch (e) { err++; }
  }
  await saveSubscribers(subs);
  return { sent, errors: err, total: Object.keys(subs).length };
}

// ============ CRON: MIDDAY (1 PM IST) — Tip/parent tip/quiz/hack ============
async function sendMiddayNudge() {
  const subs = await getSubscribers();
  // Pick a nudge based on day of year so it cycles through all 120 without repeating
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const nudge = MIDDAY_NUDGES[dayOfYear % MIDDAY_NUDGES.length];

  let sent = 0, err = 0;
  for (const [chatId, sub] of Object.entries(subs)) {
    if (!sub.active) continue;
    try {
      await sendMessage(chatId, nudge.msg);
      sent++;
      await new Promise(r => setTimeout(r, 100));
    } catch (e) { err++; }
  }
  return { sent, errors: err, nudgeId: nudge.id, cat: nudge.cat };
}

// ============ CRON: EVENING (8 PM IST) — Log protein reminder ============
async function sendEveningNudge() {
  const subs = await getSubscribers();
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const nudge = EVENING_NUDGES[dayOfYear % EVENING_NUDGES.length];

  let sent = 0, err = 0;
  for (const [chatId, sub] of Object.entries(subs)) {
    if (!sub.active) continue;
    try {
      await sendWithButtons(chatId, nudge, [
        [{ text: "📱 Log Protein Now", url: TRACKER_URL }],
        [{ text: "👥 Community", url: TG_GROUP }],
      ]);
      sent++;
      await new Promise(r => setTimeout(r, 100));
    } catch (e) { err++; }
  }
  return { sent, errors: err };
}

// ============ EXPORTS ============
module.exports.webhook = async (req, res) => {
  if (req.method !== "POST") return res.status(200).json({ ok: true });
  try { await handleWebhook(req.body); } catch (e) { console.error(e); }
  res.status(200).json({ ok: true });
};

module.exports.cronMorning = async (req, res) => {
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).end();
  try { const r = await sendDailyMessages(); res.status(200).json({ ok: true, type: "morning", ...r }); } catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports.cronMidday = async (req, res) => {
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).end();
  try { const r = await sendMiddayNudge(); res.status(200).json({ ok: true, type: "midday", ...r }); } catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports.cronEvening = async (req, res) => {
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).end();
  try { const r = await sendEveningNudge(); res.status(200).json({ ok: true, type: "evening", ...r }); } catch (e) { res.status(500).json({ error: e.message }); }
};

module.exports.setup = async (req, res) => {
  const url = `https://${req.headers.host}/api/bot`;
  const r = await fetch(`${API}/setWebhook`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url, allowed_updates: ["message", "callback_query"] }) });
  res.status(200).json({ ok: true, webhook: url, telegram: await r.json() });
};
