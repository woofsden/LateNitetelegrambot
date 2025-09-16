import ProductGrid from '../ProductGrid';
import product2oz from '@assets/generated_images/2oz_lubricant_product_shot_3982e3a3.png';
import product4oz from '@assets/generated_images/4oz_lubricant_product_shot_9df3bc8a.png';
import product2ozPack from '@assets/generated_images/2oz_twin_pack_product_shot_dfde108b.png';
import product4ozPack from '@assets/generated_images/4oz_twin_pack_product_shot_08427be0.png';

export default function ProductGridExample() {
  // todo: remove mock functionality
  const mockProducts = [
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
      inStock: false,
      stockLevel: 'normal' as const
    }
  ];

  const handleAddToCart = (id: string, quantity: number) => {
    console.log(`Added product ${id} with quantity ${quantity} to cart`);
  };

  return (
    <div className="max-w-2xl">
      <ProductGrid products={mockProducts} onAddToCart={handleAddToCart} />
    </div>
  );
}