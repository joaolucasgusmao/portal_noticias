import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado!" }, { status: 401 });
    }

    const id = (await params).id;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      const data = await res.json();
      return NextResponse.json(
        { error: data.message || "Erro ao obter Categoria!" },
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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado!" }, { status: 401 });
    }

    const id = (await params).id;
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const data = await res.json();
      return NextResponse.json(
        { error: data.message || "Erro ao editar Categoria!" },
        { status: res.status }
      );
    }

    const updatedCategory = await res.json();

    return NextResponse.json(
      {
        message: "Categoria editada com sucesso!",
        data: updatedCategory,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado!" }, { status: 401 });
    }

    const id = (await params).id;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro ao deletar Categoria!" },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Categoria deletada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor!" },
      { status: 500 }
    );
  }
}
