// 90 days of daily protein tips for Indian families
// Tone: warm aunty/uncle vibe, not preachy. Hinglish. Practical.
// Each message has: day number, title, message text, category

const MESSAGES = [
  // ===== WEEK 1: BASICS - "Protein kya hai?" =====
  { day: 1, title: "Welcome!", cat: "intro", msg: `🙏 Namaste! Aaj se aapka protein ka safar shuru hota hai.

Ek simple rule: Aapka weight kitna hai kg mein — utne gram protein roz chahiye.

70kg = 70g protein. Bas itna yaad rakhiye! 💪` },

  { day: 2, title: "Dal mein kitna protein?", cat: "fact", msg: `🥣 Kya aap jaante hain?

1 bowl cooked dal = sirf 7-8g protein
Lekin 1 bowl chane = 10g protein!

Aaj agar dal bana rahe hain toh usmein thoda chana dal bhi milaa dijiye. Taste bhi badhega, protein bhi! 🫘` },

  { day: 3, title: "Dahi ka kamaal", cat: "tip", msg: `🥛 Aaj ka tip: Raat ko doodh ki jagah ek bowl dahi khayiye.

200g dahi = 8g protein + accha digestion
Ek glass doodh = 7-8g protein lekin zyada calories

Dahi > Doodh for protein! Simple swap ✅` },

  { day: 4, title: "Paneer ke cubes gino", cat: "fact", msg: `🧀 Paneer lovers ke liye:

8 medium cubes paneer (100g) = 14g protein
4 cubes = 7g protein

Aaj sabzi mein 4 extra cubes daal dijiye. Bas itna kaafi hai! Chota sa change, bada sa protein boost 🎯` },

  { day: 5, title: "Nashte mein protein", cat: "recipe", msg: `🌅 Subah ka nashta decide karta hai poora din!

❌ Sirf poha/upma = 5g protein
✅ Besan chilla + dahi = 18g protein!

Besan chilla banana aasan hai:
Besan + paani + namak + pyaaz + hari mirch
Tawa pe dosa jaisa bana lo. 2 chille = 10g protein 🥞` },

  { day: 6, title: "Soya chunks — sasta protein", cat: "tip", msg: `🟤 Soya chunks ko 'vegetarian chicken' kehte hain!

50g dry soya chunks = 26g protein
Price? Sirf ₹8-10

Ise paani mein ubaal ke, squeeze karke, kisi bhi sabzi mein daal do. Rajma, chole, biryani — sab mein chalega! Budget protein king 👑` },

  { day: 7, title: "Week 1 done!", cat: "motivation", msg: `🎉 Ek hafta ho gaya! Bahut accha!

Ab tak aapne seekha:
✅ Weight = protein target
✅ Dal mein itna protein nahi jitna sochte hain
✅ Dahi > Doodh
✅ Paneer cubes gino
✅ Besan chilla = power breakfast
✅ Soya chunks = sasta protein

Agli week: Easy swaps jo ghar mein koi notice bhi nahi karega 😎` },

  // ===== WEEK 2: EASY SWAPS =====
  { day: 8, title: "Aloo hatao, chana lagao", cat: "tip", msg: `🫘 Sabse aasan protein swap:

Aloo gobi → Chana gobi
Aloo matar → Chole matar
Aloo paratha → Paneer paratha

Same masala, same taste, 3x zyada protein! Aaj try karein? 🎯` },

  { day: 9, title: "Sattu — Bihar ka protein shake", cat: "recipe", msg: `🥤 Bihar ka secret weapon: SATTU!

2 tbsp sattu + 1 glass paani + nimbu + namak + jeera
= 20g protein ka desi protein shake!

Price: ₹5 per glass
Time: 2 minute

Gym waale ₹100 ka shake peete hain, aap ₹5 mein kaam chala lo! 😄` },

  { day: 10, title: "Sprouts — free protein factory", cat: "recipe", msg: `🌱 Ghar pe protein ugao!

Raat ko 1 cup moong bhigo do
Subah paani nikaal ke kapde mein baandh do
24 ghante mein sprouts ready!

1 bowl sprouts = 9g protein
Cost: ₹3-4
Effort: 2 minute

Chaat masala + nimbu = zabardast snack! 🤤` },

  { day: 11, title: "Rajma chawal upgrade", cat: "tip", msg: `🫘 Rajma chawal toh sab khaate hain. Lekin kya aap jaante hain?

1 bowl rajma = 9g protein
1 bowl chawal = 4g protein
= Total: 13g

Ab agar rajma ke saath ek glass chaach bhi piyo = +5g
Aur thoda dahi = +8g

Same meal, 26g protein! Bas sides add karo 🎉` },

  { day: 12, title: "Roti mein variety", cat: "fact", msg: `🫓 Sab roti ek jaisi nahi hoti!

Wheat roti = 3g protein
Bajra roti = 4g protein
Multigrain roti = 5g protein
Protein atta roti = 6g protein

Hafte mein 2-3 din bajra ya multigrain try karein. Taste bhi alag, protein bhi zyada! 👍` },

  { day: 13, title: "Peanut butter sandwich", cat: "recipe", msg: `🥜 Bachche aur bade dono ke liye:

2 bread + 2 tbsp peanut butter = 12g protein

Ye snack bana ke rakh lo — jab bhi bhookh lage, kha lo. Biscuit se 4x zyada protein!

Tip: Unsweetened peanut butter lein. Meetha waala healthy nahi hai 🙅` },

  { day: 14, title: "Week 2 done!", cat: "motivation", msg: `🏆 2 hafte complete!

Aapne seekha:
✅ Aloo → Chana swap
✅ Sattu shake
✅ Sprouts ghar pe ugao
✅ Rajma chawal ko upgrade karo
✅ Roti mein variety laao
✅ PB sandwich = easy snack

Aap already zyada jaante hain 90% logon se! 💪` },

  // ===== WEEK 3: BRAND SMART =====
  { day: 15, title: "Amul Protein Milk", cat: "brand", msg: `🥛 Market mein protein products aa rahe hain. Konsa lein?

Amul Protein Milk: ₹30 mein 20g protein
Ye bahut accha deal hai!

1 bottle subah nashte ke saath = din ka 1/3 protein done!

Apne ghar ke paas ki dukaan mein poochein — milta hai easily 🏪` },

  { day: 16, title: "Protein bars — worth it?", cat: "brand", msg: `🍫 Yoga Bar, RiteBite — ₹100-150 mein 20g protein

Worth it? Depends.
- Travel mein? Haan, bahut kaam aata hai
- Daily snack? Thoda mehenga hai
- Soya chunks se compare? 10x mehenga!

Best use: Bag mein rakh lo emergency ke liye. Daily ke liye dahi + chana better hai 🎯` },

  { day: 17, title: "Protinex vs Whey", cat: "brand", msg: `💪 Ghar ke bade aksar Protinex peete hain.

Protinex: 17g protein per serve
Whey protein: 24g protein per serve

Dono chalte hain! Whey zyada efficient hai, lekin Protinex ka taste familiar hai aur bade log easily accept karte hain.

Jo bhi piyo, regularly piyo — consistency matters! 🔑` },

  { day: 18, title: "Greek yogurt try karein", cat: "brand", msg: `🍶 Amul ya Epigamia ka Greek Yogurt try kiya?

Regular dahi = 8g protein per bowl
Greek yogurt = 14-15g protein per cup!

Almost double protein! Thoda mehenga hai (₹50-60) lekin taste creamy hai. 

Fruit kaat ke daal do — instant dessert + protein! 🍓` },

  { day: 19, title: "Protein atta — scam ya real?", cat: "brand", msg: `🫓 Market mein "protein atta" mil raha hai. Real hai?

Regular atta: 10g protein per 100g
Protein atta: 14-16g protein per 100g

Thoda better, lekin magic nahi hai. Per roti sirf 2-3g extra milta hai.

Better option: Regular atta mein 20% besan mila do. Same result, aadhi keemat! 🧠` },

  { day: 20, title: "Soy milk vs regular milk", cat: "fact", msg: `🥛 Soy milk = 7g protein per glass
Regular milk = 8g protein per glass

Almost same protein! 

Agar lactose intolerant hain ya vegan try kar rahe hain, soy milk accha option hai. Almond milk mat lena — usmein sirf 1g protein hota hai! ⚠️` },

  { day: 21, title: "Week 3 done!", cat: "motivation", msg: `🎯 3 hafte! Ab aap protein ke expert ban rahe hain!

Key learnings:
✅ Amul Protein Milk = best value
✅ Protein bars = travel ke liye
✅ Greek yogurt = double protein dahi
✅ Protein atta mein besan mila do
✅ Soy milk accha, almond milk nahi

Agli week: Protein-rich recipes! 🍳` },

  // ===== WEEK 4-6: RECIPES =====
  { day: 22, title: "Paneer bhurji", cat: "recipe", msg: `🍳 Paneer Bhurji — 18g protein!

100g paneer crumble karo
Pyaaz, tamatar, hari mirch bhuno
Paneer daal do, masala mix karo
5 min mein ready!

2 roti + paneer bhurji = 24g protein ka meal
Ye akela din ka 1/3 target cover kar deta hai! 💪` },

  { day: 23, title: "Chana chaat", cat: "recipe", msg: `🥗 Evening snack mein samosa mat khao, ye khao:

1 can chana (drain karo) ya boiled chana
+ pyaaz kati hui + tamatar + dhaniya
+ nimbu + chaat masala + hari chutney

10g protein ka snack ready in 5 min!
Samosa mein? Sirf 3g 😅` },

  { day: 24, title: "Moong dal chilla", cat: "recipe", msg: `🥞 Ye nashte ka superhero hai:

Moong dal raat ko bhigo do
Subah grind karo (pyaaz, mirch, namak daalo)
Tawa pe dosa jaisa banao

2 chille = 12g protein!

Saath mein dahi = 20g protein ka nashta
Better than poha, paratha, bread sab se! 🏆` },

  { day: 25, title: "Dal + Chana combo", cat: "recipe", msg: `🥣 Double protein dal trick:

Jab bhi dal banao, usmein 2 tbsp chana dal extra daal do.

Regular toor dal = 7g protein
Toor + chana dal mix = 10g protein

Taste mein koi farak nahi padta, protein 40% zyada! 

Aaj try karein? 🤔` },

  { day: 26, title: "Soya keema", cat: "recipe", msg: `🟤 Vegetarian keema — soya chunks se!

Soya chunks ko paani mein ubaal ke squeeze karo
Mixer mein thoda rough grind karo (keema jaisa)
Pyaaz-tamatar ka gravy banao
Soya keema daal do

50g soya = 26g protein!
Roti ya pav ke saath khaao — amazing taste! 🤤` },

  { day: 27, title: "Protein smoothie", cat: "recipe", msg: `🥤 Ghar ka protein shake:

1 glass doodh (8g)
+ 2 tbsp peanut butter (8g)  
+ 1 banana
+ thoda shahad

Mixer mein blend karo = 16g protein!

Gym nahi jaate? Koi baat nahi. Ye shake sab ke liye hai.
Bachche bhi isse pasand karenge! 🍌` },

  { day: 28, title: "Week 4 done!", cat: "motivation", msg: `🍳 4 hafte complete! Ab aap protein recipes bhi jaante hain!

✅ Paneer bhurji
✅ Chana chaat
✅ Moong dal chilla
✅ Dal + chana combo
✅ Soya keema
✅ Protein smoothie

In recipes ko hafte mein ek-ek karke try karein. 1 month mein sab expert ban jaayenge! 🧑‍🍳` },

  // WEEK 5
  { day: 29, title: "Eggs — agar khaate hain toh", cat: "fact", msg: `🥚 Agar aap eggs khaate hain:

1 boiled egg = 6g protein, sirf 70 calories
2 eggs subah = 12g protein before 9 AM!

Ye din ka 20% target hai, bina kuch sochein.

Boiled best hai — kam oil, kam calories, max protein 💯` },

  { day: 30, title: "30 din! Ek mahina!", cat: "motivation", msg: `🎉🎉🎉 EK MAHINA HO GAYA!

Agar aapne roz ek tip follow ki hai, toh aap ab:
- Jaante hain kitna protein chahiye
- 10+ high-protein foods identify kar sakte hain
- 6+ recipes bana sakte hain
- Smart brand choices kar sakte hain

Mogambo khush hua! 🏆

Agle 60 din mein aur bhi interesting tips aayengi! 💪` },

  // WEEK 5-6 continued
  { day: 31, title: "Lunch plate check", cat: "tip", msg: `☀️ Apna lunch plate check karo:

❌ 3 roti + dal + aloo sabzi = 16g protein
✅ 2 roti + dal + paneer/chana sabzi + dahi = 30g protein

Same effort, double protein!
Secret: Replace aloo sabzi + add dahi side 🎯` },

  { day: 32, title: "Dinner mein protein", cat: "tip", msg: `🌙 Raat ko halka khaana chahiye — but protein zaroor!

Best dinner combo:
2 roti (6g) + dal (7g) + dahi (8g) = 21g

Ya: 1 bowl khichdi (10g) + dahi (8g) + sprouts salad (9g) = 27g

Raat ko protein khane se muscles repair hoti hain neend mein 🛌` },

  { day: 33, title: "Snack time = protein time", cat: "tip", msg: `🍿 Jab bhi snack khane ka mann kare:

❌ Biscuit = 1g protein
❌ Chips = 2g protein  
❌ Samosa = 3g protein
✅ Makhana = 5g protein
✅ Roasted chana = 10g protein
✅ Chana chaat = 10g protein
✅ PB sandwich = 12g protein

Same time, better choice! 🧠` },

  { day: 34, title: "Chaach peete raho", cat: "tip", msg: `🥛 Chaach (buttermilk) ko ignore mat karo!

1 glass chaach = 5g protein + digestion boost

Lunch ke baad ek glass chaach = protein + no bloating

Summer mein toh ye best hai — namak, jeera, pudina daal ke piyo! Refreshing + protein ☀️` },

  { day: 35, title: "Week 5 done!", cat: "motivation", msg: `💪 5 weeks! Halfway through!

Picture abhi baaki hai mere dost! Aap bahut accha kar rahe hain.

Quick reminder: Protein daily chahiye, weekly nahi. Ek din mein 100g kha ke 3 din skip karna kaam nahi karta.

Thoda thoda, roz roz — yehi formula hai! 🔑` },

  // WEEKS 6-8: MYTHS & ADVANCED
  { day: 36, title: "Myth: Protein = gym walon ke liye", cat: "myth", msg: `🧠 MYTH BUSTER!

"Protein sirf gym jaane waalon ke liye hai"

GALAT! ❌

Protein sabke liye hai:
- Bachche: growing body ke liye
- Adults: muscles maintain karne ke liye  
- Seniors: haddi aur muscle loss rokne ke liye

Gym jaao ya na jaao, protein zaroor khao! 🙏` },

  { day: 37, title: "Myth: Zyada protein se kidney kharab", cat: "myth", msg: `🧠 MYTH BUSTER!

"Zyada protein se kidney kharab hoti hai"

Ye healthy logo ke liye GALAT hai! ❌

Agar aapki kidney already healthy hai, toh normal protein (1g/kg body weight) se koi problem nahi hoti.

Ye myth bodybuilders ke extreme intake se aayi hai. Normal khaana mein koi risk nahi! ✅` },

  { day: 38, title: "Myth: Plant protein weak hai", cat: "myth", msg: `🧠 MYTH BUSTER!

"Plant protein animal protein se kamzor hai"

GALAT! ❌ (mostly)

Soy protein = almost as good as whey
Dal + chawal saath = complete protein
Variety khaao = sab amino acids mil jaate hain

India ka majority vegetarian hai aur healthy hai! Plant protein works 🌱` },

  { day: 39, title: "Calories bhi dekho", cat: "tip", msg: `🔥 Protein ke saath calories bhi matter karti hain!

Best protein sources (kam calories, zyada protein):
🥇 Soy chunks: 26g protein, 170 cal
🥈 Paneer bhurji: 18g protein, 320 cal  
🥉 Chana: 10g protein, 180 cal

Worst ratio:
😬 Peanut butter: 8g protein, 190 cal
😬 Cheese: 5g protein, 70 cal (per slice)

Protein to calorie ratio dekho! 📊` },

  { day: 40, title: "Protein timing", cat: "fact", msg: `⏰ Kab khayein protein?

Best approach: Har meal mein thoda thoda

Nashta: 15-20g ✅
Lunch: 20-25g ✅  
Snack: 5-10g ✅
Dinner: 15-20g ✅

Ek baar mein 40g khaane se better hai 4 baar 15g khaana. Body ek baar mein limited protein absorb karti hai! 🎯` },

  { day: 41, title: "Khichdi = complete protein", cat: "fact", msg: `🍚 Khichdi ko 'hospital ka khaana' mat samjho!

Dal + chawal = COMPLETE PROTEIN (all amino acids!)

1 bowl khichdi = 10g protein
+ ghee + dahi = 18g protein meal

Ye India ka original superfood hai. Simple, digestible, complete nutrition! 

Haftein mein 1-2 din khichdi banao 🙏` },

  { day: 42, title: "6 weeks done!", cat: "motivation", msg: `🔥 42 din! 6 hafte! Aap legend hain!

Ab aap itna sab jaante hain:
- Protein sources
- Easy recipes  
- Smart brands
- Myth busters
- Calorie awareness

Apna time aa gaya hai! Baaki 48 din mein expert level tips aayengi! 🚀` },

  // WEEKS 7-9: FAMILY STRATEGIES
  { day: 43, title: "Ghar mein sabko protein", cat: "family", msg: `👨‍👩‍👧‍👦 Puri family ke liye protein plan:

Papa/Mummy (60-70kg): 60-70g daily
Bacche (30-40kg): 30-40g daily
Dada/Dadi (50-60kg): 50-60g daily

Seniors ko EXTRA protein chahiye kyunki unki muscles naturally kamzor hoti jaati hain. 

Dadi ko dahi aur paneer zyada do! 🙏` },

  { day: 44, title: "Bacchon ko protein kaise khilayein", cat: "family", msg: `👧 Bacche protein nahi khaate? Ye try karo:

1. PB banana sandwich — 12g, tastes like dessert
2. Paneer paratha — 11g, bacche love karte hain
3. Chana chaat with sev — 10g, fun snack
4. Dahi with fruit — 8g, meetha lagta hai
5. Soy chunks in maggi — 15g, bacche notice nahi karenge!

Chupke se protein daalo 🤫` },

  { day: 45, title: "Seniors ke liye protein", cat: "family", msg: `👴 60+ age mein protein aur bhi zaruri hai!

Muscles har saal 1-2% kam hoti hain after 50.
Zyada protein khaane se ye slow hota hai.

Best foods for seniors:
- Dahi (soft, easy to digest)
- Dal (familiar, daily)
- Paneer (soft, tasty)
- Khichdi (easy on stomach)
- Chaach (refreshing)

Protinex bhi accha hai seniors ke liye 🙏` },

  { day: 46, title: "Weekly meal planning", cat: "tip", msg: `📋 Hafte ka protein plan banao:

Mon: Rajma chawal + dahi
Tue: Chole + roti + chaach
Wed: Paneer sabzi + dal + roti
Thu: Soya chunks curry + rice
Fri: Khichdi + dahi + sprouts
Sat: Besan chilla + dahi (nashte mein)
Sun: Special — paneer biryani

Har din 60g+ protein guaranteed! 🎯` },

  { day: 47, title: "Grocery list for protein", cat: "tip", msg: `🛒 Monthly protein grocery list:

□ Paneer — 1kg (₹300-350)
□ Soya chunks — 1kg (₹80-100)
□ Moong dal — 2kg
□ Chana — 2kg
□ Rajma — 1kg  
□ Besan — 1kg
□ Dahi — daily/weekly
□ Peanut butter — 1 jar
□ Sattu — 1kg
□ Amul protein milk — weekly

Total extra cost: ₹500-700/month per person
Protein boost: 30-40% zyada! 💰` },

  { day: 48, title: "Protein on a budget", cat: "tip", msg: `💰 Sabse sasta protein (per gram):

1️⃣ Soya chunks — ₹0.30/gram protein
2️⃣ Chana/Rajma — ₹0.50/gram protein  
3️⃣ Moong dal — ₹0.60/gram protein
4️⃣ Sattu — ₹0.40/gram protein
5️⃣ Eggs — ₹0.80/gram protein

Sabse mehenga:
😬 Protein bar — ₹6-7/gram protein
😬 Greek yogurt — ₹3-4/gram protein

Sasta = bura nahi. Soya chunks > protein bar for value! 🧠` },

  { day: 49, title: "7 weeks!", cat: "motivation", msg: `7️⃣ Saat hafte! Kya baat hai!

Aap ab sirf protein nahi jaante — aap family ko bhi guide kar sakte hain.

Ek kaam karo: Aaj kisi ek family member ko apna favorite protein tip share karo. Knowledge share karne se double hota hai! 📤` },

  // WEEKS 8-10: SEASONAL & SITUATIONAL
  { day: 50, title: "Travel mein protein", cat: "tip", msg: `✈️ Travel mein protein mushkil hai. Tips:

Bag mein rakhein:
- Roasted chana (10g per 50g pack)
- Protein bar (20g)
- Peanut butter sachets (8g each)
- Makhana (5g per bowl)

Station/Airport pe:
- Idli (4g per 2 pcs) > samosa (3g)
- Curd rice (12g) > veg biryani (5g)
- Egg sandwich (12g) > veg sandwich (5g)

Plan karo, travel easy hoga! 🎒` },

  { day: 51, title: "Restaurant mein order kya karein", cat: "tip", msg: `🍽️ Bahar khaana kha rahe hain?

Best protein orders:
- Paneer tikka > paneer butter masala
- Dal makhani > dal tadka (thodi zyada)
- Rajma > aloo gobi (obviously!)
- Dahi/raita side zaroor mangao
- Chaach > soft drink

Ek simple rule: Menu mein paneer/dal/chana dekho, wohi order karo! 🎯` },

  { day: 52, title: "Baarish mein protein", cat: "seasonal", msg: `🌧️ Monsoon mein garam protein foods:

- Besan ka chilla (10g) > pakoda (3g)
- Moong dal halwa (8g) — meetha + protein!
- Garam doodh haldi ke saath (8g)
- Sprouts soup (9g)
- Sattu sherbet garam paani mein (20g)

Baarish mein bhi protein skip mat karo! ☔` },

  { day: 53, title: "Summer protein tips", cat: "seasonal", msg: `☀️ Garmi mein heavy khaana nahi khaa sakte?

Light protein options:
- Chaach (5g) — thanda + protein
- Dahi + fruit bowl (10g)
- Sattu sherbet thanda (20g)
- Chana chaat (10g)
- Paneer salad (14g)
- Lassi (8g)

Garmi mein liquid protein best hai! 🧊` },

  { day: 54, title: "Winter power foods", cat: "seasonal", msg: `❄️ Sardi mein protein game strong rakho:

- Sarson ka saag + makki roti + butter (8g)
- Bajra roti + dal (11g)
- Gajar halwa with mawa (10g)
- Til ke laddu (7g per piece)
- Moongfali (peanuts) — 7g per handful
- Garam doodh with turmeric (8g)

Sardi = muscle building season! 💪` },

  { day: 55, title: "Fast/Vrat mein protein", cat: "tip", msg: `🙏 Navratri/Vrat mein protein kaise?

Allowed foods mein protein:
- Kuttu atta roti (6g per roti)
- Rajgira paratha (7g)
- Makhana (5g per bowl)
- Dahi (8g)
- Doodh (8g)
- Paneer (14g per 100g)
- Dry fruits (5-7g per handful)
- Sabudana khichdi with peanuts (8g)

Vrat mein bhi 40g+ possible hai! 🎯` },

  { day: 56, title: "8 weeks done!", cat: "motivation", msg: `🏅 56 din! 8 hafte! 2 mahine almost done!

Ab aap seasonal, travel, restaurant, vrat — har situation mein protein plan kar sakte hain.

Don ko pakad liya! 🎬

34 din aur — finish line nazdeek hai! 🏃` },

  // WEEKS 9-11: TRACKING & CONSISTENCY
  { day: 57, title: "Track karo", cat: "tip", msg: `📊 Jo measure hota hai wo improve hota hai!

Aaj ek kaam karo:
Jo bhi khaaya, uska protein count karo.

Nashta: ___g
Lunch: ___g
Snack: ___g
Dinner: ___g
Total: ___g

Pehli baar track karoge toh shock lagega — itna kam kha rahe the! 😱

Protein Tracker app use karo: protein-tracker-one.vercel.app 📱` },

  { day: 58, title: "Consistency > perfection", cat: "motivation", msg: `🔑 Ek din 100g protein khaana < Roz 60g protein khaana

Perfect mat bano, consistent bano.

Agar ek din miss ho gaya? Koi baat nahi.
Kal se phir shuru.

Gym waale kehte hain: "The best diet is the one you can follow."
Protein bhi waisa hi hai. Jo roz kar sako, wohi sahi hai! ✅` },

  { day: 59, title: "Small wins celebrate karo", cat: "motivation", msg: `🎉 Kya aapne ye changes notice kiye?

- Zyada energy
- Kam bhookh lagti hai
- Baal aur nails better
- Mood accha rehta hai
- Zyada strong feel karte hain

Ye sab protein ke effects hain! 

Chhote chhote changes bade results dete hain. Keep going! 💪` },

  { day: 60, title: "60 din! Two-thirds done!", cat: "motivation", msg: `🎊 60 DIN! 2 MAHINE!

Agar aapne regularly follow kiya hai, toh ab:
- Protein sources pata hain ✅
- Recipes aati hain ✅
- Family ke liye plan kar sakte hain ✅
- Budget friendly options pata hain ✅
- Myths clear hain ✅
- Har situation handle kar sakte hain ✅

Bas 30 din aur — aap pro ban jaayenge! 🏆` },

  // WEEKS 11-13: PRO TIPS
  { day: 61, title: "Amino acids kya hain", cat: "fact", msg: `🧬 Thoda science (simple mein):

Protein = building blocks called amino acids
9 "essential" amino acids hain jo khaane se chahiye

Animal protein mein saare 9 hote hain
Plant protein mein kuch missing hote hain

SOLUTION: Dal + Chawal saath khao = saare 9 mil jaate hain!

Isliye khichdi COMPLETE meal hai! 🍚🥣` },

  { day: 62, title: "Protein aur weight loss", cat: "fact", msg: `⚖️ Weight kam karna hai? Protein badhao!

Protein:
- Bhookh kam karti hai
- Metabolism badhati hai  
- Muscle bachati hai (fat jaata hai, muscle nahi)

High protein diet pe log naturally 400-500 calories kam khaate hain!

Dieting = protein badhao, not sirf khaana kam karo 🧠` },

  { day: 63, title: "Protein aur hair/skin", cat: "fact", msg: `💇 Baal jhad rahe hain? Skin dull hai?

Check karo — kahin protein ki kami toh nahi!

Baal = 95% protein (keratin)
Skin = collagen (protein)
Nails = keratin (protein)

Kam protein = weak hair, dull skin, brittle nails

Zyada protein = strong hair, glowing skin! ✨

Ye beauty tip kisi magazine mein nahi milegi! 😄` },

  { day: 64, title: "Pre aur post workout", cat: "tip", msg: `🏋️ Exercise karte hain? (Walking bhi count hota hai!)

30-60 min PEHLE: Light protein snack
- Banana + PB (12g)
- Dahi (8g)

30 min BAAD: Protein meal
- Protein shake (24g)
- Paneer wrap (16g)
- Chana chaat (10g)

Post-workout protein = faster recovery! 💪` },

  { day: 65, title: "Sleep aur protein", cat: "fact", msg: `😴 Neend aur protein ka connection:

Raat ko protein khaane se:
- Better muscle recovery
- Acchi neend aati hai (tryptophan amino acid se)
- Subah fresh feel hote hain

Best bedtime protein:
- 1 glass garam doodh (8g)
- Dahi (8g) 
- Handful badam (6g)

Doodh peeke sona — dadi ka nuskha scientific hai! 🥛` },

  // Days 66-90: More recipes, combos, advanced tips, and final messages
  { day: 66, title: "Protein combo meals", cat: "recipe", msg: `🍽️ Best protein combo meals:

MEGA BREAKFAST (25g):
Moong chilla (12g) + dahi (8g) + doodh (5g)

POWER LUNCH (30g):
Rajma (9g) + roti x2 (6g) + dahi (8g) + chaach (5g)

BALANCED DINNER (25g):
Paneer sabzi (14g) + dal (7g) + roti (3g)

Total: 80g! Target easily done! 🎯` },

  { day: 67, title: "Leftover magic", cat: "tip", msg: `✨ Kal ka bacha hua khaana? Protein add karo!

Bachi hui sabzi → Soya chunks daal do, reheat karo
Bachi hui dal → Paneer crumble karo, mix karo  
Bache hue chawal → Egg bhurji ya soya fried rice banao
Bachi hui roti → PB laga ke roll karo

Waste mat karo, upgrade karo! ♻️` },

  { day: 68, title: "Tea time protein", cat: "tip", msg: `☕ Chai ke saath kya khaate hain?

❌ Biscuit (1g protein) — ye basically sugar hai
❌ Rusk (1g protein) — same

✅ Makhana (5g) — roast karke namak daal do
✅ Chana jor garam (8g)
✅ Paneer tikka bites (7g)
✅ Moong dal namkeen (5g)

Tea time = protein time! 🍵` },

  { day: 69, title: "Protein smoothie bowl", cat: "recipe", msg: `🥣 Instagram worthy + high protein:

Blend karo:
- 1 cup dahi (8g)
- 1 banana
- 2 tbsp PB (8g)
- Thoda doodh

Bowl mein daalo, upar se:
- Kati hui fruit
- Granola/muesli (5g)
- Chia seeds (2g)

Total: 23g protein! Bachche pagal ho jaayenge! 📸` },

  { day: 70, title: "10 weeks!", cat: "motivation", msg: `🔟 10 HAFTE! 70 DIN!

Aap ab top 5% Indians mein hain jo apna protein intake seriously lete hain.

Ye chhota nahi hai — ye health revolution hai! 🇮🇳

20 din aur! Final stretch! 🏃💨` },

  { day: 71, title: "Protein water intake", cat: "fact", msg: `💧 Zyada protein = zyada paani peena zaruri!

Protein digest karne mein kidneys ko paani chahiye.

Rule: Har 20g protein ke saath 1 extra glass paani

Agar 60g protein kha rahe ho = 3 extra glass paani roz

Paani kam = bloating, constipation. Stay hydrated! 🚰` },

  { day: 72, title: "Reading food labels", cat: "tip", msg: `🏷️ Packet ka khaana le rahe hain? Label padho!

Dekho:
"Protein: ___ g per serving"

Per serving dekho, per 100g nahi!

Example: Muesli packet pe likha "15g protein per 100g"
But 1 serving = 30g = sirf 4.5g protein!

Label padhna = smart choice! 🧐` },

  { day: 73, title: "Meal prep Sunday", cat: "tip", msg: `📦 Sunday ko 2 ghante do, poora hafta set:

1. Chane ubaal ke fridge mein rakh do (5 din chalenge)
2. Sprouts ready karo 
3. Paneer cut karke dabb mein rakh do
4. Sattu ka dabba bhar ke rakh do
5. PB sandwiches freezer mein

Hafta bhar instant protein ready! 🎯` },

  { day: 74, title: "Protein aur bones", cat: "fact", msg: `🦴 Sirf calcium nahi, protein bhi chahiye haddion ko!

Haddi ka 50% structure = PROTEIN (collagen)

Calcium + Protein = Strong bones
Sirf calcium = incomplete

Isliye sirf doodh nahi, paneer, dahi, dal bhi khao! 

Especially women 40+ ke liye ye bahut zaruri hai 🙏` },

  { day: 75, title: "11 weeks!", cat: "motivation", msg: `1️⃣1️⃣ 75 din! Silver jubilee of protein awareness!

Fun fact: Agar aapne daily 20g protein extra khaya hai 75 din se, toh aapne total 1.5 KG extra protein khaaya hai!

1.5 kg protein = stronger muscles, better hair, more energy. Ye real investment hai! 📈` },

  { day: 76, title: "Protein for immunity", cat: "fact", msg: `🛡️ Immune system protein se banta hai!

Antibodies = protein
White blood cells = protein pe depend karte hain

Kam protein = weak immunity = zyada bimaar padna

Covid ke baad logon ne realize kiya — immunity ke liye protein zaruri hai. Ab aap pehle se jaante hain! 💪` },

  { day: 77, title: "Night cravings solution", cat: "tip", msg: `🌙 Raat ko kuch meetha khaane ka mann?

Instead of:
❌ Ice cream (3g protein, 200 cal)
❌ Mithai (2g protein, 300 cal)

Try:
✅ Dahi + shahad (8g protein, 140 cal)
✅ Protein smoothie (16g protein, 200 cal)
✅ Makhana (5g protein, 100 cal)

Meetha bhi, healthy bhi! 🍯` },

  { day: 78, title: "Festive season protein", cat: "seasonal", msg: `🪔 Festival pe protein kaise?

Diwali/Holi pe mithai toh khaayenge, lekin:

- Besan laddu > maida ki mithai (besan = protein!)
- Badam barfi > cashew barfi (more protein)
- Paneer tikka party mein > chips
- Chaach > soft drinks at gatherings

Festival enjoy karo, lekin smart choices banao! 🎊` },

  { day: 79, title: "Protein misconceptions in India", cat: "myth", msg: `🧠 India mein common galat beliefs:

1. "Non-veg khaane waale hi strong hote hain" — GALAT
2. "Doodh sabse best protein source hai" — Itna best nahi
3. "Protein powder harmful hai" — Quality products safe hain
4. "Dal mein bahut protein hai" — Utna nahi jitna sochte hain
5. "Protein se weight badhta hai" — Protein se muscle badhta hai, fat nahi

Knowledge = power! 🎓` },

  { day: 80, title: "80 din! Final stretch!", cat: "motivation", msg: `🏃 80 DIN! BAS 10 DIN AUR!

Aap ne 80 din protein ke baare mein seekha — ye achievement bahut badi hai!

Ab ek aur kaam karo: 
Ek friend ya family member ko is bot ke baare mein batao. 

Protein awareness = chain reaction.
Aap batao unko, wo batayein unke ghar mein! 📤

t.me/protein_hi_protein ← ye link share karo! 🙏` },

  // FINAL 10 DAYS
  { day: 81, title: "Your protein cheat sheet", cat: "tip", msg: `📋 SAVE THIS! Your protein cheat sheet:

QUICK 5g: Dahi, chaach, roti, makhana
SOLID 10g: Chana, sprouts, besan chilla, roasted chana
POWER 15g: Paneer, Amul protein milk, Greek yogurt
MEGA 20g+: Soya chunks, sattu, protein shake, paneer bhurji

Har category se ek cheez daily khao = 50g+ easy! 🎯` },

  { day: 82, title: "1 minute protein test", cat: "tip", msg: `⏱️ Quick test: Aapka protein score kya hai?

Har YES = 1 point:
□ Subah protein khaya? (dahi/eggs/chilla)
□ Lunch mein dal/chana/paneer tha?
□ Snack protein wala tha?
□ Dinner mein protein side tha? (dahi/chaach)
□ 3+ protein sources khaye aaj?

5/5 = Champion! 🏆
3-4 = Good, improve kar sakte hain
1-2 = Aaj se dhyan do! 💪` },

  { day: 83, title: "Teaching others", cat: "family", msg: `👨‍🏫 Ab aap teacher hain!

Apne ghar mein ye 3 cheezein share karo:

1. "Jitna weight hai utna gram protein chahiye"
2. "Dal mein utna protein nahi — paneer/chana zyada hai"  
3. "Dahi roz khao — best daily protein"

Simple 3 rules. Sabko samajh aayenge! 🎓` },

  { day: 84, title: "12 weeks complete!", cat: "motivation", msg: `🏅 12 HAFTE! 84 DIN! 

3 MAHINE ka protein gyaan aapke paas hai ab!

Aap certified Protein Expert hain (self-certified, but still! 😄)

6 din aur! Kuch special aane waala hai... 🎁` },

  { day: 85, title: "Aage kya?", cat: "tip", msg: `🚀 90 din ke baad kya?

1. Track karte raho — protein-tracker-one.vercel.app
2. Naye foods try karo — boring mat hone do
3. Family ko involve karo
4. Seasonal changes karo
5. Community mein active raho: t.me/protein_hi_protein

Protein journey lifetime hai, 90 din nahi! 🔑` },

  { day: 86, title: "Your impact", cat: "motivation", msg: `🌟 Aapne ye 86 din follow kiye — but aapka impact sirf aap tak nahi hai.

Agar aapne ghar mein ek recipe bhi introduce ki, ek swap bhi karaya — toh aapne puri family ka health improve kiya.

Ye chhota lagta hai, but 10 saal mein ye decisions bade results dete hain.

Aap health hero hain! 🦸` },

  { day: 87, title: "Quick 30-second breakfast", cat: "recipe", msg: `⚡ Sabse fast protein breakfast:

Option 1: Amul protein milk + banana = 22g (0 cooking!)
Option 2: Dahi + muesli = 15g (30 seconds)
Option 3: PB toast = 10g (1 minute)
Option 4: Overnight oats + PB = 16g (made last night)

"Time nahi hai" excuse ab nahi chalega! 😄` },

  { day: 88, title: "3 din baaki!", cat: "motivation", msg: `3️⃣ Sirf 3 din baaki!

Pehle din aapko protein ka P bhi nahi pata tha.
Aaj aap expert hain.

88 din mein aapne:
📚 50+ protein facts seekhe
🍳 15+ recipes seekhi
🧠 10+ myths toda
👨‍👩‍👧 Family strategies seekhi
🎯 Life-long habits banayi

Proud of you! 💪` },

  { day: 89, title: "Kal last din hai!", cat: "motivation", msg: `🌅 Kal aakhri din hai is series ka!

Lekin ye ending nahi hai — ye BEGINNING hai.

Kal ek special message aayega.

Tab tak: Aaj ka khaana extra protein wala banao. Celebrate karo! 🎊` },

  { day: 90, title: "Day 90 — Graduation! 🎓", cat: "motivation", msg: `🎓🎉🏆 DAY 90 — GRADUATION!

Aapne 90 din ka protein course complete kar liya!

Mogambo khush hua! Don ko pakad liya! Apna time aa gaya! 🎬

Remember:
💪 Protein daily chahiye, weekly nahi
🫘 Desi khaana mein protein bharpoor hai
👨‍👩‍👧‍👦 Family ke liye plan banao
📊 Track karo, improve karo

Community mein active raho: t.me/protein_hi_protein
Tracker use karo: protein-tracker-one.vercel.app

Thank you for this journey! 🙏🇮🇳

Ab AAPKI baari — kisi aur ko bhi protein aware banao! Share karo! 📤` },
];

module.exports = MESSAGES;
