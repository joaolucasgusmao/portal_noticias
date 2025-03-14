import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  (await cookies()).delete("token");
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
};
