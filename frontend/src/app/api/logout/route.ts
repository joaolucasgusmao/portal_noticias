import { NextResponse } from "next/server";
import { removeToken } from "@/lib/auth";

export const POST = async () => {
  removeToken();

  return NextResponse.json({
    success: true,
    message: "Logout realizado com sucesso.",
  });
};
