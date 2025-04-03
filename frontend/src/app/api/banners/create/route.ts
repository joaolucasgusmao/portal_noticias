import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado!" }, { status: 401 });
    }

    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Erro ao criar Banner!" },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Banner criada com sucesso!", data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor!" },
      { status: 500 }
    );
  }
}
