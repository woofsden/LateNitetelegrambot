import { useState } from "react";
import { useLocation } from "wouter";
import CartSummary from "@/components/CartSummary";
import BottomTabNavigation from "@/components/BottomTabNavigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Import product images
import product2oz from '@assets/generated_images/2oz_lubricant_product_shot_3982e3a3.png';
import product4oz from '@assets/generated_images/4oz_lubricant_product_shot_9df3bc8a.png';

export default function CartPage() {
  const [, setLocation] = useLocation();
  
  // todo: remove mock functionality
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "2oz LateNiteLube Silicone-Based Personal Lubricant",
      price: 19.99,
      quantity: 2,
      image: product2oz
    },
    {
      id: "3",
      name: "4oz LateNiteLube Silicone-Based Personal Lubricant", 
      price: 29.99,
      quantity: 1,
      image: product4oz
    }
  ]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    setLocation('/checkout');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-40 bg-card border-b p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/')}
            data-testid="button-back-to-shop"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Your Cart</h1>
        </div>
      </header>

      <main className="p-4">
        <CartSummary
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </main>

      <BottomTabNavigation cartItemCount={totalItems} />
    </div>
  );
}