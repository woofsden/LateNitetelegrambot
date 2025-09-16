import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerified: () => void;
}

const statesRequiring21Plus = [
  "Alabama", "Alaska", "Idaho", "Nebraska", "Texas", "Utah"
];

export default function AgeVerificationModal({ isOpen, onVerified }: AgeVerificationModalProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleVerify = () => {
    if (isChecked) {
      console.log('Age verification completed');
      onVerified();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="w-[95%] max-w-md mx-auto rounded-lg" data-testid="modal-age-verification">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold">Age Verification Required</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            You must be at least 18 years old to enter. In the following states and territories, you must be 21 years old: {statesRequiring21Plus.join(", ")}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="age-verify"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked === true)}
              data-testid="checkbox-age-verification"
            />
            <label htmlFor="age-verify" className="text-sm leading-relaxed cursor-pointer">
              By clicking "I Confirm" you certify that you meet the age requirement and agree to our{" "}
              <span className="text-primary underline">Terms of Service</span> and{" "}
              <span className="text-primary underline">Privacy Policy</span>.
            </label>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            onClick={handleVerify}
            disabled={!isChecked}
            className="w-full"
            data-testid="button-confirm-age"
          >
            I Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}