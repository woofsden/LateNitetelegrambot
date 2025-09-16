import { useState } from "react";
import LocationVerification from '../LocationVerification';

export default function LocationVerificationExample() {
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedLocation, setVerifiedLocation] = useState<any>(null);

  if (isVerified && verifiedLocation) {
    return (
      <div className="p-4 text-center space-y-4">
        <h3 className="text-lg font-bold text-green-600">Location Verified!</h3>
        <div className="text-sm space-y-1">
          <p><strong>Latitude:</strong> {(verifiedLocation as any).latitude}</p>
          <p><strong>Longitude:</strong> {(verifiedLocation as any).longitude}</p>
          <p><strong>Address:</strong> {(verifiedLocation as any).address}</p>
        </div>
        <button 
          onClick={() => {
            setIsVerified(false);
            setVerifiedLocation(null);
          }}
          className="px-4 py-2 text-sm bg-secondary rounded"
        >
          Reset Demo
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <LocationVerification
        onLocationVerified={(location) => {
          setVerifiedLocation(location);
          setIsVerified(true);
          console.log('Location verified:', location);
        }}
      />
    </div>
  );
}