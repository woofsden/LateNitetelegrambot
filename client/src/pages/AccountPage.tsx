import { useState } from "react";
import { useLocation } from "wouter";
import BottomTabNavigation from "@/components/BottomTabNavigation";
import PhoneAuthForm from "@/components/PhoneAuthForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, MapPin, CreditCard, Gift, History, Settings, 
  LogOut, ChevronRight, Star, Users
} from "lucide-react";

export default function AccountPage() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // todo: remove mock functionality
  const userProfile = {
    name: "John Doe",
    phone: phoneNumber || "(555) 123-4567",
    loyaltyPoints: 250,
    referralCode: "JOHN2024",
    memberSince: "Dec 2023"
  };

  const menuItems = [
    { icon: MapPin, label: "Delivery Addresses", path: "/addresses", badge: "2" },
    { icon: CreditCard, label: "Payment Methods", path: "/payment-methods", badge: "3" },
    { icon: History, label: "Order History", path: "/orders", badge: null },
    { icon: Gift, label: "Gift Cards & Credits", path: "/gift-cards", badge: "$25" },
    { icon: Users, label: "Referral Program", path: "/referrals", badge: "5 friends" },
    { icon: Settings, label: "Settings", path: "/settings", badge: null }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 pb-16">
        <PhoneAuthForm
          onAuthComplete={(phone) => {
            setPhoneNumber(phone);
            setIsAuthenticated(true);
            console.log('Authenticated with phone:', phone);
          }}
        />
        <BottomTabNavigation cartItemCount={0} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-40 bg-card border-b p-4">
        <h1 className="text-lg font-semibold">Account</h1>
      </header>

      <main className="p-4 space-y-4">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-lg">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-semibold" data-testid="text-user-name">{userProfile.name}</h2>
                <p className="text-sm text-muted-foreground" data-testid="text-user-phone">{userProfile.phone}</p>
                <p className="text-xs text-muted-foreground">Member since {userProfile.memberSince}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loyalty & Referral Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Rewards & Referrals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-md">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Loyalty Points</p>
                  <p className="text-xs text-muted-foreground">Redeem for discounts</p>
                </div>
              </div>
              <Badge variant="secondary" data-testid="badge-loyalty-points">
                {userProfile.loyaltyPoints} pts
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Your Referral Code</p>
                  <p className="text-xs text-muted-foreground">Share with friends for rewards</p>
                </div>
              </div>
              <Badge variant="outline" data-testid="text-referral-code">
                {userProfile.referralCode}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card>
          <CardContent className="p-0">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    console.log(`Navigate to ${item.path}`);
                    setLocation(item.path);
                  }}
                  className={`w-full flex items-center justify-between p-4 hover-elevate ${
                    index !== menuItems.length - 1 ? 'border-b' : ''
                  }`}
                  data-testid={`button-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Sign Out Button */}
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => {
            setIsAuthenticated(false);
            console.log('Signing out');
          }}
          data-testid="button-sign-out"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </main>

      <BottomTabNavigation cartItemCount={0} />
    </div>
  );
}