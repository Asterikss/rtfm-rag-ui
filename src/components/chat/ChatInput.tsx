import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput = ({
  onSendMessage,
  isLoading,
  disabled,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  // Handle "Enter" to send and "Shift+Enter" for a new line
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a new line
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-4 p-4 border-t">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown} // Add the keydown handler
        placeholder="Ask a question..."
        disabled={isLoading || disabled}
        className="flex-1 resize-none text-white placeholder-gray-300 !text-lg"
        rows={1} // Start with a single row
      />
      <Button
        type="submit"
        disabled={!message.trim() || isLoading || disabled}
        className="h-12 px-6"
      >
        Send
      </Button>
    </form>
  );
};
