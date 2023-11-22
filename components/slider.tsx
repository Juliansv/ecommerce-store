"use client";

import Image from "next/image";
import { Slides } from "@/types";
import Carousel from "nuka-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps {
  data: Slides[];
}

const Slider: React.FC<SliderProps> = ({ data }) => {
  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      <Carousel
        adaptiveHeight={true}
        autoplay={true}
        wrapAround={true}
        autoplayInterval={8000}
        speed={3000}
        cellAlign="center"
        className="py-2"
        defaultControlsConfig={
          {
            nextButtonText: <ChevronRight />,
            prevButtonText: <ChevronLeft />,
          }
        }
      >
        {data.map((item) => (
          <div key={item.id} className="flex justify-center">
            <Image
              alt={item.label}
              src={item.imageUrl}
              width={300}
              height={300}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
