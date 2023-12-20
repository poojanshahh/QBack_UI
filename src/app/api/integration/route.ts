// import { connectToDB } from "@/utils/database";
// import { Database } from "@/models";

const INTEGRATIONS = [
  {
    label: "Slack",
    id: "slack",
    status: "connected",
    lastSync: "2021-08-01T12:00:00Z",
    lastSyncStatus: "success",
  },
  {
    label: "Salesforce",
    id: "salesforce",
    status: "connected",
    lastSync: "2021-08-01T12:00:00Z",
    lastSyncStatus: "success",
  },
  {
    label: "Zoom",
    id: "zoom",
    status: "connected",
    lastSync: "2021-08-01T12:00:00Z",
    lastSyncStatus: "success",
  },
  {
    label: "G2",
    id: "g2",
    status: "connected",
    lastSync: "2021-08-01T12:00:00Z",
    lastSyncStatus: "success",
  },
];

export async function GET(request: Request) {
  // const Intel = await connectToDB({ dbName: Database.intel });
  // const intels = await Intel?.find({}).sort({ createdAt: -1 });
  return new Response(JSON.stringify(INTEGRATIONS));
}

// create POST request handler here which will create a new intel in the database and return the newly created intel
export async function POST(request: Request) {
  // const Intel = await connectToDB({ dbName: Database.intel });
  // const { creator, title, content, type, source } = await request.json();
  // const intel = await Intel?.create({ creator, title, content, type, source });
  //return new Response(JSON.stringify({ intel }));
}
