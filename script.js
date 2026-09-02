/* ============================================================
   ELLAURA MIST — script.js
   All state management, quiz logic, product rendering, 
   modal handling, navbar, form validation
   ============================================================ */

// ============================================================
// DATA: Quiz Questions
// ============================================================
// PLACEHOLDER — exact wording/mapping to be confirmed with client later.
const quizQuestions = [
  {
    id: "q1",
    question: "How does your skin feel by midday?",
    options: [
      { label: "Oily & Shiny", value: "oily", icon: "droplet" },
      { label: "Dry & Tight", value: "dry", icon: "sun" },
      { label: "Normal & Balanced", value: "all", icon: "sparkle" },
      { label: "Sensitive & Reactive", value: "sensitive", icon: "shield" }
    ]
  },
  {
    id: "q2",
    question: "What's your biggest skin concern?",
    options: [
      { label: "Acne & Breakouts", value: "oily", icon: "droplet" },
      { label: "Dark Spots & Pigmentation", value: "combination", icon: "sparkle" },
      { label: "Dryness & Dullness", value: "dry", icon: "sun" },
      { label: "Redness & Irritation", value: "sensitive", icon: "shield" }
    ]
  },
  {
    id: "q3",
    question: "How does your skin react to new products?",
    options: [
      { label: "Rarely reacts, handles most things", value: "all", icon: "sparkle" },
      { label: "Gets oily/breaks out easily", value: "oily", icon: "droplet" },
      { label: "Feels dry/tight after use", value: "dry", icon: "sun" },
      { label: "Often gets red/irritated", value: "sensitive", icon: "shield" }
    ]
  }
];

// Result descriptions for each skin type
const skinTypeDescriptions = {
  oily: "Your skin tends to produce excess oil, especially in the T-zone. Look for lightweight, non-comedogenic products that control shine without stripping moisture.",
  dry: "Your skin craves hydration and may feel tight or flaky. Opt for rich, nourishing formulas with ingredients like Shea Butter, Aloe Vera, and Vitamin E.",
  sensitive: "Your skin reacts easily to new products and environmental factors. Choose gentle, fragrance-free formulas designed to soothe and protect.",
  combination: "Your skin has a mix of concerns — oily in some areas, dry in others. Look for balanced formulas that address multiple skin needs.",
  all: "Your skin is well-balanced and resilient! You can enjoy a wide range of products. Focus on maintaining your skin's natural harmony."
};

const skinTypeLabels = {
  oily: "Oily Skin",
  dry: "Dry Skin",
  sensitive: "Sensitive Skin",
  combination: "Combination Skin",
  all: "Normal / Balanced Skin"
};

// ============================================================
// DATA: Products
// ============================================================
// NOTE: image paths are placeholders pointing to assets/images/ — actual product photos
// to be added later from client, mark with comment PLACEHOLDER — real product images pending.
// NOTE: skinType values are best-guess mapping from catalogue content —
// PLACEHOLDER — client will confirm exact skin-type-to-product mapping later.
const products = [
  {
    id: 1,
    category: "Sunscreen",
    name: "Skin Protection Sunscreen SPF 50 PA+++",
    tagline: "Ultra Professional Broad Spectrum Protection",
    highlights: [
      { icon: "sun", title: "SPF 50 PA+++", desc: "Broad Spectrum Protection" },
      { icon: "droplet", title: "Lightweight & Non-Greasy", desc: "Perfect for Everyday Use" },
      { icon: "leaf", title: "With Natural Extracts", desc: "Nourishes & Protects Skin" },
      { icon: "shield", title: "All Skin Types", desc: "Dermatologically Tested" }
    ],
    size: "50g",
    price: 549,
    image: "assets/images/sunscreen.jpg",
    amazonLink: "https://www.amazon.in/ELLAURA-MIST-Sunscreen-Broad-Spectrum/dp/B0F92QR8K8/ref=sr_1_13?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-13", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["all"]
  },
  {
    id: 2,
    category: "Face Wash",
    name: "Salicylic Acid Face Wash",
    tagline: "Acne & Oil Control",
    highlights: [
      { icon: "droplet", title: "Deep Pore Cleansing", desc: "Removes dirt, oil & impurities" },
      { icon: "sparkle", title: "Controls Excess Oil", desc: "Reduces shine, keeps skin fresh" },
      { icon: "shield", title: "Helps Prevent Acne", desc: "Reduces breakouts & soothes irritation" },
      { icon: "leaf", title: "Gentle & Effective", desc: "Suitable for daily use" }
    ],
    size: "100ml",
    price: 399,
    image: "assets/images/salicylic-facewash.jpg",
    amazonLink: "https://www.amazon.in/Ellaura-Salicylic-Cleanser-Control-Blackhead/dp/B0DPXL55W1/ref=sr_1_16?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-16", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["oily"]
  },
  {
    id: 3,
    category: "Face Wash",
    name: "Kojic Acid Face Wash",
    tagline: "Vitamin C & E",
    highlights: [
      { icon: "sparkle", title: "Visibly Brightens Skin", desc: "Reduces dark spots & pigmentation" },
      { icon: "sparkle", title: "Evens Skin Tone", desc: "Improves uneven tone for radiant glow" },
      { icon: "shield", title: "Anti-Pigmentation", desc: "Fades blemishes & acne marks" },
      { icon: "droplet", title: "Hydrating & Gentle", desc: "Cleanses while nourishing" }
    ],
    size: "100ml",
    price: 399,
    image: "assets/images/kojic-facewash.png",
    amazonLink: "https://www.amazon.in/Niacinamide-Hyperpigmentation-Dermatologist-cleanser-combination/dp/B0DPXLKMKQ/ref=sr_1_9?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-9", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["combination"]
  },
  {
    id: 4,
    category: "Face Wash",
    name: "All Skin Type Face Wash",
    tagline: "Gentle Cleanse for Healthy, Fresh & Glowing Skin",
    highlights: [
      { icon: "droplet", title: "Deep Cleanses", desc: "Removes dirt, oil & impurities" },
      { icon: "leaf", title: "Gentle & Non-Drying", desc: "Maintains skin's natural moisture" },
      { icon: "sparkle", title: "Suitable for All Skin Types", desc: "Even for sensitive skin" },
      { icon: "shield", title: "pH Balanced", desc: "Protects skin barrier" }
    ],
    size: "100ml",
    price: 399,
    image: "assets/images/allskin-facewash.png",
    amazonLink: "https://www.amazon.in/Glycolic-Facewash-Hydration-Elasticity-Exfoliating/dp/B0DQ8GM3VH/ref=sr_1_10?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-10", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["sensitive", "all"]
  },
  {
    id: 5,
    category: "Moisturizer",
    name: "Moisturizing Cream (Glow & Nourish)",
    tagline: "Deep Hydration for Soft, Smooth & Radiant Skin",
    highlights: [
      { icon: "droplet", title: "Intense Hydration", desc: "Deeply moisturizes & locks in moisture" },
      { icon: "leaf", title: "Nourishes & Repairs", desc: "Supports skin barrier & improves texture" },
      { icon: "sparkle", title: "Brightens Skin", desc: "Enhances natural glow & evens tone" },
      { icon: "shield", title: "For All Skin Types", desc: "Lightweight, non-greasy, fast absorbing" }
    ],
    size: "50g",
    price: 479,
    image: "assets/images/moisturizing-cream.png",
    amazonLink: "https://www.amazon.in/ELLAURA-Granactive-Retinoid-Anti-Aging-Renewal/dp/B0DPXQXQBZ/ref=sr_1_3?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-3", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["dry", "all"]
  },
  {
    id: 6,
    category: "Gel",
    name: "Aloe Vera Gel",
    tagline: "Soothes. Hydrates. Refreshes.",
    highlights: [
      { icon: "droplet", title: "Intense Hydration", desc: "Deeply hydrates & soothes irritated skin" },
      { icon: "leaf", title: "Soothes & Calms", desc: "Reduces redness & inflammation" },
      { icon: "sparkle", title: "Lightweight & Non-Sticky", desc: "Quick absorbing for all skin types" },
      { icon: "shield", title: "Daily Skin Refresh", desc: "Leaves skin cool, energized & healthy" }
    ],
    size: "100ml",
    price: 199,
    image: "assets/images/aloevera-gel.jpg",
    amazonLink: "https://www.amazon.in/Premium-Ingredients-Hydration-Hyaluronic-Dermatologist/dp/B0FJZQHMT7/ref=sr_1_8?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-8", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["sensitive", "all"]
  },
  {
    id: 7,
    category: "Toner",
    name: "Face Toner",
    tagline: "Refresh. Balance. Renew Your Skin.",
    highlights: [
      { icon: "droplet", title: "Deep Hydration", desc: "Hydrates & revitalizes tired, dull skin" },
      { icon: "sparkle", title: "Balances pH", desc: "Maintains skin's natural pH balance" },
      { icon: "shield", title: "Tightens Pores", desc: "Helps minimize pores for smoother look" },
      { icon: "leaf", title: "Refreshes Skin", desc: "Removes impurities, refreshes instantly" }
    ],
    size: "100ml",
    price: 299,
    image: "assets/images/face-toner.png",
    amazonLink: "https://www.amazon.in/Face-toner-Niacinamide-hyaluronic-Toner/dp/B0FJZGGB5L/ref=sr_1_4?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-4", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["all"]
  },
  {
    id: 8,
    category: "Pack",
    name: "D-Tan Pack",
    tagline: "Helps Reduce Tan & Brighten Skin",
    highlights: [
      { icon: "leaf", title: "Reduces Tan", desc: "Helps fade tan and even out skin tone" },
      { icon: "sparkle", title: "Brightens Skin", desc: "Enhances natural glow and radiance" },
      { icon: "droplet", title: "Nourishes Deeply", desc: "Hydrates & nourishes for soft, smooth skin" },
      { icon: "shield", title: "Natural & Safe", desc: "Enriched with natural ingredients" }
    ],
    size: "100ml",
    price: 299,
    image: "assets/images/dtan-pack.jpg",
    amazonLink: "https://www.amazon.in/Ellaura-Mist-D-Tan-Pack-Face/dp/B0FMB8XTTD/ref=sr_1_6?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-6", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["all"]
  },
  {
    id: 9,
    category: "Scrub",
    name: "Face Scrub",
    tagline: "Exfoliate. Renew. Reveal Smoother Skin.",
    highlights: [
      { icon: "sparkle", title: "Removes Dead Skin Cells", desc: "Gently exfoliates & removes impurities" },
      { icon: "shield", title: "Unclogs Pores", desc: "Clears dirt, oil & unclogs pores deeply" },
      { icon: "droplet", title: "Refines Skin Texture", desc: "Smoothens roughness & improves texture" },
      { icon: "leaf", title: "Gentle & Non-Irritating", desc: "Suitable for all skin types" }
    ],
    size: "100ml",
    price: 349,
    image: "assets/images/face-scrub.png",
    amazonLink: "https://www.amazon.in/Ellaura-Mist-Face-Scrub-Dermatologist/dp/B0FM9HDLDK/ref=sr_1_12?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-12", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["all"]
  },
  {
    id: 10,
    category: "Serum",
    name: "Face Serum",
    tagline: "Nourish. Revive. Glow.",
    highlights: [
      { icon: "droplet", title: "Deep Hydration", desc: "Intensely hydrates skin from within" },
      { icon: "sparkle", title: "Boosts Skin Glow", desc: "Enhances natural radiance & evens tone" },
      { icon: "shield", title: "Repairs Skin Barrier", desc: "Strengthens & protects for healthier skin" },
      { icon: "leaf", title: "Lightweight Formula", desc: "Fast absorbing, non-sticky" }
    ],
    size: "30ml",
    price: 599,
    image: "assets/images/face-serum.png",
    amazonLink: "https://www.amazon.in/Vitamin-Serum-Glowing-Skin-Multi-Action/dp/B0FJZZDDJV/ref=sr_1_7?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-7", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["all"]
  },
  {
    id: 11,
    category: "Eye Care",
    name: "Under Eye Roll-On Serum",
    tagline: "Awaken. Brighten. Refresh.",
    highlights: [
      { icon: "eye", title: "Reduces Dark Circles", desc: "Visibly minimizes dark circles & puffiness" },
      { icon: "eye", title: "De-Puffs Instantly", desc: "Cools & calms tired, puffy eyes" },
      { icon: "droplet", title: "Hydrates & Nourishes", desc: "Deep hydration for soft under eyes" },
      { icon: "sparkle", title: "Easy Roll-On Applicator", desc: "Mess-free, gentle, daily use" }
    ],
    size: "15ml",
    price: 569,
    image: "assets/images/undereye-serum.jpg",
    amazonLink: "https://www.amazon.in/Ellaura-Under-Cream-Circles-Puffiness/dp/B0FYYSR7HK/ref=sr_1_15?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-15", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["all"]
  },
  {
    id: 12,
    category: "Lotion",
    name: "Moisturizing Lotion",
    tagline: "Nourish. Protect. Glow Naturally.",
    highlights: [
      { icon: "droplet", title: "Deep Hydration", desc: "Long-lasting moisture & softness" },
      { icon: "leaf", title: "Nourishes & Repairs", desc: "Enriched with natural goodness" },
      { icon: "shield", title: "Strengthens Skin Barrier", desc: "Helps protect & restore skin's barrier" },
      { icon: "sparkle", title: "Non-Greasy Formula", desc: "Lightweight & fast absorbing" }
    ],
    size: "100ml / 200ml",
    price: 169,
    image: "assets/images/moisturizing-lotion.jpg",
    amazonLink: "https://www.amazon.in/Moisturizing-Hydration-Non-Greasy-Lightweight-Dermatologically/dp/B0G448MCRS/ref=sr_1_11?crid=19U9S1C8VLL2P&dib=eyJ2IjoiMSJ9.GIkPzaLfuwave6Sd725TDQzZTIK-bu9AstGxm0zJXgj8R_dZiydEWVljvyX_vl9YYND9CdIZwHFhLMFKlF7JBPIWgEECzQYu9VxHiJGGj0AdqjLulKBVNfUuHGt2nK471IvOYU21GMiOZMQsWnqHbXO09PHgVHL05OJwpQnzBeHMo5RRKzVuZjRX5vAiKv4a0wwZfiUg_DNG0T2kqh33Ig.0i15lygNu9tuiDwXlWKc-aJUStLTJlIffKWPQj_VlxA&dib_tag=se&keywords=ellauramist&qid=1787637505&sprefix=ellauram%2Caps%2C544&sr=8-11", // PLACEHOLDER: Amazon link, client will provide
    skinType: ["dry", "all"]
  }
];


// ============================================================
// STATE MANAGEMENT
// ============================================================
let quizAnswers = {};
let currentQuizStep = 0;
let activeFilter = "All";
let selectedProduct = null;


// ============================================================
// ICON SVG HELPER
// ============================================================
function getIconSVG(iconName) {
  const icons = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
  };
  return icons[iconName] || icons.sparkle;
}


// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobilePanel = document.getElementById('mobilePanel');
  const navLinksDesktop = document.querySelectorAll('#navLinks a');
  const navLinksMobile = document.querySelectorAll('#mobilePanel a');
  const allNavLinks = [...navLinksDesktop, ...navLinksMobile];

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    mobilePanel.classList.toggle('open');
    document.body.style.overflow = mobilePanel.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on overlay click
  mobileOverlay.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileOverlay.classList.remove('open');
    mobilePanel.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Smooth scroll & close mobile menu on link click
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const offset = 80;
        const y = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      // Close mobile nav
      hamburger.classList.remove('open');
      mobileOverlay.classList.remove('open');
      mobilePanel.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Scroll handler: navbar style + active link
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    const scrollY = window.scrollY;

    // Navbar background change
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section detection
    let currentSection = 'home';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        currentSection = section.getAttribute('id');
      }
    });

    // Update active links
    navLinksDesktop.forEach(a => {
      a.classList.toggle('active', a.dataset.section === currentSection);
    });
    navLinksMobile.forEach(a => {
      a.classList.toggle('active', a.dataset.section === currentSection);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initial call
}


// ============================================================
// QUIZ
// ============================================================
function initQuiz() {
  const container = document.getElementById('quizQuestionsContainer');
  const progressLabel = document.getElementById('quizStepLabel');
  const progressFill = document.getElementById('quizProgressFill');
  const progressBar = document.getElementById('quizProgress');
  const nextBtn = document.getElementById('quizNextBtn');
  const resultDiv = document.getElementById('quizResult');
  const resultType = document.getElementById('resultType');
  const resultDesc = document.getElementById('resultDesc');
  const restartBtn = document.getElementById('quizRestartBtn');
  const viewRecommendedBtn = document.getElementById('viewRecommendedBtn');

  function renderQuestion(index) {
    if (index >= quizQuestions.length) {
      showResult();
      return;
    }

    const q = quizQuestions[index];
    progressLabel.textContent = `Step ${index + 1} / ${quizQuestions.length}`;
    progressFill.style.width = `${((index + 1) / quizQuestions.length) * 100}%`;

    container.innerHTML = `
      <div class="quiz-question">
        <h3>${q.question}</h3>
      </div>
      <div class="quiz-options">
        ${q.options.map(opt => `
          <div class="quiz-option" data-value="${opt.value}">
            <div class="option-icon">${getIconSVG(opt.icon)}</div>
            <span class="option-label">${opt.label}</span>
          </div>
        `).join('')}
      </div>
    `;

    // Restore selected state if user goes back
    if (quizAnswers[q.id]) {
      const selected = container.querySelector(`[data-value="${quizAnswers[q.id]}"]`);
      if (selected) selected.classList.add('selected');
    }

    // Option click handlers
    const optionEls = container.querySelectorAll('.quiz-option');
    optionEls.forEach(el => {
      el.addEventListener('click', () => {
        optionEls.forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');
        quizAnswers[q.id] = el.dataset.value;

        // Auto-advance after short delay
        nextBtn.style.display = 'inline-flex';
        setTimeout(() => {
          currentQuizStep++;
          renderQuestion(currentQuizStep);
        }, 400);
      });
    });

    nextBtn.style.display = quizAnswers[q.id] ? 'inline-flex' : 'none';
  }

  // Next button fallback
  nextBtn.addEventListener('click', () => {
    const q = quizQuestions[currentQuizStep];
    if (quizAnswers[q.id]) {
      currentQuizStep++;
      renderQuestion(currentQuizStep);
    }
  });

  function showResult() {
    // Count occurrences
    const counts = {};
    Object.values(quizAnswers).forEach(val => {
      counts[val] = (counts[val] || 0) + 1;
    });

    // Find the highest count
    let result = 'all';
    let maxCount = 0;
    for (const [key, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        result = key;
      }
    }

    // Hide question UI, show result
    container.innerHTML = '';
    progressBar.style.display = 'none';
    nextBtn.style.display = 'none';
    resultDiv.classList.add('show');

    resultType.textContent = skinTypeLabels[result] || result;
    resultDesc.textContent = skinTypeDescriptions[result] || 'We\'ve identified your skin type based on your answers.';

    // Scroll to collection with filter on click
    viewRecommendedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Try to set filter to match result
      setFilterAndScroll(result);
    });
  }

  // Restart quiz
  restartBtn.addEventListener('click', () => {
    quizAnswers = {};
    currentQuizStep = 0;
    resultDiv.classList.remove('show');
    progressBar.style.display = 'block';
    renderQuestion(0);
  });

  // Initial render
  renderQuestion(0);
}

function setFilterAndScroll(skinType) {
  // Scroll to collection
  const collectionEl = document.getElementById('collection');
  if (collectionEl) {
    const offset = 80;
    const y = collectionEl.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // Set active filter to "All" (we don't have a skin-type specific chip, so show all)
  // The user can see all products suitable for their skin type
  activeFilter = "All";
  renderProducts();
}


// ============================================================
// COLLECTION — Products Rendering
// ============================================================
function initCollection() {
  renderFilterChips();
  renderProducts();
}

function renderFilterChips() {
  const container = document.getElementById('filterChips');
  const categories = ["All", ...new Set(products.map(p => p.category))];

  container.innerHTML = categories.map(cat => `
    <button class="filter-chip ${cat === activeFilter ? 'active' : ''}" data-filter="${cat}">
      ${cat}
    </button>
  `).join('');

  // Click handlers
  container.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      activeFilter = chip.dataset.filter;
      renderFilterChips();
      renderProducts();
    });
  });
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const filtered = activeFilter === "All"
    ? products
    : products.filter(p => p.category === activeFilter);

  grid.innerHTML = filtered.map(product => `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-card-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy"
             onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'placeholder-icon\\'>✦</span>';">
        <span class="product-card-badge">${product.category}</span>
      </div>
      <div class="product-card-body">
        <h3>${product.name}</h3>
        <p class="product-tagline">${product.tagline}</p>
      </div>
      <div class="product-card-footer">
        <span class="product-price">₹${product.price}</span>
        <button class="product-quick-view">Quick View</button>
      </div>
    </div>
  `).join('');

  // Click handlers — open modal
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.productId);
      openProductModal(id);
    });
  });
}


// ============================================================
// PRODUCT MODAL
// ============================================================
function initModal() {
  const overlay = document.getElementById('productModal');
  const closeBtn = document.getElementById('modalClose');

  closeBtn.addEventListener('click', closeProductModal);

  // Close on overlay click (outside modal card)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeProductModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
  });
}

function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  selectedProduct = product;
  const overlay = document.getElementById('productModal');

  // Populate modal
  const modalImg = document.getElementById('modalImg');
  modalImg.innerHTML = `
    <img src="${product.image}" alt="${product.name}" 
         onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'placeholder-icon\\'>✦</span>';">
  `;

  document.getElementById('modalCategory').textContent = product.category;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalTagline').textContent = product.tagline;
  document.getElementById('modalSize').textContent = `Size: ${product.size}`;
  document.getElementById('modalPrice').textContent = `₹${product.price}`;

  // PLACEHOLDER: Amazon link, client will provide
  document.getElementById('modalBuyBtn').href = product.amazonLink;

  // Highlights
  const highlightsContainer = document.getElementById('modalHighlights');
  highlightsContainer.innerHTML = product.highlights.map(h => `
    <div class="modal-highlight-item">
      <div class="modal-highlight-icon">${getIconSVG(h.icon)}</div>
      <div class="modal-highlight-text">
        <h4>${h.title}</h4>
        <p>${h.desc}</p>
      </div>
    </div>
  `).join('');

  // Show modal
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const overlay = document.getElementById('productModal');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  selectedProduct = null;
}


// ============================================================
// CONTACT FORM VALIDATION
// ============================================================
function initForm() {
  const form = document.getElementById('enquiryForm');
  const successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name validation
    const name = document.getElementById('formName');
    const nameError = document.getElementById('nameError');
    if (!name.value.trim()) {
      name.parentElement.classList.add('error');
      isValid = false;
    } else {
      name.parentElement.classList.remove('error');
    }

    // Email validation
    const email = document.getElementById('formEmail');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      email.parentElement.classList.add('error');
      isValid = false;
    } else {
      email.parentElement.classList.remove('error');
    }

    // Message validation
    const message = document.getElementById('formMessage');
    const messageError = document.getElementById('messageError');
    if (!message.value.trim()) {
      message.parentElement.classList.add('error');
      isValid = false;
    } else {
      message.parentElement.classList.remove('error');
    }

    if (isValid) {
      // PLACEHOLDER: form submission endpoint, client to provide (e.g. Formspree)
      // For now, just show success message
      form.style.display = 'none';
      successMsg.classList.add('show');

      // Reset after 5 seconds
      setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        successMsg.classList.remove('show');
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
      }, 5000);
    }
  });

  // Remove error on input
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.parentElement.classList.remove('error');
    });
  });
}


// ============================================================
// SCROLL REVEAL ANIMATION
// ============================================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}


// ============================================================
// SMOOTH SCROLL for all anchor links
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip if already handled by navbar
    if (anchor.closest('.nav-links') || anchor.closest('.mobile-nav-panel')) return;
    // Skip Buy Now button — its href gets replaced with a real Amazon link dynamically
    if (anchor.id === 'modalBuyBtn') return;   // ← YE LINE ADD KAR

    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return; // Skip placeholder links

      e.preventDefault();
      const targetEl = document.querySelector(href);
      if (targetEl) {
        const offset = 80;
        const y = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}


// ============================================================
// INIT — DOMContentLoaded
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initQuiz();
  initCollection();
  initModal();
  initForm();
  initScrollReveal();
  initSmoothScroll();
});


// ============================================================
// VIDEO LIGHTBOX — Experience Section
// PLACEHOLDER: real customer videos, client to provide actual video URLs
// ============================================================
function initVideoLightbox() {
  const videoCards = document.querySelectorAll('.video-card');

  // Create lightbox overlay if not present
  let lightbox = document.getElementById('videoLightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'videoLightbox';
    lightbox.className = 'video-lightbox-overlay';
    lightbox.innerHTML = `
      <div class="video-lightbox-content">
        <button class="video-lightbox-close" id="videoLightboxClose">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="video-lightbox-player" id="videoLightboxPlayer">
          <!-- PLACEHOLDER: real video embed will go here once client provides links -->
          <div class="video-placeholder-msg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <p>Video coming soon</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const closeBtn = document.getElementById('videoLightboxClose');

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      // When client provides real video URL, swap innerHTML of #videoLightboxPlayer
      // with an <iframe> (YouTube/Instagram embed) or <video> tag here, keyed by card's video id.
    });
  });

  closeBtn.addEventListener('click', closeVideoLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeVideoLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoLightbox();
  });

  function closeVideoLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}