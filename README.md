# Booth Collective — Website

Marketing site for **Booth Collective**, a portable photo booth business based in Baton Rouge.
Curated photo moments for weddings, corporate events, school celebrations, nonprofit gatherings, and community milestones.

## Tech
Plain HTML, CSS, and JavaScript — no build step, no dependencies. Easy to edit in **Cursor** and version with **GitHub**.

## Structure
```
booth-collective-site/
├── index.html        # Home
├── about.html        # Our story
├── services.html     # What we offer
├── gallery.html      # Photo gallery (placeholder tiles)
├── contact.html      # Book / inquiry form
├── assets/
│   ├── styles.css    # All shared styles + design tokens (edit brand colors here)
│   ├── script.js     # Nav toggle, scroll reveals, inquiry form
│   └── gallery/      # Drop your real photos here
└── README.md
```

## Run locally
Just open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing
- **Brand colors / fonts:** edit the `:root` tokens at the top of `assets/styles.css`.
- **Text content:** edit the `.html` files directly.
- **Gallery photos:** add images to `assets/gallery/`, then in `gallery.html` replace a
  `<div class="gtile">...</div>` with `<div class="gtile"><img src="assets/gallery/your.jpg" alt=""></div>`.
- **Contact form:** currently front-end only. To receive real submissions, wire the
  `handleSubmit` function in `assets/script.js` to a service like Formspree, Netlify Forms, or your own API.

## Git / GitHub workflow
```bash
git init
git add .
git commit -m "Initial Booth Collective site"
git branch -M main
git remote add origin https://github.com/<your-username>/booth-collective-site.git
git push -u origin main
```
Day-to-day:
```bash
git pull            # get latest
# ...edit in Cursor...
git add .
git commit -m "Describe your change"
git push
```

## Free hosting (optional)
Enable **GitHub Pages**: repo Settings → Pages → deploy from `main` branch → `/root`.
Your site goes live at `https://<your-username>.github.io/booth-collective-site/`.
