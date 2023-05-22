import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  // State variables
  const [message, setMessage] = useState(""); // State for the input message
  const [chats, setChats] = useState([]); // State for the chat messages
  const [isTyping, setIsTyping] = useState(false); // State for the typing indicator

  // Scroll the chat window to the bottom whenever new messages are added
  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [chats]);

  // Handle chat submission
  const handleChatSubmit = async (e) => {
    e.preventDefault();

    if (!message) return;

    setIsTyping(true); // Set typing indicator to true

    let msgs = [...chats];
    msgs.push({ role: "user", content: message });
    setChats(msgs); // Update the chat messages by adding the user's message
    setMessage(""); // Clear the input field

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msgs,
        }),
      });
      const data = await response.json();

      msgs.push(data.output);
      setChats(msgs); // Update the chat messages by adding the assistant's response
      setIsTyping(false); // Set typing indicator to false
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Chatbot</h1>

      <section id="chat-window" className="chat-window">
        <AnimatePresence initial={false}>
          {/* Iterate over the chat messages and animate their appearance */}
          {chats.map((chat, index) => (
            <motion.div
              key={index}
              className={`message ${chat.role}-msg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="avatar">
                <img
                  src={chat.role === "user" ? "/user.png" : "/bot.png"}
                  alt={chat.role === "user" ? "User Avatar" : "Assistant Avatar"}
                />
              </div>
              <span className="content">{chat.content}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* Show typing indicator when there are existing chat messages */}
      {chats.length > 0 && isTyping && (
        <div className="typing-indicator">
          <motion.span
            className="dot"
            animate={{ opacity: [1, 0.3, 1], transition: { duration: 0.8, repeat: Infinity } }}
          ></motion.span>
          <motion.span
            className="dot"
            animate={{ opacity: [1, 0.3, 1], transition: { duration: 0.8, repeat: Infinity, delay: 0.2 } }}
          ></motion.span>
          <motion.span
            className="dot"
            animate={{ opacity: [1, 0.3, 1], transition: { duration: 0.8, repeat: Infinity, delay: 0.4 } }}
          ></motion.span>
        </div>
      )}

      <form onSubmit={handleChatSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Type a message here and hit Enter..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </main>
  );
}

export default App;
