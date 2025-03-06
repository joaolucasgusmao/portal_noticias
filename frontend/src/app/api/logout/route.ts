import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async () => {
  (await cookies()).set("token", "", { expires: new Date(0) });

  return NextResponse.json({
    success: true,
    message: "Logout realizado com sucesso.",
  });
};
