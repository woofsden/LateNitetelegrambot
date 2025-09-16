import { useState } from "react";
import AgeVerificationModal from '../AgeVerificationModal';

export default function AgeVerificationModalExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-4">
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Show Age Verification
      </button>
      <AgeVerificationModal 
        isOpen={isOpen} 
        onVerified={() => {
          setIsOpen(false);
          console.log('User verified age');
        }} 
      />
    </div>
  );
}