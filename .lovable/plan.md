
# Aptos Apartments Landing Page

## Overview
A modern, minimalist single-page landing page with Scandinavian/Nordic design aesthetic featuring clean lines, generous white space, and premium typography.

## Design System Updates

### Color Palette (Scandinavian Theme)
| Element | Color |
|---------|-------|
| Background | Warm off-white (#FAFAF8) |
| Secondary Background | Soft warm grey (#F5F5F3) |
| Primary Text | Muted charcoal (#2D3436) |
| Secondary Text | Soft grey (#636E72) |
| Accent | Deep charcoal (#1A1A1A) |
| Borders | Light grey (#E8E8E6) |

### Typography
- **Headings**: Playfair Display (serif) - elegant, professional feel
- **Body**: Inter (sans-serif) - clean, modern readability
- Both fonts will be loaded via Google Fonts

### Custom CSS Variables
New CSS variables will be added to support the Scandinavian palette while maintaining the existing design system structure.

---

## Page Sections

### 1. Navigation Header
- Fixed/sticky minimal header
- "Aptos Apartments" logo/wordmark (left)
- Navigation links: About, Book, Contact (right)
- Smooth scroll navigation to each section
- Subtle background blur on scroll

### 2. Hero Section
- Full viewport height
- Large serif headline: "Master Your Path to Apartment Investing"
- Subheadline: "Book a complimentary sparring session to refine your strategy and gain the confidence to grow your portfolio."
- Primary CTA button: "Book Your Session"
- Abstract architectural background image (decorative geometric pattern or gradient)
- Generous padding and white space

### 3. About/Offer Section
- Clean two-column layout (text + abstract image)
- Section title: "The Aptos Approach"
- Body copy explaining personalized guidance and exclusive opportunities
- Key differentiators in subtle card format
- Minimalist decorative elements (thin lines, geometric shapes)

### 4. Booking Section
- Section title: "Schedule Your Session"
- Brief intro text
- Styled container for SimplyBook.me iframe placeholder
- The container will have:
  - Elegant border treatment
  - Proper responsive sizing
  - Placeholder text indicating where the booking widget goes
  - Clear integration instructions in code comments

### 5. Contact/Footer Section
- "Get in Touch" heading (serif)
- Email address with hover effect
- Phone number
- Minimal social links (optional placeholders)
- Copyright line
- Clean horizontal separator

---

## Technical Implementation

### Files to Create/Modify

| File | Purpose |
|------|---------|
| `src/index.css` | Update CSS variables for Scandinavian palette, add Google Fonts, smooth scroll |
| `src/pages/Index.tsx` | Complete landing page with all sections |
| `src/components/landing/Header.tsx` | Sticky navigation component |
| `src/components/landing/HeroSection.tsx` | Hero with headline and CTA |
| `src/components/landing/AboutSection.tsx` | The offer/about section |
| `src/components/landing/BookingSection.tsx` | Booking iframe container |
| `src/components/landing/Footer.tsx` | Contact info and footer |

### Interactive Elements
- **Button Hover States**: Subtle scale transform and background color shift
- **Smooth Scroll**: CSS `scroll-behavior: smooth` with JavaScript fallback
- **Navigation**: Active section highlighting
- **Image Hover**: Subtle zoom/parallax effect on decorative images
- **Link Underlines**: Animated underline on hover

### Responsive Breakpoints
- Mobile: < 768px (stacked layouts, adjusted typography)
- Tablet: 768px - 1024px (hybrid layouts)
- Desktop: > 1024px (full side-by-side layouts)

### Animations
- Fade-in on scroll for sections (using Tailwind animate plugin)
- Subtle entrance animations for hero content
- Smooth transitions on all interactive elements (300ms ease)

---

## Technical Details

### Google Fonts Integration
```html
<!-- Added to index.html -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Tailwind Config Extensions
- Custom font families (`font-serif` and `font-sans`)
- Custom animation keyframes for fade-in effects
- Extended spacing for generous whitespace

### Booking Widget Placeholder
The SimplyBook.me integration will be prepared with:
- A styled container with proper dimensions
- Placeholder content explaining integration
- Code comments with iframe embed instructions
- Responsive height adjustments

---

## Component Architecture

```text
Index.tsx
├── Header (sticky navigation)
├── HeroSection
│   ├── Headline + Subheadline
│   └── CTA Button
├── AboutSection
│   ├── Section Title
│   ├── Description
│   └── Feature Cards (optional)
├── BookingSection
│   ├── Section Title
│   └── Iframe Container (placeholder)
└── Footer
    ├── Contact Info
    └── Copyright
```

---

## Deliverables

1. **Updated design system** with Scandinavian color palette
2. **Responsive landing page** with all 5 sections
3. **Modular components** for each section
4. **Smooth scroll navigation** between sections
5. **Premium hover effects** on all interactive elements
6. **SimplyBook.me ready container** with integration instructions
7. **Mobile-optimized layout** for all screen sizes
