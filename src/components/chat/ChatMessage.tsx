import { ChatMessage as ChatMessageType } from '@/types/api';
import { Card } from '@/components/ui/card';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex w-full ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <Card className={`max-w-[80%] p-4 ${
        message.type === 'user' 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">{message.content}</p>

          {message.links && message.links.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-semibold opacity-75">Sources:</p>
              {message.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs underline opacity-75 hover:opacity-100"
                >
                  {link}
                </a>
              ))}
            </div>
          )}

          <p className="text-xs opacity-50">
            {message.timestamp.toLocaleTimeString()}
          </p>
        </div>
      </Card>
    </div>
  );
};
