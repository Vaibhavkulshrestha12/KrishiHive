import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm your FPO assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm a demo AI assistant. In the production version, I'll be connected to a real AI service to help you with your FPO-related queries.",
        isUser: false
      }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="p-4 bg-green-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">FPO Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.isUser
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSend}
                className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;