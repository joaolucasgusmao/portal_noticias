import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const id = (await params).id;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/category/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      const data = await res.json();
      return NextResponse.json(
        { error: data.message || "Erro ao buscar notícia!" },
        { status: res.status }
      );
    }

    return NextResponse.json(await res.json(), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor!" },
      { status: 500 }
    );
  }
}