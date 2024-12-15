"use client";

import { CatGif } from "./cat-gif";
import { HeartIcon } from "./heart-icon";

export function SuccessMessage() {
  const gifUrl =
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmpxZnptaDFnb2p5emxpMG9zbHc3dDhqdXJ6MTVwdjEzMHFpamcyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HJibfnd7xqk5hAMD4v/giphy.gif";
  return (
    <div className="text-center space-y-6">
      <CatGif src={gifUrl} />
      <h2 className="text-4xl font-bold text-pink-600">
        Yay! I'm so happy! 💖
      </h2>

      <p className="text-xl text-gray-700">
        This is the beginning of our beautiful journey together.
      </p>
    </div>
  );
}
