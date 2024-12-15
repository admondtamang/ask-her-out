"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProposalDialog } from "@/components/ui/proposal-dialog";
import { HeartIcon } from "@/components/proposal/heart-icon";
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

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
    0: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWhtMGZtZmhnMno1eWRjZDQ1bndscW9sYmU5cTdzd3Y4MHYyYW10cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kiXmQwK9UQZ8EEYXS6/giphy-downsized-large.gif",
    1: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWVhMTQzNWZlazk0azJkdnNpaTV6ejlqMmU0aWtuaGhmaWhxamppbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/puOukoEvH4uAw/giphy.gif",
    2: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXZyZjVnaGxnNHgyOXhrcTIybm90OWV1YjNkcjJtODVha3dvcGt5eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KE0IT2uMyMJzUPNAwX/giphy.gif",
    3: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjM0ODQ0eHQwb21zcjZ2ODRvNGlzaTR0MTc1aGZ1cHZva3BsZGlmMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/I1nwVpCaB4k36/giphy.gif",
  };

  const message = proposalMessages[noCount] || DEFAULT_PROPOSAL_MESSAGE;
  const gifUrl = gifs[noCount] || gifs[1];

  useEffect(() => {
    if (!email) {
      setShowDialog(true);
    }
  }, [email]);

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    setYesButtonSize((prev) => prev + YES_BUTTON_GROWTH_FACTOR);
  };

  const handleYesClick = async () => {
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
