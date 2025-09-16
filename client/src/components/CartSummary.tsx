import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Minus, Plus, X } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartSummaryProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  deliveryFee?: number;
  tax?: number;
}

export default function CartSummary({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  deliveryFee = 4.99,
  tax = 0
}: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const calculatedTax = subtotal * 0.095; // 9.5% tax
  const total = subtotal + deliveryFee + calculatedTax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto" data-testid="card-empty-cart">
        <CardContent className="py-8 text-center space-y-4">
          <div className="mx-auto bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-medium">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">Add some products to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto" data-testid="card-cart-summary">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Cart
        </CardTitle>
        <Badge variant="secondary" data-testid="badge-item-count">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3" data-testid={`item-cart-${item.id}`}>
              <img 
                src={item.image} 
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  data-testid={`button-decrease-${item.id}`}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                
                <span className="w-8 text-center text-sm font-medium" data-testid={`text-quantity-${item.id}`}>
                  {item.quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  data-testid={`button-increase-${item.id}`}
                >
                  <Plus className="w-3 h-3" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => onRemoveItem(item.id)}
                  data-testid={`button-remove-${item.id}`}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span data-testid="text-delivery-fee">${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (9.5%)</span>
            <span data-testid="text-tax">${calculatedTax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium text-base">
            <span>Total</span>
            <span data-testid="text-total">${total.toFixed(2)}</span>
          </div>
        </div>

        <Button 
          onClick={onCheckout}
          className="w-full"
          data-testid="button-checkout"
        >
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
}