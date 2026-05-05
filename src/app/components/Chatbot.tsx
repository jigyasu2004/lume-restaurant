import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to LUMÉ Dining. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickResponses: { [key: string]: string } = {
    'reservation': 'To make a reservation, please scroll to our reservation section above or call us at +1 (555) 284-9081. What date and time works best for you?',
    'hours': 'We are open Monday–Thursday: 11:00 AM – 10:00 PM, Friday–Saturday: 11:00 AM – 11:30 PM, and Sunday: 10:00 AM – 9:00 PM.',
    'menu': 'Our menu features global cuisine including starters, mains, desserts, drinks, and brunch. You can view our full menu in the menu section above. Is there a specific dish you\'d like to know about?',
    'location': 'We are located at 28 Aurora Avenue, Downtown District. You can find directions in our contact section or call us at +1 (555) 284-9081.',
    'private events': 'We offer private dining for corporate dinners, celebrations, and chef\'s table experiences. Please fill out the event inquiry form in the Private Events section or email us at hello@lumedining.com.',
    'order': 'You can place an online order for pickup or delivery in our Order Online section above. Simply select your dishes and add them to your cart!',
    'dietary': 'We offer vegetarian, vegan, and gluten-free options. All menu items are tagged with dietary information. Please let our staff know about any allergies when ordering.',
    'parking': 'We have valet parking available and there is a public parking garage two blocks away on Main Street.',
    'dress code': 'We have a smart casual dress code. We want you to feel comfortable while maintaining our elegant atmosphere.',
    'default': 'I\'m here to help! You can ask me about reservations, our menu, hours, location, private events, or online ordering. How can I assist you?'
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('reservation') || lowerMessage.includes('book') || lowerMessage.includes('table')) {
      return quickResponses['reservation'];
    } else if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('close')) {
      return quickResponses['hours'];
    } else if (lowerMessage.includes('menu') || lowerMessage.includes('food') || lowerMessage.includes('dish')) {
      return quickResponses['menu'];
    } else if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where')) {
      return quickResponses['location'];
    } else if (lowerMessage.includes('event') || lowerMessage.includes('private') || lowerMessage.includes('party')) {
      return quickResponses['private events'];
    } else if (lowerMessage.includes('order') || lowerMessage.includes('delivery') || lowerMessage.includes('pickup')) {
      return quickResponses['order'];
    } else if (lowerMessage.includes('vegan') || lowerMessage.includes('vegetarian') || lowerMessage.includes('gluten') || lowerMessage.includes('allergy')) {
      return quickResponses['dietary'];
    } else if (lowerMessage.includes('park')) {
      return quickResponses['parking'];
    } else if (lowerMessage.includes('dress')) {
      return quickResponses['dress code'];
    } else if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      return 'Hello! How can I help you today?';
    } else if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    } else {
      return quickResponses['default'];
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleQuickAction = (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: action,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(action),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 md:bottom-8 right-8 w-16 h-16 bg-[var(--gold)] text-[var(--charcoal)] rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 md:bottom-8 right-8 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-[var(--card)] border-2 border-[var(--gold)] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--gold)] to-[#D4B87A] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--charcoal)] rounded-full flex items-center justify-center">
                <Bot size={24} className="text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="text-[var(--charcoal)] font-semibold">LUMÉ Assistant</h3>
                <p className="text-[var(--charcoal)] text-xs opacity-80">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-[var(--gold)] rounded-lg p-2 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--charcoal)]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'bot' ? 'bg-[var(--gold)]' : 'bg-[var(--terracotta)]'
                }`}>
                  {message.sender === 'bot' ? (
                    <Bot size={18} className="text-[var(--charcoal)]" />
                  ) : (
                    <User size={18} className="text-white" />
                  )}
                </div>
                <div className={`max-w-[70%] ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'bot'
                      ? 'bg-[var(--card)] text-[var(--ivory)] border border-[var(--border)]'
                      : 'bg-[var(--gold)] text-[var(--charcoal)]'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-[var(--gray)] mt-1 px-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="p-3 border-t border-[var(--border)] bg-[var(--charcoal)]">
              <p className="text-xs text-[var(--gray)] mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickAction('Make a reservation')}
                  className="px-3 py-1.5 bg-[var(--muted)] text-[var(--ivory)] rounded-full text-xs hover:bg-[var(--gold)] hover:text-[var(--charcoal)] transition-colors"
                >
                  Book a table
                </button>
                <button
                  onClick={() => handleQuickAction('View menu')}
                  className="px-3 py-1.5 bg-[var(--muted)] text-[var(--ivory)] rounded-full text-xs hover:bg-[var(--gold)] hover:text-[var(--charcoal)] transition-colors"
                >
                  See menu
                </button>
                <button
                  onClick={() => handleQuickAction('Opening hours')}
                  className="px-3 py-1.5 bg-[var(--muted)] text-[var(--ivory)] rounded-full text-xs hover:bg-[var(--gold)] hover:text-[var(--charcoal)] transition-colors"
                >
                  Hours
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-[var(--border)] bg-[var(--charcoal)]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-xl bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-12 h-12 bg-[var(--gold)] text-[var(--charcoal)] rounded-xl hover:bg-[#D4B87A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
