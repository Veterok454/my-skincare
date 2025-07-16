import image_1 from './image_1.webp';
import image_1_1 from './image_1_1.webp';
import image_1_2 from './image_1_2.webp';
import image_1_3 from './image_1_3.webp';

import image_2 from './image_2.webp';
import image_2_1 from './image_2_1.webp';
import image_2_2 from './image_2_2.webp';

import image_3 from './image_3.webp';
import image_3_1 from './image_3_1.webp';
import image_3_2 from './image_3_2.webp';
import image_3_3 from './image_3_3.webp';

import image_4 from './image_4.webp';
import image_4_1 from './image_4_1.webp';

import image_5 from './image_5.webp';
import image_5_1 from './image_5_1.webp';
import image_5_2 from './image_5_2.webp';
import image_5_3 from './image_5_3.webp';

import image_6 from './image_6.webp';
import image_6_1 from './image_6_1.webp';

import image_7 from './image_7.webp';
import image_7_1 from './image_7_1.webp';

import image_8 from './image_8.webp';
import image_8_1 from './image_8_1.webp';
import image_8_2 from './image_8_2.webp';

import logo from './logo.png';
import logo_white from './logo_white.png';
import hero_img from './hero-img.png';
import hero_img2 from './hero-img2.png';
import cart_icon from './cart_icon.png';
import bin_icon from './bin_icon.png';
import dropdown_icon from './dropdown_icon.png';
import exchange_icon from './exchange_icon.png';
import profile_icon from './profile_icon.png';
import quality_icon from './quality_icon.png';
import search_icon from './search_icon.png';
import support_img from './support_img.png';
import menu_icon from './menu_icon.png';
import about_img from './about_img.webp';
import contact_img from './contact_img.png';
import stripe_logo from './stripe_logo.png';
import paypal_logo from './paypal_logo.png';
import cross_icon from './cross_icon.png';
import instagram_icon from './instagram_icon.png';
import facebook_icon from './facebook_icon.png';
import fallback from './fallback.jpg';

export const assets = {
  logo,
  logo_white,
  hero_img,
  hero_img2,
  cart_icon,
  dropdown_icon,
  exchange_icon,
  profile_icon,
  quality_icon,
  search_icon,
  bin_icon,
  support_img,
  menu_icon,
  about_img,
  contact_img,
  stripe_logo,
  paypal_logo,
  cross_icon,
  instagram_icon,
  facebook_icon,
  fallback,
};

export const products = [
  {
    _id: 'aaaaa',
    name: 'MIY Argan Gold Hand Wash',
    subName: 'Gentle Cleansing with a Touch of Luxury',
    description:
      'Experience pure indulgence with MIY Argan Gold Hand Wash, a luxurious formula infused with pure argan oil to cleanse, nourish, and protect your hands. Its rich, velvety lather gently removes impurities while maintaining the skin’s natural moisture balance, leaving your hands feeling soft, refreshed, and beautifully smooth.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Gentle & Effective Cleansing – Removes dirt and impurities without drying.',
      '✔ Deep Hydration – Enriched with argan oil for long-lasting moisture.',
      '✔ Soft & Smooth Finish – Leaves hands feeling silky and nourished.',
      '✔ For All Skin Types – Gentle enough for daily use.',
    ],
    conclusion:
      'Elevate your handwashing experience with MIY Argan Gold Hand Wash – because clean hands should feel as luxurious as they look.',
    price: 14,
    image: [image_1_2, image_1_1, image_1_3, image_1],
    category: 'Body',
    subCategory: 'Washing',
    sizes: ['300 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: 'aaaab',
    name: 'MIY Argan Gold Shampoo',
    subName: 'Luxurious Care for Radiant, Healthy Hair',
    description:
      'Transform your hair with the MIY Argan Gold Shampoo, a luxurious formula infused with pure argan oil to deeply nourish, hydrate, and restore shine. Designed for all hair types, this shampoo gently cleanses while maintaining the natural moisture balance, leaving your hair silky soft, manageable, and beautifully radiant.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Deep Nourishment – Argan oil hydrates and strengthens hair from root to tip.',
      '✔ Gentle Cleansing – Removes impurities while preserving natural oils.',
      '✔ Weightless Shine – Golden shimmer enhances hair’s natural glow.',
      '✔ For All Hair Types – Suitable for daily use and color-treated hair.',
    ],
    conclusion:
      'Experience the luxury of salon-quality hair care at home with MIY Argan Gold Shampoo – because your hair deserves nothing but the best.',
    price: 13,
    image: [image_2_1, image_2_2, image_5_2, image_2],
    category: 'Hair',
    subCategory: 'Shampoo',
    sizes: ['300 ml'],
    date: 1716621345448,
    bestseller: true,
  },
  {
    _id: 'aaaac',
    name: 'MIY Argan Gold Body Lotion',
    subName: 'Hydration for Glowing, Silky Skin',
    description:
      'Pamper your skin with the MIY Argan Gold Body Lotion, a rich and nourishing formula infused with pure argan oil to deliver deep hydration and a radiant glow. This lightweight yet intensely moisturizing lotion absorbs effortlessly, leaving your skin feeling soft, smooth, and beautifully luminous.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Intense Hydration – Argan oil deeply nourishes and replenishes moisture.',
      '✔ Fast-Absorbing Formula – Lightweight texture for a non-greasy feel.',
      '✔ Golden Glow Effect – Subtle shimmer enhances your skin’s natural radiance.',
      '✔ For All Skin Types – Gentle and suitable for daily use.',
    ],
    conclusion:
      'Elevate your skincare routine with MIY Argan Gold Body Lotion – because your skin deserves to shine with luxury.',
    price: 14,
    image: [image_3_1, image_3_2, image_3_3, image_3],
    category: 'Body',
    subCategory: 'Lotion',
    sizes: ['300 ml'],
    date: 1716234545448,
    bestseller: true,
  },
  {
    _id: 'aaaad',
    name: 'MIY Argan Gold Conditioner',
    subName: 'Intense Nourishment for Silky, Radiant Hair',
    description:
      'Give your hair the ultimate care with MIY Argan Gold Conditioner, enriched with pure argan oil to deeply hydrate, strengthen, and restore shine. This luxurious formula detangles effortlessly, leaving hair silky smooth, frizz-free, and beautifully radiant. Perfect for all hair types, including dry and color-treated hair.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Deep Hydration & Repair – Argan oil nourishes and strengthens hair.',
      '✔ Frizz Control & Softness – Leaves hair smooth, manageable, and tangle-free.',
      '✔ Weightless Shine – Enhances natural radiance without weighing hair down.',
      '✔ For All Hair Types – Safe for daily use and color-treated hair.',
    ],
    conclusion:
      'Pair with MIY Argan Gold Shampoo for the perfect haircare ritual. Indulge in salon-quality softness and shine—because your hair deserves luxury.',
    price: 13,
    image: [image_4_1, image_2_2, image_5_2, image_4],
    category: 'Hair',
    subCategory: 'Conditioner',
    sizes: ['300 ml'],
    date: 1716621345448,
    bestseller: true,
  },
  {
    _id: 'aaaae',
    name: 'MIY Argan Gold Body Wash',
    subName: 'Cleansing for Soft, Radiant Skin',
    description:
      'Transform your daily shower into a spa-like experience with MIY Argan Gold Body Wash. Infused with pure argan oil, this indulgent formula gently cleanses while locking in moisture, leaving your skin feeling soft, refreshed, and beautifully radiant. Its rich, creamy lather pampers your skin, making every wash a moment of pure luxury.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Gentle Cleansing – Effectively removes impurities without stripping moisture.',
      '✔ Deep Hydration – Argan oil nourishes for long-lasting softness.',
      '✔ Golden Glow Effect – Subtle shimmer enhances natural radiance.',
      '✔ For All Skin Types – Gentle and perfect for daily use.',
    ],
    conclusion:
      'Indulge your skin with MIY Argan Gold Body Wash – because every shower should feel like a touch of luxury.',
    price: 14,
    image: [image_5_1, image_5_2, image_5_3, image_5],
    category: 'Body',
    subCategory: 'Washing',
    sizes: ['300 ml'],
    date: 1716622345448,
    bestseller: false,
  },
  {
    _id: 'aaaaf',
    name: 'MIY Argan Gold Luxury Travel Set',
    subName: 'The Ultimate Spa Experience',
    description:
      'Indulge in luxury on the go with the MIY Argan Gold Luxury Travel Set – a curated collection of five essential products infused with pure argan oil to nourish, hydrate, and pamper from head to toe. Perfect for hotels, spas, or travel, this elegant set ensures a five-star self-care experience wherever you are.',
    keyBenefits: '✨ Set Includes:',
    benefits: [
      '✔ Argan Gold Shampoo – Gently cleanses while restoring shine and strength.',
      '✔ Argan Gold Conditioner – Deeply nourishes for silky, manageable hair.',
      '✔ Argan Gold Body Wash – Cleanses and refreshes without drying the skin.',
      '✔ Argan Gold Body Lotion – Hydrates and enhances natural radiance.',
      '✔ Argan Gold Hand Wash – Softens and protects for beautifully smooth hands.',
    ],
    conclusion:
      'Presented in convenient, travel-friendly bottles, the MIY Argan Gold Luxury Travel Set is the perfect touch of indulgence for your guests or your next getaway. Because luxury should be within reach—anytime, anywhere.',
    price: 25,
    image: [image_6_1, image_3_3, image_5_2, image_6],
    category: 'Body',
    subCategory: 'Set',
    sizes: ['5 x 30 ml'],
    date: 1716623423448,
    bestseller: true,
  },
  {
    _id: 'aaaag',
    name: 'MIY Argan Gold Essentials Set',
    subName: 'Everyday Luxury for Silky Soft Skin',
    description:
      'Elevate your daily routine with the MIY Argan Gold Essentials Set, a trio of indulgent skincare must-haves infused with pure argan oil to cleanse, nourish, and hydrate. Perfect for hotels, spas, or home, this luxurious set pampers your skin, leaving it soft, refreshed, and beautifully radiant.',
    keyBenefits: '✨ Set Includes:',
    benefits: [
      '✔ Argan Gold Hand Wash – Gently cleanses while maintaining moisture balance.',
      '✔ Argan Gold Body Wash – Refreshes and hydrates for smooth, glowing skin.',
      '✔ Argan Gold Body Lotion – Deeply nourishes and enhances natural radiance.',
    ],
    conclusion:
      'Designed for daily indulgence, the MIY Argan Gold Essentials Set brings a touch of spa-like luxury to every wash. Because self-care should feel extraordinary - every single day.',
    price: 15,
    image: [image_7, image_5_3, image_3_2, image_7_1],
    category: 'Body',
    subCategory: 'Set',
    sizes: ['3 x 30 ml'],
    date: 1716621542448,
    bestseller: false,
  },
  {
    _id: 'aaaah',
    name: 'MIY Argan Gold Hair Care Duo',
    subName: 'Luxurious Nutrition for Healthy Hair',
    description:
      'Give your hair the care it deserves with the MIY Argan Gold Hair Care Duo, a perfect pairing of shampoo and conditioner infused with pure argan oil to cleanse, hydrate, and restore shine. Designed for all hair types, this luxurious duo leaves hair silky smooth, strong, and beautifully radiant.',
    keyBenefits: '✨ Set Includes:',
    benefits: [
      '✔ Argan Gold Shampoo – Gently cleanses while maintaining moisture and enhancing shine.',
      '✔ Argan Gold Conditioner – Deeply nourishes, detangles, and smooths for frizz-free, soft hair.',
    ],
    conclusion:
      'Whether at home, in a luxury hotel, or at a spa, the MIY Argan Gold Hair Care Duo brings salon-quality results to your everyday routine. Because healthy, gorgeous hair starts with the right care.',
    price: 10,
    image: [image_8, image_8_2, image_5_2, image_8_1],
    category: 'Hair',
    subCategory: 'Set',
    sizes: ['2 x 30 ml'],
    date: 1716621542448,
    bestseller: true,
  },

  {
    _id: '1',
    name: 'Cleanser',
    subName: 'Gentle and Repairing Facial Cleansing Vegan-Friendly Formula',
    description:
      'Reveal your skin’s natural glow with our Gentle Facial Cleanser. This soft and luxurious formula is enriched with English Lavender, English Chamomile, and Sea Buckthorn to nourish and soothe. The natural phytosterols in Sea Buckthorn support the skin’s natural repair process. It gently removes makeup, excess oil, and impurities without stripping your skin, leaving it feeling clean, soft, and perfectly balanced.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Gentle yet effective – deeply cleanses while preserving skin moisture',
      '✔ Soft, radiant finish – leaves skin smooth, fresh, and glowing',
      '✔ Moisturises, nourishes, and soothes',
      '✔ Suitable for all skin types – perfect for daily use, even for sensitive skin',
    ],
    conclusion:
      'With our Facial Cleanser, your skin feels clean, hydrated, and glowing – never tight or dry.',
    price: 13,
    image: [image_1_1, image_2_2, image_3_3, image_1],
    category: 'Face',
    subCategory: 'Washing',
    sizes: ['100 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '2',
    name: 'Foaming Facial Wash',
    subName: 'Light, Luxurious Cleanse for Radiant Skin',
    description:
      'Refresh your skin with a soft, gentle lavender cleanser for nourishing the skin, this facial cleansing wash effectively removes all daily build-up and excess oil without stripping the skin, leaving your face feeling clean, hydrated, and naturally glowing.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Soft, foaming texture for a refreshing cleanse',
      '✔ Gently removes impurities without stripping the skin',
      '✔ Soothes, moisturises and nourishes with lavender',
      '✔ Suitable for All Skin Types – Ideal for daily use, even on sensitive skin',
    ],
    conclusion:
      'Start your skincare routine with a touch of luxury with Foaming Facial Wash.',
    price: 9,
    image: [image_1],
    category: 'Face',
    subCategory: 'Washing',
    sizes: ['30 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '3',
    name: 'Toner',
    subName: 'Refresh & Balance for a Glowing Complexion',
    description:
      'Complete your cleansing ritual with our Toner, infused with botanical extracts to refine pores, restore pH balance, and prep the skin for hydration. It gently tones, tightens pores, and restores the skin’s pH balance, leaving your complexion fresh, calm, and ready for hydration.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Refines pores and removes residue',
      '✔ Restores natural pH balance',
      '✔ Hydrates and refreshes',
      '✔ Prepares skin for next skincare steps',
    ],
    conclusion: 'Give your skin the perfect post-cleanse glow with this Toner.',
    price: 12,
    image: [image_1],
    category: 'Face',
    subCategory: 'Washing',
    sizes: ['100 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '4',
    name: 'Exfoliating Face Scrub',
    subName: 'Smooth, Radiant Skin in Every Use',
    description:
      'Reveal a brighter, more even complexion with Balancing Exfoliating Face Scrub. Infused with natural exfoliants of ground almonds and olive kernels, it gently buffs away dullness and dead skin cells, unclogs pores, and improves skin texture, leaving your face soft, polished, and glowing.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Gently exfoliates without irritation',
      '✔ Smooths texture and boosts radiance',
      '✔ Nourishes deeply and balances the skin',
      '✔ Suitable for Normal to Combination skin types and spot-prone skin',
    ],
    conclusion:
      'Treat your skin to a gentle polish with Exfoliating Face Scrub – because smooth, glowing skin starts here.',
    price: 13,
    image: [image_1],
    category: 'Face',
    subCategory: 'Scrub',
    sizes: ['100 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '5',
    name: 'Hyaluronic Face Cream with Vit.A, C & E (Brightening)',
    subName: 'Deep Hydration',
    description:
      'Deliver intense moisture with face cream, combining hyaluronic acid and Vitamins A, C & E  for long-lasting hydration, a visibly plumper, fresher complexion and contributing to younger looking and vibrant skin.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Long-lasting hydration with hyaluronic acid',
      '✔ Lightweight, non-greasy texture',
      '✔ Perfect base before makeup',
      '✔ Ideal for dry, dull, or tired skin',
    ],
    conclusion:
      'Give your skin a daily drink of hydration with Hyaluronic Face Cream.',
    price: 1,
    image: [image_1],
    category: 'Face',
    subCategory: 'Cream',
    sizes: ['50 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '6',
    name: 'Face Mask',
    subName: 'A Weekly Ritual for Glowing, Rejuvenated Skin',
    description:
      'Pamper your skin with our rejuvenating Face Mask, a rich and nourishing treatment designed to revitalise and refresh. Infused with Aloe Vera, Cocoa Butter, Kaolin and antioxidant ingredients, it detoxifies, hydrates, and leaves your skin looking smoother, brighter, and full of life.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Deeply nourishes and hydrates',
      '✔ Removes impurities and revitalises dull skin',
      '✔ Improves elasticity and leaves a radiant, healthy glow',
      '✔ Easily applied and removed, with sensational results',
    ],
    conclusion:
      'Turn your skincare routine into a spa experience with our Face Mask.',
    price: 13,
    image: [image_1],
    category: 'Face',
    subCategory: 'Mask',
    sizes: ['100 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '7',
    name: 'Collagen Face Cream',
    subName: 'Firm, Smooth & Youthful Skin',
    description:
      'Our Collagen Cream with added pure Neroli is rich in natural Vitamin C to encourage your skin to produce natural Collagen which aids healthy, vibrant and wrinkle free skin. Collagen is the essential building block of youthful looking skin. Without Collagen your skin loses elasticity and the vibrancy we associate with youth and with great looking skin. The natural Collagen peptide is hydrolised, so that your skin is capable of quickly and effectively absorbing it. With daily use you will soon see a visible difference in your skin’s tone and texture.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Boosts collagen and elasticity',
      '✔ Firms, smooths and improves skin structure',
      '✔ Richly hydrating and nourishing',
      '✔ Ideal for mature or dry skin',
    ],
    conclusion:
      'Reclaim youthful skin with the firming power of Collagen Face Cream.',
    price: 15,
    image: [image_1],
    category: 'Face',
    subCategory: 'Cream',
    sizes: ['30 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '8',
    name: 'UV Face Sun Cream SPF 30',
    subName: 'Daily Protection with a Nourishing Touch',
    description:
      'Shield your skin from harmful rays with UV Face Sun Cream SPF 30. This lightweight, non-greasy formula offers broad-spectrum UVA/UVB protection while hydrating and soothing. Suitable for the Face and Body. Great for wearing under makeup as well as on its own.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ SPF 30 broad-spectrum protection',
      '✔ Lightweight and non-comedogenic',
      '✔ Hydrates while protecting',
      '✔ Ideal for daily use under makeup and on its own',
    ],
    conclusion:
      'Protect your glow with our UV Face Sun Cream – because sun care should feel like skincare.',
    price: 14,
    image: [image_1],
    category: 'Face',
    subCategory: 'Cream',
    sizes: ['30 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '9',
    name: 'Pomegranate Face Oil',
    subName: 'Revitalising Glow Booster',
    description:
      'Recharge tired skin with Pomegranate Face Oil, a powerful blend of 100% natural oils that nourishes for a healthy, youthful glow. It helps brighten dull skin, improve elasticity, and protect against environmental stressors.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Rich in antioxidants for youthful, glowing skin',
      '✔ Boosts skin vitality and elasticity',
      '✔ Lightweight texture, fast-absorbing',
      '✔ Ideal for dull, tired, or ageing skin',
    ],
    conclusion:
      'Awaken your natural glow with the antioxidant power of  Pomegranate Face Oil.',
    price: 10,
    image: [image_1],
    category: 'Face',
    subCategory: 'Oil',
    sizes: ['30 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '10',
    name: 'Lavender Face Oil',
    subName: 'Calming Care for Radiant, Balanced Skin',
    description:
      'Soothe and restore your complexion with Lavender Face Oil, a calming blend of 100% natural oils. This gentle formula reduces redness, balances oil levels, and promotes a clear, healthy-looking complexion.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Calms irritation and soothes sensitive skin',
      '✔ Balances oil production',
      '✔ Lightweight and nourishing',
      '✔ Naturally relaxing lavender scent',
    ],
    conclusion:
      'Perfect for evening wind-down rituals, Lavender Face Oil brings harmony to your skin and your routine.',
    price: 10,
    image: [image_1],
    category: 'Face',
    subCategory: 'Oil',
    sizes: ['30 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '11',
    name: 'Pomegranate Body Oil',
    subName: 'Silky Soft Skin with a Radiant Glow',
    description:
      'Pamper your skin with the Pomegranate Body Oil, enriched with 100% natural oils to hydrate, tone, and leave your skin glowing with a delicate fruity scent.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Deeply moisturising and fast-absorbing',
      '✔ Enhances skin tone and radiance',
      '✔ Lightweight with a silky finish',
      '✔ Antioxidant-rich formula',
    ],
    conclusion:
      'Glow from head to toe with Pomegranate Body Oil – the ultimate daily treat for your skin.',
    price: 15,
    image: [image_1],
    category: 'Body',
    subCategory: 'Oil',
    sizes: ['100 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '12',
    name: 'Lavender Body Oil',
    subName: 'Relax & Nourish from Head to Toe',
    description:
      'Unwind with Lavender Body Oil, a soothing formula with 100% natural oils to hydrate, calm, and envelop the skin in subtle, relaxing fragrance. It melts into the skin to relieve dryness, ease tension, and leave your body soft, smooth, and beautifully scented.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Intensely hydrating and soothing',
      '✔ Promotes relaxation and calm',
      '✔ Non-greasy and fast-absorbing',
      '✔ Ideal for bedtime routines or massage',
    ],
    conclusion:
      'Wrap your body in softness and serenity with Lavender Body Oil.',
    price: 15,
    image: [image_1],
    category: 'Body',
    subCategory: 'Oil',
    sizes: ['100 ml'],
    date: 1716634345448,
    bestseller: false,
  },
  {
    _id: '13',
    name: 'Argan Gold Body Wash',
    subName: 'Cleansing for Soft, Radiant Skin',
    description:
      'Transform your daily shower into a spa-like experience with Argan Gold Body Wash. Infused with pure argan oil, this indulgent formula gently cleanses while locking in moisture, leaving your skin feeling soft, refreshed, and beautifully radiant. A luxurious liquid gold body wash with moisturising effects and a scent perfect for both men and women.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Gentle Cleansing – Effectively removes impurities without stripping moisture.',
      '✔ Deep Hydration – Argan oil nourishes for long-lasting softness.',
      '✔ Golden Glow Effect – Subtle shimmer enhances natural radiance.',
      '✔ For All Skin Types – Gentle and perfect for daily use.',
    ],
    conclusion:
      'Indulge your skin with Argan Gold Body Wash – because every shower should feel like a touch of luxury.',
    price: 14,
    image: [image_1],
    category: 'Body',
    subCategory: 'Washing',
    sizes: ['300 ml'],
    date: 1716622345448,
    bestseller: false,
  },
  {
    _id: '14',
    name: 'Argan Gold Body Lotion',
    subName: 'Hydration for Glowing, Silky Skin',
    description:
      'Pamper your skin with a thick Argan Gold Body Lotion, a rich and nourishing formula infused with pure argan oil to deliver deep hydration and a light shimmer effect on the skin. This lightweight yet intensely moisturizing lotion absorbs effortlessly, leaving your skin feeling soft, smooth, and beautifully luminous. Smells divine!',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Intense Hydration – Argan oil deeply nourishes and replenishes moisture.',
      '✔ Fast-Absorbing Formula – Lightweight texture for a non-greasy feel.',
      '✔ Golden Glow Effect – Subtle shimmer enhances your skin’s natural radiance.',
      '✔ For All Skin Types – Gentle and suitable for daily use.',
    ],
    conclusion:
      'Elevate your skincare routine with Argan Gold Body Lotion – because your skin deserves to shine with luxury.',
    price: 14,
    image: [image_1],
    category: 'Body',
    subCategory: 'Lotion',
    sizes: ['300 ml'],
    date: 1716234545448,
    bestseller: true,
  },
  {
    _id: '15',
    name: 'Age-Erasing Eye Primer',
    subName: 'Brighten, Smooth & Prep',
    description:
      'Refresh and smooth the delicate under-eye area with Age-Erasing Eye Primer. Enriched with argan oil and anti-aging peptides, it helps reduce puffiness, blur fine lines, and create the perfect base for makeup. Utilising smoothing elastomers, the effects are immediate!',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Minimises fine lines and signs of fatigue',
      '✔ Hydrates and smooths delicate skin',
      '✔ Lightweight and non-greasy',
      '✔ Primes for flawless concealer application',
    ],
    conclusion:
      'Look bright-eyed and refreshed all day with Age-Erasing Eye Primer.',
    price: 15,
    image: [image_1],
    category: 'Eyes',
    subCategory: 'Cream',
    sizes: ['30 ml'],
    date: 1716234545448,
    bestseller: true,
  },
  {
    _id: '16',
    name: 'Lash & Brow Vitamin E Oil',
    subName: 'Strength & Shine for Natural Beauty',
    description:
      'Strengthen and condition your lashes and brows with Lash & Brow Vitamin E Oil. This nourishing oil blend supports healthy hair growth, adds shine, and keeps delicate hairs soft and strong. Use an applicator (brush or pad) to apply 1-2 times per day to the base of your eyelashes and/or over eyebrows. Once desired results are seen, use once or twice a week to maintain your long, luscious lashes.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Promotes stronger, fuller lashes and brows',
      '✔ Enriched with vitamin E',
      '✔ Easy-to-use brush applicator',
      '✔ Non-irritating and suitable for daily use',
    ],
    conclusion: 'Define your natural beauty with Lash & Brow Vitamin E Oil.',
    price: 9,
    image: [image_1],
    category: 'Eyes',
    subCategory: 'Oil',
    sizes: ['30 ml'],
    date: 1716234545448,
    bestseller: true,
  },
  {
    _id: '17',
    name: 'Arnica Lip Oil',
    subName: 'Soothing Relief for Dry, Chapped Lips',
    description:
      'Soothe, hydrate, and protect your lips with Arnica Lip Oil. A moisturising lip oil with a slight tint, that’s anti inflammatory and aids healing - perfect to use following aesthetic treatments. It calms irritation, reduces flakiness, and restores softness for a perfectly smooth pout.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Calms, softens, and deeply nourishes',
      '✔ Heals dry, chapped lips',
      '✔ Non-sticky, glossy finish',
      '✔ Perfect for daily use or overnight repair',
    ],
    conclusion:
      'Show your lips some love with Arnica Lip Oil – for comfort, care, and shine in every swipe.',
    price: 10,
    image: [image_1],
    category: 'Lips',
    subCategory: 'Oil',
    sizes: ['8 ml'],
    date: 1716234545448,
    bestseller: true,
  },
  {
    _id: '18',
    name: 'Argan Gold Shampoo',
    subName: 'Luxurious Care for Radiant, Healthy Hair',
    description:
      'Transform your hair with Argan Gold Shampoo, a luxurious formula infused with pure argan oil to deeply nourish, hydrate, and restore shine. Designed for all hair types, this shampoo gently cleanses while maintaining the natural moisture balance, leaving your hair silky soft, manageable, and beautifully shiny.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Deep Nourishment – Argan oil hydrates and strengthens hair from root to tip.',
      '✔ Gentle Cleansing – Removes impurities while preserving natural oils.',
      '✔ Weightless Shine – Golden shimmer enhances hair’s natural glow.',
      '✔ For All Hair Types – Suitable for daily use and color-treated hair.',
    ],
    conclusion:
      'Experience the luxury of salon-quality hair care at home with Argan Gold Shampoo – because your hair deserves nothing but the best.',
    price: 13,
    image: [image_1],
    category: 'Hair',
    subCategory: 'Shampoo',
    sizes: ['300 ml'],
    date: 1716621345448,
    bestseller: true,
  },
  {
    _id: '19',
    name: 'Argan Gold Conditioner',
    subName: 'Intense Nourishment for Silky, Radiant Hair',
    description:
      'Give your hair the ultimate care with Argan Gold Conditioner, enriched with pure argan oil to deeply hydrate, strengthen, and restore shine. This luxurious formula detangles effortlessly, leaving hair silky smooth, frizz-free without weighing hair down, and beautifully radiant. Perfect for all hair types, including dry and color-treated hair.',
    keyBenefits: '✨ Key Benefits:',
    benefits: [
      '✔ Deep Hydration & Repair – Argan oil nourishes and strengthens hair.',
      '✔ Frizz Control & Softness – Leaves hair smooth, manageable, and tangle-free.',
      '✔ Weightless Shine – Enhances natural radiance without weighing hair down.',
      '✔ For All Hair Types – Safe for daily use and color-treated hair.',
    ],
    conclusion:
      'Pair with Argan Gold Shampoo for the perfect haircare ritual. Indulge in salon-quality softness and shine—because your hair deserves luxury.',
    price: 13,
    image: [image_1],
    category: 'Hair',
    subCategory: 'Conditioner',
    sizes: ['300 ml'],
    date: 1716621345448,
    bestseller: true,
  },
];
