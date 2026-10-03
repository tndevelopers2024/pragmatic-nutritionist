# Pragmatic Nutrition homepage

**Designed and Developed by Mohan**

Next.js 16.3.8 / React / TypeScript. Only `/` is redesigned; service, consultation, about, journal, and legal links lead to the existing website.

## Run

```sh
npm install
npm run dev
```

Preview: http://127.0.0.1:3000

`npm run build` produces a static export in `out/`.

## Content and assets

Brand, portrait, service photographs, credentials, testimonials and destinations were verified against https://www.pragmaticnutritionist.com/ on 3 October 2026. Quotations retain original wording. Testimonials describe individual experiences, not guaranteed outcomes.

Hero photography: Real Natures Food, Unsplash, https://unsplash.com/photos/3YJv-bpV3xQ (Unsplash License). Other photographs and logo are reused from the existing brand website for this requested redesign. Fonts: DM Sans and Playfair Display, Google Fonts (SIL Open Font License), self-hosted in public/fonts.

## Interactions

Hero: previous/next, topic indicators, left/right keyboard arrows, touch swipe, explicit play/pause. Autoplay pauses on hover/focus and when the tab is hidden. Reduced-motion preferences disable autoplay and animated movement by default. Mobile navigation has a focus trap, Escape dismissal and restored trigger focus. Navigation contracts on scroll. Scroll animation uses progressive CSS view timelines with visible-content fallbacks. No scroll hijacking.

## Expanded homepage update

Restored original statistics, magazine strip, four athlete photographs, all six testimonial quotations, gut health checker, four approach statements, full founder biography and credentials, three-step process, award feature, service menu and extended footer/contact/legal content. The unfinished original Wix placeholder slideshow is intentionally omitted.

Lenis 1.3.26 uses a single automatic RAF loop with lerp 0.16 and wheelMultiplier 1. Touch stays native. Lenis handles anchor navigation and back-to-top; it stops while the mobile menu is open. Its built-in reduced-motion support immediately follows preference changes. Scroll reveals use IntersectionObserver once, with short opacity/transform transitions instead of ongoing image/section mask calculations.

The branded preloader waits for the hero image (minimum 380ms, maximum 1800ms), skips repeat visits in the same session, has a CSS fallback timeout, and is hidden for reduced motion. The cursor is mouse-only, batches pointer updates into requestAnimationFrame, expands on links/buttons, hides for keyboard use and reduced motion, and never intercepts input.

---

## Attribution

**Designed and Developed by Mohan**
