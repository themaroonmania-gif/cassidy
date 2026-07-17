# Cassidy Harden — personal site

A warm, editorial one-pager. No build step — plain HTML/CSS/JS.

## How to make it hers

Everything editable is marked with an `<!-- EDIT ME -->` comment in `index.html`:

1. **Hero one-liner** — the italic line under her name.
2. **Ribbon words** — the little phrases scrolling in the dark band.
3. **About photo** — drop a photo at `photos/cassidy.jpg`, then replace the
   `.photo-slot` div with `<img src="photos/cassidy.jpg" alt="Cassidy Harden">`.
4. **Bio paragraphs + fact chips** — the About section text.
5. **Gallery** — add photos to `photos/`, replace each `.g-slot` div with an
   `<img>`; captions live in the `<figcaption>` tags.
6. **Loves list** — her actual favorites.
7. **Say-hi email** — swap `hello@example.com` for her real one.

## Run locally

Open `index.html` in a browser, or `python -m http.server` in this folder.
