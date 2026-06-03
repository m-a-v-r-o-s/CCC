// =============================================================
//  CYCLES CUSTOM CULT — SITE CONTENT
//  Edit everything here. No need to touch the page code.
//  Drop images into /public/images/ and reference them as
//  "/images/your-file.jpg"
// =============================================================

export type Build = {
  slug: string;
  name: string;
  subtitle: string;
  year: string;
  // Hero / cover image for the build
  cover: string;
  // Gallery — add as many photos as you like
  gallery: string[];
  // Short blurb shown on the builds grid
  excerpt: string;
  // Full description shown on the build's own page
  description: string;
  // Spec sheet — add/remove rows freely
  specs: { label: string; value: string }[];
  // Credits — photos, paint, parts, etc.
  credits?: { label: string; handle: string }[];
};

// -------------------------------------------------------------
//  THE 4 BUILDS  — replace placeholders with your real content
// -------------------------------------------------------------
export const builds: Build[] = [
  {
    slug: "build-one",
    name: "Build No. 01",
    subtitle: "The Black Cake",
    year: "2021",
    cover: "/images/build%201/Screenshot_2026-05-28_11-14-20.webp",
    gallery: [
      "/images/build%201/Screenshot_2026-05-28_11-14-15.webp",
      "/images/build%201/Screenshot_2026-05-28_11-14-29.webp",
    ],
    excerpt:
      "The Black Cake is finally here — a 1983 Honda CM250 reborn. One of one.",
    description:
      "The Black Cake is finally here. Built on a 1983 Honda CM250, stripped back and reimagined from the ground up. Every detail considered, nothing left to chance — this is what it looks like when an old donor gets a second life done right.",
    specs: [
      { label: "Donor", value: "Honda CM250 1983" },
      { label: "Engine", value: "TBD" },
      { label: "Suspension", value: "TBD" },
      { label: "Brakes", value: "TBD" },
      { label: "Finish", value: "TBD" },
    ],
    credits: [
      { label: "Pics", handle: "greek_daily_cars" },
      { label: "Paint", handle: "happyrider_specializedpaints" },
      { label: "Paint", handle: "venetis_electrostatic" },
      { label: "Parts", handle: "dfsmotorshop" },
    ],
  },
  {
    slug: "build-two",
    name: "Build No. 02",
    subtitle: "Snowhite",
    year: "2023",
    cover: "/images/b2/Screenshot_2026-05-28_11-36-19.webp",
    gallery: [
      "/images/b2/Screenshot_2026-05-28_11-13-47_crop.webp",
      "/images/b2/Screenshot_2026-05-28_11-13-58.webp",
      "/images/b2/Screenshot_2026-05-28_11-36-26.webp",
    ],
    excerpt:
      "Snowhite — a complete restoration of a 1979 Yamaha DT 125. Pure, white, and built to last.",
    description:
      "Snowhite is a complete restoration of a 1979 Yamaha DT 125. Every part revisited, every surface considered. The result is a machine that looks like it just rolled out of the factory — only better.",
    specs: [
      { label: "Donor", value: "Yamaha DT 125 1979" },
      { label: "Engine", value: "TBD" },
      { label: "Suspension", value: "TBD" },
      { label: "Brakes", value: "TBD" },
      { label: "Finish", value: "TBD" },
    ],
    credits: [
      { label: "Pics", handle: "greek_daily_cars" },
      { label: "Pics", handle: "vaggelis_moukas" },
      { label: "Paint", handle: "happy_rider_vafes_moto" },
      { label: "Paint", handle: "venetis_electrostatic" },
      { label: "Parts", handle: "dfsmotorshop" },
      { label: "Special thanks", handle: "giannis_jinos" },
      { label: "Special thanks", handle: "an.papana" },
    ],
  },
  {
    slug: "build-three",
    name: "Build No. 03",
    subtitle: "Honda CB650C",
    year: "2024",
    cover: "/images/b3/Screenshot_2026-05-28_11-11-53.webp",
    gallery: [
      "/images/b3/Screenshot_2026-05-28_11-11-05.webp",
      "/images/b3/Screenshot_2026-05-28_11-12-31.webp",
    ],
    excerpt:
      "A short teaser line about this build. Swap this text for your own once the bike is shot and ready.",
    description:
      "Full write-up of Build No. 03 goes here. Replace with the real story of the machine.",
    specs: [
      { label: "Donor", value: "Honda CB650C" },
      { label: "Engine", value: "TBD" },
      { label: "Suspension", value: "TBD" },
      { label: "Brakes", value: "TBD" },
      { label: "Finish", value: "TBD" },
    ],
  },
  {
    slug: "build-four",
    name: "Build No. 04",
    subtitle: "The Elegant Scrambler",
    year: "2025",
    cover: "/images/b4/Screenshot_2026-05-28_11-10-41.webp",
    gallery: [
      "/images/b4/Screenshot_2026-05-28_11-10-52.webp",
      "/images/b4/Screenshot_2026-05-28_11-10-31.webp",
    ],
    excerpt:
      "The Elegant Scrambler — a Suzuki GN 250 with a more aggressive look.",
    description:
      "A Suzuki GN 250 taken in a more aggressive direction. The ivory paint, powder-coated details and custom seat turn a humble donor into something that commands attention without shouting.",
    specs: [
      { label: "Donor", value: "Suzuki GN 250" },
      { label: "Engine", value: "TBD" },
      { label: "Suspension", value: "TBD" },
      { label: "Brakes", value: "TBD" },
      { label: "Finish", value: "Ivory" },
    ],
    credits: [
      { label: "Ivory paint", handle: "happy_rider_vafes_moto" },
      { label: "Powder coat", handle: "venetis_electrostatic" },
      { label: "Seat", handle: "saad_upholstery" },
      { label: "Parts", handle: "dfsmotorshop" },
    ],
  },
];

// -------------------------------------------------------------
//  OUR SPACE — drop in photos of the shop / build space later
// -------------------------------------------------------------
export const spacePhotos: { src: string; caption: string }[] = [
  { src: "/images/shop/Screenshot_2026-05-28_11-37-48.webp", caption: "The floor" },
  { src: "/images/shop/Screenshot_2026-05-28_11-37-42.webp", caption: "The scene" },
  { src: "/images/shop/Screenshot_2026-05-28_11-38-43.webp", caption: "Parts wall" },
  { src: "/images/shop/Screenshot_2026-05-28_11-38-56.webp", caption: "The bench" },
  { src: "/images/122.webp", caption: "The space" },
  { src: "/images/Screenshot_2026-05-28_11-39-19.webp", caption: "Instruments" },
  { src: "/images/12.webp", caption: "The space" },
];

// -------------------------------------------------------------
//  FAQ — edit questions and answers freely
// -------------------------------------------------------------
export const faqs: { q: string; a: string }[] = [
  {
    q: "How long does a build take?",
    a: "Every Cycles Custom Cult build is one-of-one. Timelines depend on the donor, the scope, and parts availability. We'll give you a realistic estimate during consultation.",
  },
  {
    q: "Do you supply the donor bike, or do I?",
    a: "Either works. We can source a donor specific to your build, or start from a machine you already own.",
  },
  {
    q: "Can I be involved in the design?",
    a: "Absolutely. Every build is a collaboration. We blend our aesthetic with your personality and riding style.",
  },
  {
    q: "Do you ship outside the country?",
    a: "Yes — we've crated and shipped builds worldwide. Logistics are handled case by case.",
  },
  {
    q: "What does a build cost?",
    a: "It varies wildly with scope. Reach out through Build Me One and we'll talk numbers honestly.",
  },
];

// -------------------------------------------------------------
//  STORE — products. `amount` is in the smallest currency unit (cents),
//  which is what Stripe Checkout expects. `price` is just the display label.
// -------------------------------------------------------------
export type Product = {
  id: string;
  name: string;
  price: string;
  amount: number; // in cents, e.g. $35 -> 3500
  currency: string; // ISO code, lowercase
  image: string;
  tag?: string;
};

// Flip to true to re-open checkout. While false, the store page shows a
// "currently closed" notice and the Buy buttons are disabled.
export const STORE_OPEN = false;

export const products: Product[] = [
  { id: "tee", name: "Cult Tee", price: "$35", amount: 3500, currency: "usd", image: "/images/store-tee.jpg", tag: "Apparel" },
  { id: "cap", name: "Workshop Cap", price: "$30", amount: 3000, currency: "usd", image: "/images/store-cap.jpg", tag: "Apparel" },
  { id: "hoodie", name: "Garage Hoodie", price: "$65", amount: 6500, currency: "usd", image: "/images/store-hoodie.jpg", tag: "Apparel" },
  { id: "patch", name: "Badge Patch", price: "$12", amount: 1200, currency: "usd", image: "/images/store-patch.jpg", tag: "Goods" },
  { id: "poster", name: "Build Print", price: "$25", amount: 2500, currency: "usd", image: "/images/store-poster.jpg", tag: "Goods" },
  { id: "sticker", name: "Sticker Pack", price: "$8", amount: 800, currency: "usd", image: "/images/store-sticker.jpg", tag: "Goods" },
];

// -------------------------------------------------------------
//  CONTACT — set your real email here when ready
// -------------------------------------------------------------
export const CONTACT_EMAIL = "youremail@example.com"; // <-- CHANGE THIS
export const INSTAGRAM = "https://www.instagram.com/cyclescustomcult/";
export const CARGR_URL = "https://www.car.gr"; // <-- set to your car.gr profile/listing URL
