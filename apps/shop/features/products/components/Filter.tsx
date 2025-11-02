"use client";

import { TGetCategory } from "@/types";
import { use } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  parseAsString,
  useQueryState,
  parseAsArrayOf,
  parseAsNativeArrayOf,
} from "nuqs";

const SPECIAL = [
  {
    id: "1",
    name: "On Sale",
    value: "on-sale",
  },
];

type Props = {
  getCategoryPromise: Promise<TGetCategory>;
};
const Filter = ({ getCategoryPromise }: Props) => {
  const categories = use(getCategoryPromise);
  const [category, setCategory] = useQueryState(
    "category",
    parseAsNativeArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ shallow: false })
  );

  const handleClear = () => {
    setCategory([]);
  };

  return (
    <>
      <Card className="w-full h-full max-w-[250px] hidden md:block flex-shrink-0 space-y-5 sticky top-20">
        <CardHeader>
          <CardTitle className="text-foreground">Looking For!</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Categories */}
          <Label className="text-md text-foreground">Categories</Label>
          {categories.map((item, i) => (
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
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleClear()}>
            Clear
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Filter;
