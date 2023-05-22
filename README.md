## AI Chatbot Application

![Chatbot Application](frontend/app.png)
This is a chatbot application built using React and Node.js with OpenAI GPT API. The application allows users to interact with an AI-powered assistant using a chat interface.

### Frontend (React)

The frontend of the application is built using React. It consists of a chat window where messages are displayed and an input field for users to enter their messages. The messages are animated using the Framer Motion library. The state variables used in the application are:

- `message`: Stores the user's input message.
- `chats`: Stores the chat messages exchanged between the user and the assistant.
- `isTyping`: Indicates whether the assistant is currently typing a response.

The application uses the `useState` hook to manage the state variables. The `useEffect` hook is used to scroll the chat window to the bottom whenever new messages are added.

The user can enter a message in the input field and submit it by pressing Enter or clicking the "Send" button. Upon submission, the application sends a POST request to the backend server to process the user's message and retrieve the assistant's response. The response is then added to the chat messages.

### Backend (Node.js)

The backend server is built using Node.js and Express. It provides an API endpoint that receives the user's messages and interacts with the OpenAI API to generate the assistant's response. The OpenAI API is accessed using the `openai` npm package.

The server listens for POST requests at the root ("/") endpoint. When a request is received, the server extracts the messages from the request body and sends them to the OpenAI API using the `createChatCompletion` method. The assistant's response is extracted from the API result and sent back as a JSON response.

The server is configured to use the `body-parser` middleware to parse incoming JSON data and the `cors` middleware to handle cross-origin resource sharing.

### Configuration

The OpenAI API key is stored in a separate `config.js` file. Please make sure to provide your own API key in this file before running the application. The `config.js` file exports the `apiKey` variable.

### Running the Application

To run the application, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Navigate into the `backend` folder `cd backend`
3. Install the dependencies ``npm install``
4. Create an empty file `config.js`
5. Add `export const apiKey = "YOUR_API_KEY"` in the `config.js` file
6. Replace `"YOUR_API_KEY"` with your OpenAI API key 
7. Start the backend server by running the command `node index.js` in the backend directory.
8. Navifate into the `frontend` folder `cd frontend`
9. Install the dependencies ``npm install``
10. Start the local server by running the command `npm start` in the `frontend` directory.
11. Access the application in your web browser.

