export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (error) {
    return Response.json(
      { error: "Server connection failed!" },
      { status: 500 }
    );
  }
}
