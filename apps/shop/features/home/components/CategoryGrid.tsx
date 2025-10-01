import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Shirts",
    description: "Premium dress shirts and casual wear",
    image: "/category-shirts.jpg",
    itemCount: "24+ items",
  },
  {
    id: 2,
    name: "T-Shirts",
    description: "Comfortable everyday essentials",
    image: "/category-tshirts.jpg",
    itemCount: "18+ items",
  },
  {
    id: 3,
    name: "Pants",
    description: "From casual to formal bottoms",
    image: "/category-pants.jpg",
    itemCount: "16+ items",
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
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
                      {category.description}
                    </p>
                    <p className="text-xs opacity-75 mt-1">
                      {category.itemCount}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    className="bg-white/90 text-black hover:bg-white transition-colors w-fit"
                  >
                    Shop {category.name}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
