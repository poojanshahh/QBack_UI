import { Database, connectToDB } from "@/database";

const WORKFLOWS = [
  { label: "Battlecards" },
  { label: "Case Study" },
  { label: "Deal Support" },
  { label: "Pricing Insights" },
];

export async function GET(request: Request) {
  return new Response(JSON.stringify(WORKFLOWS));
}
