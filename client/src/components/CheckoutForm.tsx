import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { MapPin, CreditCard, Heart, Truck } from "lucide-react";

interface CheckoutFormProps {
  cartTotal: number;
  onOrderComplete: (orderData: any) => void;
}

const propertyTypes = [
  { value: 'home', label: 'Home' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'townhome', label: 'Townhome' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'business', label: 'Business/Office' }
];

const tipAmounts = [15, 18, 20, 25];

export default function CheckoutForm({ cartTotal, onOrderComplete }: CheckoutFormProps) {
  const [step, setStep] = useState<'address' | 'payment' | 'tip' | 'review'>('address');
  const [formData, setFormData] = useState({
    address: '',
    city: 'Palm Springs',
    state: 'CA',
    zipCode: '92264',
    propertyType: '',
    unitNumber: '',
    gateCode: '',
    deliveryNotes: '',
    paymentMethod: '',
    tipAmount: 0,
    customTip: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step === 'address') setStep('payment');
    else if (step === 'payment') setStep('tip');
    else if (step === 'tip') setStep('review');
  };

  const handleBack = () => {
    if (step === 'payment') setStep('address');
    else if (step === 'tip') setStep('payment');
    else if (step === 'review') setStep('tip');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log('Submitting order with data:', formData);
    
    // Simulate order processing
    setTimeout(() => {
      setIsLoading(false);
      onOrderComplete({
        ...formData,
        total: cartTotal + formData.tipAmount,
        orderId: `LNL${Date.now()}`
      });
    }, 2000);
  };

  const renderAddressStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            placeholder="123 Main Street"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            data-testid="input-address"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              data-testid="input-city"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
              data-testid="input-zip"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Property Type</Label>
          <Select 
            value={formData.propertyType} 
            onValueChange={(value) => setFormData({...formData, propertyType: value})}
          >
            <SelectTrigger data-testid="select-property-type">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(formData.propertyType === 'apartment' || formData.propertyType === 'hotel') && (
          <div className="space-y-2">
            <Label htmlFor="unitNumber">
              {formData.propertyType === 'hotel' ? 'Room Number' : 'Unit Number'}
            </Label>
            <Input
              id="unitNumber"
              placeholder={formData.propertyType === 'hotel' ? 'Room 123' : 'Apt 2B'}
              value={formData.unitNumber}
              onChange={(e) => setFormData({...formData, unitNumber: e.target.value})}
              data-testid="input-unit-number"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="gateCode">Gate Code (Optional)</Label>
          <Input
            id="gateCode"
            placeholder="Access code or instructions"
            value={formData.gateCode}
            onChange={(e) => setFormData({...formData, gateCode: e.target.value})}
            data-testid="input-gate-code"
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <RadioGroup 
        value={formData.paymentMethod} 
        onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="card" id="card" data-testid="radio-card-payment" />
          <Label htmlFor="card" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Credit/Debit Card
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="apple-pay" id="apple-pay" data-testid="radio-apple-pay" />
          <Label htmlFor="apple-pay">Apple Pay</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="google-pay" id="google-pay" data-testid="radio-google-pay" />
          <Label htmlFor="google-pay">Google Pay</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cashapp" id="cashapp" data-testid="radio-cash-app" />
          <Label htmlFor="cashapp">Cash App Pay</Label>
        </div>
      </RadioGroup>
      
      {formData.paymentMethod === 'card' && (
        <div className="space-y-4 p-4 border rounded-md">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              data-testid="input-card-number"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                data-testid="input-card-expiry"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                data-testid="input-card-cvv"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTipStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
          <Heart className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-medium">Support Your Driver</h3>
        <p className="text-sm text-muted-foreground">100% of tips go directly to your driver</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {tipAmounts.map((amount) => {
          const tipValue = (cartTotal * amount) / 100;
          const isSelected = formData.tipAmount === tipValue;
          
          return (
            <Button
              key={amount}
              variant={isSelected ? "default" : "outline"}
              onClick={() => setFormData({...formData, tipAmount: tipValue, customTip: ''})}
              className="h-16 flex-col"
              data-testid={`button-tip-${amount}`}
            >
              <span className="text-lg font-bold">{amount}%</span>
              <span className="text-sm">${tipValue.toFixed(2)}</span>
            </Button>
          );
        })}
      </div>

      <div className="space-y-2">
        <Label htmlFor="customTip">Custom Tip Amount</Label>
        <Input
          id="customTip"
          type="number"
          placeholder="5.00"
          value={formData.customTip}
          onChange={(e) => {
            const value = parseFloat(e.target.value) || 0;
            setFormData({...formData, customTip: e.target.value, tipAmount: value});
          }}
          data-testid="input-custom-tip"
        />
      </div>

      <Button
        variant="outline"
        onClick={() => setFormData({...formData, tipAmount: 0, customTip: ''})}
        className="w-full"
        data-testid="button-no-tip"
      >
        No Tip
      </Button>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Delivery Address
          </h4>
          <p className="text-sm text-muted-foreground mt-1" data-testid="text-review-address">
            {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
            {formData.unitNumber && ` - ${formData.unitNumber}`}
          </p>
        </div>

        <div>
          <h4 className="font-medium flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment Method
          </h4>
          <p className="text-sm text-muted-foreground mt-1" data-testid="text-review-payment">
            {formData.paymentMethod.replace('-', ' ').toUpperCase()}
          </p>
        </div>

        <div>
          <h4 className="font-medium flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Driver Tip
          </h4>
          <p className="text-sm text-muted-foreground mt-1" data-testid="text-review-tip">
            ${formData.tipAmount.toFixed(2)}
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Driver Tip</span>
          <span>${formData.tipAmount.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span data-testid="text-final-total">${(cartTotal + formData.tipAmount).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto" data-testid="card-checkout">
      <CardHeader>
        <CardTitle>
          {step === 'address' && 'Delivery Address'}
          {step === 'payment' && 'Payment Method'}
          {step === 'tip' && 'Driver Tip'}
          {step === 'review' && 'Review Order'}
        </CardTitle>
        <CardDescription>
          {step === 'address' && 'Where should we deliver your order?'}
          {step === 'payment' && 'How would you like to pay?'}
          {step === 'tip' && 'Show your driver some love'}
          {step === 'review' && 'Confirm your order details'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {step === 'address' && renderAddressStep()}
        {step === 'payment' && renderPaymentStep()}
        {step === 'tip' && renderTipStep()}
        {step === 'review' && renderReviewStep()}

        <div className="flex gap-3">
          {step !== 'address' && (
            <Button variant="outline" onClick={handleBack} className="flex-1" data-testid="button-back">
              Back
            </Button>
          )}
          
          {step !== 'review' ? (
            <Button 
              onClick={handleNext} 
              className="flex-1"
              disabled={
                (step === 'address' && (!formData.address || !formData.propertyType)) ||
                (step === 'payment' && !formData.paymentMethod)
              }
              data-testid="button-next"
            >
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="flex-1"
              disabled={isLoading}
              data-testid="button-place-order"
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}