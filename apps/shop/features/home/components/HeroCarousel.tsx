"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { use } from "react";
import { THeroBanner } from "@/sanity/actions/actions";
import Link from "next/link";

const HeroCarousel = ({
  heroBannerPromise,
}: {
  heroBannerPromise: Promise<THeroBanner | THeroBanner>;
}) => {
  const res = use(heroBannerPromise);

  return (
    <section className="relative">
      <Carousel
        className="w-full"
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {res.map((slide, index) => (
            <CarouselItem
              key={index}
              className="relative h-[70vh] min-h-[500px] overflow-hidden"
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 1}
                className="object-cover object-center"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center text-white">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 text-balance">
                    {slide.title}
                    <br />
                    <span className="text-accent-foreground opacity-90">
                      {slide.subtitle}
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-pretty opacity-90">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href={slide.primaryButton.url}
                      className="bg-white text-black px-8 py-3 rounded-lg hover:bg-white/90 transition-colors font-medium"
                    >
                      {slide.primaryButton.name}
                    </Link>
                    <Link
                      href={slide.secondaryButton.url}
                      className="border border-white/30 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium backdrop-blur-sm"
                    >
                      {slide.secondaryButton.name}
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
        <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
