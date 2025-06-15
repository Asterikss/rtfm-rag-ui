import { Button } from '@/components/ui/button';

interface IndexSelectorProps {
  indexes: string[];
  selectedIndex: string;
  onSelectIndex: (index: string) => void;
  isLoading: boolean;
}

export const IndexSelector = ({
  indexes,
  selectedIndex,
  onSelectIndex,
  isLoading,
}: IndexSelectorProps) => {
  if (isLoading) {
    return (
      <div className="fixed right-4 top-4 bottom-4 w-[15%] bg-amber-900/20 backdrop-blur-sm border border-amber-800/30 p-4 rounded-2xl">
        <div className="text-amber-100 text-sm">Loading indexes...</div>
      </div>
    );
  }

  return (
    <div
      className="
        fixed top-4 right-4 bottom-4 w-[15%] /* Position with margin */
        flex flex-col /* Enable flex layout */
        bg-amber-900/20 backdrop-blur-sm 
        border border-amber-800/30 /* Use border instead of border-l */
        p-4 rounded-2xl /* Add padding and rounded corners */
      "
    >
      <div className="flex-grow space-y-2 overflow-y-auto pr-1">
        {indexes.map((index) => (
          <Button
            key={index}
            onClick={() => onSelectIndex(index)}
            variant="outline"
            className={`
              w-full text-left justify-start rounded-full px-4 py-2 text-sm
              bg-amber-50/10 border-amber-700/40 text-amber-100 hover:bg-amber-50/20
              ${
                selectedIndex === index
                  ? 'border-2 border-amber-400 bg-amber-50/30'
                  : ''
              }
            `}
          >
            <span className="truncate">{index}</span>
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full text-left justify-start rounded-full px-4 py-2 text-sm
                   bg-amber-50/10 border-amber-700/40 text-amber-100 hover:bg-amber-50/20
                   border-dashed mt-4 flex-shrink-0"
        // disabled
      >
        Add an index
      </Button>
    </div>
  );
};
