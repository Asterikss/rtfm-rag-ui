import { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { useIndexes } from '@/hooks/useIndexes';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { IndexSelector } from '@/components/chat/IndexSelector';
import { Card } from '@/components/ui/card';
import { ChatLoadingMessage } from '@/components/chat/ChatLoadingMessage';
import { ControlPanel } from '@/components/chat/ControlPanel';

function App() {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const {
    indexes,
    selectedIndex,
    setSelectedIndex,
    isLoading: indexesLoading,
  } = useIndexes();
  const [userId] = useState('user-' + crypto.randomUUID().slice(0, 8));

  const handleSendMessage = (text: string) => {
    if (!selectedIndex) {
      return;
    }
    sendMessage(text, selectedIndex, userId);
  };

  return (
    // <div className="min-h-screen bg-slate-800/80 flex">
    // <div className="min-h-screen bg-fuchsia-50/20 flex">
    <div className="min-h-screen bg-zinc-800 flex">
      {/* Left Panel */}
      <ControlPanel
        onClearChat={clearMessages}
        isChatEmpty={messages.length === 0}
      />

      {/* Main Content (Center) */}
      <div className="flex-1 flex flex-col">
        {/* HEADER REMOVED */}

        {/* Chat Area */}
        <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col pt-16">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <ChatLoadingMessage />}

            {error && (
              <Card className="p-4 bg-red-50 border-red-200">
                <p className="text-red-600 text-sm">Error: {error}</p>
              </Card>
            )}
          </div>

          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            disabled={!selectedIndex || indexesLoading}
          />
        </main>
      </div>

      {/* Right Panel */}
      <IndexSelector
        indexes={indexes}
        selectedIndex={selectedIndex}
        onSelectIndex={setSelectedIndex}
        isLoading={indexesLoading}
      />
    </div>
  );
}

export default App;
