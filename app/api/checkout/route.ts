import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products, STORE_OPEN } from "@/data/content";

// Stripe Checkout session creation.
// Requires STRIPE_SECRET_KEY in the environment (see .env.local.example).

export async function POST(req: Request) {
  if (!STORE_OPEN) {
    return NextResponse.json({ error: "The store is currently closed." }, { status: 403 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secret);

  let body: { items?: { id: string; quantity?: number }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const items = body.items ?? [];
  if (items.length === 0) {
    return NextResponse.json({ error: "No items to check out." }, { status: 400 });
  }

  // Build line items from trusted server-side product data — never trust
  // prices sent by the client.
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${item.id}` }, { status: 400 });
    }
    const quantity = Math.min(Math.max(Math.floor(item.quantity ?? 1), 1), 20);
    line_items.push({
      quantity,
      price_data: {
        currency: product.currency,
        unit_amount: product.amount,
        product_data: {
          name: product.name,
          images: product.image.startsWith("http")
            ? [product.image]
            : undefined,
        },
      },
    });
  }

  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store`,
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["US", "GR", "GB", "DE", "FR"] },
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
