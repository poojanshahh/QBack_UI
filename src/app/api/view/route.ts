import { Database, connectToDB } from "@/database";

const VIEWS = [
  { label: "Competitor x Product x Pricings", features: [] },
  { label: "Zoom x Insight x Product", features: [] },
  { label: "Competitor x Product x Differentiator", features: [] },
  { label: "G2 x Competitor x Product", features: [] },
];

export async function GET(request: Request) {
  return new Response(JSON.stringify(VIEWS));
}
