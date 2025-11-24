"use client";

import Image from "next/image";
import React from "react";
import Puzzle from "../../public/images/puzzle.png";
import Kuriboh from "../../public/images/kuriboh.png";
import Crimson from "../../public/images/crimson.png";
import mainWallpaper from "../../public/images/main_wallpaper.png";

const pickRandomImage = () => {
  const images = [Puzzle, Kuriboh, Crimson];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const LoadingAnimation = () => {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-700 flex justify-center items-center"
      style={{
        backgroundImage: `url(${mainWallpaper.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Image
        width={200}
        height={200}
        src={pickRandomImage()}
        alt="loading"
        className="pulsating"
      />
    </div>
  );
};

export default LoadingAnimation;
