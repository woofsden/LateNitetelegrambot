import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  stockLevel?: 'low' | 'normal';
  onAddToCart: (id: string, quantity: number) => void;
}

export default function ProductCard({ 
  id, name, price, originalPrice, image, inStock, stockLevel, onAddToCart 
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(id, quantity);
    console.log(`Added ${quantity} x ${name} to cart`);
  };

  return (
    <Card className="hover-elevate" data-testid={`card-product-${id}`}>
      <div className="aspect-square relative overflow-hidden rounded-t-md">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
          data-testid={`img-product-${id}`}
        />
        {stockLevel === 'low' && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Low Stock
          </Badge>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary">Out of Stock</Badge>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-medium text-sm leading-tight" data-testid={`text-name-${id}`}>
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-lg" data-testid={`text-price-${id}`}>
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {inStock && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                data-testid={`button-decrease-${id}`}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-medium w-8 text-center" data-testid={`text-quantity-${id}`}>
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                data-testid={`button-increase-${id}`}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="w-full gap-2"
              data-testid={`button-add-to-cart-${id}`}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        )}

        {!inStock && (
          <Button disabled className="w-full" data-testid={`button-out-of-stock-${id}`}>
            Out of Stock
          </Button>
        )}
      </div>
    </Card>
  );
}