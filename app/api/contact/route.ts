import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = "malaikarizwan121@gmail.com";
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** In-memory rate limit: IP -> timestamps of requests in the last window */
const rateLimitMap = new Map<string, number[]>();

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  let timestamps = rateLimitMap.get(ip) ?? [];
  timestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

export async function GET() {
  return NextResponse.json({
    message: "Contact API is running. Use POST with { name, email, message } to send.",
  });
}

export async function POST(request: Request) {
  // Reject non-JSON or missing Content-Type
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 400 }
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS?.replace(/\s/g, "") || process.env.EMAIL_PASS;

  if (!user || !pass) {
    return NextResponse.json(
      { error: "Email is not configured. Set EMAIL_USER and EMAIL_PASS in .env.local" },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
      website?: string;
    };
    const { name, email, message, website } = body;

    // Honeypot: bots often fill hidden fields
    if (website && String(website).trim() !== "") {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const nameTrim = name.trim();
    const emailTrim = email.trim();
    const messageTrim = message.trim();

    // Validation
    if (nameTrim.length < 3) {
      return NextResponse.json(
        { error: "Name must be at least 3 characters", field: "name" },
        { status: 400 }
      );
    }
    if (!EMAIL_REGEX.test(emailTrim)) {
      return NextResponse.json(
        { error: "Enter a valid email", field: "email" },
        { status: 400 }
      );
    }
    if (messageTrim.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters", field: "message" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS?.replace(/\s/g, "") || process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: TO_EMAIL,
      replyTo: emailTrim,
      subject: "New Portfolio Message",
      text: [
        "Name: " + nameTrim,
        "Email: " + emailTrim,
        "Message: " + messageTrim,
      ].join("\n"),
    });

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
