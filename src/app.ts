import OpenAI from 'openai';
import dotenv from 'dotenv';
import { dot } from 'mathjs';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const texts = [
  "Ich mag Sport, um fit zu bleiben",
  "Ich hasse es, ins Fitnessstudio zu gehen",
  "I love sports, it helps me to stay fit"
];

const embeddings = await client.embeddings.create({
  model: 'text-embedding-3-large',
  input: texts,
});

const similarity1 = dot(embeddings.data[0].embedding, embeddings.data[1].embedding);
const similarity2 = dot(embeddings.data[0].embedding, embeddings.data[2].embedding);
console.log(similarity1);
console.log(similarity2);
