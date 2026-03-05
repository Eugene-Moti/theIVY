# IVY GROUP Website Redesign Plan

## Project Overview
Redesign the IVY GROUP real estate website with modern animations, cool effects, and simplified functionality.

## Current Analysis

### Tech Stack
- Next.js 14+ with TypeScript
- Tailwind CSS
- Framer Motion for animations
- Google Fonts (Playfair Display, Montserrat)

### Brand Colors
- Primary Gold: #bfa544
- Navy: #151c27
- Green: #264C2D
- Cream/Ivory: #fcfbf7

---

## Redesign Plan

### Phase 1: Modern Animations & Effects

#### 1.1 Hero Section Enhancements
- Parallax scrolling with video background
- Animated text reveal with staggered animations
- Floating particle effects (subtle)
- Smooth scroll indicator with bounce animation

#### 1.2 Scroll Animations
- Intersection Observer-based reveal animations
- Fade-up, slide-in, scale animations on scroll
- Progress indicator for long sections
- Parallax background sections

#### 1.3 Micro-interactions
- Button hover effects with scale and glow
- Card hover lift and shadow effects
- Image zoom on hover
- Navigation link underline animations
- Smooth cursor effects

#### 1.4 Visual Effects
- Glassmorphism cards (backdrop-blur)
- Gradient overlays
- Soft shadows and glows
- Smooth color transitions

### Phase 2: Simplified Functionality

#### 2.1 Project Data Structure
Update properties with new data:

```
LUCKINN IVY RESIDENCE – Westlands
- 1 Tower | 20 Floors | 120 Units
- 1BR (78sqm) - SOLD OUT
- 2BR + DSQ (126–140sqm) - SOLD OUT  
- 3BR + DSQ (170–172sqm) - AVAILABLE
- Amenities: Heated pool, Gym, Coffee bar, Kids play, Co-working, Yoga
- Smart locks, high-speed lifts, 24/7 security, Generator, Borehole
- Completion: December 2026

BLOSSOM IVY RESIDENCE – Kileleshwa
- 2 Blocks | 22 Floors | 220 Units
- 1BR (78–90 sqm): SOLD OUT
- 2BR (96–166 sqm): SOLD OUT
- 3BR + Study + DSQ (208–236 sqm): From Ksh 19.5M
- 4BR + Study + DSQ (251–260 sqm): SOLD OUT
- Amenities: Heated pool, Yoga Studio, Gym, Coffee bar, Garden, Kids play
- Completion: December 2026

IVY PARK RESIDENCE – Kilimani (Kirichwa Road)
- 3 Blocks | 22 Floors | 660 Units
- 1BR (62-69 sqm): From Ksh 6.82M
- 2BR (73-128 sqm): From Ksh 10.78M  
- 3BR + DSQ (142 sqm): From Ksh 15.62M
- Amenities: Heated pool, Rooftop garden, Gym, Co-working, Coffee bar
- Completion: December 2028
```

#### 2.2 Streamlined Components
- Merge duplicate Navbar/Footer components
- Create reusable animation wrappers
- Simplify carousel logic
- Remove redundant pages if needed

### Phase 3: Page-Specific Improvements

#### 3.1 Homepage
- Enhanced hero with video background
- Animated project carousel with 3D effect
- Interactive statistics counters
- Smooth gallery section
- Contact form modal

#### 3.2 Buy Page
- Updated property cards with new pricing
- Filter functionality (optional)
- Enhanced hover effects

#### 3.3 Other Pages
- Consistent animations across all pages
- Optimized images
- Mobile-first responsive design

---

## Implementation Steps

### Step 1: Update Properties Data
- Update `src/lib/properties.ts` with new project details

### Step 2: Enhance Homepage
- Add new animations in `src/app/page.tsx`
- Add glassmorphism effects
- Update hero section

### Step 3: Update Buy Page
- Update pricing and details in `src/app/buy/page.tsx`

### Step 4: Polish Components
- Navbar animations
- Footer improvements
- Add reusable animation components

### Step 5: Testing & Optimization
- Check all animations work smoothly
- Verify mobile responsiveness
- Test all links and forms

---

## Files to Modify

1. `src/lib/properties.ts` - Update project data
2. `src/app/page.tsx` - Add animations, update content
3. `src/app/buy/page.tsx` - Update pricing
4. `src/app/Navbar.tsx` - Add animations
5. `src/components/Navbar.tsx` - Sync changes
6. `src/app/css/globals.css` - Add new animation styles
7. `src/app/css/design-constants.css` - Add new design tokens

---

## New Animations to Add

```css
/* Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Smooth reveal */
.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.reveal-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hover effects */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #bfa544 0%, #d4c07a 50%, #bfa544 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}
```

---

## Success Criteria

1. ✅ Modern, premium look with gold accent
2. ✅ Smooth, performant animations (60fps)
3. ✅ Mobile-responsive design
4. ✅ Updated project information
5. ✅ Simplified, maintainable code
6. ✅ Enhanced user experience

