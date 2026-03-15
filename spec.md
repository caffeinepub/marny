# MARNY

## Current State
- Single-page app with Home, How It Works, Flavours (on home), About sections
- Flavor cards use separate AI-generated images per flavor
- Cart has +/- pack quantity buttons; minus to 0 removes the item

## Requested Changes (Diff)

### Add
- Flavours as a separate page (state-based routing, no external router needed)
- Nav "Flavours" link navigates to the flavours page
- Dedicated "Remove" (X) button on each cart item to fully remove it

### Modify
- Flavor card images: use the actual product photo (`PRODUCT_PHOTO`) as base, overlaid with a semi-transparent color layer matching the flavor, instead of separate generated images
- Cart items: keep existing +/- quantity buttons AND add a remove button
- Nav "Flavours" anchor link → button that switches to flavours page

### Remove
- FLAVOR_CAP_IMAGES record (no longer needed)
- Flavours section from the homepage

## Implementation Plan
1. Add page state (`'home' | 'flavours'`) to MarnyApp
2. Build `FlavoursPage` component: same grid, now full-page with back/nav
3. Replace FLAVOR_CAP_IMAGES with FLAVOR_OVERLAY_COLORS (hex/rgba values per flavor for CSS overlay)
4. In flavor card image area: render `<img src={PRODUCT_PHOTO}>` with a sibling absolutely-positioned `<div>` of semi-transparent color using `mix-blend-mode: multiply`
5. Add a trash/X remove button to each cart item that calls `removeFromCart(productId)`
6. Wire nav link and hero CTA to navigate to flavours page
