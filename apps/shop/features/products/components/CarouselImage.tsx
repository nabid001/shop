import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type Props = {
  imageGallery: string[];
  mainImage: string;
};

export function CarouselImage({ imageGallery, mainImage }: Props) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className=""
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {imageGallery?.length > 0 ? (
          imageGallery?.map((image, i) => (
            <CarouselItem
              className="relative aspect-square overflow-hidden rounded-sm"
              key={i}
            >
              <Image
                key={i}
                src={image}
                fill
                alt="Product Image"
                className="w-full h-full object-contain"
              />
            </CarouselItem>
          ))
        ) : (
          <>
            <CarouselItem className="relative aspect-square overflow-hidden rounded-sm">
              <Image
                src={mainImage}
                fill
                alt="Product Image"
                className="w-full h-full object-contain"
              />
            </CarouselItem>
          </>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
