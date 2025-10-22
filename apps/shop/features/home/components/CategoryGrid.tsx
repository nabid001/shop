import { Card } from "@/components/ui/card";
import { getCategory } from "@/features/home/db/actions";
import { Suspense } from "react";
import { SetQueryData } from "@/lib/setQueryData";

const CategoryGrid = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4 text-balance">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find exactly what you're looking for in our carefully organized
            collections
          </p>
        </div>

        {/* Categories Grid */}
        <Suspense fallback={<h3>Loading Categories</h3>}>
          <CategoriesGrid />
        </Suspense>
      </div>
    </section>
  );
};

export default CategoryGrid;

const CategoriesGrid = async () => {
  const res = await getCategory();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {res.map((category) => (
        <Card
          key={category._id}
          className="group cursor-pointer border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg bg-card overflow-hidden"
        >
          <div className="relative h-64 overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: `url('${category.image}')`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
              <div className="mb-4">
                <h3 className="text-2xl font-light mb-2 text-balance">
                  {category.name}
                </h3>
                <p className="text-sm opacity-90 text-pretty">
                  {category.subtitle}
                </p>
                {/* <p className="text-xs opacity-75 mt-1">{category.itemCount}</p> */}
              </div>
              <>
                <SetQueryData
                  linkUrl={"/products"}
                  linkName={category.actionButton?.name}
                  stateName={category._type}
                  stateValue={category.slug.current}
                />
              </>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
