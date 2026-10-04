# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: bachata dancers and couples planning a trip to Marrakech, deciding whether to book a festival stay. Secondary: teachers, DJs, and returning El Baile community members checking lineup and dates.

## Product Purpose

BAILAIMOS is the public site for a bachata festival in Marrakech. It must make the place, dates, artists, and stay packages clear enough that a visitor books a 3-night stay.

## Positioning

A By El Baile festival held at Palm Plaza Marrakech, 20-24 May 2027, with hotel stay packages sold as the ticket.

## Operating Context

One-page cinematic homepage plus routes for stays, artists, programme, practical info, FAQ, and contact. Locales: French, English, Spanish. Content is edited in Payload CMS.

## Capabilities and Constraints

- Header must stay visible. Keep `[data-testid="discover-passes"]` on the header reserve action.
- Homepage may scrub photography on scroll. Do not generate Seedance or other 8-second videos unless asked.
- Stay prices come from flyer data in `src/lib/stays.ts`. Do not invent hotel prices.
- Festival dates: 20-24 May 2027. Stay window: 21-23 May (Friday to Sunday, 3 nights).
- Featured artists: Kevin y Lucia, Jordi & Judith. Venue: Palm Plaza Marrakech.

## Brand Commitments

- Name: Bailaimos Festival. Signature: By El Baile.
- Logo: green BAILAIMOS FESTIVAL wordmark plus pink script, transparent background. Path: `public/brand/bailaimos-logo.png`.
- Brand colors from the logo and flyers: forest night, sun yellow, blush pink.
- Photography: the Marrakech plates in `public/cinematic/plates` and the supplied artist / stay photos.

## Evidence on Hand

- Logo, two artist flyers, three stay photos, five Marrakech plates.
- Stay prices and occupancy in `src/lib/stays.ts`.
- No independent press quotes or testimonials. Do not fabricate them.

## Product Principles

- Place first: Marrakech and the venue must be felt before features are listed.
- Booking is the job: the stay is the product, not a generic festival pass grid.
- Keep supplied facts exact: dates, prices, names, venue.
- Motion serves the camera and the copy. It never hides the words.
- One festival voice across French, English, and Spanish.

## Accessibility & Inclusion

Honor `prefers-reduced-motion` by collapsing scroll pins and showing still copy. Keep keyboard focus and skip-to-content. Body text contrast at least WCAG AA on photographic grounds.
