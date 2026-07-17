# Cassidy Harden ♡

A phone-first gift site, built by her husband. Lavender + matcha, flowers +
dogs, girly and light. Plain HTML/CSS/JS — no build step, no dependencies.

## The one thing left to do

**Drop a photo of Athena at `photos/athena.jpg`.**

Her section is already built and wired. Until that file exists, it shows a
tasteful little 🐺 placeholder card instead of a broken image — so the page
never looks wrong, it just gets better the moment you add her.

## What's inside

- **Hero** — falling lavender/matcha petals mixed with flowers and paw prints,
  polaroid photo, tap anywhere for sparkles
- **Live counters** — days together since 4.14.22 + days married since 4.5.25;
  marriage counter taps to cycle units (days → hours → minutes → seconds)
- **Her story** — Troy → April 14, 2022 (they started dating) → Hawaii proposal →
  A&M '25 (real graduation photo) → the wedding → Brilliant Bridal → TWU OTD '28,
  with a live "Dr. Harden loading" bar that reads her actual progress toward the degree
- **Athena** — the actual favorite child
- **Polaroid gallery** — swipeable, 14 photos from the wedding site
- **Her three comfort shows** — Psych, Resident Alien, I Will Find You
- **Receipts** — the Pinterest section. Every number is real.
- **Scratch card** — scratch off with a finger to reveal a note
- **Open when… envelopes** — four notes, tap to flip

## Easter eggs (all tap-only, no keyboard, no hover)

1. Tap her name 5× fast → sparkle storm + secret message
2. Tap the **☀️ be the light** chip 3× → the whole page glows
3. Tap the **🍵 matcha girlie** chip → matcha rain (tap 3× for a bonus line)
4. Tap **Athena** → paw prints + a rotating cast of her opinions
5. Tap the counter through to "seconds" → bonus toast
6. Tap any of the three shows → a line about her watching it
7. **Find the hidden 🍍 in the footer** → the Psych one. She'll get it.
8. Finish the scratch card → sparkle burst
9. Scroll to the absolute bottom → one last hidden line

## Theme

Colors live as CSS variables at the top of `style.css`:
`--lav` / `--lav-deep` (lavender), `--matcha` / `--matcha-deep`, on a
`--bg` lavender-white. Change those four and the whole site follows.

## Notes for future edits

- Photos are in `photos/` (pulled from the public Zola wedding gallery).
- Wedding date and the TWU start/end dates are constants at the top of
  `script.js` — the counter and progress bar derive everything from them.
- Every effect is fail-safe: reveals, counters, and the progress bar all have
  timeouts, so nothing stays blank if an observer never fires. Motion is
  disabled entirely under `prefers-reduced-motion`.
- Animation loops sleep when off-screen or backgrounded — it's her phone
  battery.

## Run locally

```
python -m http.server 8735
```
