import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("token")?.value || null;

  if (token) {
    return new Response(JSON.stringify({ token }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Não autenticado" }), {
      status: 401,
    });
  }
}
