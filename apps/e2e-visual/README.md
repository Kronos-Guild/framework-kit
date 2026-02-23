# e2e-visual playground

This app is a live playground for the `packages/components` UI library. It is meant for end-to-end visual checks, manual QA, and shareable deployment links.

## Local development

```bash
pnpm install
pnpm --filter e2e-visual dev
```

The app runs on Vite and imports `components` from the monorepo workspace.

## Environment variables

Copy `.env.example` to `.env.local` and set your RPC URL:

```bash
cp apps/e2e-visual/.env.example apps/e2e-visual/.env.local
```

`VITE_SOLANA_RPC_URL`
- Required for production-like testing
- Do not commit private keys in this value

## Build

```bash
pnpm --filter e2e-visual build
pnpm --filter e2e-visual preview
```

## Vercel deployment (monorepo)

Use the repository root as project root and set these commands:

- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm --filter e2e-visual build`
- Output directory: `apps/e2e-visual/dist`

Then add environment variable:

- `VITE_SOLANA_RPC_URL`

After deploy, use the generated URL as your live E2E/visual validation target.
