import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const product = [
  {
    id: "d923883jd",
    image: "/t-shirt.jpg",
    name: "Test Product",
    quantity: 1,
    size: "M",
    color: "White",
    totalPrice: 799,
    price: 1000,
  },
  {
    id: "d923sdfsd883jd",
    image: "/t-shirt.jpg",
    name: "Test Black Product",
    quantity: 1,
    size: "L",
    color: "Black",
    totalPrice: 599,
    price: 700,
  },
];

const shipping = 50;
const amount = product.reduce((acc, item) => acc + item.totalPrice, 0);
const total = amount + shipping;

const ProductInfo = () => {
  return (
    <div className="p-5 border rounded-md shadow-sm shadow-card sm:p-4">
      <div className="space-y-3">
        {product.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 justify-between items-center"
          >
            <div className="relative flex gap-3 items-center">
              <Image
                src={item.image}
                alt={item.name}
                width={90}
                height={90}
                className="object-cover rounded-sm overflow-hidden"
              />
              <p className="text-mute absolute -top-2 left-21 h-4 w-4 bg-accent rounded-full flex items-center justify-center">
                {item.quantity}
              </p>
              <div>
                <h3 className="text-sm text-foreground">{item.name}</h3>
                <p className="text-mute">{item.size + " • " + item.color}</p>
              </div>
            </div>
            <div className="text-end">
              <p>৳{item.totalPrice}</p>
              <p className="text-[0.9rem] text-mute">৳{item.price} each</p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Price Breakdown */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal (selected)</span>
          <span className="text-foreground font-medium">
            ৳{amount.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground font-medium">
            {shipping > 0
              ? `৳${shipping.toFixed(2)}`
              : `৳${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Total */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-medium text-foreground">Total</span>
        <span className="text-2xl font-semibold text-foreground">
          ৳{total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;
