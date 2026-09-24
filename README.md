# Love Letter Book

An interactive React + CSS digital book for letters and poems.

## Run

```bash
npm install
npm run dev
```

Open the local URL Vite prints in the terminal.

## Edit the letters and poems

Change `src/data/letters.js`. Add or remove objects from the `pages` array.

Each page can be:

- `type: 'letter'` with `title`, `date`, `body`, `signoff`, and `signature`
- `type: 'poem'` with `title` and `lines`

## Where the main pieces live

- `src/App.jsx` — controls the book state and page navigation.
- `src/components/BookCover.jsx` — opening cover.
- `src/components/LetterPage.jsx` — letter design.
- `src/components/PoemPage.jsx` — poem design.
- `src/components/Navigation.jsx` — previous/next/close controls.
- `src/components/FloatingHearts.jsx` — decorative animation.
- `src/styles/book.css` — all visual design and page animations.
- `src/data/letters.js` — your actual words/content.

## Background music

The experience includes an original 24-second looping romantic ambient track at `public/music/romantic-ambient.wav`. It starts with the first user interaction (opening the book), fades in gently, and can be paused or resumed with the floating music button.
