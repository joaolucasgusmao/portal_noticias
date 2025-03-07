import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok && data.access_token) {
    const response = NextResponse.json({
      message: "Login efetuado com sucesso!",
    });

    response.cookies.set("token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return response;
  }

  return NextResponse.json(
    { error: "E-mail ou senha incorretos!" },
    { status: 401 }
  );
}
