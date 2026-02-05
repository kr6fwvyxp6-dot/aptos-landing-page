

# Plan: Restructure Site Navigation and Landing Page

## Summary
Merge the International Investors content into the root landing page (`/`), remove the separate home page, and simplify navigation by removing the language switcher buttons while adding cross-links between Finnish and English pages.

---

## Changes Overview

### 1. Make International Investors the Landing Page

**Current state:**
- `/` shows a "gateway" Home page with two buttons
- `/international` shows the full International Investors content

**New state:**
- `/` shows the International Investors content directly (with enhanced hero)
- `/international` route removed (or redirects to `/`)

**Files to modify:**
- `src/App.tsx` - Update routing
- `src/pages/InternationalInvestors.tsx` - Rename/repurpose as new landing page
- `src/pages/Home.tsx` - Delete (no longer needed)

**Hero section updates for the new landing page:**
- Add the prominent H1: "Apartment Investing in Finland"
- Add subheadline: "Independent, data-driven guidance to help you navigate the Finnish apartment market with clarity and confidence."
- Add credibility line: "Years of experience • Non-sales approach • Honest advice"
- Keep the existing "Book a Free Sparring Session" CTA button

---

### 2. Update Header Navigation

**International/Landing page header:**
- Keep: How It Works, Our Approach, FAQ, Book
- Add: "Suomalaisille" link (navigates to `/fi`)
- Remove: Language switcher (FI/EN buttons)

**Finnish page header:**
- Keep: "Varaa aika" button
- Add: "In English" link (navigates to `/`)
- Remove: Language switcher (FI/EN buttons)

**File to modify:**
- `src/components/landing/Header.tsx`

---

### 3. Update SEO Metadata

**Landing page (`/`):**
- Update canonical URL from `/international` to `https://aptos.fi`
- Update hreflang to point `/` as English version
- Keep Organization + Service structured data

**Finnish page (`/fi`):**
- Update hreflang to point to `/` instead of `/international`

**Files to modify:**
- `src/pages/InternationalInvestors.tsx` (or new landing component)
- `src/pages/FinnishInvestors.tsx`

---

## File Changes Summary

| File | Action |
|------|--------|
| `src/App.tsx` | Remove `/international` route, keep `/` and `/fi` |
| `src/pages/Home.tsx` | Delete |
| `src/pages/InternationalInvestors.tsx` | Enhance hero, update SEO, use as landing page |
| `src/pages/FinnishInvestors.tsx` | Update hreflang reference |
| `src/components/landing/Header.tsx` | Remove language switcher, add cross-links |

---

## Visual Mockup of Header Changes

**Landing page (English) header:**
```text
[Aptos Apartments]     How It Works | Our Approach | FAQ | Suomalaisille | Book
```

**Finnish page header:**
```text
[Aptos Asunnot]        In English | Varaa aika
```

---

## Technical Notes

- The `variant` prop in Header will be simplified since there's no longer a "home" variant needed
- Footer may also need minor updates to remove language switcher if present
- The 404.html redirect script will continue to work since we're keeping the same SPA routing approach

