// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import {
  VectorStoreToolkit,
  createVectorStoreAgent,
  VectorStoreInfo,
} from "langchain/agents";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import {HNSWLib} from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { TextLoader } from "langchain/document_loaders/fs/text";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";

export default async function handler(req, res) {
  const model = new OpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPEN_AI_KEY
    });
  const loader = new TextLoader('src/Copetractapi.txt');
  const embeddings = new OpenAIEmbeddings(
    {
      openAIApiKey: process.env.OPEN_AI_KEY,
    });
  const rawDocs = await loader.load();
  console.log("Loader Created.");

  const textSplitter = new RecursiveCharacterTextSplitter(
    {
      chunkSize: 1000,
      chunkOverlap: 200,
    })
    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log("Docs splitted.");

    console.log("Creating vector store...");

    const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);
    await vectorStore.save("data");
    console.log("done")
    const chain = VectorDBQAChain.fromLLM(model, vectorStore);
    let body = req["body"];
    let messages = body["messages"][0]["content"];
    console.log(messages);
    const response = await chain.call(
      {
        input_documents: docs,
        query: messages,
      });
      res.status(200).json(response);
}
