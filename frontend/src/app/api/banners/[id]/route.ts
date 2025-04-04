import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/banners/${id}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      const data = await res.json();
      return NextResponse.json(
        { error: data.message || "Erro ao buscar Banner!" },
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners/${id}`, {
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
        { error: data.message || "Erro ao editar Banner!" },
        { status: res.status }
      );
    }

    const updatedBanner = await res.json();

    return NextResponse.json(
      {
        message: "Banner editado com sucesso!",
        data: updatedBanner,
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro ao deletar Banner!" },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Banner deletado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor!" },
      { status: 500 }
    );
  }
}
