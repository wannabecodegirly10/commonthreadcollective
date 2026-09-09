# Common Thread Collective

A static one-page marketing site for **Common Thread Collective**, a Baton Rouge photo booth and brand activation studio. No build step.

```
├── index.html               # The whole site (hero, story, experiences, corporate, props, process, FAQ, inquiry)
├── about.html               # Redirect → index.html#about
├── services.html            # Redirect → index.html#experiences
├── gallery.html             # Redirect → index.html#props
├── contact.html             # Redirect → index.html#inquire
├── assets/
│   ├── styles.css           # All styles + brand color tokens
│   ├── script.js            # Mobile nav, footer year, inquiry form
│   ├── logo.svg             # Header and footer wordmark
│   └── props-showcase.svg   # Placeholder prop concept graphic
├── serve-local.ps1          # Local static server for Windows (port 43147)
├── README.md
└── .gitignore
```

The four redirect pages exist only so older bookmarks and links still land on the right section.

## Run locally

From this folder on Windows:

```powershell
powershell -ExecutionPolicy Bypass -File serve-local.ps1
```

Then open <http://127.0.0.1:43147>.

Any static server works (`python3 -m http.server 43147`, `npx serve . -p 43147`, VS Code Live Server). Opening `index.html` directly also works because all paths are relative.

## Edit the brand

Color and spacing tokens live at the top of `assets/styles.css`:

```css
:root {
  --cream: #f7f2e9;
  --paper: #fffdf8;
  --ink: #181716;
  --muted: #6e6961;
  --gold: #b28a49;
  --gold-dark: #8e6a33;
  /* … */
}
```

Body type is Libre Franklin; headlines are Georgia. Type sizes are fixed (32px h1, 24px h2, 19px h3, 16px body) to match the Canva design.

## Swap in real artwork

- Replace `assets/logo.svg` with the real logo export. Keep the same filename or update the two `<img>` tags in `index.html`.
- Replace `assets/props-showcase.svg` with a photo of the custom props, and update the `<figcaption>` beneath it.

## Inquiry form

The form builds a `mailto:` message and opens the visitor's email app. The destination address is set in `assets/script.js`:

```js
const contactEmail = "commonthreadbr@gmail.com";
```

To collect submissions directly instead:

- **Formspree:** set `action="https://formspree.io/f/your-id"` and `method="POST"` on `#inquiry-form`, then remove the submit handler in `assets/script.js`.
- **Netlify Forms:** add `netlify` and a `form-name` to the `<form>` and deploy to Netlify.

## Publish on GitHub Pages

```bash
git init
git add .
git commit -m "Common Thread Collective site"
git branch -M main
git remote add origin https://github.com/<your-username>/common-thread-collective-site.git
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Deploy from a branch → `main` / root**. The site will be at `https://<your-username>.github.io/common-thread-collective-site/`.

All links are relative, so the site also works from a project subpath.
