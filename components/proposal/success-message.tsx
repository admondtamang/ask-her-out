"use client";

import { CatGif } from "./cat-gif";
import Realistic from "react-canvas-confetti/dist/presets/realistic";

export function SuccessMessage() {
  const gifUrl = "https://i.imgur.com/6eED710.gif";
  return (
    <div className="text-center space-y-6">
      <Realistic autorun={{ speed: 0.3, duration: 3 }} />

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
