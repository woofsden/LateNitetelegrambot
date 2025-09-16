import { useState } from "react";
import PhoneAuthForm from '../PhoneAuthForm';

export default function PhoneAuthFormExample() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  if (isAuthenticated) {
    return (
      <div className="p-4 text-center">
        <h3 className="text-lg font-medium">Phone Verified!</h3>
        <p className="text-muted-foreground">Authenticated phone: {phoneNumber}</p>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="mt-2 px-4 py-2 text-sm bg-secondary rounded"
        >
          Reset Demo
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <PhoneAuthForm
        onAuthComplete={(phone) => {
          setPhoneNumber(phone);
          setIsAuthenticated(true);
          console.log('Phone authentication completed:', phone);
        }}
        onBack={() => console.log('Back pressed')}
      />
    </div>
  );
}