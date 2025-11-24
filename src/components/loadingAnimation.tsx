"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Puzzle from "../../public/images/puzzle.png";
import Kuriboh from "../../public/images/kuriboh.png";
import Crimson from "../../public/images/crimson.png";
import mainWallpaper from "../../public/images/main_wallpaper.png";
import { usePathname } from "next/navigation";

const IMAGES = [Puzzle, Kuriboh, Crimson];

type Props = {
  randomizeOnRouteChange?: boolean;
};

export default function LoadingAnimation({ randomizeOnRouteChange = false }: Props) {
  const [image, setImage] = useState(() => {
    return IMAGES[Math.floor(Math.random() * IMAGES.length)];
  });

  const pathname = usePathname();

  useEffect(() => {
    if (!randomizeOnRouteChange) return;
    setImage(IMAGES[Math.floor(Math.random() * IMAGES.length)]);
  }, [pathname, randomizeOnRouteChange]);

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
        src={image}
        alt="loading"
        className="pulsating"
      />
    </div>
  );
}
