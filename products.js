// Indian Readymade Protein Products Guide
// Real brands, real products, approximate prices (2025-2026)
// Organized by category for the /products command

const PRODUCTS = {
  categories: [
    { id: "milk", label: "🥛 Protein Milk & Shakes", emoji: "🥛" },
    { id: "yogurt", label: "🍶 Protein Yogurt & Dahi", emoji: "🍶" },
    { id: "bar", label: "🍫 Protein Bars", emoji: "🍫" },
    { id: "snack", label: "🍿 Protein Snacks & Chips", emoji: "🍿" },
    { id: "powder", label: "💪 Protein Powders", emoji: "💪" },
    { id: "cereal", label: "🥣 Protein Muesli & Cereal", emoji: "🥣" },
    { id: "atta", label: "🫓 Protein Atta & Pasta", emoji: "🫓" },
    { id: "drink", label: "🥤 Protein Drinks & Mixes", emoji: "🥤" },
  ],
  items: [
    // ===== PROTEIN MILK & SHAKES =====
    { brand: "Amul", name: "Amul Protein Milk", protein: 20, cal: 160, price: 30, serving: "250ml bottle", cat: "milk", verdict: "Best value! ₹1.5/g protein. Available everywhere.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "Amul", name: "Amul Protein Lassi", protein: 20, cal: 170, price: 35, serving: "250ml bottle", cat: "milk", verdict: "Tasty + 20g protein. Great post-lunch option.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "Amul", name: "Amul Protein Shake (Choc/Vanilla)", protein: 20, cal: 180, price: 40, serving: "200ml bottle", cat: "milk", verdict: "Thick, filling. Good for on-the-go.", rating: "⭐⭐⭐⭐" },
    { brand: "Epigamia", name: "Epigamia Turbo Protein Milkshake", protein: 20, cal: 190, price: 110, serving: "250ml bottle", cat: "milk", verdict: "Premium taste but 3x costlier than Amul. Try it once.", rating: "⭐⭐⭐" },
    { brand: "Mother Dairy", name: "Mother Dairy Protein Shake", protein: 18, cal: 170, price: 35, serving: "250ml bottle", cat: "milk", verdict: "Good alternative to Amul. Widely available.", rating: "⭐⭐⭐⭐" },
    { brand: "Go (Parag)", name: "Go Protein Milkshake", protein: 20, cal: 180, price: 40, serving: "200ml bottle", cat: "milk", verdict: "Decent option. Good chocolate flavor.", rating: "⭐⭐⭐⭐" },
    { brand: "Milky Mist", name: "Milky Mist Protein Milk", protein: 15, cal: 140, price: 35, serving: "200ml bottle", cat: "milk", verdict: "South India mein available. Good taste.", rating: "⭐⭐⭐" },

    // ===== PROTEIN YOGURT & DAHI =====
    { brand: "Epigamia", name: "Epigamia Turbo Protein Yogurt (430g)", protein: 50, cal: 300, price: 200, serving: "430g tub", cat: "yogurt", verdict: "50g protein in one tub! Best protein yogurt in India. Creamy.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "Epigamia", name: "Epigamia Greek Yogurt (85g)", protein: 8, cal: 60, price: 60, serving: "85g cup", cat: "yogurt", verdict: "Good snack size. Premium but tasty.", rating: "⭐⭐⭐⭐" },
    { brand: "Amul", name: "Amul Greek Yogurt", protein: 14, cal: 120, price: 50, serving: "125g cup", cat: "yogurt", verdict: "Cheaper than Epigamia. Decent protein. Thicker texture.", rating: "⭐⭐⭐⭐" },
    { brand: "Amul", name: "Amul Protein Dahi", protein: 15, cal: 130, price: 35, serving: "200g cup", cat: "yogurt", verdict: "Cheapest protein dahi. Taste is sour — mix with fruit.", rating: "⭐⭐⭐" },
    { brand: "Milky Mist", name: "Milky Mist Skyr Protein Yogurt", protein: 12, cal: 80, price: 75, serving: "100g cup", cat: "yogurt", verdict: "Icelandic-style. Low cal, high protein. Premium.", rating: "⭐⭐⭐⭐" },
    { brand: "Danone", name: "Danone Protein Yogurt", protein: 12, cal: 100, price: 55, serving: "100g cup", cat: "yogurt", verdict: "Global brand. Smooth texture. Available in metros.", rating: "⭐⭐⭐" },

    // ===== PROTEIN BARS =====
    { brand: "Yoga Bar", name: "Yoga Bar Protein Bar (20g)", protein: 20, cal: 280, price: 125, serving: "60g bar", cat: "bar", verdict: "Best mainstream protein bar. Good taste, widely available.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "RiteBite", name: "RiteBite Max Protein Daily (10g)", protein: 10, cal: 140, price: 65, serving: "50g bar", cat: "bar", verdict: "Budget bar. 10g is decent for a snack. Available everywhere.", rating: "⭐⭐⭐⭐" },
    { brand: "RiteBite", name: "RiteBite Max Protein (20g)", protein: 20, cal: 260, price: 150, serving: "70g bar", cat: "bar", verdict: "Full protein bar. Good for meal replacement.", rating: "⭐⭐⭐⭐" },
    { brand: "The Whole Truth", name: "Whole Truth Protein Bar", protein: 20, cal: 240, price: 110, serving: "52g bar", cat: "bar", verdict: "Clean label — no added sugar, date-sweetened. Premium.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "SuperYou", name: "SuperYou Protein Wafer Bar", protein: 10, cal: 180, price: 59, serving: "40g bar", cat: "bar", verdict: "Wafer format! Tastes like a treat, not a supplement. Ranveer Singh's brand.", rating: "⭐⭐⭐⭐" },
    { brand: "SuperYou", name: "SuperYou Mega Wafer (20g)", protein: 20, cal: 280, price: 99, serving: "60g bar", cat: "bar", verdict: "Double protein wafer. Made with atta & jowar. No palm oil.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "Max Protein", name: "Max Protein Daily Bar", protein: 10, cal: 150, price: 50, serving: "50g bar", cat: "bar", verdict: "Budget-friendly. Available on quick commerce.", rating: "⭐⭐⭐" },
    { brand: "Max Protein", name: "Max Protein Active Bar (20g)", protein: 20, cal: 260, price: 120, serving: "75g bar", cat: "bar", verdict: "Full-size bar. Multiple flavors. Good gym option.", rating: "⭐⭐⭐⭐" },
    { brand: "Muscleblaze", name: "MuscleBlaze Protein Bar", protein: 20, cal: 270, price: 135, serving: "72g bar", cat: "bar", verdict: "Popular gym brand bar. Rich chocolate. Filling.", rating: "⭐⭐⭐⭐" },

    // ===== PROTEIN SNACKS & CHIPS =====
    { brand: "SuperYou", name: "SuperYou Protein Chips (Cheese & Tomato)", protein: 10, cal: 160, price: 40, serving: "40g pack", cat: "snack", verdict: "Baked not fried. No palm oil. Tastes like regular chips!", rating: "⭐⭐⭐⭐" },
    { brand: "SuperYou", name: "SuperYou Protein Puffs", protein: 7, cal: 120, price: 35, serving: "30g pack", cat: "snack", verdict: "Light puff snack. Good for chai time.", rating: "⭐⭐⭐" },
    { brand: "The Baker's Dozen", name: "Baker's Dozen Protein Chips (Masala)", protein: 7, cal: 140, price: 40, serving: "45g pack", cat: "snack", verdict: "Crunchy masala chips. Fun alternative to regular chips.", rating: "⭐⭐⭐⭐" },
    { brand: "Taali", name: "Taali Protein Puffs (Masala)", protein: 5, cal: 110, price: 30, serving: "30g pack", cat: "snack", verdict: "Corn & jowar based. No palm oil. Light snack.", rating: "⭐⭐⭐" },
    { brand: "Yoga Bar", name: "Yoga Bar Protein Nuts", protein: 12, cal: 200, price: 80, serving: "40g pack", cat: "snack", verdict: "Trail mix with added protein. Good for travel.", rating: "⭐⭐⭐⭐" },
    { brand: "True Elements", name: "True Elements Protein Makhana", protein: 8, cal: 130, price: 60, serving: "35g pack", cat: "snack", verdict: "Protein-enriched makhana. Better than regular makhana.", rating: "⭐⭐⭐⭐" },
    { brand: "Only What's Needed", name: "OWN Protein Chips", protein: 10, cal: 150, price: 50, serving: "40g pack", cat: "snack", verdict: "Clean ingredients. Available in select cities.", rating: "⭐⭐⭐" },

    // ===== PROTEIN POWDERS =====
    { brand: "MuscleBlaze", name: "MB Biozyme Whey", protein: 25, cal: 130, price: 45, serving: "1 scoop (33g)", cat: "powder", verdict: "India's #1 selling whey. Enhanced digestion. Trustified certified.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "MuscleBlaze", name: "MB Raw Whey (Unflavoured)", protein: 24, cal: 120, price: 35, serving: "1 scoop (33g)", cat: "powder", verdict: "No flavor = no additives. Cheapest MB option. Mix in anything.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "Nakpro", name: "Nakpro Perform Raw Whey", protein: 25, cal: 125, price: 37, serving: "1 scoop (33g)", cat: "powder", verdict: "Best value whey in India. ₹1.48/g protein. Lab-tested.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "AS-IT-IS", name: "AS-IT-IS ATOM Whey", protein: 24, cal: 117, price: 35, serving: "1 scoop (30g)", cat: "powder", verdict: "Labdoor USA certified. Minimal ingredients. Honest brand.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "Optimum Nutrition", name: "ON Gold Standard Whey", protein: 24, cal: 120, price: 55, serving: "1 scoop (31g)", cat: "powder", verdict: "Global gold standard. Trusted 20+ years. Premium price.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "Myprotein", name: "Myprotein Impact Whey", protein: 21, cal: 103, price: 40, serving: "1 scoop (25g)", cat: "powder", verdict: "UK brand, good quality. 80+ flavors. Popular online.", rating: "⭐⭐⭐⭐" },
    { brand: "OZiva", name: "OZiva Plant Protein", protein: 25, cal: 160, price: 50, serving: "1 scoop (40g)", cat: "powder", verdict: "Best plant-based option. Pea + brown rice. Clean label.", rating: "⭐⭐⭐⭐" },
    { brand: "SuperYou", name: "SuperYou Pro Fermented Yeast Protein", protein: 25, cal: 130, price: 60, serving: "1 scoop (35g)", cat: "powder", verdict: "Innovative — fermented yeast protein. PDCAAS 1.0. Ranveer Singh backed.", rating: "⭐⭐⭐⭐" },
    { brand: "The Whole Truth", name: "Whole Truth Whey Protein", protein: 24, cal: 120, price: 55, serving: "1 scoop (33g)", cat: "powder", verdict: "Clean label. No fillers. Light cocoa flavor. Sachets available.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "Boldfit", name: "Boldfit Whey Protein", protein: 24, cal: 130, price: 35, serving: "1 scoop (33g)", cat: "powder", verdict: "Budget option. Decent quality. Good for beginners.", rating: "⭐⭐⭐" },
    { brand: "Avvatar", name: "Avvatar Absolute Whey", protein: 24, cal: 128, price: 38, serving: "1 scoop (32g)", cat: "powder", verdict: "Indian brand, consistent quality. Good value.", rating: "⭐⭐⭐⭐" },
    { brand: "Plix", name: "Plix Plant Protein", protein: 25, cal: 145, serving: "1 scoop (35g)", price: 55, cat: "powder", verdict: "Vegan protein. Pea-based. Smooth mixing.", rating: "⭐⭐⭐⭐" },

    // ===== PROTEIN MUESLI & CEREAL =====
    { brand: "True Elements", name: "True Elements Protein Muesli", protein: 15, cal: 200, price: 60, serving: "50g bowl", cat: "cereal", verdict: "Best protein muesli. Added soy + nuts. Daily breakfast option.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "Yoga Bar", name: "Yoga Bar Muesli (Dark Choc)", protein: 12, cal: 190, price: 55, serving: "50g bowl", cat: "cereal", verdict: "Tasty! Chocolate makes it feel like a treat.", rating: "⭐⭐⭐⭐" },
    { brand: "Max Protein", name: "Max Protein Muesli", protein: 14, cal: 200, price: 50, serving: "50g bowl", cat: "cereal", verdict: "Good value muesli. Multiple flavors.", rating: "⭐⭐⭐⭐" },
    { brand: "The Whole Truth", name: "Whole Truth Protein Granola", protein: 12, cal: 210, price: 80, serving: "50g bowl", cat: "cereal", verdict: "Premium granola. No added sugar. Crunchy.", rating: "⭐⭐⭐⭐" },
    { brand: "Bagrry's", name: "Bagrry's Protein Muesli", protein: 12, cal: 180, price: 40, serving: "50g bowl", cat: "cereal", verdict: "Budget option. Available everywhere. Decent protein.", rating: "⭐⭐⭐" },

    // ===== PROTEIN ATTA & PASTA =====
    { brand: "Aashirvaad", name: "Aashirvaad Protein+ Atta", protein: 14, cal: 340, price: 70, serving: "100g (3-4 rotis)", cat: "atta", verdict: "Mainstream option. +4g protein per 100g vs regular atta. Easy switch.", rating: "⭐⭐⭐⭐" },
    { brand: "Saffola", name: "Saffola Protein Atta", protein: 15, cal: 350, price: 75, serving: "100g", cat: "atta", verdict: "Slightly more protein than Aashirvaad. Good taste.", rating: "⭐⭐⭐⭐" },
    { brand: "The Whole Truth", name: "Whole Truth Chickpea Pasta", protein: 20, cal: 350, price: 120, serving: "100g dry", cat: "atta", verdict: "20g protein pasta! No maida. Clean ingredient list.", rating: "⭐⭐⭐⭐⭐" },
    { brand: "Slurrp Farm", name: "Slurrp Farm Protein Pasta", protein: 15, cal: 340, price: 90, serving: "100g dry", cat: "atta", verdict: "Lentil-based. Kid-friendly shapes. Good for families.", rating: "⭐⭐⭐⭐" },
    { brand: "NuNature", name: "NuNature Soy Pasta", protein: 22, cal: 330, price: 110, serving: "100g dry", cat: "atta", verdict: "Highest protein pasta. Soy-based. 2x regular pasta.", rating: "⭐⭐⭐⭐" },

    // ===== PROTEIN DRINKS & MIXES =====
    { brand: "Protinex", name: "Protinex Original", protein: 17, cal: 200, price: 15, serving: "2 scoops + milk", cat: "drink", verdict: "Legacy brand. Parents trust it. Good for seniors. ₹15/serve.", rating: "⭐⭐⭐⭐" },
    { brand: "Protinex", name: "Protinex Grow (for kids)", protein: 12, cal: 180, price: 15, serving: "2 scoops + milk", cat: "drink", verdict: "For kids 8-15. Parents already buy it. Add to daily routine.", rating: "⭐⭐⭐" },
    { brand: "Complan", name: "Complan Protein", protein: 12, cal: 200, price: 12, serving: "2 scoops + milk", cat: "drink", verdict: "Cheapest option. Familiar brand. Good for elders.", rating: "⭐⭐⭐" },
    { brand: "Horlicks", name: "Horlicks Protein Plus", protein: 16, cal: 190, price: 18, serving: "2 scoops + milk", cat: "drink", verdict: "Trusted brand. Better protein than regular Horlicks.", rating: "⭐⭐⭐⭐" },
    { brand: "Fast&Up", name: "Fast&Up Plant Protein", protein: 30, cal: 175, price: 75, serving: "1 scoop (45g)", cat: "drink", verdict: "30g plant protein! Premium price but very effective.", rating: "⭐⭐⭐⭐" },
    { brand: "Sattu", name: "Sattu Powder (any brand)", protein: 20, cal: 170, price: 5, serving: "2 tbsp (40g)", cat: "drink", verdict: "₹5 per serve! India's OG protein shake. Unbeatable value.", rating: "⭐⭐⭐⭐⭐" },
  ],
};

module.exports = PRODUCTS;
