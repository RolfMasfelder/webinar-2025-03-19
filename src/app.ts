import OpenAI from 'openai';
import dotenv from 'dotenv';
import { dot } from 'mathjs';
import fs from 'fs';
import path from 'path';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const dbFilePath = 'inMemVectorDb.json';
let inMemVectorDb: { content: string; embedding: number[] }[] = [];

// Check if the vector database file already exists
if (fs.existsSync(dbFilePath)) {
  console.log('Loading existing vector database from file...');
  const fileContent = fs.readFileSync(dbFilePath, 'utf-8');
  inMemVectorDb = JSON.parse(fileContent);
} else {
  console.log('Creating new vector database...');
  
  // Load all markdown (.md) files in the ./data directory
  // Put the content in an array of strings
  const markdownContents = loadMarkdownFiles();

  // Calculate embedding vectors for each markdown file
  const embeddings = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: markdownContents
  });

  // Combine the embeddings with the markdown contents
  inMemVectorDb = embeddings.data.map((embedding, index) => ({
    content: markdownContents[index],
    embedding: embedding.embedding
  }));

  // Store the in-memory vector database in a file (JSON)
  fs.writeFileSync(dbFilePath, JSON.stringify(inMemVectorDb, null, 2));
  console.log('Vector database created and saved to file.');
}

const query = "From C#, I know how to handle exceptions. How about in HappyLang?";
const queryEmbedding = await client.embeddings.create({
  model: "text-embedding-3-large",
  input: query
});

const queryEmbeddingVector = queryEmbedding.data[0].embedding;

// Calculate the dot product of the query embedding with each embedding in the "database" inMemVectorDb
const similarities = inMemVectorDb.map(item => ({
  content: item.content,
  similarity: dot(queryEmbeddingVector, item.embedding)
}));

// Sort the similarities in descending order
const sortedSimilarities = similarities.sort((a, b) => b.similarity - a.similarity);

// Read prompt.md from disk
const prompt = fs.readFileSync('./prompt.md', 'utf-8');

// Replace {KNOWLEDGE} in prompt with the top 3 results
const top3Results = sortedSimilarities.slice(0, 3).map(result => result.content).join('\n\n---\n\n');
const updatedPrompt = prompt.replace('{KNOWLEDGE}', top3Results);

const response = await client.responses.create({
  model: "gpt-4o",
  instructions: updatedPrompt,
  input: query
});

console.log(response.output_text);

function loadMarkdownFiles(): string[] {
  const dataDir = './data';
  const markdownFiles: string[] = [];

  // Check if directory exists
  if (!fs.existsSync(dataDir)) {
    console.warn(`Directory ${dataDir} does not exist`);
    return markdownFiles;
  }

  // Read all files in the directory
  const files = fs.readdirSync(dataDir);
  
  // Filter for .md files and read their contents
  files.forEach(file => {
    if (path.extname(file) === '.md') {
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      markdownFiles.push(content);
    }
  });

  return markdownFiles;
};
