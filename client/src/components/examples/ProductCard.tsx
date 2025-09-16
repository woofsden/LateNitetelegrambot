import ProductCard from '../ProductCard';
import product2oz from '@assets/generated_images/2oz_lubricant_product_shot_3982e3a3.png';

export default function ProductCardExample() {
  const handleAddToCart = (id: string, quantity: number) => {
    console.log(`Added to cart: Product ${id}, Quantity: ${quantity}`);
  };

  return (
    <div className="p-4 max-w-xs">
      <ProductCard
        id="1"
        name="2oz LateNiteLube Silicone-Based Personal Lubricant"
        price={19.99}
        image={product2oz}
        inStock={true}
        stockLevel="normal"
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}