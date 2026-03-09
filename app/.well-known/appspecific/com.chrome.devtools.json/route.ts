import { NextResponse } from "next/server";

// Chrome DevTools requests this; return empty JSON so it gets 200 instead of 404
export async function GET() {
  return NextResponse.json({});
}
