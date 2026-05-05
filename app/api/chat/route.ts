import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { menuItems } from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { chatRequestSchema } from "@/lib/validations";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const buckets = new Map<string, { count: number; resetAt: number }>();

let openaiClient: OpenAI | null = null;

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return openaiClient;
}

function getIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

function getRestaurantContext() {
  return [
    `Restaurant: ${restaurant.name}`,
    `Address: ${restaurant.address.full}`,
    `Phone: ${restaurant.phone}`,
    `Email: ${restaurant.email}`,
    `Opening hours: ${restaurant.openingHours
      .map((item) => `${item.days}: ${item.hours}`)
      .join("; ")}`,
    `Reservation policy: ${restaurant.reservationPolicy}`,
    `Ordering flow: ${restaurant.orderingFlow}`,
    `Menu items: ${menuItems
      .map(
        (item) =>
          `${item.name} (${item.category}) - $${item.price}; ${item.description} Tags: ${item.tags.join(", ")}`
      )
      .join(" | ")}`,
    "Event options: Corporate Dinners, Celebrations, Chef's Table"
  ].join("\n");
}

function offlineConciergeResponse(lastUserMessage: string) {
  const message = lastUserMessage.toLowerCase();

  if (message.includes("open") || message.includes("hour")) {
    return "We are open Monday-Thursday 11:00 AM-10:00 PM, Friday-Saturday 11:00 AM-11:30 PM, and Sunday 10:00 AM-9:00 PM.";
  }

  if (message.includes("reserve") || message.includes("book") || message.includes("table")) {
    return "Please use the reservation form and the host team will review your request. Online submissions are not confirmed until LUMÉ follows up.";
  }

  if (message.includes("event") || message.includes("private")) {
    return "Yes. LUMÉ hosts corporate dinners, celebrations, and chef's table experiences. The private events form is the best next step.";
  }

  if (message.includes("order") || message.includes("pickup") || message.includes("delivery")) {
    return "Use the Order page to choose pickup or delivery, add dishes, adjust quantities, and complete the mock checkout.";
  }

  if (message.includes("menu") || message.includes("dish") || message.includes("recommend")) {
    return "Chef picks include Burrata & Heirloom Tomato and Wild Mushroom Risotto. Popular choices include Charred Citrus Salmon and Golden Espresso Martini.";
  }

  return "I can help with reservations, menu recommendations, hours, online ordering, private events, and directions.";
}

export async function POST(request: NextRequest) {
  const ip = getIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many chat requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid chat request." }, { status: 400 });
  }

  const lastUserMessage =
    [...parsed.data.messages].reverse().find((message) => message.role === "user")?.content || "";
  const client = getOpenAI();

  if (!client) {
    return NextResponse.json({ message: offlineConciergeResponse(lastUserMessage) });
  }

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5-nano",
      instructions: `You are LUMÉ Concierge, a helpful restaurant assistant for LUMÉ Dining. You answer questions about the restaurant, menu, reservations, online ordering, opening hours, private events, location, and contact details. Keep answers short, warm, premium, and helpful. Do not invent unavailable booking confirmations. If the user wants to reserve, guide them to the reservation form. If the user asks for the menu, recommend dishes from the provided menu data. If the user asks for location, provide the restaurant address and suggest using Get Directions.\n\nRestaurant context:\n${getRestaurantContext()}`,
      input: parsed.data.messages.map((message) => ({
        role: message.role,
        content: message.content
      }))
    });

    const message =
      typeof response.output_text === "string" && response.output_text.trim().length > 0
        ? response.output_text.trim()
        : "I can help with reservations, menu recommendations, hours, events, ordering, and directions.";

    return NextResponse.json({ message });
  } catch (error) {
    console.error("OpenAI chat request failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      {
        error:
          "LUMÉ Concierge is unavailable right now. Please try again or contact the restaurant directly."
      },
      { status: 500 }
    );
  }
}
