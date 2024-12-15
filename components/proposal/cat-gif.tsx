"use client";

import Image from "next/image";

export function CatGif(props: { src: string }) {
  return (
    <div className="relative w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <Image
        src={props.src}
        alt="Cute cat with heart"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
