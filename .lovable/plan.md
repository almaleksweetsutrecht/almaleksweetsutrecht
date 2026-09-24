# Luxury dessert motion showcase

## Goal
Use the nine newly uploaded dessert photos to create a premium, responsive homepage presentation without changing the existing ordering flow or product data.

## Changes
- Replace the static homepage background with a layered dessert composition using selected uploaded photos, while preserving the crown, brand message, and existing calls to action.
- Add a new editorial dessert gallery before the featured products so the remaining uploaded photos are visible in an elegant staggered layout.
- Add a reusable interactive image frame with gentle scroll parallax, ambient floating motion, pointer-following 3D tilt, and a warm moving halo.
- Apply the same refined tilt and halo treatment to product showcase photos, without changing product cards or purchase controls.
- Disable pointer-driven motion on touch devices and respect reduced-motion preferences.

## Visual treatment
- Keep the current burgundy, metallic gold, and cream design language.
- Use restrained gold borders, glass-like highlights, rounded frames, and deep soft shadows.
- Keep text readable over imagery and preserve clear spacing across mobile and desktop.

## Technical details
- Store the uploaded photos through the project asset service and reference their asset pointers.
- Implement motion with React pointer/scroll handling and CSS transforms, avoiding a new animation dependency.
- Use requestAnimationFrame and transform-only animation for smooth performance.
- Verify desktop and mobile layouts, interactions, reduced-motion behavior, and page metadata.
