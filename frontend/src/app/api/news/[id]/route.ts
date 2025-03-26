import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  context: { params: { id: string } } 
) {
  try {
    const token = (await cookies()).get("token")?.value; 

    if (!token) {
      return NextResponse.json({ error: "Não autenticado!" }, { status: 401 });
    }

    const { id } = await context.params; 

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function PATCH(req: Request, context: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado!" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      return NextResponse.json(
        { error: data.message || "Erro ao editar notícia!" },
        { status: res.status }
      );
    }

    const updatedNews = await res.json();

    return NextResponse.json(
      {
        message: "Notícia editada com sucesso!",
        data: updatedNews,
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
  context: { params: { id: string } }
) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado!" }, { status: 401 });
    }

    const { id } = await context.params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro ao deletar notícia!" },
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
