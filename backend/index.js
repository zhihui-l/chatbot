import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// OpenAI configuration
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Handle POST request
app.post("/", async (request, response) => {
  const { msgs } = request.body;

  // Create chat completion using OpenAI API
  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      ...msgs,
    ],
  });

  // Send the output as response
  response.json({
    output: result.data.choices[0].message,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
