# 💙 Rescue Blue — Rettet das Blau

> **Petition website** · [https://el-j.github.io/rescue-blue/](https://el-j.github.io/rescue-blue/)

A bilingual (🇩🇪 DE / 🇬🇧 EN) one-page petition site demanding that German broadcasters (ARD, ZDF, private channels) display the AfD party in **brown** — not blue — in their political graphics, in line with its historically accurate colour association.

The petition is hosted on WeAct/Campact:  
**<https://weact.campact.de/petitions/rettet-das-blau-medien-mussen-die-afd-farblich-passend-darstellen>**

---

## Features

- 🎨 **Interactive colour-comparison bar chart** – switch AfD from blue → brown with one click
- 📊 **Live signature counter** – fetched directly from the WeAct API (with CORS-proxy fallback)
- 🌍 **Bilingual** – full German / English toggle in the navbar
- ✉️ **Open letter** section with three target audiences (public broadcasters, private media, broadcasting councils)
- 📚 **Cultural heritage** tab section (German language treasury & blue symbolism)
- ❓ **FAQ accordion** sidebar
- 💎 Dark-mode design with animated glows, float and rain-drop effects
- ⚡ Built with **Vite + React + Tailwind CSS v4**

---

## Development

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:5173/rescue-blue/
npm run build      # production build → dist/
npm run lint       # ESLint check
npm run preview    # preview production build
```

## Deployment

Every push to `main` triggers the **GitHub Actions** workflow (`.github/workflows/deploy.yml`) which:

1. Installs dependencies (`npm ci`)
2. Runs the linter (`npm run lint`)
3. Builds the site (`npm run build`)
4. Deploys the `dist/` folder to **GitHub Pages**

Make sure GitHub Pages is configured to use **GitHub Actions** as the source in your repository settings (*Settings → Pages → Source → GitHub Actions*).
