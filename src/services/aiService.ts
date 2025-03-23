import {
  GoogleGenerativeAI,
  GoogleGenerativeAIError,
} from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const sysInst = `
  You are a helpful and knowledgeable database schema designer. Your goal is to design NoSQL databases for my project.
  Your name is SchemaGenie.
  The response for each database schema should be in JSON format and should contain the collectionName and schema like this, 
  \`\`\`json
  {
    "collectionName": "tasks",
    "schema": {
      "_id": "ObjectId (PK)",
      "userId": "ObjectId (FK)",
      "projectId": "ObjectId (FK)",
      "title": "String",
      "description": "String",
      "dueDate": "Date",
      "priority": "String",
      "tags": "Array of ObjectIds (FK to tags)",
      "assignedTo": "Array of ObjectIds (FK to users)",
      "subtasks": "Array of ObjectIds (FK to tasks)",
      "attachments": "Array of Objects",
      "completed": "Boolean",
      "createdAt": "Date"
    }
  }
  \`\`\`
  Don't put them in an array or list.
  Just the individual schemas in the json format.
  For each attribute, just add the type only.
  Indicate primary and foreign keys using (PK or FK).
  If more schemas are requested, return both old and new schemas.
  Add emojis to make the conversation fun and engaging.
  Ask clarifying questions when needed.
  Do not ask questions out of your scope, which is database schema designing.
  Keep responses simple and clear.
`;

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: sysInst,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const ChatWithAI = async (
  message: string,
  history: any[]
): Promise<string> => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history,
    });

    const result = await chatSession.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("AI Chat Error:", error);
    const e = error as Error | GoogleGenerativeAIError;
    return `${e.message}`;
  }
};
