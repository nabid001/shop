"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TGetCategory } from "@/types";
import { Menu, Search, X } from "lucide-react";
import {
  useQueryState,
  parseAsString,
  debounce,
  parseAsNativeArrayOf,
} from "nuqs";
import { use } from "react";

type Props = {
  categoryPromise: Promise<TGetCategory>;
};
const SearchAndFilter = ({ categoryPromise }: Props) => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: false })
  );
  const [sortBy, setSortBy] = useQueryState(
    "sorting",
    parseAsString.withDefault("").withOptions({ shallow: false })
  );

  const [category, setCategory] = useQueryState(
    "category",
    parseAsNativeArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ shallow: false })
  );

  const handleClear = () => {
    setCategory([]);
  };

  const categories = use(categoryPromise);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative justify-center flex-1 flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          name="search"
          placeholder="Search Products..."
          className="pl-10"
          value={search || ""}
          onChange={(e) =>
            setSearch(e.target.value, {
              limitUrlUpdates:
                e.target.value === "" ? undefined : debounce(500),
            })
          }
        />
        <X
          className="absolute h-4 w-4 text-muted-foreground right-3 top-1/2 -translate-y-1/2 hover:text-destructive cursor-pointer"
          onClick={() => setSearch("")}
        />
      </div>

      <>
        <Select value={sortBy || "newest"} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </>

      <Sheet>
        <SheetTrigger className="md:hidden w-full" asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent className="">
          <SheetHeader>
            <SheetTitle className="text-lg font-light">Looking For!</SheetTitle>
          </SheetHeader>

          <div className="border-t border-border/50 py-4 px-4">
            <Label className="text-md text-foreground">Categories</Label>
            {categories.map((item) => (
              <div key={item._id} className="flex items-center gap-1 mt-3">
                <Checkbox
                  checked={category.includes(item.slug.current)}
                  onCheckedChange={(e) => {
                    if (e === false) {
                      setCategory((prevVal) =>
                        prevVal.filter((slug) => slug !== item.slug.current)
                      );
                    } else if (e === true) {
                      setCategory((prevVal) => [...prevVal, item.slug.current]);
                    }
                  }}
                  id={item.slug.current}
                />
                <Label htmlFor={item.slug.current} className="cursor-pointer">
                  {item.name}
                </Label>
              </div>
            ))}

            <Button className="w-full mt-6" onClick={() => handleClear()}>
              Clear
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchAndFilter;
