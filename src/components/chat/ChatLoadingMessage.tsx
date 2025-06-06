import { Card } from '@/components/ui/card';

export const ChatLoadingMessage = () => (
  <div className="flex w-full justify-start">
    <Card className="max-w-[85%] bg-transparent border-none text-gray-900">
      <div className="p-4 flex items-center gap-2">
        <span className="flex gap-1">
          <span className="w-4 h-5 bg-amber-500/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-4 bg-amber-500/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-5 bg-amber-500/50 rounded-full animate-bounce"></span>
        </span>
      </div>
    </Card>
  </div>
);
