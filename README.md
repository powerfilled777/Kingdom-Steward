# Kingdom Steward — Owned Software Starter

This package is independent of v0. You own the source code.

## Included

- Next.js and TypeScript source
- Supabase email authentication
- Private user profiles
- Monthly budgeting
- Expense tracking
- Row Level Security so users can only access their own data
- Responsive navy-and-gold interface
- Vercel-ready project structure

## Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy `.env.example` to `.env.local`.
5. Add your Supabase Project URL and public anon key.
6. Run:

```bash
npm install
npm run dev
```

7. Open `http://localhost:3000`.

## Deploy

Push this folder to a private GitHub repository you own.
Import that repository into Vercel.
Add the two environment variables in Vercel.
Deploy.

## Next release

- Goals
- 40-day stewardship journey
- Weekly reviews
- Admin lesson editor
- Password-reset screen
- Privacy and terms pages
- Data export and account deletion
- Stripe subscription support after testing

Never expose the Supabase service-role key in this app.
