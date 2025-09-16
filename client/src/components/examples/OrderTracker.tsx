import { useState } from "react";
import OrderTracker from '../OrderTracker';

const statuses = ['received', 'confirmed', 'preparing', 'ready', 'picked_up', 'arriving', 'arrived', 'delivered'];

export default function OrderTrackerExample() {
  // todo: remove mock functionality
  const [currentStatusIndex, setCurrentStatusIndex] = useState(4); // picked_up
  
  const currentStatus = statuses[currentStatusIndex];

  return (
    <div className="p-4 space-y-4">
      <OrderTracker
        orderId="LNL1704835200123"
        currentStatus={currentStatus}
        estimatedTime="8:45 PM"
        driverName={currentStatusIndex >= 4 ? "Marcus D." : undefined}
        customerAddress="1234 Desert Palm Dr, Palm Springs, CA 92264"
      />
      
      <div className="text-center space-x-2">
        <button 
          onClick={() => setCurrentStatusIndex(Math.max(0, currentStatusIndex - 1))}
          disabled={currentStatusIndex === 0}
          className="px-3 py-1 text-sm bg-secondary rounded disabled:opacity-50"
        >
          Previous Status
        </button>
        <button 
          onClick={() => setCurrentStatusIndex(Math.min(statuses.length - 1, currentStatusIndex + 1))}
          disabled={currentStatusIndex === statuses.length - 1}
          className="px-3 py-1 text-sm bg-secondary rounded disabled:opacity-50"
        >
          Next Status
        </button>
      </div>
    </div>
  );
}