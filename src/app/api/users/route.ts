import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch("http://localhost:3000/api/users");
  const data = await response.json();

  return NextResponse.json(data);
}
