import { Database, connectToDB } from "@/database";

export async function GET(request: Request) {
  const Intel = await connectToDB({ dbName: Database.intel });
  const intels = await Intel?.find({}).sort({ createdAt: -1 });
  return new Response(JSON.stringify(intels));
}

// create POST request handler here which will create a new intel in the database and return the newly created intel
export async function POST(request: Request) {
  const Intel = await connectToDB({ dbName: Database.intel });
  const { creator, title, content, type, source } = await request.json();
  const intel = await Intel?.create({ creator, title, content, type, source });
  return new Response(JSON.stringify({ intel }));
}
