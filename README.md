# WikiTavern ⚔️📚

_A smarter, faster Fandom for the next generation._

## What is it?

WikiTavern is a modern, streamlined alternative to ad-riddled fan wikis like Fandom. It’s built to be fast, clean, and community-curated — with zero ads and a contributor-first workflow.

## Core Philosophy

- 🚫 100% ad-free
- 🧠 Community-first, not profit-first
- 💸 Donation-supported only
- ✍️ No messy wiki markup — just clean editorial flow

## Stack

- **Next.js App Router (on Vercel)** – for hybrid static + dynamic pages
- **Sanity CMS** – for editorial content and submission workflows
- **Supabase** – for Auth, user submissions, moderation
- **Tailwind + shadcn/ui** – for a responsive, clean UI
- **pnpm + Turbo + Vitest + Playwright** – for a modern monorepo setup

## Repo Structure

- `apps/` – Web apps (Next.js, Sanity CMS, Storybook)
- `packages/` – Shared code (config, Sanity schemas, shadcn/ui UI components)
- `.cursor/rules/` – Code quality & convention rules (enforced via Cursor AI)

---
