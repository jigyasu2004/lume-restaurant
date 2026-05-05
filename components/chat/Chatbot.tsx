"use client";

import { Bot, Loader2, MessageCircle, Send, User, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const quickPrompts = [
  "What time are you open?",
  "Can I reserve a table?",
  "What dishes do you recommend?",
  "Do you host private events?",
  "How can I order online?"
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Welcome to LUMÉ Dining. I can help with hours, reservations, menu notes, events, or ordering."
    }
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  async function sendMessage(content: string) {
    const trimmed = content.trim();

    if (!trimmed || loading) {
      return;
    }

    setError("");
    setInput("");
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) })
      });

      const data = (await response.json()) as { message?: string; error?: string };

      const assistantMessage = data.message;

      if (!response.ok || typeof assistantMessage !== "string") {
        throw new Error(data.error || "The concierge could not respond.");
      }

      setMessages((current) => [...current, { role: "assistant", content: assistantMessage }]);
    } catch (chatError) {
      setError(
        chatError instanceof Error
          ? chatError.message
          : "The concierge is unavailable right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-5 z-50 grid size-16 place-items-center rounded-full bg-gold text-charcoal shadow-[0_20px_50px_rgba(200,169,106,0.32)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:bottom-7 md:right-7"
          aria-label="Open LUMÉ Concierge chat"
        >
          <MessageCircle className="size-7" />
        </button>
      ) : null}

      {open ? (
        <section
          className="fixed bottom-20 right-3 z-50 flex h-[min(640px,calc(100svh-7rem))] w-[calc(100vw-1.5rem)] max-w-md flex-col overflow-hidden rounded-lg border border-gold/45 bg-[#121212] shadow-2xl md:bottom-7 md:right-7"
          role="dialog"
          aria-label="LUMÉ Concierge chat"
          aria-modal="false"
        >
          <header className="flex items-start justify-between gap-4 border-b border-gold/20 bg-gradient-to-r from-gold to-[#d7bd7b] p-4 text-charcoal">
            <div className="flex gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-charcoal text-gold">
                <Bot className="size-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl">LUMÉ Concierge</h2>
                <p className="text-xs leading-5 opacity-80">
                  Ask about reservations, menu, hours, events, or ordering.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 transition hover:bg-charcoal hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-charcoal"
              aria-label="Close chat"
            >
              <X className="size-5" />
            </button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}-${message.content.slice(0, 10)}`}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`grid size-8 shrink-0 place-items-center rounded-full ${
                    message.role === "assistant" ? "bg-gold text-charcoal" : "bg-clay text-white"
                  }`}
                >
                  {message.role === "assistant" ? <Bot className="size-4" /> : <User className="size-4" />}
                </div>
                <div
                  className={`max-w-[78%] rounded-lg px-4 py-3 text-sm leading-6 ${
                    message.role === "assistant"
                      ? "border border-gold/20 bg-surface text-ivory"
                      : "bg-gold text-charcoal"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-mutedText">
                <Loader2 className="size-4 animate-spin text-gold" />
                LUMÉ Concierge is writing...
              </div>
            ) : null}
            {error ? (
              <div className="rounded-lg border border-clay/50 bg-clay/10 p-3 text-sm text-[#f1a28d]">
                {error}
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-gold/20 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  disabled={loading}
                  className="rounded-md border border-gold/20 bg-surface px-3 py-1.5 text-xs text-mutedText transition hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2">
              <label htmlFor="chat-message" className="sr-only">
                Message
              </label>
              <input
                id="chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask LUMÉ..."
                className="min-h-12 flex-1 rounded-lg border border-gold/25 bg-[#151515] px-4 text-sm text-ivory placeholder:text-mutedText focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
              <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label="Send message">
                {loading ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
              </Button>
            </form>
          </div>
        </section>
      ) : null}
    </>
  );
}
