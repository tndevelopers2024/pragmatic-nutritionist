# Pragmatic Nutrition homepage

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
