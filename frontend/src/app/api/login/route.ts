import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });

    const { access_token, user } = response.data;

    (await cookies()).set("token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Email ou senha inválidos!" },
      { status: 401 }
    );
  }
};
