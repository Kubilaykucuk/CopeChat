import React, { useState, useEffect } from "react";
import Image from 'next/image'
import axios from 'axios';
import TypingAnimation from "../components/TypingAnimation";
import FAQTable from "./FAQTable";

export default function Chatbot() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  // Load chat history from local storage on component mount
  useEffect(() => {
    const storedChatLog = localStorage.getItem('chatLog');
    if (storedChatLog) {
      setChatLog(JSON.parse(storedChatLog));
    }
  }, []);

  // Update local storage whenever chat log changes
  useEffect(() => {
    localStorage.setItem('chatLog', JSON.stringify(chatLog));
  }, [chatLog]);

  const handleUserMessage = (message) => {
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message }]);
    sendMessage(message);
  };

  const handleBotMessage = (message) => {
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    handleUserMessage(inputValue);

    setInputValue('');
    setFormVisible(false);
  };

  const sendMessage = (message) => {
    const url = '/api/chat';

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": message }]
    };

    setIsLoading(true);

    axios.post(url, data)
      .then((response) => {
        console.log(response["data"]["text"]);
        handleBotMessage(response["data"]["text"]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="container max-w-[400px]">
      <div className="flex flex-col min-h-[600px] max-h-[600px] bg-white border-4 rounded-md divide-black">
        <div className="flex items-center justify-start p-4">
          <Image className="" src="/copetract_logo2.png" alt="Logo" width={30} height={30} />
          <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text ml-2 text-center py-3 font-bold text-3xl">CopeTract Chat</h1>
        </div>
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`${message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'} rounded-lg p-4 text-white tex-1x1 max-w-sm`}
                >
                  {message.message}
                </div>
              </div>
            ))}
            {isLoading && (
              <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                  <TypingAnimation />
                </div>
              </div>
            )}
          </div>
        </div>
        {formVisible && (
          <div>
            <FAQTable onFAQClick={handleUserMessage} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
