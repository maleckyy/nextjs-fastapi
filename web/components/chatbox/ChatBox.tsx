'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { BotMessageSquare, X } from 'lucide-react';
import AnimatedSpinner from '../shared/AnimatedSpinner';
import { useAskChatBox } from '@/api/chatbox/useAskChatbox';
import useChatBoxStore from '@/store/chatBoxStore/useChatBoxStore';
import { cn } from '@/lib/utils';

export default function ChatBox() {
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { messages, addClientMessage, addBotMessage } = useChatBoxStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const askMutation = useAskChatBox();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    addClientMessage(inputValue);
    setLoadingAnswer(true);
    askMutation.mutate(inputValue, {
      onSuccess: (data) => {
        addBotMessage(data.answer);
        setLoadingAnswer(false);
      }
    });
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={cn("fixed sm:bottom-4 sm:right-4 bottom-2 right-2 z-50", isOpen && "left-2 sm:left-auto")}>
      {isOpen ? (
        <Card
          id="chat-box"
          data-testid="chatbox-card"
          className="md:w-80 w-[100%] h-120 bg-white shadow-lg rounded-lg overflow-hidden p-0 transition-all duration-300 ease-in-out transform scale-100 opacity-100"
        >
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">GuideBot</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'answer' ? 'mr-auto justify-start' : 'ml-auto justify-end'}`}
                >
                  <div
                    className={`sm:max-w-xs w-[90%] px-4 py-2 rounded-lg text-sm ${message.type === 'question'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {loadingAnswer && <AnimatedSpinner className="p-2" />}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDownCapture={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={inputValue.trim().length < 5}>
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full transition-all duration-300 ease-in-out transform scale-100 opacity-100 hover:scale-110"
        >
          <span className="sr-only">Open chat</span>
          <BotMessageSquare size={36} />
        </Button>
      )}
    </div>
  );
}