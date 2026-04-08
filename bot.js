// Protein Ka Chakkar — Telegram Bot v2
const MESSAGES = require("./messages");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const TG_GROUP = "https://t.me/protein_hi_protein";
const TRACKER_URL = "https://protein-tracker.vercel.app";

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
  "paneer": { protein: 14, cal: 265, serving: "100g (~8 cubes)", veg: true },
  "paneer bhurji": { protein: 18, cal: 320, serving: "1 plate (~120g)", veg: true },
  "dahi": { protein: 8, cal: 120, serving: "1 bowl (200g)", veg: true },
  "curd": { protein: 8, cal: 120, serving: "1 bowl (200g)", veg: true },
  "milk": { protein: 8, cal: 150, serving: "1 glass (250ml)", veg: true },
  "doodh": { protein: 8, cal: 150, serving: "1 glass (250ml)", veg: true },
  "chana": { protein: 10, cal: 180, serving: "1 bowl cooked", veg: true },
  "chole": { protein: 10, cal: 180, serving: "1 bowl cooked", veg: true },
  "rajma": { protein: 9, cal: 170, serving: "1 bowl cooked", veg: true },
  "moong dal": { protein: 7, cal: 120, serving: "1 bowl cooked", veg: true },
  "toor dal": { protein: 7, cal: 130, serving: "1 bowl cooked", veg: true },
  "masoor dal": { protein: 7, cal: 115, serving: "1 bowl cooked", veg: true },
  "urad dal": { protein: 8, cal: 140, serving: "1 bowl cooked", veg: true },
  "dal": { protein: 7, cal: 125, serving: "1 bowl cooked (avg)", veg: true },
  "dal makhani": { protein: 8, cal: 220, serving: "1 bowl cooked", veg: true },
  "sprouts": { protein: 9, cal: 100, serving: "1 bowl", veg: true },
  "soy chunks": { protein: 26, cal: 170, serving: "50g dry", veg: true },
  "soya chunks": { protein: 26, cal: 170, serving: "50g dry", veg: true },
  "tofu": { protein: 10, cal: 80, serving: "100g", veg: true },
  "roti": { protein: 3, cal: 100, serving: "1 pc (wheat)", veg: true },
  "chapati": { protein: 3, cal: 100, serving: "1 pc", veg: true },
  "paratha": { protein: 4, cal: 180, serving: "1 pc", veg: true },
  "rice": { protein: 4, cal: 200, serving: "1 bowl", veg: true },
  "idli": { protein: 2, cal: 60, serving: "1 pc", veg: true },
  "dosa": { protein: 5, cal: 170, serving: "1 pc", veg: true },
  "poha": { protein: 5, cal: 250, serving: "1 plate", veg: true },
  "upma": { protein: 5, cal: 230, serving: "1 bowl", veg: true },
  "peanut butter": { protein: 8, cal: 190, serving: "2 tbsp (32g)", veg: true },
  "peanuts": { protein: 7, cal: 170, serving: "30g", veg: true },
  "almonds": { protein: 6, cal: 170, serving: "15 pcs", veg: true },
  "badam": { protein: 6, cal: 170, serving: "15 pcs", veg: true },
  "lassi": { protein: 8, cal: 180, serving: "1 glass", veg: true },
  "chaach": { protein: 5, cal: 60, serving: "1 glass", veg: true },
  "buttermilk": { protein: 5, cal: 60, serving: "1 glass", veg: true },
  "cheese": { protein: 7, cal: 110, serving: "1 slice (25g)", veg: true },
  "oats": { protein: 5, cal: 155, serving: "40g", veg: true },
  "besan chilla": { protein: 10, cal: 200, serving: "2 pcs", veg: true },
  "khichdi": { protein: 10, cal: 250, serving: "1 bowl", veg: true },
  "sattu": { protein: 20, cal: 170, serving: "2 tbsp (40g)", veg: true },
  "makhana": { protein: 5, cal: 100, serving: "1 bowl", veg: true },
  "samosa": { protein: 3, cal: 250, serving: "1 pc", veg: true },
  "quinoa": { protein: 8, cal: 220, serving: "1 bowl cooked", veg: true },
  "hung curd": { protein: 10, cal: 100, serving: "1 bowl", veg: true },
  "greek yogurt": { protein: 15, cal: 130, serving: "1 cup (125g)", veg: true },
  "whey protein": { protein: 24, cal: 120, serving: "1 scoop", veg: true },
  "protein powder": { protein: 24, cal: 120, serving: "1 scoop (~30g)", veg: true },
  "egg": { protein: 6, cal: 70, serving: "1 boiled", veg: false },
  "anda": { protein: 6, cal: 70, serving: "1 boiled", veg: false },
  "omelette": { protein: 12, cal: 180, serving: "2 eggs", veg: false },
  "egg bhurji": { protein: 14, cal: 200, serving: "2 eggs", veg: false },
  "chicken breast": { protein: 31, cal: 165, serving: "100g", veg: false },
  "chicken curry": { protein: 22, cal: 300, serving: "1 bowl", veg: false },
  "chicken tikka": { protein: 24, cal: 240, serving: "6 pcs", veg: false },
  "butter chicken": { protein: 20, cal: 400, serving: "1 bowl", veg: false },
  "tandoori chicken": { protein: 25, cal: 260, serving: "2 pcs", veg: false },
  "fish": { protein: 20, cal: 200, serving: "1 fillet (100g)", veg: false },
  "prawns": { protein: 20, cal: 100, serving: "100g", veg: false },
  "mutton": { protein: 25, cal: 400, serving: "1 bowl curry", veg: false },
  "keema": { protein: 22, cal: 350, serving: "1 bowl", veg: false },
  "biryani": { protein: 22, cal: 500, serving: "1 plate (chicken)", veg: false },
  "amul protein milk": { protein: 20, cal: 160, serving: "1 bottle (250ml)", veg: true },
  "protinex": { protein: 17, cal: 200, serving: "2 scoops + milk", veg: true },
  "yoga bar": { protein: 20, cal: 280, serving: "1 bar", veg: true },
  "epigamia": { protein: 15, cal: 130, serving: "1 cup", veg: true },
  "sandwich": { protein: 8, cal: 280, serving: "1 pc (veg)", veg: true },
  "paneer sandwich": { protein: 14, cal: 320, serving: "1 pc", veg: true },
  "chicken sandwich": { protein: 20, cal: 380, serving: "1 pc", veg: false },
  "burger": { protein: 12, cal: 400, serving: "1 pc (veg)", veg: true },
  "chicken burger": { protein: 20, cal: 450, serving: "1 pc", veg: false },
  "pizza": { protein: 10, cal: 280, serving: "1 slice", veg: true },
  "pasta": { protein: 8, cal: 350, serving: "1 plate", veg: true },
  "maggi": { protein: 5, cal: 310, serving: "1 pack", veg: true },
  "wrap": { protein: 14, cal: 380, serving: "1 pc (paneer)", veg: true },
  "shawarma": { protein: 22, cal: 420, serving: "1 roll (chicken)", veg: false },
  "momos": { protein: 8, cal: 200, serving: "6 pcs (veg)", veg: true },
  "chicken momos": { protein: 12, cal: 250, serving: "6 pcs", veg: false },
  "hummus": { protein: 8, cal: 180, serving: "4 tbsp", veg: true },
  "falafel": { protein: 6, cal: 170, serving: "3 pcs", veg: true },
  "dhokla": { protein: 7, cal: 160, serving: "4 pcs", veg: true },
  "thepla": { protein: 5, cal: 200, serving: "2 pcs", veg: true },
  "roasted chana": { protein: 10, cal: 190, serving: "50g", veg: true },
  "chickpea pasta": { protein: 14, cal: 350, serving: "100g dry", veg: true },
  "lentil pasta": { protein: 13, cal: 340, serving: "100g dry", veg: true },
  "bajra roti": { protein: 4, cal: 120, serving: "1 pc", veg: true },
  "jowar roti": { protein: 4, cal: 110, serving: "1 pc", veg: true },
  "ragi roti": { protein: 3, cal: 105, serving: "1 pc", veg: true },
  "multigrain roti": { protein: 5, cal: 115, serving: "1 pc", veg: true },
};

// ============ RECIPES ============
const RECIPES = [
  { name: "Paneer Bhurji", emoji: "🍳", protein: 18, time: "10 min", recipe: `<b>🍳 Paneer Bhurji — 18g protein</b>\n\n100g paneer crumble karo\nPyaaz, tamatar, hari mirch bhuno\nPaneer daal do, masala mix karo\n5 min mein ready!\n\n<b>2 roti ke saath = 24g protein 💪</b>` },
  { name: "Sattu Shake", emoji: "🥤", protein: 20, time: "2 min", recipe: `<b>🥤 Sattu Shake — 20g protein (₹5!)</b>\n\n2 tbsp sattu + 1 glass paani + nimbu + kala namak + jeera\nMix karo, piyo!\n\n<b>India ka OG protein shake! 🇮🇳</b>` },
  { name: "Moong Dal Chilla", emoji: "🥞", protein: 12, time: "15 min", recipe: `<b>🥞 Moong Dal Chilla — 12g protein</b>\n\nBhigi moong dal grind karo\nPyaaz + mirch + namak mix karo\nTawa pe dosa jaisa banao\n\n<b>2 chille + dahi = 20g protein nashta! 🌅</b>` },
  { name: "Soya Keema", emoji: "🟤", protein: 26, time: "20 min", recipe: `<b>🟤 Soya Keema — 26g protein</b>\n\nSoya chunks ubaal ke squeeze karo\nMixer mein rough grind karo\nPyaaz-tamatar gravy banao\nSoya keema daal ke 5 min bhuno\n\n<b>Pav ya roti ke saath — guests ko pata nahi chalega! 🤫</b>` },
  { name: "Protein Smoothie", emoji: "🍌", protein: 16, time: "3 min", recipe: `<b>🍌 Protein Smoothie — 16g protein</b>\n\n1 glass doodh + 2 tbsp PB + 1 banana + shahad\nMixer mein blend karo — done!\n\n<b>Gym nahi jaate? Koi baat nahi. Sabke liye hai! 💪</b>` },
  { name: "Chana Chaat", emoji: "🥗", protein: 10, time: "5 min", recipe: `<b>🥗 Chana Chaat — 10g protein</b>\n\nBoiled chana + pyaaz + tamatar + dhaniya\nNimbu + chaat masala + hari chutney\nMix karo, khaao!\n\n<b>Samose se 3x better! 🎯</b>` },
  { name: "Besan Chilla", emoji: "🥞", protein: 10, time: "10 min", recipe: `<b>🥞 Besan Chilla — 10g protein</b>\n\nBesan + paani ka batter\nPyaaz + mirch + dhaniya + ajwain\nTawa pe dosa jaisa seko\n\n<b>Nashte ka champion! 🏆</b>` },
  { name: "Sprouts Salad", emoji: "🌱", protein: 9, time: "5 min", recipe: `<b>🌱 Sprouts Salad — 9g protein</b>\n\nSteamed sprouts + kheera + tamatar + pyaaz\nNimbu + chaat masala\n\n<b>Protein cost: ₹3-4. Almost free! 💰</b>` },
  { name: "Rajma Burrito Bowl", emoji: "🥗", protein: 14, time: "15 min", recipe: `<b>🥗 Rajma Burrito Bowl — 14g protein</b>\n\nRice base + garam rajma + shredded cabbage\nDahi + chaat masala + cheese\n\n<b>Rajma chawal ka international avatar! 🌯</b>` },
  { name: "Overnight Oats", emoji: "🥣", protein: 18, time: "5 min prep", recipe: `<b>🥣 Overnight Protein Oats — 18g protein</b>\n\nOats + doodh/dahi + PB + banana + chia seeds\nRaat ko mix karo, fridge mein rakh do\nSubah seedha khaao!\n\n<b>Zero cooking, 2 min morning! ⚡</b>` },
];

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
  await sendWithButtons(chatId, `🙏 <b>Namaste ${name}!</b>\n\nWelcome to <b>Protein Ka Chakkar</b> 💪\n\nHar subah ek protein tip — desi recipes, facts, smart swaps.\n\n<b>Try these commands:</b>\n🍳 /recipes — Desi protein recipes\n💡 /tip — Random protein hack\n🔍 /ask paneer — Protein in any food\n🧠 /myth — Bust a myth\n👨‍👩‍👧 /parenttip — Convince parents\n📊 /log — Open tracker\n📅 /today — Today's tip\n\nKal subah se daily tips shuru! 🌅`, [
    [{ text: "👥 Join Community", url: TG_GROUP }],
    [{ text: "📱 Protein Tracker", url: TRACKER_URL }],
  ]);
}

async function handleHelp(chatId) {
  await sendMessage(chatId, `📋 <b>All Commands:</b>\n\n<b>Daily Course:</b>\n/today — Today's tip\n/day 15 — Specific day\n/progress — Your progress\n\n<b>Recipes & Tips:</b>\n/recipes — Recipe list\n/recipe 1 — Full recipe\n/tip — Random hack\n/parenttip — Tips for parents\n\n<b>Lookup:</b>\n/ask paneer — Protein check\n/ask chicken breast\n/ask maggi\n\n<b>Learn:</b>\n/myth — Bust a myth\n\n<b>Track & Share:</b>\n/log — Open tracker\n/share — Share with family\n/stop — Unsubscribe\n\n💬 Community: ${TG_GROUP}`);
}

async function handleRecipes(chatId) {
  const list = RECIPES.map((r, i) => `${i + 1}. ${r.emoji} <b>${r.name}</b> — ${r.protein}g (${r.time})`).join("\n");
  await sendMessage(chatId, `🍳 <b>Protein Recipes</b>\n\n${list}\n\n👇 Recipe dekhni hai? /recipe [number]\nExample: /recipe 1`);
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
    if (text === "/recipes") return handleRecipes(chatId);
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
    await sendMessage(chatId, `🙏 Try:\n🍳 /recipes\n💡 /tip\n🔍 /ask [food]\n🧠 /myth\n👨‍👩‍👧 /parenttip\n📊 /log\n📅 /today\n\n/help for all 💪`);
  }
  if (body.callback_query) {
    await fetch(`${API}/answerCallbackQuery`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ callback_query_id: body.callback_query.id }) });
  }
}

// ============ CRON ============
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

// ============ EXPORTS ============
module.exports.webhook = async (req, res) => {
  if (req.method !== "POST") return res.status(200).json({ ok: true });
  try { await handleWebhook(req.body); } catch (e) { console.error(e); }
  res.status(200).json({ ok: true });
};
module.exports.cron = async (req, res) => {
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).end();
  try { const r = await sendDailyMessages(); res.status(200).json({ ok: true, ...r }); } catch (e) { res.status(500).json({ error: e.message }); }
};
module.exports.setup = async (req, res) => {
  const url = `https://${req.headers.host}/api/bot`;
  const r = await fetch(`${API}/setWebhook`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url, allowed_updates: ["message", "callback_query"] }) });
  res.status(200).json({ ok: true, webhook: url, telegram: await r.json() });
};
