"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Puzzle from "../../public/images/puzzle.png";
import Kuriboh from "../../public/images/kuriboh.png";
import Crimson from "../../public/images/crimson.png";
import mainWallpaper from "../../public/images/main_wallpaper.png";

const IMAGES = [Puzzle, Kuriboh, Crimson];

export default function LoadingAnimation() {
  const [image, setImage] = useState<typeof Puzzle | null>(null);
  const pickIndex = (max: number) => {
    try {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      return array[0] % max;
    } catch (e) {
      console.warn("Crypto random failed, falling back to Math.random()", e);
      return Math.floor(Math.random() * max);
    }
  };

  useEffect(() => {
    const idx = pickIndex(IMAGES.length);
    console.log("[LoadingAnimation] picked index:", idx, "src:", IMAGES[idx].src);
    setImage(IMAGES[idx]);
  }, []);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-700 flex flex-col justify-center items-center gap-4"
      style={{
        backgroundImage: `url(${mainWallpaper.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Image
        width={200}
        height={200}
        src={image}
        alt="loading"
        className="pulsating"
      />
    </div>
  );
}
