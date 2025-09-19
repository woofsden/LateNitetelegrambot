import { MapPin, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MobileHeaderProps {
  location?: string;
  onLocationClick?: () => void;
  onNotificationClick?: () => void;
  onSearch?: (query: string) => void;
}

export default function MobileHeader({ 
  location = "Palm Springs, CA",
  onLocationClick,
  onNotificationClick,
  onSearch
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-card border-b" data-testid="header-mobile">
      <div className="p-4 space-y-3">
        {/* Location and Notifications Row */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onLocationClick}
            className="flex items-center gap-2 text-sm hover-elevate px-3 py-1.5 rounded-md"
            data-testid="button-location"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-medium">{location}</span>
          </button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onNotificationClick}
            data-testid="button-notifications"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10"
            onChange={(e) => onSearch?.(e.target.value)}
            data-testid="input-search"
          />
        </div>

        {/* Brand Banner */}
        <div className="bg-primary text-primary-foreground text-center py-2 px-4 rounded-md">
          <p className="text-sm font-medium">Fast & Discreet Delivery 24/7</p>
          <p className="text-xs opacity-90">Serving the Palm Springs, California Area</p>
        </div>
      </div>
    </header>
  );
}