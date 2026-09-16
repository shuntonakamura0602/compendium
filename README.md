# Compendium

The knowledge layer for Kaggle competitions.

Compendium collects the information scattered across a Kaggle competition — overview, evaluation, dataset, discussions, winning solutions and notebooks — into a single page that is easy to understand for both humans and AI coding agents.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the public origin so that
canonical URLs, Open Graph tags, `sitemap.xml` and the generated agent
context point at the deployed site. On Vercel this is optional: the build
falls back to the deployment URL Vercel injects.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Static data (no database in the MVP)
