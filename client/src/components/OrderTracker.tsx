import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Package, Truck, MapPin } from "lucide-react";

const orderStatuses = [
  { key: 'received', label: 'Order Received', icon: Check },
  { key: 'confirmed', label: 'Order Confirmed', icon: Check },
  { key: 'preparing', label: 'Preparing Order', icon: Package },
  { key: 'ready', label: 'Ready - Awaiting Driver', icon: Clock },
  { key: 'picked_up', label: 'Picked Up', icon: Truck },
  { key: 'arriving', label: 'Driver Arriving Soon', icon: MapPin },
  { key: 'arrived', label: 'Driver Arrived', icon: MapPin },
  { key: 'delivered', label: 'Delivered', icon: Check }
];

interface OrderTrackerProps {
  orderId: string;
  currentStatus: string;
  estimatedTime?: string;
  driverName?: string;
  customerAddress: string;
}

export default function OrderTracker({ 
  orderId, 
  currentStatus, 
  estimatedTime, 
  driverName,
  customerAddress 
}: OrderTrackerProps) {
  const currentStatusIndex = orderStatuses.findIndex(status => status.key === currentStatus);


  const getStatusColor = (index: number) => {
    if (index < currentStatusIndex) return 'text-green-600';
    if (index === currentStatusIndex) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <Card className="w-full max-w-md mx-auto" data-testid="card-order-tracker">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Order #{orderId}</CardTitle>
          <Badge variant="secondary" data-testid="badge-current-status">
            {orderStatuses.find(s => s.key === currentStatus)?.label}
          </Badge>
        </div>
        {estimatedTime && (
          <p className="text-sm text-muted-foreground" data-testid="text-estimated-time">
            Estimated delivery: {estimatedTime}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Delivery Address */}
        <div className="p-3 bg-muted/50 rounded-md">
          <h4 className="font-medium text-sm flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4" />
            Delivery Address
          </h4>
          <p className="text-sm text-muted-foreground" data-testid="text-delivery-address">
            {customerAddress}
          </p>
        </div>

        {/* Driver Info */}
        {driverName && currentStatusIndex >= 4 && (
          <div className="p-3 bg-primary/5 rounded-md">
            <h4 className="font-medium text-sm flex items-center gap-2 mb-1">
              <Truck className="w-4 h-4" />
              Your Driver
            </h4>
            <p className="text-sm" data-testid="text-driver-name">{driverName}</p>
          </div>
        )}

        {/* Status Timeline */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Order Status</h4>
          <div className="space-y-3">
            {orderStatuses.map((status, index) => {
              const Icon = status.icon;
              const isCompleted = index < currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              
              return (
                <div key={status.key} className="flex items-center gap-3" data-testid={`status-${status.key}`}>
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${isCompleted ? 'bg-green-100 text-green-600' : 
                      isCurrent ? 'bg-primary/10 text-primary' : 
                      'bg-muted text-muted-foreground'}
                  `}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${getStatusColor(index)}`}>
                      {status.label}
                    </p>
                    {isCurrent && estimatedTime && (
                      <p className="text-xs text-muted-foreground">
                        ETA: {estimatedTime}
                      </p>
                    )}
                  </div>

                  {isCompleted && (
                    <Badge variant="outline" className="text-green-600 border-green-600 text-xs px-2 py-0.5">
                      Complete
                    </Badge>
                  )}
                  
                  {isCurrent && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      In Progress
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}