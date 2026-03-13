import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Delete the secure HTTP-only cookie
    cookieStore.delete("admin_token");

    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}