import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Navigation, AlertCircle, CheckCircle } from "lucide-react";

interface LocationVerificationProps {
  onLocationVerified: (location: { latitude: number; longitude: number; address?: string }) => void;
  deliveryZoneCenter?: { lat: number; lng: number };
  deliveryRadius?: number; // in miles
}

// Palm Springs ZIP 92264 approximate coordinates
const DEFAULT_DELIVERY_CENTER = { lat: 33.8303, lng: -116.5453 };
const DEFAULT_DELIVERY_RADIUS = 10; // 10 miles

export default function LocationVerification({ 
  onLocationVerified,
  deliveryZoneCenter = DEFAULT_DELIVERY_CENTER,
  deliveryRadius = DEFAULT_DELIVERY_RADIUS
}: LocationVerificationProps) {
  const [status, setStatus] = useState<'idle' | 'requesting' | 'success' | 'denied' | 'outside-zone' | 'error'>('idle');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string>('');

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // In a real app, you'd use a geocoding service like Google Maps API
      // For demo purposes, we'll return a mock address based on Palm Springs area
      return `${Math.floor(Math.random() * 9999 + 1000)} Desert Palm Dr, Palm Springs, CA 92264`;
    } catch (error) {
      console.error('Geocoding failed:', error);
      return 'Address lookup failed';
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      return;
    }

    setStatus('requesting');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        
        // Check if location is within delivery zone
        const distance = calculateDistance(
          latitude, 
          longitude, 
          deliveryZoneCenter.lat, 
          deliveryZoneCenter.lng
        );

        console.log(`User location: ${latitude}, ${longitude}`);
        console.log(`Distance from delivery center: ${distance.toFixed(2)} miles`);

        if (distance <= deliveryRadius) {
          const userAddress = await reverseGeocode(latitude, longitude);
          setAddress(userAddress);
          setStatus('success');
          onLocationVerified({ latitude, longitude, address: userAddress });
        } else {
          setStatus('outside-zone');
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setStatus('denied');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const renderContent = () => {
    switch (status) {
      case 'idle':
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Verify Your Location</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We need to confirm you're in our delivery zone (10-mile radius from Palm Springs, CA 92264)
              </p>
            </div>
            <Button onClick={requestLocation} className="gap-2" data-testid="button-request-location">
              <Navigation className="w-4 h-4" />
              Allow Location Access
            </Button>
          </div>
        );

      case 'requesting':
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center animate-pulse">
              <Navigation className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Getting Your Location...</h3>
              <p className="text-sm text-muted-foreground">Please allow location access when prompted</p>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-600">Location Verified!</h3>
              <p className="text-sm text-muted-foreground mt-1" data-testid="text-verified-address">
                {address}
              </p>
              <p className="text-xs text-green-600 mt-1">
                You're in our delivery zone
              </p>
            </div>
          </div>
        );

      case 'outside-zone':
        return (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription data-testid="alert-outside-zone">
                Sorry, you're outside our current delivery zone. We currently deliver within a 10-mile radius of Palm Springs, CA 92264.
              </AlertDescription>
            </Alert>
            <Button variant="outline" onClick={() => setStatus('idle')} className="w-full">
              Try Again
            </Button>
          </div>
        );

      case 'denied':
        return (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription data-testid="alert-location-denied">
                Location access was denied. Please enable location permissions in your browser settings and try again.
              </AlertDescription>
            </Alert>
            <Button variant="outline" onClick={() => setStatus('idle')} className="w-full">
              Try Again
            </Button>
          </div>
        );

      case 'error':
        return (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription data-testid="alert-location-error">
                Location services are not available on this device. Please contact support for manual verification.
              </AlertDescription>
            </Alert>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto" data-testid="card-location-verification">
      <CardHeader>
        <CardTitle>Delivery Zone Check</CardTitle>
        <CardDescription>
          Confirm your location for fast delivery
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}