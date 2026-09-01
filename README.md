# Common Thread Collective

A static marketing site for **Common Thread Collective**, a Baton Rouge photo booth studio. Five pages, one stylesheet, no build step. Visual language follows `booth_collective.html`: parchment, ink, and gold; Georgia serif; script accents; square gold-outline buttons.

```
├── index.html        # Home
├── about.html        # Our story
├── services.html     # What we offer
├── gallery.html      # Photo gallery
├── contact.html      # Book / inquiry form
├── assets/
│   ├── styles.css    # All styles + brand color tokens (edit palette here)
│   ├── script.js     # Nav toggle, scroll reveals, form handling
│   └── gallery/      # Drop your real photos here
├── README.md
└── .gitignore
```

## Run locally

From this folder:

```bash
python3 -m http.server 43147
```

Then open [http://127.0.0.1:43147](http://127.0.0.1:43147).

Any static server works (`npx serve . -p 43147`, VS Code Live Server, etc.). Opening the HTML files directly also works because all paths are relative.

## Edit the brand

Color, type, and spacing live at the top of `assets/styles.css`:

```css
:root {
  --artifact-bg: #f6f0e6;
  --artifact-bg-alt: #eee4d3;
  --artifact-surface: #fbf7f0;
  --artifact-ink: #1c1813;
  --artifact-gold: #b0894a;
  --artifact-gold-soft: #c7a468;
  /* … */
}
```

Change those tokens and the whole site follows. Body type is Helvetica Neue / Arial; headlines are Georgia; script is Great Vibes (a web stand-in for Snell Roundhand).

## Swap in real photos

1. Add JPEGs or WebPs to `assets/gallery/`.
2. Update the `src` / `href` attributes in `gallery.html` (and any polaroids on `index.html` / `about.html`).
3. Keep `data-category` as `weddings`, `private`, or `corporate` so the filters still work.
4. Write a short `figcaption` — it shows in the lightbox.

Sample images in that folder are Unsplash stand-ins so the layout is not empty on first clone.

## Inquiry form

The contact form validates in the browser and, on success, saves the submission to `localStorage` under `common-thread-inquiries`. That is enough to demo the flow. To receive real emails, point the form at a backend:

- **Formspree:** set `action="https://formspree.io/f/your-id"` and `method="POST"` on `#inquiry-form`, then remove the `preventDefault` success path in `setupForm()` if you want native submit.
- **Netlify Forms:** add `netlify` (and a `form-name`) to the `<form>` and deploy to Netlify.
- **Your API:** POST the `FormData` from `setupForm()` in `assets/script.js`.

## Publish on GitHub Pages

```bash
git init
git add .
git commit -m "Initial Common Thread Collective site"
git branch -M main
git remote add origin https://github.com/<your-username>/common-thread-collective-site.git
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Deploy from a branch → `main` / root**. The site will be at `https://<your-username>.github.io/common-thread-collective-site/`.

If the site lives in a project-pages subpath, keep using relative links (already the case) so CSS, JS, and images still resolve.

## What the script does

`assets/script.js` handles:

- Mobile nav open/close
- Header border after scroll
- Scroll-triggered reveals (`data-reveal`)
- Gallery filters and lightbox (Esc / arrows)
- Contact form validation and success state
