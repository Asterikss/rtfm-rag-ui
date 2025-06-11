import { Button } from '@/components/ui/button';

interface ControlPanelProps {
  onClearChat: () => void;
  isChatEmpty: boolean;
}

export const ControlPanel = ({
  onClearChat,
  isChatEmpty,
}: ControlPanelProps) => {
  return (
    <div
      className="
        fixed top-4 left-4 bottom-4 w-[15%] /* Position with margin on the left */
        flex flex-col /* Enable flex layout */
        bg-amber-900/20 backdrop-blur-sm 
        border border-amber-800/30
        p-4 rounded-2xl
      "
    >
      {/* Top Section: Title and New Chat Button */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold text-amber-100 mb-6 text-center">
          RTFM Assistant
        </h1>
        <Button
          variant="outline"
          className="w-full text-left justify-start rounded-full px-4 py-2 text-sm
                     bg-amber-50/10 border-amber-700/40 text-amber-100 hover:bg-amber-50/20"
          // disabled
        >
          New Chat
        </Button>
      </div>

      {/* This empty div grows to push the "Clear Chat" button to the bottom */}
      <div className="flex-grow"></div>

      {/* Bottom Section: Clear Chat Button */}
      <div className="flex-shrink-0">
        <Button
          onClick={onClearChat}
          disabled={isChatEmpty}
          variant="outline"
          className="w-full text-left justify-start rounded-full px-4 py-2 text-sm
                     bg-amber-50/10 border-amber-700/40 text-amber-100 hover:bg-amber-50/20
                     border-dashed"
        >
          Clear Chat
        </Button>
      </div>
    </div>
  );
};
