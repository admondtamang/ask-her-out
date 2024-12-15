"use client";

import { Button } from "@/components/ui/button";
import { MAX_YES_BUTTON_SIZE, YES_BUTTON_GROWTH_FACTOR } from "@/lib/constants";

interface ProposalButtonsProps {
  noCount: number;
  yesButtonSize: number;
  onNoClick: () => void;
  onYesClick: () => void;
}

export function ProposalButtons({
  noCount,
  yesButtonSize,
  onNoClick,
  onYesClick,
}: ProposalButtonsProps) {
  const clampedYesButtonSize = Math.min(yesButtonSize, MAX_YES_BUTTON_SIZE);

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
      {noCount != 3 && (
        <Button
          onClick={onNoClick}
          className="bg-gray-200 hover:bg-gray-300 text-black border-2 border-black p-6 text-xl transform transition-all hover:-translate-y-1 min-w-[150px]"
        >
          No {noCount > 0 ? `(${noCount})` : ""}
        </Button>
      )}

      <Button
        onClick={onYesClick}
        style={{
          transform: `scale(${clampedYesButtonSize})`,
          transformOrigin: "center",
        }}
        className="bg-pink-500 hover:bg-pink-600 text-white border-2 border-black p-6 text-xl transform transition-all hover:-translate-y-1 min-w-[150px]"
      >
        Yes!
      </Button>
    </div>
  );
}
