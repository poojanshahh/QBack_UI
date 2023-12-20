import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
//import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Ollama } from "langchain/llms/ollama";
import { PromptTemplate } from "langchain/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";
//import { HuggingFaceTransformersEmbeddings } from "langchain/embeddings/hf_transformers";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { formatDocumentsAsString } from "langchain/util/document";

export const getQB = async (text?: string) => {
  console.log("here");
  const loader = new CheerioWebBaseLoader(
    "https://ontic.co/product/incidents-investigations-and-case-management/"
  );
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkOverlap: 0,
    chunkSize: 500,
  });

  const splitDocuments = await splitter.splitDocuments(docs);

  console.log("here2");

  const embeddings = new OllamaEmbeddings({
    model: "orca-mini",
    baseUrl: "http://localhost:11434",
  });

  const res = await embeddings.embedQuery("Hello world");

  console.log("here3", res);

  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocuments,
    embeddings
    //new HuggingFaceTransformersEmbeddings()
  );

  const retriever = vectorstore.asRetriever();

  // Prompt
  const prompt =
    PromptTemplate.fromTemplate(`Answer the question based only on the following context:
  {context}

  Question: {question}`);

  const model = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "orca-mini",
  });

  const chain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const result = await chain.invoke(
    text ||
      `Extract following items:
    "Company name"
    "Products"
    "Features"
    "Sub Features"`
  );

  console.log(result);

  return result;
};
/*
  Based on the provided context, there are three approaches to task decomposition:

  1. Using simple prompts like "Steps for XYZ" or "What are the subgoals for achieving XYZ?" to elicit a list of tasks from a language model (LLM).
  2. Providing task-specific instructions, such as "Write a story outline" for writing a novel, to guide the LLM in decomposing the task into smaller subtasks.
  3. Incorporating human inputs to help the LLM learn and improve its decomposition abilities over time.
*/
