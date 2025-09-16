# LateNiteLube eCommerce Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from modern delivery platforms like DoorDash and Instacart, combined with dispensary/adult retail aesthetics for sophistication and trust-building.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Brand Purple: 270 85% 25% (deep professional purple)
- Brand Accent: 280 70% 45% (lighter purple for highlights)

**Dark Mode:**
- Background: 240 15% 8% (rich dark blue-gray)
- Surface: 240 12% 12% (elevated surfaces)
- Text Primary: 0 0% 95% (near white)

**Light Mode:**
- Background: 0 0% 98% (clean white)
- Surface: 0 0% 100% (pure white cards)
- Text Primary: 240 15% 15% (dark blue-gray)

**Status Colors:**
- Success: 142 76% 36% (delivery green)
- Warning: 38 92% 50% (amber alerts)
- Error: 0 84% 60% (clear red)

### B. Typography
- **Primary:** Inter (Google Fonts) - clean, mobile-optimized
- **Display:** Inter Bold for headings and CTAs
- **Body:** Inter Regular/Medium for content
- Mobile-first sizing: 14px base with 1.5 line height

### C. Layout System
**Tailwind Spacing Units:** 2, 4, 6, 8, 12, 16
- Consistent 16px (p-4) container padding
- 24px (p-6) section spacing
- 8px (p-2) tight spacing for form elements

### D. Component Library

**Navigation:**
- Bottom tab navigation (mobile-first)
- Sticky header with cart icon and location
- Hamburger menu for secondary actions

**Product Components:**
- Card-based product grid with image, name, price
- Quick-add buttons with quantity selectors
- Inventory status indicators (In Stock/Low/Out)

**Forms:**
- OTP input with 6-digit code fields
- Phone number input with country code
- Age verification modal with checkbox compliance
- Address forms with geolocation integration

**Commerce Elements:**
- Floating cart summary (sticky bottom)
- Checkout progress indicator
- Payment method selection cards
- Driver tip selection buttons

**Data Displays:**
- Order status timeline
- Real-time delivery tracking
- Order history cards
- Admin dashboard tables

### E. Mobile-First Considerations
- Touch-friendly 44px minimum tap targets
- Thumb-zone optimization for primary actions
- Swipe gestures for cart management
- Progressive disclosure for complex forms

## Images
- **No Large Hero Image** - Focus on immediate product discovery
- **Product Images:** High-quality product photography on clean white backgrounds
- **Category Icons:** Simple line icons for product categories
- **Delivery Graphics:** Subtle illustrations for empty states and delivery confirmation
- **Profile Placeholders:** Default avatar icons for user profiles

## Key UX Patterns
- **Age Gate:** Full-screen overlay with clear legal compliance
- **Location Verification:** Seamless integration with device GPS
- **OTP Flow:** Large, accessible number inputs with auto-advance
- **Quick Reorder:** One-tap reorder from order history
- **Cart Persistence:** Maintain cart across sessions with local storage

This design balances the need for legal compliance and age verification with a smooth, modern eCommerce experience optimized for mobile delivery ordering.