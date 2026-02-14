# Soc Ops — Design Spec

## New Mode: Card Deck Shuffle (v1)

- Intent: Super-fast, low-friction prompt mode where each participant taps to draw a random question card.
- Entry: Start screen button “Card Deck Shuffle”.
- Layout: Single full-screen card with a large prompt; tap area is the card itself and a primary CTA below.
- Visuals: Reuse `.glass-card`, `.neon-text`, `.neon-btn`, `.neon-ring` utilities. Keep focus/ARIA for keyboard users.
- Interaction:
  - Initial state shows “Tap to Draw”.
  - Tap/click/Enter/Space draws next card from a locally shuffled list.
  - v1 allows repeats after cycling through (wrap to start). No persistence.
  - Header provides Clear (reset view) and Back.
- Accessibility: Card is a button with role, label, and keyboard handling.

## Future Enhancements (not in v1)
- No-repeat across the session with visible remaining count.
- Persist current deck across reload with versioned localStorage.
- Share a room code so all players draw from the same global deck.
- Theming variants for brighter/lower-contrast environments.

## Rationale
- Keep the first iteration minimal and reversible to collect feedback quickly.
- Avoid coupling with existing bingo/hunt persistence to reduce complexity.
- Leverage existing design tokens for consistency with “Neon Showcase”.
