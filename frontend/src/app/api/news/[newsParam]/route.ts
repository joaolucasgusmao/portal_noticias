import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ newsParam: string }> }
) {
  try {
    const slug = (await params).newsParam;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${slug}`, {
      method: "GET",
    });

    if (!res.ok) {
      const data = await res.json();
      return NextResponse.json(
        { error: data.message || "Erro ao buscar notícia!" },
        { status: res.status }
      );
    }

    const news = await res.json();
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor!" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ newsParam: string }> }
) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Não autenticado!" }, { status: 401 });
    }

    const id = Number((await params).newsParam);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID inválido para atualização" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Erro ao editar notícia!" },
        { status: res.status }
      );
    }

    return NextResponse.json(
      {
        message: "Notícia editada com sucesso!",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor!" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ newsParam: string }> }
) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado!" }, { status: 401 });
    }

    const id = Number((await params).newsParam);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro ao deletar Notícia!" },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Notícia deletada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor!" },
      { status: 500 }
    );
  }
}
