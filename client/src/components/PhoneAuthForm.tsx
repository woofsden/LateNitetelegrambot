import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Phone, Shield } from "lucide-react";

interface PhoneAuthFormProps {
  onAuthComplete: (phoneNumber: string) => void;
  onBack?: () => void;
}

export default function PhoneAuthForm({ onAuthComplete, onBack }: PhoneAuthFormProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phoneNumber || !smsConsent) return;
    
    setIsLoading(true);
    console.log(`Sending OTP to ${phoneNumber}`);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 2000);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    console.log(`Verifying OTP: ${otp} for ${phoneNumber}`);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthComplete(phoneNumber);
    }, 1500);
  };

  if (step === 'otp') {
    return (
      <Card className="w-full max-w-md mx-auto" data-testid="card-otp-verification">
        <CardHeader className="text-center space-y-4">
          {onBack && (
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute left-4 top-4"
              onClick={() => setStep('phone')}
              data-testid="button-back-to-phone"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle>Enter Verification Code</CardTitle>
            <CardDescription>
              We sent a 6-digit code to {phoneNumber}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <div className="flex justify-center">
              <InputOTP 
                value={otp} 
                onChange={setOtp}
                maxLength={6}
                data-testid="input-otp"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6 || isLoading}
              className="w-full"
              data-testid="button-verify-otp"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={handleSendOtp}
              className="w-full text-sm"
              data-testid="button-resend-otp"
            >
              Resend Code
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto" data-testid="card-phone-auth">
      <CardHeader className="text-center space-y-4">
        {onBack && (
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute left-4 top-4"
            onClick={onBack}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}
        <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
          <Phone className="w-8 h-8 text-primary" />
        </div>
        <div>
          <CardTitle>Verify Your Phone</CardTitle>
          <CardDescription>
            We'll send you a verification code via SMS
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            data-testid="input-phone"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="sms-consent"
              checked={smsConsent}
              onCheckedChange={(checked) => setSmsConsent(checked === true)}
              data-testid="checkbox-sms-consent"
            />
            <label htmlFor="sms-consent" className="text-sm leading-relaxed cursor-pointer">
              By entering your phone number and continuing, you consent to receive SMS messages 
              regarding your orders and promotional updates from LateNiteLube. Message and data rates may apply. 
              Reply STOP to unsubscribe. Reply HELP for help. You confirm that you are the owner of this phone number. 
              Consent is not required for purchase.
            </label>
          </div>
        </div>

        <Button
          onClick={handleSendOtp}
          disabled={!phoneNumber || !smsConsent || isLoading}
          className="w-full"
          data-testid="button-send-otp"
        >
          {isLoading ? "Sending..." : "Send Verification Code"}
        </Button>
      </CardContent>
    </Card>
  );
}