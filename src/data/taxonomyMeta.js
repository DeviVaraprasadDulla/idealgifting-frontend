/**
 * Presentational metadata (glyph + color world + tagline) for the real
 * Occasion/Recipient taxonomy values seeded on the backend
 * (products/migrations/0012_seed_...). This file carries no business data
 * of its own - it only maps real, already-seeded FilterOption values to
 * how they should look, matching the client reference's per-occasion
 * "color world" treatment. If a value isn't listed here, the UI falls
 * back to sensible defaults rather than failing.
 */

export const OCCASION_META = {
  Birthday: { glyph: "🎂", world: "birthday", line: "One more year of them. One more reason to make a fuss." },
  Anniversary: { glyph: "❤️", world: "love", line: "Chapters worth framing, from the first hello onwards." },
  Wedding: { glyph: "💍", world: "wedding", line: "For the ones just starting their forever." },
  "Baby & Kids": { glyph: "👶", world: "baby", line: "Tiny hands, big milestones, forever memories." },
  Family: { glyph: "👨‍👩‍👧", world: "family", line: "Hard to shop for. Easy to move." },
  Friendship: { glyph: "🤝", world: "friendship", line: "Give the friendship its own cover story." },
  "Raksha Bandhan": { glyph: "🎀", world: "festive", line: "A thread, a promise, a memory that lasts." },
  Achievement: { glyph: "🏆", world: "achievement", line: "Because their win deserves more than a certificate." },
  Festive: { glyph: "🎉", world: "festive", line: "Every festival has a story waiting to be told." },
  Corporate: { glyph: "💼", world: "corporate", line: "Recognition, made personal." },
};

export const RECIPIENT_META = {
  Partner: { glyph: "❤️", world: "love", line: "For the one who gets the best of you." },
  Mom: { glyph: "🌸", world: "family", line: "The one who deserves every kind of thank you." },
  Dad: { glyph: "🎩", world: "family", line: "Hard to shop for. Easy to move." },
  "Best Friend": { glyph: "🤝", world: "friendship", line: "The family you got to choose." },
  Sibling: { glyph: "🎀", world: "festive", line: "Built-in best friend since day one." },
  Child: { glyph: "🧒", world: "kids", line: "Tiny hands, big milestones." },
  Family: { glyph: "👨‍👩‍👧", world: "family", line: "The people who made you, you." },
  Colleague: { glyph: "💼", world: "corporate", line: "A small thank you for the everyday wins." },
  Client: { glyph: "🤝", world: "corporate", line: "Recognition, made personal." },
};

export const FEELING_META = {
  Emotional: { glyph: "🥹", world: "love", line: "Turn memories into something unforgettable." },
  Surprised: { glyph: "😍", world: "birthday", line: "Give them something they never saw coming." },
  Loved: { glyph: "❤️", world: "love", line: "Make them feel like the most special person." },
  Proud: { glyph: "🏆", world: "achievement", line: "Celebrate their journey and their wins." },
  Special: { glyph: "✨", world: "wedding", line: "Because ordinary gifts are not for extraordinary people." },
};

export const DEFAULT_META = { glyph: "🎁", world: "love", line: "" };

// Derives a color "world" from a product's own real tagged Occasion/Feeling
// filters - never a fabricated or random assignment. Accepts anything
// carrying a `filters` array shaped like ProductFilterSerializer output
// (a real Product, or a cart line item's `product_filters`).
export function worldFor(productLike) {
  const tags = productLike?.filters || productLike?.product_filters || [];
  const occasion = tags.find((t) => t.filter_name === "Occasion");
  if (occasion && OCCASION_META[occasion.filter_option_value]) {
    return OCCASION_META[occasion.filter_option_value].world;
  }
  const feeling = tags.find((t) => t.filter_name === "Feeling");
  if (feeling && FEELING_META[feeling.filter_option_value]) {
    return FEELING_META[feeling.filter_option_value].world;
  }
  return DEFAULT_META.world;
}
