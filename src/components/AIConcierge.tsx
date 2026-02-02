"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "bot",
    text: "Hello! I'm your AI Travel Concierge. I can help you discover destinations, plan itineraries, and answer any travel questions. What kind of adventure are you dreaming of?",
    timestamp: new Date(),
  },
];

const quickReplies = [
  "Beach getaway",
  "Cultural exploration",
  "Adventure trip",
  "Romantic escape",
];

export default function AIConcierge() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);

    // Simulate AI response based on keywords
    let response = "";
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("beach") || lowerMessage.includes("ocean")) {
      response =
        "For a beach getaway, I'd recommend the Maldives for ultimate luxury, or Santorini for stunning views and culture. What's your preferred travel date and budget range?";
    } else if (lowerMessage.includes("culture") || lowerMessage.includes("history")) {
      response =
        "Cultural exploration is wonderful! Kyoto, Japan offers ancient temples and traditions, while Peru's Machu Picchu combines history with adventure. Would you like more details on either?";
    } else if (lowerMessage.includes("adventure") || lowerMessage.includes("trek")) {
      response =
        "For adventure seekers, I recommend Machu Picchu in Peru or the Swiss Alps. Both offer incredible trekking experiences. Are you interested in multi-day hikes?";
    } else if (lowerMessage.includes("romantic") || lowerMessage.includes("honeymoon")) {
      response =
        "Romantic escapes are our specialty! Santorini's sunsets and the Maldives' private overwater villas are perfect for couples. When are you planning your trip?";
    } else {
      response =
        "That sounds exciting! I can help you explore options. Could you tell me more about what kind of experience you're looking for, your preferred dates, and approximate budget?";
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "bot",
          text: response,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    simulateBotResponse(inputValue);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: reply,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    simulateBotResponse(reply);
  };

  return (
    <section id="ai-assistant" className="py-20 lg:py-32 bg-cod-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-action-orange font-semibold text-sm uppercase tracking-wider mb-4">
              AI-Powered Travel Planning
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Meet Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-action-orange to-riksja-red">
                Virtual Travel Assistant
              </span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Get instant, personalized travel recommendations 24/7. Our AI
              concierge learns your preferences and helps you discover perfect
              destinations, plan itineraries, and answer all your travel
              questions.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                "Instant responses, anytime",
                "Personalized recommendations",
                "Itinerary planning assistance",
                "Budget-friendly suggestions",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 justify-center lg:justify-start"
                >
                  <div className="w-6 h-6 bg-action-orange/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-action-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Widget */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto lg:mx-0 lg:ml-auto">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-riksja-red to-action-orange p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    AI Travel Concierge
                  </h3>
                  <p className="text-white/80 text-sm flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Online now</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 chat-scrollbar bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-riksja-red text-white rounded-br-md"
                        : "bg-white text-cod-gray shadow-md rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-cod-gray px-4 py-3 rounded-2xl rounded-bl-md shadow-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-off-white hover:bg-riksja-red hover:text-white text-cod-gray px-3 py-2 rounded-full transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-riksja-red/50 focus:border-riksja-red"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="bg-riksja-red hover:bg-riksja-red/90 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
