

# Fix: Direct URL Navigation to /fi Route

## Problem
When visiting `aptos.fi/fi` directly, the page stays white due to incorrect redirect handling. The 404.html and index.html scripts were configured for a GitHub Pages subdirectory deployment (like `username.github.io/aptos-landing-page/`) instead of a root domain (`aptos.fi`).

## Root Cause
- `pathSegmentsToKeep = 1` in 404.html assumes a subdirectory structure
- Path reconstruction in index.html adds extra path segments

## Solution
Update both redirect scripts to work with a root domain deployment.

---

## File Changes

### 1. Update `public/404.html`

Change `pathSegmentsToKeep` from `1` to `0` and simplify the redirect logic:

```javascript
var pathSegmentsToKeep = 0; // Root domain (aptos.fi)
var l = window.location;
l.replace(
  l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
  '/?p=' +
  l.pathname.slice(1).replace(/&/g, '~and~') +
  (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
  l.hash
);
```

### 2. Update `index.html`

Fix the path reconstruction to work with root domain:

```javascript
(function() {
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect);
  } else {
    var q = window.location.search;
    if (q && q.indexOf('?p=') === 0) {
      var decoded = q.slice(3).split('&q=');
      var path = decoded[0].replace(/~and~/g, '&');
      var query = decoded[1] ? ('?' + decoded[1].replace(/~and~/g, '&')) : '';
      history.replaceState(null, null, 
        '/' + path + query + window.location.hash
      );
    }
  }
})();
```

---

## How It Will Work After Fix

1. User visits `aptos.fi/fi`
2. Server returns 404.html (no physical `/fi` file exists)
3. 404.html redirects to `aptos.fi/?p=fi`
4. index.html loads, script detects `?p=fi`
5. `history.replaceState` changes URL to `aptos.fi/fi`
6. React Router sees `/fi` and renders FinnishInvestors page

---

## Files to Modify

| File | Change |
|------|--------|
| `public/404.html` | Set `pathSegmentsToKeep = 0`, simplify path encoding |
| `index.html` | Fix path reconstruction for root domain |

