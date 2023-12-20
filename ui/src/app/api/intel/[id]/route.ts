import { Database, connectToDB } from "@/database";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const Intel = await connectToDB({ dbName: Database.intel });
  const intel = await Intel?.findOne({ _id: params.id });
  return new Response(JSON.stringify(intel));
}

// create POST request handler here which will create a new intel in the database and return the newly created intel
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title, content, type, source } = await request.json();
  const Intel = await connectToDB({ dbName: Database.intel });
  const intel = await Intel?.updateOne({
    _id: params.id,
    title,
    content,
    type,
    source,
  });
  return new Response(JSON.stringify({ intel }));
}
