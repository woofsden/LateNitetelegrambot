import { useState } from "react";
import OrderTracker from "@/components/OrderTracker";
import BottomTabNavigation from "@/components/BottomTabNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Package } from "lucide-react";

export default function TrackingPage() {
  // todo: remove mock functionality
  const [orders] = useState([
    {
      id: "LNL1704835200123",
      status: 'picked_up',
      estimatedTime: "8:45 PM",
      driverName: "Marcus D.",
      address: "1234 Desert Palm Dr, Palm Springs, CA 92264",
      total: 74.96,
      date: "Today"
    },
    {
      id: "LNL1704748800456",
      status: 'delivered',
      estimatedTime: null,
      driverName: "Sarah K.",
      address: "5678 Sunset Blvd, Palm Springs, CA 92264",
      total: 49.98,
      date: "Yesterday"
    }
  ]);

  const [selectedOrderId, setSelectedOrderId] = useState(orders[0].id);
  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-40 bg-card border-b p-4">
        <h1 className="text-lg font-semibold">Order Tracking</h1>
      </header>

      <main className="p-4 space-y-4">
        {/* Order Selection */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">Your Orders</h2>
          <div className="space-y-2">
            {orders.map(order => (
              <Card 
                key={order.id}
                className={`cursor-pointer hover-elevate ${selectedOrderId === order.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedOrderId(order.id)}
                data-testid={`card-order-${order.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">#{order.id.slice(-8)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{order.date} • ${order.total.toFixed(2)}</p>
                    </div>
                    <Badge 
                      variant={order.status === 'delivered' ? 'default' : 'secondary'}
                      data-testid={`badge-status-${order.id}`}
                    >
                      {order.status === 'delivered' ? 'Delivered' : 'In Transit'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Order Tracker */}
        {selectedOrder && (
          <OrderTracker
            orderId={selectedOrder.id}
            currentStatus={selectedOrder.status}
            estimatedTime={selectedOrder.estimatedTime || undefined}
            driverName={selectedOrder.driverName}
            customerAddress={selectedOrder.address}
          />
        )}

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-contact-driver">
              Contact Driver
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-support">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </main>

      <BottomTabNavigation cartItemCount={0} />
    </div>
  );
}