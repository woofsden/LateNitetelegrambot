import { useState } from "react";
import { useLocation } from "wouter";
import CheckoutForm from "@/components/CheckoutForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // todo: remove mock functionality
  const cartTotal = 69.97; // Sample cart total

  const handleOrderComplete = (orderData: any) => {
    console.log('Order completed:', orderData);
    toast({
      title: "Order Placed!",
      description: `Your order ${orderData.orderId} has been confirmed`,
    });
    setLocation('/tracking');
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-40 bg-card border-b p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/cart')}
            data-testid="button-back-to-cart"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>
      </header>

      <main className="p-4">
        <CheckoutForm
          cartTotal={cartTotal}
          onOrderComplete={handleOrderComplete}
        />
      </main>
    </div>
  );
}