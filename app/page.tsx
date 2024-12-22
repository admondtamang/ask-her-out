"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProposalDialog } from "@/components/ui/proposal-dialog";
import { ProposalButtons } from "@/components/proposal/proposal-buttons";
import { SuccessMessage } from "@/components/proposal/success-message";
import { sendProposalEmail } from "@/lib/email";
import {
  DEFAULT_PROPOSAL_MESSAGE,
  FIRST_PROPOSAL_MESSAGE,
  SECOND_PROPOSAL_MESSAGE,
  THIRD_PROPOSAL_MESSAGE,
  YES_BUTTON_GROWTH_FACTOR,
} from "@/lib/constants";
import { CatGif } from "@/components/proposal/cat-gif";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(1);

  const email = searchParams.get("email") || "";

  const proposalMessages: Record<number, string> = {
    1: FIRST_PROPOSAL_MESSAGE,
    2: SECOND_PROPOSAL_MESSAGE,
    3: THIRD_PROPOSAL_MESSAGE,
  };

  const gifs: Record<number, string> = {
    0: "https://i.pinimg.com/originals/93/e4/e5/93e4e540f3500751660931d2d9c728e0.gif",
    1: "https://i.pinimg.com/originals/dd/ed/a5/ddeda5a202ed4afe4734a7527d30f93a.gif",
    2: "https://i.pinimg.com/originals/1e/93/ea/1e93ea3ef412f08488cbe349e8ae4b99.gif",
    3: "https://i.pinimg.com/originals/8d/9a/3e/8d9a3edce3008fa532a5a41d17667f7e.gif",
  };

  const message = proposalMessages[noCount] || DEFAULT_PROPOSAL_MESSAGE;
  const gifUrl = gifs[noCount] || gifs[1];

  useEffect(() => {
    if (!email) {
      setShowDialog(true);
    }
  }, [email]);

  const handleNoClick = () => {
    if (!email) {
      setShowDialog(true);
      return;
    }

    setNoCount((prev) => prev + 1);
    setYesButtonSize((prev) => prev + YES_BUTTON_GROWTH_FACTOR);
  };

  const handleYesClick = async () => {
    if (!email) {
      setShowDialog(true);
      return;
    }
    setYesPressed(true);
    if (email) {
      await sendProposalEmail({
        email,
        noClicks: noCount,
        result: "yes",
        message,
      });
    }
  };

  const handleEmailSubmit = (newEmail: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("email", newEmail);
    router.push(`?${params.toString()}`);
    copyToClipboard(newEmail);
    toast({
      title: "Copied to clipboard",
      description:
        "Share this email with your friends and receive their response",
    });

    setShowDialog(false);
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white border-4 border-black p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
        {!yesPressed ? (
          <>
            <div className="text-center space-y-4">
              <CatGif src={gifUrl} />
              <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-8 font-serif">
                {message}
              </h1>
            </div>

            <ProposalButtons
              noCount={noCount}
              yesButtonSize={yesButtonSize}
              onNoClick={handleNoClick}
              onYesClick={handleYesClick}
            />
          </>
        ) : (
          <SuccessMessage />
        )}
      </div>

      <ProposalDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onSubmit={handleEmailSubmit}
      />
    </div>
  );
}
