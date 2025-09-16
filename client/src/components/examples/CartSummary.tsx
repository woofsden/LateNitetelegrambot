import { useState } from "react";
import CartSummary from '../CartSummary';
import product2oz from '@assets/generated_images/2oz_lubricant_product_shot_3982e3a3.png';
import product4oz from '@assets/generated_images/4oz_lubricant_product_shot_9df3bc8a.png';

export default function CartSummaryExample() {
  // todo: remove mock functionality
  const [items, setItems] = useState([
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
    setItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
    console.log(`Updated quantity for ${id}: ${quantity}`);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items => items.filter(item => item.id !== id));
    console.log(`Removed item ${id} from cart`);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', items);
  };

  return (
    <div className="p-4">
      <CartSummary
        items={items}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => setItems([])}
          className="text-sm text-muted-foreground underline"
        >
          Clear Cart (Demo)
        </button>
      </div>
    </div>
  );
}