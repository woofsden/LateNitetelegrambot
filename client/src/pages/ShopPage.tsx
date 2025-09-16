import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import ProductGrid from "@/components/ProductGrid";
import BottomTabNavigation from "@/components/BottomTabNavigation";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import LocationVerification from "@/components/LocationVerification";
import { useToast } from "@/hooks/use-toast";

// Import product images
import product2oz from '@assets/generated_images/2oz_lubricant_product_shot_3982e3a3.png';
import product4oz from '@assets/generated_images/4oz_lubricant_product_shot_9df3bc8a.png';
import product2ozPack from '@assets/generated_images/2oz_twin_pack_product_shot_dfde108b.png';
import product4ozPack from '@assets/generated_images/4oz_twin_pack_product_shot_08427be0.png';

export default function ShopPage() {
  const { toast } = useToast();
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isLocationVerified, setIsLocationVerified] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  
  // todo: remove mock functionality
  const products = [
    {
      id: "1",
      name: "2oz LateNiteLube Silicone-Based Personal Lubricant",
      price: 19.99,
      image: product2oz,
      inStock: true,
      stockLevel: 'normal' as const
    },
    {
      id: "2",
      name: "2-Pack (2oz) LateNiteLube",
      price: 29.99,
      originalPrice: 39.98,
      image: product2ozPack,
      inStock: true,
      stockLevel: 'low' as const
    },
    {
      id: "3",
      name: "4oz LateNiteLube Silicone-Based Personal Lubricant",
      price: 29.99,
      image: product4oz,
      inStock: true,
      stockLevel: 'normal' as const
    },
    {
      id: "4",
      name: "2-Pack (4oz) LateNiteLube",
      price: 39.99,
      originalPrice: 59.98,
      image: product4ozPack,
      inStock: true,
      stockLevel: 'normal' as const
    }
  ];

  const handleAddToCart = (productId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }));
    
    const product = products.find(p => p.id === productId);
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product?.name} added to your cart`,
    });
  };

  const totalCartItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  if (!isAgeVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <AgeVerificationModal
          isOpen={true}
          onVerified={() => setIsAgeVerified(true)}
        />
      </div>
    );
  }

  if (!isLocationVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <LocationVerification
          onLocationVerified={(location) => {
            console.log('Location verified:', location);
            setIsLocationVerified(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <MobileHeader 
        onSearch={(query) => console.log('Search:', query)}
        onLocationClick={() => console.log('Change location')}
        onNotificationClick={() => console.log('Show notifications')}
      />
      
      <main className="pb-4">
        <ProductGrid 
          products={products} 
          onAddToCart={handleAddToCart}
        />
      </main>

      <BottomTabNavigation cartItemCount={totalCartItems} />
    </div>
  );
}