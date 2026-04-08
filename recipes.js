// 100 Protein Recipes for Protein Ka Chakkar Bot
// Organized by category with full instructions in Hinglish

const RECIPES = [

  // ==========================================
  // 🌅 BREAKFAST (1-20)
  // ==========================================

  { name: "Paneer Bhurji", emoji: "🍳", protein: 18, time: "10 min", cat: "breakfast",
    recipe: `<b>🍳 Paneer Bhurji — 18g protein</b>\n\n100g paneer crumble karo\nPyaaz, tamatar, hari mirch bhuno\nPaneer daal do, masala mix karo\n5 min mein ready!\n\n<b>2 roti ke saath = 24g protein 💪</b>` },

  { name: "Moong Dal Chilla", emoji: "🥞", protein: 12, time: "15 min", cat: "breakfast",
    recipe: `<b>🥞 Moong Dal Chilla — 12g protein</b>\n\nBhigi moong dal grind karo\nPyaaz + mirch + namak mix karo\nTawa pe dosa jaisa banao\n\n<b>2 chille + dahi = 20g protein nashta! 🌅</b>` },

  { name: "Besan Chilla", emoji: "🥞", protein: 10, time: "10 min", cat: "breakfast",
    recipe: `<b>🥞 Besan Chilla — 10g protein</b>\n\nBesan + paani ka batter\nPyaaz + mirch + dhaniya + ajwain\nTawa pe dosa jaisa seko\n\n<b>Nashte ka champion! 🏆</b>` },

  { name: "Overnight Protein Oats", emoji: "🥣", protein: 18, time: "5 min prep", cat: "breakfast",
    recipe: `<b>🥣 Overnight Protein Oats — 18g protein</b>\n\nOats + doodh/dahi + PB + banana + chia seeds\nRaat ko mix karo, fridge mein rakh do\nSubah seedha khaao!\n\n<b>Zero cooking, 2 min morning! ⚡</b>` },

  { name: "Paneer Paratha", emoji: "🫓", protein: 14, time: "20 min", cat: "breakfast",
    recipe: `<b>🫓 Paneer Paratha — 14g protein</b>\n\n50g paneer mash karo\nHari mirch, dhaniya, namak, jeera mix karo\nAata mein bharke paratha belke seko\nGhee lagao\n\n<b>1 paratha + dahi = 22g protein breakfast! 🌅</b>` },

  { name: "Egg Bhurji Toast", emoji: "🍳", protein: 16, time: "7 min", cat: "breakfast",
    recipe: `<b>🍳 Egg Bhurji Toast — 16g protein</b>\n\n2 eggs scramble karo pyaaz-mirch ke saath\nToast pe daal do\nChaat masala chidko\n\n<b>7 min, 16g protein — fastest breakfast! ⚡</b>` },

  { name: "Dahi Poha", emoji: "🍚", protein: 12, time: "10 min", cat: "breakfast",
    recipe: `<b>🍚 Dahi Poha — 12g protein</b>\n\nRegular poha banao (5g)\nDahi side mein (8g)\nMoongfali zaroor daalo (+3g)\n\n<b>Regular poha upgrade! Simple but effective 🎯</b>` },

  { name: "Protein Dosa", emoji: "🥞", protein: 14, time: "15 min", cat: "breakfast",
    recipe: `<b>🥞 Protein Dosa — 14g protein</b>\n\nDosa batter mein 2 tbsp besan mix karo\nAndar paneer bhurji filling daalo (50g paneer)\nFold karo, serve with chutney\n\n<b>South + North Indian fusion! 🤝</b>` },

  { name: "Sattu Paratha", emoji: "🫓", protein: 16, time: "20 min", cat: "breakfast",
    recipe: `<b>🫓 Sattu Paratha — 16g protein</b>\n\nSattu + pyaaz + mirch + nimbu + namak ka filling\nAata mein bharke paratha banao\nGhee mein seko\n\n<b>Bihar ka power breakfast! Sasta aur protein-rich 🇮🇳</b>` },

  { name: "Masala Omelette", emoji: "🍳", protein: 14, time: "5 min", cat: "breakfast",
    recipe: `<b>🍳 Masala Omelette — 14g protein</b>\n\n2 eggs beat karo\nPyaaz, mirch, tamatar, dhaniya, haldi daalo\nTawa pe banao, cheese slice upar rakh do\n\n<b>5 min mein loaded protein! 🔥</b>` },

  { name: "Sprouts Poha", emoji: "🌱", protein: 14, time: "12 min", cat: "breakfast",
    recipe: `<b>🌱 Sprouts Poha — 14g protein</b>\n\nRegular poha banao\nSteamed sprouts mix karo (1 cup)\nMoongfali + nimbu + dhaniya\n\n<b>Poha + sprouts = double protein! 💪</b>` },

  { name: "Chana Dal Dosa", emoji: "🥞", protein: 12, time: "20 min", cat: "breakfast",
    recipe: `<b>🥞 Chana Dal Dosa — 12g protein</b>\n\nChana dal + rice bhigo ke grind karo (3:1 ratio)\nDosa batter jaisa banao\nTawa pe crispy dosa banao\n\n<b>South Indian protein hack! Regular dosa se 2x protein 🎯</b>` },

  { name: "PB Banana Toast", emoji: "🥜", protein: 12, time: "3 min", cat: "breakfast",
    recipe: `<b>🥜 PB Banana Toast — 12g protein</b>\n\n2 bread toast karo\n2 tbsp PB lagao (8g)\nBanana slice karo upar (1g)\nShahad drizzle karo\n\n<b>3 min, zero cooking, office mein bhi ban sakta hai! ⚡</b>` },

  { name: "Egg Paratha Roll", emoji: "🌯", protein: 16, time: "10 min", cat: "breakfast",
    recipe: `<b>🌯 Egg Paratha Roll — 16g protein</b>\n\nParatha banao ya kal ka bacha hua lo\n2 eggs ka omelette banao\nParatha mein roll karo + chutney + pyaaz\n\n<b>Ghar ka frankie! Bachche love karenge 🤤</b>` },

  { name: "Protein Upma", emoji: "🍲", protein: 14, time: "15 min", cat: "breakfast",
    recipe: `<b>🍲 Protein Upma — 14g protein</b>\n\nRegular upma banao suji se\nMoongfali daalo (3g)\nSprouts mix karo end mein (9g)\nDahi side mein\n\n<b>Upma ko boring se power-packed banao! 🔥</b>` },

  { name: "Paneer Toast", emoji: "🧀", protein: 15, time: "7 min", cat: "breakfast",
    recipe: `<b>🧀 Paneer Toast — 15g protein</b>\n\n50g paneer grate karo\nMirch, dhaniya, chaat masala mix karo\nBread pe rakh ke toast karo ya grill karo\n\n<b>Cheese toast ka desi healthy version! 🍞</b>` },

  { name: "Ragi Dosa + Chutney", emoji: "🥞", protein: 10, time: "15 min", cat: "breakfast",
    recipe: `<b>🥞 Ragi Dosa — 10g protein</b>\n\nRagi flour + rice flour + curd ka batter (2:1:½)\nFerment 4-6 hrs\nDosa banao, peanut chutney side mein\n\n<b>Millet lovers ke liye — gluten-free protein! 🌾</b>` },

  { name: "Soy Milk Smoothie", emoji: "🥤", protein: 12, time: "3 min", cat: "breakfast",
    recipe: `<b>🥤 Soy Milk Smoothie — 12g protein</b>\n\n1 glass soy milk (7g)\n1 banana + shahad\n1 tbsp almond butter (3g) ya PB\nBlend karo\n\n<b>Vegan protein shake — lactose free! 🌱</b>` },

  { name: "Stuffed Besan Cheela", emoji: "🥞", protein: 16, time: "15 min", cat: "breakfast",
    recipe: `<b>🥞 Stuffed Besan Cheela — 16g protein</b>\n\nBesan batter se cheela banao (10g)\nAndar mein paneer + pyaaz filling (6g)\nFold karo, chutney ke saath serve karo\n\n<b>Cheela + paneer = protein bomb breakfast! 💣</b>` },

  { name: "Muesli Parfait", emoji: "🥣", protein: 16, time: "5 min", cat: "breakfast",
    recipe: `<b>🥣 Muesli Parfait — 16g protein</b>\n\nLayer 1: Dahi (8g)\nLayer 2: Protein muesli (5g)\nLayer 3: Fruits + seeds\nLayer 4: Shahad + PB drizzle (3g)\n\n<b>Looks fancy, ready in 5 min! Instagram worthy 📸</b>` },

  // ==========================================
  // ☀️ LUNCH (21-40)
  // ==========================================

  { name: "Soya Keema", emoji: "🟤", protein: 26, time: "20 min", cat: "lunch",
    recipe: `<b>🟤 Soya Keema — 26g protein</b>\n\nSoya chunks ubaal ke squeeze karo\nMixer mein rough grind karo\nPyaaz-tamatar gravy banao\n5 min bhuno\n\n<b>Pav ya roti ke saath — guests ko pata nahi chalega! 🤫</b>` },

  { name: "Rajma Chawal Combo", emoji: "🫘", protein: 26, time: "30 min", cat: "lunch",
    recipe: `<b>🫘 Rajma Chawal Protein Combo — 26g protein</b>\n\nRajma curry (9g) + chawal (4g)\nDahi side mein (8g) + chaach (5g)\n\n<b>Regular rajma chawal + sides = protein powerhouse! 💪</b>` },

  { name: "Chole Kulche", emoji: "🫘", protein: 16, time: "25 min", cat: "lunch",
    recipe: `<b>🫘 Protein Chole — 16g protein</b>\n\nBoiled chane mein extra chana dal daalo\nGaram masala, amchur, dhaniya\n2 kulche ke saath\n\n<b>Street food vibes, ghar ka protein! 🎉</b>` },

  { name: "Paneer Tikka Wrap", emoji: "🌯", protein: 22, time: "15 min", cat: "lunch",
    recipe: `<b>🌯 Paneer Tikka Wrap — 22g protein</b>\n\nPaneer cubes tikka masala mein marinate\nTawa pe grill ya air fry\nRoti mein wrap + pyaaz + chutney\n\n<b>Lunch box hero! 🏆</b>` },

  { name: "Dal + Paneer Bowl", emoji: "🥣", protein: 21, time: "25 min", cat: "lunch",
    recipe: `<b>🥣 Dal Paneer Bowl — 21g protein</b>\n\nDal banao (7g)\n50g paneer cubes daal do (7g)\nDahi side mein (8g)\n\n<b>Dal mein paneer = double protein trick! 🧠</b>` },

  { name: "Soya Chunk Biryani", emoji: "🍚", protein: 30, time: "35 min", cat: "lunch",
    recipe: `<b>🍚 Soya Chunk Biryani — 30g protein</b>\n\nSoya chunks ubaal ke squeeze (26g)\nBiryani masala mein pakao\nChawal ke saath layer, dum do\nRaita side mein (4g)\n\n<b>Veg biryani with 30g protein! 🤯</b>` },

  { name: "Rajma Burrito Bowl", emoji: "🥗", protein: 14, time: "15 min", cat: "lunch",
    recipe: `<b>🥗 Rajma Burrito Bowl — 14g protein</b>\n\nRice base + garam rajma + shredded cabbage\nDahi + chaat masala + cheese\n\n<b>Rajma chawal ka international avatar! 🌯</b>` },

  { name: "Protein Khichdi", emoji: "🍚", protein: 18, time: "25 min", cat: "lunch",
    recipe: `<b>🍚 Protein Khichdi — 18g protein</b>\n\nMoong dal + chawal + chana dal bhi daalo\nHaldi, ghee, jeera tadka\nDahi side mein (8g)\n\n<b>India ka superfood! Comfort + protein 🇮🇳</b>` },

  { name: "Chana Pulao", emoji: "🍚", protein: 16, time: "25 min", cat: "lunch",
    recipe: `<b>🍚 Chana Pulao — 16g protein</b>\n\nBoiled chana + chawal saath mein cook karo\nPyaaz, jeera, garam masala, pudina\nGhee ka tadka\n\n<b>One-pot meal — protein-rich aur easy! 🎯</b>` },

  { name: "Paneer Fried Rice", emoji: "🍚", protein: 20, time: "15 min", cat: "lunch",
    recipe: `<b>🍚 Paneer Fried Rice — 20g protein</b>\n\nBache hue chawal use karo\nPaneer cubes (100g) + veggies stir fry\nSoy sauce + vinegar + mirch\n\n<b>Indo-Chinese protein meal! Leftover rice ka best use 🥢</b>` },

  { name: "Lobia Curry + Rice", emoji: "🫘", protein: 16, time: "30 min", cat: "lunch",
    recipe: `<b>🫘 Lobia Curry — 16g protein</b>\n\nLobia boil karo (8g)\nPyaaz-tamatar masala mein pakao\nChawal + dahi ke saath (8g)\n\n<b>Underrated dal — try karo! 🙏</b>` },

  { name: "Tofu Tikka Masala", emoji: "🟨", protein: 16, time: "20 min", cat: "lunch",
    recipe: `<b>🟨 Tofu Tikka Masala — 16g protein</b>\n\nFirm tofu press karke cube karo (200g)\nTikka masala mein marinate, grill karo\nCashew-tamatar gravy mein daal do\n\n<b>Vegan paneer tikka masala! Creamy + high protein 🌿</b>` },

  { name: "Egg Fried Rice", emoji: "🍳", protein: 18, time: "12 min", cat: "lunch",
    recipe: `<b>🍳 Egg Fried Rice — 18g protein</b>\n\nBache hue chawal + 3 eggs scramble\nPyaaz, beans, gajar stir fry\nSoy sauce + vinegar\n\n<b>Quick lunch — 12 min mein 18g protein! ⚡</b>` },

  { name: "Soya Chunk Curry", emoji: "🟤", protein: 28, time: "20 min", cat: "lunch",
    recipe: `<b>🟤 Soya Chunk Curry — 28g protein</b>\n\nSoya chunks ubaal ke squeeze (26g)\nPyaaz-tamatar gravy banao, garam masala\nDahi side mein (2g)\n\n<b>Cheapest high-protein curry! ₹15 mein 28g 💰</b>` },

  { name: "Mixed Dal Khichdi", emoji: "🍚", protein: 14, time: "25 min", cat: "lunch",
    recipe: `<b>🍚 Mixed Dal Khichdi — 14g protein</b>\n\nMoong + masoor + toor + chawal pressure cook\nGhee mein jeera-lahsun tadka\nAchar + papad + dahi ke saath\n\n<b>Comfort meal — bimaar ho ya healthy, khichdi sab ke liye! 🙏</b>` },

  { name: "Paneer Butter Masala", emoji: "🧀", protein: 16, time: "25 min", cat: "lunch",
    recipe: `<b>🧀 Paneer Butter Masala — 16g protein</b>\n\n100g paneer cubes\nCashew-tamatar creamy gravy\nMakhan + cream\n\n<b>Restaurant favourite — ghar pe banao, 16g protein! 🍽️</b>` },

  { name: "Sprouts Curry", emoji: "🌱", protein: 14, time: "20 min", cat: "lunch",
    recipe: `<b>🌱 Sprouts Curry — 14g protein</b>\n\nSprouted moong + chana mix (9g)\nPyaaz-tamatar masala mein pakao\nDahi side (5g)\n\n<b>Cheap, easy, protein-rich! Sprouts ka best use 🎯</b>` },

  { name: "Chicken Curry Rice", emoji: "🍛", protein: 30, time: "30 min", cat: "lunch",
    recipe: `<b>🍛 Chicken Curry + Rice — 30g protein</b>\n\nChicken pieces pyaaz-tamatar gravy mein (22g)\nChawal side mein (4g)\nDahi/raita (4g)\n\n<b>Non-veg protein king — 30g in one meal! 👑</b>` },

  { name: "Rajma Stuffed Paratha", emoji: "🫓", protein: 14, time: "25 min", cat: "lunch",
    recipe: `<b>🫓 Rajma Paratha — 14g protein</b>\n\nBache hue rajma mash karo\nMirch, dhaniya, jeera mix karo\nParatha mein bharke seko\n\n<b>Leftover rajma ka best use! Zero waste, max protein ♻️</b>` },

  { name: "Dal Palak", emoji: "🥬", protein: 10, time: "25 min", cat: "lunch",
    recipe: `<b>🥬 Dal Palak — 10g protein</b>\n\nMoong dal cook karo\nPalak blanch + chop karke mix karo\nLahsun ka tadka\n\n<b>Iron + protein ka combo! Mummy ko zaroor banao 🙏</b>` },

  // ==========================================
  // 🌙 DINNER (41-60)
  // ==========================================

  { name: "Palak Paneer", emoji: "🥬", protein: 16, time: "25 min", cat: "dinner",
    recipe: `<b>🥬 Palak Paneer — 16g protein</b>\n\nPalak blanch + grind karo\nPyaaz-tamatar masala + palak puree\nPaneer cubes (100g) daal do\n\n<b>2 roti ke saath = 22g protein dinner! 🌙</b>` },

  { name: "Tofu Stir Fry", emoji: "🟨", protein: 14, time: "12 min", cat: "dinner",
    recipe: `<b>🟨 Tofu Stir Fry — 14g protein</b>\n\n150g firm tofu cube karo\nHigh heat pe sear till golden\nSoy sauce + vinegar + mirch + veggies\n\n<b>Indo-Chinese style — quick aur tasty! 🥢</b>` },

  { name: "Chana Masala Dry", emoji: "🫘", protein: 12, time: "20 min", cat: "dinner",
    recipe: `<b>🫘 Sukha Chana — 12g protein</b>\n\nBoiled chane bhuno pyaaz-masala mein\nDry rakhein, nimbu + dhaniya\n\n<b>Side dish ya snack — roti ke saath zabardast! 👌</b>` },

  { name: "Egg Curry", emoji: "🥘", protein: 18, time: "20 min", cat: "dinner",
    recipe: `<b>🥘 Egg Curry — 18g protein</b>\n\n3 eggs boil karo\nPyaaz-tamatar masala, 5 min simmer\nDhaniya chidko\n\n<b>3 ande + 1 roti = 21g protein dinner! 🌙</b>` },

  { name: "Mixed Dal Tadka", emoji: "🥣", protein: 10, time: "25 min", cat: "dinner",
    recipe: `<b>🥣 Mixed Dal Tadka — 10g protein</b>\n\nMoong + masoor + toor — teen dal mix\nPressure cook 3 whistles\nGhee mein jeera + lahsun tadka\n\n<b>3 dal mix = better amino acids + better taste! 🧬</b>` },

  { name: "Paneer Do Pyaza", emoji: "🧀", protein: 16, time: "20 min", cat: "dinner",
    recipe: `<b>🧀 Paneer Do Pyaza — 16g protein</b>\n\nPyaaz double — kuch bhuni kuch kacchi\n100g paneer cubes\nShimla mirch bhi daal sakte ho\n\n<b>Restaurant taste, ghar ka protein! 🍽️</b>` },

  { name: "Matar Paneer", emoji: "🧀", protein: 18, time: "25 min", cat: "dinner",
    recipe: `<b>🧀 Matar Paneer — 18g protein</b>\n\nPaneer cubes (100g) + green peas (1 cup)\nPyaaz-tamatar-cashew gravy\nGaram masala, dhaniya\n\n<b>Classic dinner — peas mein bhi protein hota hai! 🟢</b>` },

  { name: "Kadhi Pakoda", emoji: "🥣", protein: 12, time: "30 min", cat: "dinner",
    recipe: `<b>🥣 Kadhi Pakoda — 12g protein</b>\n\nBesan + dahi ki kadhi (8g)\nBesan ke pakode (4g)\nChawal ke saath serve karo\n\n<b>Besan + dahi = double protein source! Comfort food 🙏</b>` },

  { name: "Soya Chunk Dry Fry", emoji: "🟤", protein: 26, time: "15 min", cat: "dinner",
    recipe: `<b>🟤 Soya Dry Fry — 26g protein</b>\n\nSoya chunks ubaal ke squeeze\nOnion + capsicum ke saath stir fry\nSoy sauce + chili sauce + black pepper\n\n<b>Chinese starter vibes — party snack bhi ban sakta hai! 🎉</b>` },

  { name: "Aloo Soya Curry", emoji: "🟤", protein: 20, time: "25 min", cat: "dinner",
    recipe: `<b>🟤 Aloo Soya Curry — 20g protein</b>\n\nSoya chunks (26g) + aloo\nPyaaz-tamatar masala\nRoti ke saath\n\n<b>Aloo lovers ke liye — aloo ki comfort + soya ka protein! 🥔</b>` },

  { name: "Fish Curry", emoji: "🐟", protein: 22, time: "25 min", cat: "dinner",
    recipe: `<b>🐟 Fish Curry — 22g protein</b>\n\nFish pieces haldi-namak mein marinate\nPyaaz-tamatar-nariyal gravy\nDheemi aag pe 10 min pakao\n\n<b>Coastal style dinner — light + protein-rich! 🌊</b>` },

  { name: "Paneer Tikka", emoji: "🧀", protein: 14, time: "20 min", cat: "dinner",
    recipe: `<b>🧀 Paneer Tikka — 14g protein</b>\n\nPaneer + shimla mirch + pyaaz cubes\nHung curd + tikka masala mein marinate 30 min\nOven ya tawa pe grill karo\n\n<b>Starter + main dono mein chalega! 🔥</b>` },

  { name: "Methi Paneer", emoji: "🧀", protein: 16, time: "20 min", cat: "dinner",
    recipe: `<b>🧀 Methi Paneer — 16g protein</b>\n\nFresh methi leaves wash + chop\n100g paneer cubes\nPyaaz-tamatar masala + methi + paneer\n\n<b>Methi ka kadwapan + paneer ki creaminess = magic! ✨</b>` },

  { name: "Keema Matar", emoji: "🍖", protein: 28, time: "30 min", cat: "dinner",
    recipe: `<b>🍖 Keema Matar — 28g protein</b>\n\nMutton/chicken keema (22g)\nGreen peas (3g) + masala\nDheemi aag pe 15 min\nRoti ke saath (3g)\n\n<b>Non-veg protein powerhouse! 💪</b>` },

  { name: "Bhindi + Dal Combo", emoji: "🥬", protein: 12, time: "25 min", cat: "dinner",
    recipe: `<b>🥬 Bhindi + Dal — 12g protein</b>\n\nBhindi fry banao (2g)\nDal tadka side (7g)\nRoti (3g)\n\n<b>Simple ghar ka khaana — protein bhi hai agar dal saath mein ho! 🏠</b>` },

  { name: "Mushroom Paneer", emoji: "🍄", protein: 18, time: "20 min", cat: "dinner",
    recipe: `<b>🍄 Mushroom Paneer — 18g protein</b>\n\nMushroom slice karo (3g per 100g)\nPaneer cubes 100g (14g)\nPyaaz-tamatar masala mein dono pakao\n\n<b>Mushroom + paneer = umami + protein! 🤤</b>` },

  { name: "Tandoori Roti + Paneer", emoji: "🫓", protein: 20, time: "25 min", cat: "dinner",
    recipe: `<b>🫓 Tandoori Platter — 20g protein</b>\n\n2 tandoori roti (6g)\nPaneer tikka (14g)\nGreen chutney + pyaaz\n\n<b>Restaurant style ghar pe! 🍽️</b>` },

  { name: "Chicken Tikka", emoji: "🍗", protein: 24, time: "25 min", cat: "dinner",
    recipe: `<b>🍗 Chicken Tikka — 24g protein</b>\n\nChicken pieces hung curd + tikka masala mein marinate\n2 hrs fridge mein rakh do\nOven ya tawa pe cook\n\n<b>Party starter + protein source = win-win! 🎊</b>` },

  { name: "Stuffed Capsicum", emoji: "🫑", protein: 14, time: "25 min", cat: "dinner",
    recipe: `<b>🫑 Stuffed Capsicum — 14g protein</b>\n\nCapsicum hollow karo\nPaneer + boiled chana + masala ka filling\nOven mein ya tawa pe covered cook karo\n\n<b>Fancy dikhta hai, easy hai, protein bhi hai! 🎯</b>` },

  { name: "Dal Makhani", emoji: "🥣", protein: 10, time: "40 min", cat: "dinner",
    recipe: `<b>🥣 Dal Makhani — 10g protein</b>\n\nKali urad + rajma overnight soak\nPressure cook, phir cream + butter mein dheeme aag pe\nKasuri methi chidko\n\n<b>Dhaba style — slow cook = best taste! 🔥</b>` },

  // ==========================================
  // 🥤 DRINKS & SHAKES (61-72)
  // ==========================================

  { name: "Sattu Shake", emoji: "🥤", protein: 20, time: "2 min", cat: "drinks",
    recipe: `<b>🥤 Sattu Shake — 20g protein (₹5!)</b>\n\n2 tbsp sattu + 1 glass paani\nNimbu + kala namak + jeera\nMix karo, piyo!\n\n<b>India ka OG protein shake! 🇮🇳</b>` },

  { name: "PB Banana Smoothie", emoji: "🍌", protein: 16, time: "3 min", cat: "drinks",
    recipe: `<b>🍌 PB Banana Smoothie — 16g protein</b>\n\n1 glass doodh + 2 tbsp PB + 1 banana + shahad\nBlend karo — done!\n\n<b>Sabke liye hai! 💪</b>` },

  { name: "Dahi Smoothie Bowl", emoji: "🥣", protein: 18, time: "5 min", cat: "drinks",
    recipe: `<b>🥣 Dahi Smoothie Bowl — 18g protein</b>\n\n1 cup dahi (8g) + banana blend karo\nUpar: PB (4g) + granola (3g) + chia seeds (2g) + fruits\n\n<b>Instagram worthy + protein packed! 📸</b>` },

  { name: "Haldi Doodh Protein", emoji: "🥛", protein: 12, time: "5 min", cat: "drinks",
    recipe: `<b>🥛 Protein Haldi Doodh — 12g protein</b>\n\nGaram doodh (8g) + haldi + kali mirch\nBadam 5 kaat ke daalo (4g)\nShahad optional\n\n<b>Dadi ka nuskha + protein upgrade! 🙏</b>` },

  { name: "Mango Lassi Protein", emoji: "🥭", protein: 12, time: "3 min", cat: "drinks",
    recipe: `<b>🥭 Protein Mango Lassi — 12g protein</b>\n\n1 cup dahi (8g) + mango pulp\nThoda doodh + elaichi\nOptional: 1 scoop protein powder (+24g!)\n\n<b>Summer special — mango + protein! 🌞</b>` },

  { name: "Sattu Masala Drink", emoji: "🥤", protein: 20, time: "3 min", cat: "drinks",
    recipe: `<b>🥤 Sattu Masala — 20g protein</b>\n\n2 tbsp sattu + thanda paani\nPudina + adrak ka ras + nimbu\nKala namak + bhuna jeera\n\n<b>Garmi mein best — refreshing + 20g protein! ☀️</b>` },

  { name: "Chocolate Protein Shake", emoji: "🍫", protein: 30, time: "3 min", cat: "drinks",
    recipe: `<b>🍫 Chocolate Protein Shake — 30g protein</b>\n\n1 glass doodh (8g)\n1 scoop chocolate whey (24g)\n1 banana + ice\nBlend karo\n\n<b>Gym ke baad ya nashte mein — chocolate lover's dream! 🤤</b>` },

  { name: "Almond Date Shake", emoji: "🌰", protein: 12, time: "5 min", cat: "drinks",
    recipe: `<b>🌰 Badam Khajur Shake — 12g protein</b>\n\n1 glass doodh (8g)\n8-10 badam (soaked, peeled) (4g)\n2 khajur (seedless)\nElaichi + ice\n\n<b>Natural sweetness, zero sugar added! Bachche pasand karenge 👧</b>` },

  { name: "Green Protein Smoothie", emoji: "🥬", protein: 14, time: "5 min", cat: "drinks",
    recipe: `<b>🥬 Green Protein Smoothie — 14g protein</b>\n\n1 cup dahi (8g) + handful palak\n1 banana + 1 tbsp PB (4g)\nThoda paani + shahad\n\n<b>Palak ka taste nahi aata — trust karo! Try karo! 🌱</b>` },

  { name: "Masala Chaach", emoji: "🥛", protein: 5, time: "3 min", cat: "drinks",
    recipe: `<b>🥛 Masala Chaach — 5g protein</b>\n\nDahi + paani blend karo\nKala namak + jeera + pudina\nIce daalo\n\n<b>Lunch ke baad ek glass — digestion + protein! Sirf 60 cal ☀️</b>` },

  { name: "Ragi Porridge", emoji: "🥣", protein: 8, time: "10 min", cat: "drinks",
    recipe: `<b>🥣 Ragi Porridge — 8g protein</b>\n\nRagi flour + doodh mein pakao\nGur/shahad + elaichi\nBadam kaat ke daalo\n\n<b>Seniors ke liye perfect — soft, warm, nutritious! 👴</b>` },

  { name: "Cold Coffee Protein", emoji: "☕", protein: 14, time: "3 min", cat: "drinks",
    recipe: `<b>☕ Protein Cold Coffee — 14g protein</b>\n\n1 glass thanda doodh (8g)\n1 tsp instant coffee\n1 tbsp PB (4g) + shahad\nIce + blend karo\n\n<b>Cafe waali feel + 14g protein! ₹20 mein! ☕</b>` },

  // ==========================================
  // 🍿 SNACKS (73-88)
  // ==========================================

  { name: "Chana Chaat", emoji: "🥗", protein: 10, time: "5 min", cat: "snacks",
    recipe: `<b>🥗 Chana Chaat — 10g protein</b>\n\nBoiled chana + pyaaz + tamatar + dhaniya\nNimbu + chaat masala + hari chutney\n\n<b>Samose se 3x better! 🎯</b>` },

  { name: "Sprouts Salad", emoji: "🌱", protein: 9, time: "5 min", cat: "snacks",
    recipe: `<b>🌱 Sprouts Salad — 9g protein</b>\n\nSteamed sprouts + kheera + tamatar + pyaaz\nNimbu + chaat masala\n\n<b>Cost: ₹3-4. Almost free! 💰</b>` },

  { name: "PB Banana Roll", emoji: "🥜", protein: 12, time: "3 min", cat: "snacks",
    recipe: `<b>🥜 PB Banana Roll — 12g protein</b>\n\nRoti pe PB lagao (8g)\nBanana slice rakh do\nShahad drizzle, roll karo\n\n<b>3 min, zero cooking, 12g protein! 🤤</b>` },

  { name: "Masala Makhana", emoji: "⚪", protein: 5, time: "5 min", cat: "snacks",
    recipe: `<b>⚪ Masala Makhana — 5g protein</b>\n\nGhee mein roast 3-4 min\nHaldi + mirch + chaat masala + namak\nThanda hone do\n\n<b>Chai ke saath biscuit ki jagah ye! 🍵</b>` },

  { name: "Paneer Tikka Bites", emoji: "🧀", protein: 14, time: "15 min", cat: "snacks",
    recipe: `<b>🧀 Paneer Tikka Bites — 14g protein</b>\n\n100g paneer cubes + hung curd marinade\nTikka masala, 30 min marinate\nAir fry ya tawa pe\n\n<b>Party snack + protein — guests impressed! 🎉</b>` },

  { name: "Roasted Chana Mix", emoji: "🫘", protein: 12, time: "2 min", cat: "snacks",
    recipe: `<b>🫘 Roasted Chana Trail Mix — 12g protein</b>\n\n50g roasted chana (10g)\nMoongfali 10-15 (2g)\nThoda murmura + sev\nChaat masala\n\n<b>Ready-made snack — dabba mein bharke rakh lo! 🫙</b>` },

  { name: "Egg Salad", emoji: "🥚", protein: 14, time: "10 min", cat: "snacks",
    recipe: `<b>🥚 Egg Salad — 14g protein</b>\n\n2 boiled eggs chop karo (12g)\nPyaaz + tamatar + dhaniya\nNimbu + kali mirch + chaat masala\nToast pe serve (2g)\n\n<b>Healthy evening snack! 🌅</b>` },

  { name: "Moong Dal Namkeen", emoji: "🫘", protein: 8, time: "15 min", cat: "snacks",
    recipe: `<b>🫘 Moong Dal Namkeen — 8g protein</b>\n\nMoong dal bhigo ke sukha lo\nTel mein fry karo crispy hone tak\nNamak + mirch + chaat masala\n\n<b>Ghar ka namkeen — packet waale se better! 🏠</b>` },

  { name: "Dahi Papdi Chaat", emoji: "🥗", protein: 10, time: "10 min", cat: "snacks",
    recipe: `<b>🥗 Dahi Papdi Chaat — 10g protein</b>\n\nPapdi + boiled chana (5g)\nDahi ka layer (5g)\nMeethi chutney + hari chutney\nSev + dhaniya + chaat masala\n\n<b>Street food vibes + protein — best of both worlds! 🎊</b>` },

  { name: "Paneer Bhel", emoji: "🥗", protein: 12, time: "5 min", cat: "snacks",
    recipe: `<b>🥗 Paneer Bhel — 12g protein</b>\n\nMurmura + kati hui pyaaz + tamatar\n50g paneer cubes (7g)\nSev + chana (5g)\nNimbu + chaat masala\n\n<b>Bhel ka protein version! 🎯</b>` },

  { name: "Dhokla", emoji: "🟨", protein: 7, time: "20 min", cat: "snacks",
    recipe: `<b>🟨 Dhokla — 7g protein</b>\n\nBesan + dahi + eno/baking soda\nSteam 15 min\nRai + curry patta ka tadka\n\n<b>Gujarati snack — light + healthy + protein! Chai ke saath perfect 🍵</b>` },

  { name: "Soya Cutlet", emoji: "🟤", protein: 15, time: "20 min", cat: "snacks",
    recipe: `<b>🟤 Soya Cutlet — 15g protein</b>\n\nSoya chunks grind karo (keema jaisa)\nBoiled aloo + bread crumbs + masala\nShape karo, shallow fry ya air fry\n\n<b>Chai ke saath ya evening snack — protein loaded! 💪</b>` },

  { name: "Protein Laddu", emoji: "🟤", protein: 8, time: "15 min", cat: "snacks",
    recipe: `<b>🟤 Protein Laddu — 8g protein (per piece)</b>\n\nSattu + besan + dry fruits grind karo\nGhee + gur mein bind karo\nLaddu shape karo\n\n<b>Meetha bhi, protein bhi! Dadi bhi approve karegi! 🙏</b>` },

  { name: "Sprouts Tikki", emoji: "🌱", protein: 12, time: "20 min", cat: "snacks",
    recipe: `<b>🌱 Sprouts Tikki — 12g protein</b>\n\nSprouts steam + mash karo\nBoiled aloo + besan + masala mix karo\nTikki shape, tawa pe seko\nChutney ke saath serve\n\n<b>Aloo tikki upgrade — 3x protein! 🎯</b>` },

  { name: "Peanut Chikki", emoji: "🥜", protein: 7, time: "10 min", cat: "snacks",
    recipe: `<b>🥜 Peanut Chikki — 7g protein (per piece)</b>\n\nGur pighlao\nRoasted peanuts mix karo\nThali pe failao, thanda hone do\nPieces mein todo\n\n<b>Desi energy bar! ₹5 mein ghar pe banao 💰</b>` },

  { name: "Hung Curd Dip + Veggies", emoji: "🥕", protein: 10, time: "5 min", cat: "snacks",
    recipe: `<b>🥕 Hung Curd Veggie Dip — 10g protein</b>\n\n1 bowl hung curd (10g)\nGarlic powder + dhaniya + kali mirch\nGajar, kheera, shimla mirch sticks ke saath\n\n<b>Healthy party snack — mayo ki jagah ye use karo! 🎊</b>` },

  // ==========================================
  // 🌍 GLOBAL & FUSION (89-100)
  // ==========================================

  { name: "Paneer Burrito", emoji: "🌯", protein: 20, time: "15 min", cat: "global",
    recipe: `<b>🌯 Paneer Burrito — 20g protein</b>\n\nBig roti/tortilla pe:\nPaneer bhurji (14g) + rajma (3g)\nLettuce + dahi + cheese (3g)\nRoll karo tight\n\n<b>Mexican + Indian = protein fiesta! 🎉</b>` },

  { name: "Chickpea Pasta", emoji: "🍝", protein: 18, time: "15 min", cat: "global",
    recipe: `<b>🍝 Chickpea Pasta — 18g protein</b>\n\nChickpea pasta boil karo (14g)\nOlive oil + garlic + tamatar + basil\nPaneer ya tofu cubes daalo (4g)\n\n<b>Italian khaana — but high protein! 🇮🇹</b>` },

  { name: "Tofu Tikka Wrap", emoji: "🌯", protein: 16, time: "15 min", cat: "global",
    recipe: `<b>🌯 Tofu Tikka Wrap — 16g protein</b>\n\n150g tofu tikka masala mein grill (10g)\nRoti mein wrap karo\nHummus + pyaaz + salad (6g)\n\n<b>Vegan protein wrap — Middle Eastern x Indian! 🌍</b>` },

  { name: "Egg Sandwich", emoji: "🥪", protein: 16, time: "7 min", cat: "global",
    recipe: `<b>🥪 Protein Egg Sandwich — 16g protein</b>\n\n2 eggs scramble ya boiled mash (12g)\nMayo + mustard + kali mirch\n2 bread toast pe daal do (4g)\nLettuce + tamatar\n\n<b>Western breakfast, Indian protein! 🍞</b>` },

  { name: "Hummus + Pita", emoji: "🫘", protein: 12, time: "10 min", cat: "global",
    recipe: `<b>🫘 Hummus + Pita — 12g protein</b>\n\nCanned chickpeas + tahini + nimbu + garlic blend (8g)\nPita bread ya roti ke saath (4g)\nOlive oil + paprika upar\n\n<b>Lebanese protein snack — healthy fats + protein! 🇱🇧</b>` },

  { name: "Paneer Quesadilla", emoji: "🧀", protein: 20, time: "10 min", cat: "global",
    recipe: `<b>🧀 Paneer Quesadilla — 20g protein</b>\n\nRoti pe cheese + paneer bhurji (14g) spread karo\nDusri roti se cover\nTawa pe dono taraf seko till crispy\nSalsa + sour cream ke saath (6g)\n\n<b>Mexican Monday ghar pe! 🇲🇽</b>` },

  { name: "Chicken Shawarma Bowl", emoji: "🥗", protein: 28, time: "20 min", cat: "global",
    recipe: `<b>🥗 Chicken Shawarma Bowl — 28g protein</b>\n\nChicken strips shawarma spice mein cook (22g)\nRice base + salad\nGarlic sauce (dahi based) + hummus (6g)\n\n<b>Middle Eastern protein feast! 🌯</b>` },

  { name: "Lentil Soup", emoji: "🥣", protein: 12, time: "25 min", cat: "global",
    recipe: `<b>🥣 Lentil Soup — 12g protein</b>\n\nMasoor dal + pyaaz + tamatar + garlic\nOlive oil + cumin + nimbu\nPressure cook, blend smooth\nToast ke saath serve\n\n<b>Western soup, desi dal — comfort protein! 🍵</b>` },

  { name: "Greek Yogurt Parfait", emoji: "🥣", protein: 18, time: "5 min", cat: "global",
    recipe: `<b>🥣 Greek Yogurt Parfait — 18g protein</b>\n\nGreek yogurt layer (15g)\nGranola + honey\nFresh fruits + chia seeds (3g)\nRepeat layers\n\n<b>Dessert jaisa lagta hai, protein bomb hai! 🍯</b>` },

  { name: "Falafel Plate", emoji: "🧆", protein: 15, time: "25 min", cat: "global",
    recipe: `<b>🧆 Falafel Plate — 15g protein</b>\n\nChana soak + grind (herbs + spices ke saath)\nShape karo, deep fry ya bake\n5 falafels (9g) + hummus (6g)\nPita + salad\n\n<b>Vegan protein plate — complete meal! 🌿</b>` },

  { name: "Soy Pasta Aglio Olio", emoji: "🍝", protein: 24, time: "12 min", cat: "global",
    recipe: `<b>🍝 Soy Pasta Aglio Olio — 24g protein</b>\n\nSoy pasta boil karo (20g)\nOlive oil + garlic + red chili flakes\nParsley + lemon juice\nPaneer cubes optional (+4g)\n\n<b>Italian simplicity, soy ka protein! 🇮🇹💪</b>` },

  { name: "Protein Buddha Bowl", emoji: "🥗", protein: 22, time: "20 min", cat: "global",
    recipe: `<b>🥗 Protein Buddha Bowl — 22g protein</b>\n\nQuinoa base (8g)\nRoasted chana (5g) + paneer cubes (7g)\nAvocado + veggies\nTahini dressing (2g)\n\n<b>Pinterest worthy, protein loaded, satisfying! 🎨</b>` },
];

module.exports = RECIPES;
