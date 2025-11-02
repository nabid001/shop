"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  SlidersHorizontal,
  ShoppingCart,
  Heart,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviews?: number;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 29,
    originalPrice: 39,
    image: "/classic-white-cotton-t-shirt-on-hanger.jpg",
    category: "T-Shirts",
    isNew: true,
    isSale: true,
    rating: 4.5,
    reviews: 89,
  },
  {
    id: 2,
    name: "Premium Dress Shirt",
    price: 89,
    image: "/elegant-white-dress-shirt-folded.jpg",
    category: "Shirts",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 3,
    name: "Slim Fit Chinos",
    price: 79,
    image: "/khaki-chino-pants-folded.jpg",
    category: "Pants",
    isNew: true,
    rating: 4.6,
    reviews: 67,
  },
  {
    id: 4,
    name: "Vintage Denim Jeans",
    price: 95,
    originalPrice: 120,
    image: "/dark-blue-denim-jeans-folded.jpg",
    category: "Pants",
    isSale: true,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 5,
    name: "Casual Polo Shirt",
    price: 55,
    image: "/navy-blue-polo-shirt-on-hanger.jpg",
    category: "Shirts",
    isNew: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 6,
    name: "Graphic Print Tee",
    price: 35,
    image: "/black-graphic-t-shirt-with-minimal-design.jpg",
    category: "T-Shirts",
    rating: 4.4,
    reviews: 45,
  },
  {
    id: 7,
    name: "Premium Cotton Henley",
    price: 65,
    image: "/premium-cotton-henley-shirt-hanging.jpg",
    category: "Shirts",
    rating: 4.7,
    reviews: 92,
  },
  {
    id: 8,
    name: "Organic Cotton Tee",
    price: 35,
    image: "/organic-cotton-t-shirt-on-hanger.jpg",
    category: "T-Shirts",
    isNew: true,
    rating: 4.6,
    reviews: 78,
  },
  {
    id: 9,
    name: "Linen Blend Shirt",
    price: 75,
    image: "/linen-blend-casual-shirt-folded.jpg",
    category: "Shirts",
    rating: 4.5,
    reviews: 63,
  },
  {
    id: 10,
    name: "Classic Oxford Shirt",
    price: 79,
    originalPrice: 95,
    image: "/classic-white-oxford-dress-shirt.jpg",
    category: "Shirts",
    isSale: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 11,
    name: "Cargo Pants",
    price: 95,
    originalPrice: 120,
    image: "/khaki-cargo-pants-folded.jpg",
    category: "Pants",
    isSale: true,
    rating: 4.6,
    reviews: 73,
  },
  {
    id: 12,
    name: "Slim Fit Chino Pants",
    price: 85,
    image: "/slim-fit-chino-pants-folded.jpg",
    category: "Pants",
    rating: 4.7,
    reviews: 88,
  },
];

export function ProductsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [sortBy, setSortBy] = useState("featured");
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showSaleOnly, setShowSaleOnly] = useState(false);

  const categories = ["Shirts", "T-Shirts", "Pants"];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 150]);
    setShowNewOnly(false);
    setShowSaleOnly(false);
    setSortBy("featured");
  };

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // New items filter
    if (showNewOnly) {
      filtered = filtered.filter((product) => product.isNew);
    }

    // Sale items filter
    if (showSaleOnly) {
      filtered = filtered.filter((product) => product.isSale);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = [...filtered].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        break;
      case "newest":
        filtered = [...filtered].sort(
          (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [
    searchQuery,
    selectedCategories,
    priceRange,
    showNewOnly,
    showSaleOnly,
    sortBy,
  ]);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <Label className="text-base font-medium mb-3 block">Categories</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={clearFilters}
        className="w-full bg-transparent"
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-light text-foreground mb-2 text-balance">
          All Products
        </h1>
        <p className="text-muted-foreground text-pretty">
          Discover our complete collection of premium clothing
        </p>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>

        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="sm:hidden bg-transparent">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden sm:block w-64 flex-shrink-0">
          <Card className="p-6 sticky top-24">
            <h3 className="text-lg font-medium mb-4">Filters</h3>
            <FilterContent />
          </Card>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No products found matching your criteria
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="group cursor-pointer border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg bg-card">
                    <div className="relative overflow-hidden rounded-t-lg">
                      {/* Product Image */}
                      <div className="aspect-square bg-muted/30 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {product.isNew && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                            New
                          </span>
                        )}
                        {product.isSale && (
                          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm hover:bg-accent/80 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>

                      {/* Quick Add Button */}
                      <Button className="absolute bottom-3 left-3 right-3 bg-primary/90 hover:bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Quick Add
                      </Button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-medium text-foreground mb-2 text-balance">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      {product.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating!)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviews})
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-foreground">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
