import { getQB } from "./qb";

export async function GET(request: Request) {
  // const res = await query({
  //   inputs: "Can you please let us know more details about your ",
  // });

  // console.log(JSON.stringify(res));

  const res = await getQB();

  console.log("in api", res);

  return new Response(JSON.stringify(res));
}

async function query(data: any) {
  const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
  const response = await fetch(
    "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-hf",
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

export async function POST(request: Request) {
  const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
  const { content: text } = await request.json();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
      cache: "no-cache",
    }
  ).catch((err) => {
    console.log(err);
  });

  const summaries = await response?.json();
  return new Response(JSON.stringify({ summaries }));
}
