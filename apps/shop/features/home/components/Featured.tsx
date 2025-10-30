"use client";

import type React from "react";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { blurUrl, imgUrl } from "@/lib/utils";
import Image from "next/image";
import { TFeatured } from "@/types";
import Link from "next/link";
import { urlFor } from "@repo/sanity-config/image";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

const Featured = ({
  featuredPromise,
}: {
  featuredPromise: Promise<TFeatured>;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const products = use(featuredPromise);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Get visible products based on screen size
  const getVisibleProducts = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;

    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const [visibleProducts, setVisibleProducts] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleProducts(getVisibleProducts());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= products.length - visibleProducts ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - visibleProducts : prevIndex - 1
    );
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();

    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4 text-balance">
            Featured Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our carefully curated selection of premium clothing
            essentials for every occasion
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 transition-all duration-200 hidden sm:flex"
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/80 transition-all duration-200 hidden sm:flex"
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Products Grid */}
          <div
            className="overflow-hidden mx-8 sm:mx-12"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)`,
              }}
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleProducts}%` }}
                >
                  <Card className="group cursor-pointer border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg bg-card">
                    <div className="relative overflow-hidden rounded-t-lg">
                      {/* Product Image */}
                      <div className="aspect-square bg-muted/30 overflow-hidden">
                        <Image
                          src={product.image}
                          fill
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="absolute top-3 left-3 flex gap-2">
                        {product.salePrice < product.price && (
                          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                            Sale
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product Info */}
                    <Link
                      href={`/products/${product.slug.current}`}
                      className="p-4"
                    >
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-medium text-foreground mb-2 text-balance">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-foreground">
                          ${product.salePrice}
                        </span>
                        {product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </Link>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({
              length: Math.ceil(products.length / visibleProducts),
            }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  Math.floor(currentIndex / visibleProducts) === index
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => setCurrentIndex(index * visibleProducts)}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 bg-transparent"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
