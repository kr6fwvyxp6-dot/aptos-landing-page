
# Fix: 404 on Page Refresh for SPA Routes

## Problem
When refreshing `/fi` or `/international` directly, the browser requests those paths from the server. Since no physical files exist at those locations (only `index.html` at the root), the server returns a 404.

This is a common SPA issue - React Router handles routes client-side, but the server needs to know to serve `index.html` for all routes.

## Solution
Create a `404.html` file in the `public` folder that redirects to `index.html` while preserving the original URL path. GitHub Pages will serve this file for any unknown route, which then loads the SPA and lets React Router handle the routing.

## Implementation

### Step 1: Create `public/404.html`
Add a special redirect page that:
- Captures the current path and query string
- Redirects to the root with the path encoded in the URL
- Allows `index.html` to restore the original route

### Step 2: Update `index.html`
Add a small script that:
- Checks if there's an encoded redirect path
- Restores the correct URL using `history.replaceState`
- This happens before React loads, so React Router sees the correct URL

## Technical Details

**404.html script logic:**
```text
1. Get current pathname (e.g., "/fi")
2. Redirect to: /?p=/fi
3. GitHub Pages serves index.html for "/"
```

**index.html script logic:**
```text
1. Check for "?p=" parameter
2. If found, use history.replaceState to restore "/fi"
3. React Router now sees "/fi" and renders correctly
```

## Files to Create/Modify
1. **Create**: `public/404.html` - Redirect handler for GitHub Pages
2. **Modify**: `index.html` - Add path restoration script

## Alternative Approaches (not recommended for this project)
- **HashRouter**: Changes URLs to `/#/fi` format (ugly, not SEO-friendly)
- **Netlify `_redirects`**: Only works on Netlify hosting
- **Vercel `vercel.json`**: Only works on Vercel hosting

## Notes
- This fix works specifically for GitHub Pages
- The Lovable preview should already handle this automatically
- No changes to React code needed
