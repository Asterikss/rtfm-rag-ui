import { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function App() {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const [indexName, setIndexName] = useState('');
  const [userId] = useState('user-' + crypto.randomUUID().slice(0, 8));

  const handleSendMessage = (text: string) => {
    if (!indexName.trim()) {
      alert('Please enter an index name first');
      return;
    }
    sendMessage(text, indexName.trim(), userId);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">RTFM Assistant</h1>

          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Enter index name (e.g., 'docs_tinygrad_org')"
                value={indexName}
                onChange={(e) => setIndexName(e.target.value)}
                className="w-full"
              />
            </div>
            <Button 
              onClick={clearMessages}
              variant="outline"
              disabled={messages.length === 0}
            >
              Clear Chat
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <Card className="p-8 text-center">
              <h2 className="text-lg font-semibold text-gray-600 mb-2">
                "Read The Friendly Manual" Assistant it is!
              </h2>
              <p className="text-gray-500">
                Enter an index name above and start asking questions about the chosen documentation.
              </p>
            </Card>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}

          {error && (
            <Card className="p-4 bg-red-50 border-red-200">
              <p className="text-red-600 text-sm">Error: {error}</p>
            </Card>
          )}
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={!indexName.trim()}
        />
      </main>
    </div>
  );
}

export default App;
