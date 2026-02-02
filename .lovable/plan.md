
Goal
- Fix the Cal.com inline embed so switching language never results in “Error Code: 500. Something went wrong”.
- Ensure Finnish shows only the Finnish calendar and English shows only the English calendar (at least visually), while keeping the embed stable across language toggles.

What’s most likely happening
- The Cal embed script injects a custom element (<cal-inline> + an iframe) into your container.
- When you switch languages, React currently unmounts one container and mounts the other (because of the conditional render).
- Many third‑party embeds (including Cal embeds) don’t tolerate being “torn down” and then re-initialized repeatedly in a SPA without a proper destroy/unmount API. That can leave stale embed state behind and cause the next embed initialization to fail, showing a 500 inside the iframe.

High-confidence fix (stability-first)
Instead of unmounting/remounting the calendar container on language switch, keep both containers mounted for the lifetime of the page and only toggle visibility. Initialize each calendar only once, the first time it’s needed.

Implementation steps (code changes)
1) Update BookingSection to keep both calendar containers mounted
- In src/components/landing/BookingSection.tsx:
  - Render both containers always:
    - #my-cal-inline-ilmainen-asuntosijoitus-sparraus
    - #my-cal-inline-apartment-investing-in-finland-free-call
  - Use Tailwind to show/hide based on language:
    - Finnish container: className={language === 'fi' ? '' : 'hidden'}
    - English container: className={language === 'en' ? '' : 'hidden'}
  - Add aria-hidden for the hidden one (optional but recommended).

2) Stop re-initializing Cal on every language change
- Replace the current “initialize in useEffect([language]) every time” approach with:
  - One effect that loads the embed script once (on mount), and tracks when it’s ready.
  - A second effect that initializes the calendar for the active language only if it hasn’t been initialized before.

3) Use refs (HTMLElement) instead of selectors (more robust)
- Create two refs:
  - fiContainerRef
  - enContainerRef
- When calling inline, pass the element directly:
  - elementOrSelector: fiContainerRef.current (instead of "#my-cal-inline-...")
This reduces the chance of issues if the embed script replaces nodes or if IDs briefly don’t match during rerenders.

4) Track per-language initialization state
- Add something like:
  - const initializedRef = useRef({ fi: false, en: false });
- When language changes:
  - if initializedRef.current[language] is true: do nothing (just show/hide)
  - else: run init + inline + ui for that language once, then set initializedRef accordingly.

5) Ensure the embed script is loaded exactly once and wait for it
- In the “load script” effect:
  - If window.Cal?.loaded is true, mark “ready” immediately.
  - Else, check if a <script src="https://app.cal.eu/embed/embed.js"> already exists:
    - If not, create it and set script.onload to set “ready”.
    - If yes, attach an onload listener (or poll) to set “ready”.

6) Optional: clear container only on first initialization (not every toggle)
- Before calling inline the first time for a language:
  - containerRef.current.innerHTML = ''
This avoids accumulating multiple iframes if Cal re-appends.

7) Clean up leftover SimplyBook translation strings (optional housekeeping)
- src/contexts/LanguageContext.tsx still contains booking.widget.* strings referencing SimplyBook.
- If those are unused now, remove or update them to Cal wording to avoid confusion later.

Files to change
- src/components/landing/BookingSection.tsx (main fix)
- src/contexts/LanguageContext.tsx (optional cleanup only)

How we’ll verify the fix (acceptance tests)
1) Desktop
- Load page in Finnish, scroll to Booking: Finnish calendar loads and works.
- Switch to English (while staying on Booking): English calendar appears and works (no 500).
- Switch back and forth 5–10 times: no errors; always only the correct calendar visible.

2) Mobile
- Repeat the same switching tests (especially important because “useSlotsViewOnSmallScreen” is enabled).

3) Hard refresh + switch language
- Refresh on English, confirm English calendar is correct.
- Switch to Finnish, confirm Finnish calendar is correct.

Fallback plan if Cal embed still fails
- Enable Cal embed logging (Cal’s docs mention using ?cal.embed.logging=1 on the page URL) and inspect console/network to see what request returns 500.
- If the 500 is coming from Cal’s backend only in embedded mode (rare, but possible due to embed state), replace embed.js usage with a direct iframe embed approach (if Cal provides a stable iframe URL for inline booking), which avoids the “SPA re-init” problem entirely.

Why this should work
- It removes the problematic lifecycle: “unmount calendar A” → “recreate calendar B”.
- Each calendar initializes once, and language switching becomes a simple show/hide toggle, which is the most reliable pattern for third-party embed widgets in React SPAs.
