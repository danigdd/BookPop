export async function GET() {
  return Response.json([
    { id: 1, title: "Dune" },
    { id: 2, title: "1984" },
  ]);
}
