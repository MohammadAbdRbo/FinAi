"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

function AdvisorPage({ totalBudget, totalIncome, totalSpend }) {
  const { user } = useUser();
  const [messages, setMessages] = useState([
    { text: "Hey there! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;

      const response = await axios.post("/api/chat", {
        message: input,
        totalBudget,
        totalIncome,
        totalSpend,
        userEmail,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.advice, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message to AI:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.",
          sender: "bot",
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 border rounded-2xl p-5">
      <div className="text-black p-4 text-lg font-bold">
        AI Chat Support
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-xl text-white ${
              msg.sender === "user"
                ? "bg-blue-500 self-end ml-auto"
                : "bg-gray-400 self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 flex justify-between">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AdvisorPage;
