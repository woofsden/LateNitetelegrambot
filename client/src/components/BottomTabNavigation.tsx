import { Link, useLocation } from "wouter";
import { Home, ShoppingBag, User, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BottomTabNavigationProps {
  cartItemCount?: number;
}

const tabs = [
  { path: '/', icon: Home, label: 'Shop' },
  { path: '/tracking', icon: Clock, label: 'Orders' },
  { path: '/cart', icon: ShoppingBag, label: 'Cart' },
  { path: '/account', icon: User, label: 'Account' }
];

export default function BottomTabNavigation({ cartItemCount = 0 }: BottomTabNavigationProps) {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t z-50" data-testid="nav-bottom-tabs">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = location === tab.path;
          const Icon = tab.icon;
          
          return (
            <Link key={tab.path} href={tab.path}>
              <a 
                className={`flex flex-col items-center justify-center h-full px-4 py-2 relative ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                data-testid={`nav-tab-${tab.label.toLowerCase()}`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {tab.path === '/cart' && cartItemCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-4 min-w-[16px] flex items-center justify-center p-0 text-[10px]"
                      data-testid="badge-cart-count"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </div>
                <span className="text-xs mt-1">{tab.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}