# PLAN.md — Link-in-Bio + Creator Store Platform

> Claude Code: read this whole file before every task. Build ONE step at a time.
> The owner does not know how to code. Explain every step in simple words,
> tell them exactly what to click/type, and wait for approval before moving on.

---

## 1. What we're building

A free platform where anyone can:
- Sign up and claim a username → get a public page at `oursite.com/username`
- Add links, social icons, a bio and a profile photo
- Sell digital products (PDFs, guides, templates) and have them delivered automatically
- See analytics (views, clicks, sales)

**No paid plans. No platform fee.** Everything is free for every user.

Brand name: `[BRAND NAME]` (owner will fill in)
Domain: `[DOMAIN]`

---

## 2. Tech stack (do not change without asking)

| Part | Tool |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui components |
| Database, login, file storage | Supabase |
| Payments | Stripe Connect (Standard accounts) + PayPal (later) |
| Emails | Resend |
| Hosting | Vercel |
| Code storage | GitHub |

---

## 3. Design direction (original — do NOT copy any existing product's design, logo or branding)

**Feel:** clean, friendly, soft, mobile-first. Most visitors arrive from Instagram on a phone.

**Public page (`/username`)**
- Centered single column, max width ~480px
- Round profile photo → name → short bio → row of social icons
- Full-width rounded link buttons with a subtle hover/tap animation
- Product cards: cover image, title, price, "Get it" button
- Small "Made with [BRAND NAME]" footer link
- Background: solid color, gradient, or image (user picks)

**Themes:** start with 6 original presets (e.g. "Cream", "Midnight", "Blush", "Sage", "Ocean", "Mono").
Users can also customize: background, button color, button shape (rounded / pill / square), font (3–4 Google Fonts).

**Dashboard**
- Desktop: left sidebar (Page, Store, Analytics, Settings) + editor in the middle + live phone preview on the right
- Mobile: bottom tab bar, preview opens as a button
- Drag-and-drop to reorder blocks

**Brand colors for our own site:** `[PRIMARY COLOR]` / `[ACCENT COLOR]` — pick original colors.

---

## 4. Database tables (Supabase)

- `profiles` — id, username (unique), display_name, bio, avatar_url, theme settings (JSON), created_at
- `blocks` — id, profile_id, type (link / social / product / header / text), data (JSON), position, is_visible
- `products` — id, profile_id, slug (unique per profile, used in `/username/product-slug`), title, description, price, currency, cover_url, file_path (private), is_active
- `orders` — id, product_id, seller_id, buyer_email, amount, currency, stripe_payment_id, status, created_at
- `download_tokens` — id, order_id, token, expires_at, download_count
- `payment_accounts` — profile_id, stripe_account_id, stripe_connected (bool), paypal_merchant_id
- `page_events` — id, profile_id, event_type (view / click), block_id, referrer, country, created_at
- `subscribers` — id, profile_id, email, created_at (email capture)

**Rules:**
- Row Level Security ON for every table. Users can only edit their own rows.
- Product files stored in a PRIVATE Supabase bucket. Only accessible through a valid download token.
- Structure everything per-user (profile_id) from day one.

---

## 5. Payments (Stripe Connect Standard)

- Each creator clicks "Connect Stripe" → Stripe onboarding → redirected back.
- Buyer checks out via Stripe Checkout, charged **directly on the creator's connected account**.
- **No application fee** (platform is free).
- Stripe webhook `checkout.session.completed` → create order → create download token → email buyer.
- Refunds and disputes are handled by the creator in their own Stripe dashboard.
- ⚠️ Before building this step: owner must confirm Stripe Connect is available for their platform account's country. Fallback: creator pastes their own Stripe Payment Link / PayPal link per product.

---

## 6. Build steps (one at a time — test, then commit to GitHub)

### ▶ Current status (updated 2026-10-25)
- **Done:** Step 1 (live on Vercel). Step 2 Part A: email/password sign up, log in, log out and forgot password all work on the live site.
- **Paused:** Step 2 Part B, Google login. The code is saved on the Git branch `paused/google-login`. To resume, set up the Google OAuth client and enable Google in Supabase, then merge that branch into `main`.
- **Paused:** all backend connections (Steps 3 and 5–13 talking to Supabase, Stripe, Resend and PayPal).
- **Now:** the **Frontend phase** below. We build every main screen with sample data, then connect the backend screen by screen.

### Frontend phase — all screens with sample data (no database, no payments)
Rules for this phase:
- Every screen gets its data only from the functions in `lib/data/`. For now those functions return sample data from `lib/sample-data.ts`. Later each one is switched to Supabase, and the screens don't change.
- Data shapes in `lib/types.ts` match the database tables in section 4.
- Mobile-first, following the design direction in section 3.

Screens, one at a time, previewed by the owner before the next:
- **F1** — Public creator page `/username`: photo, name, bio, social icons, links, product cards, "Made with" footer, theme applied, 404 for unknown usernames.
- **F2** — Product page `/username/product-slug` with a Buy button (not working yet).
- **F3** — Dashboard layout (desktop sidebar plus mobile bottom tabs) and the Page editor: add, edit, hide, delete and drag-reorder links, with a live phone preview.
- **F4** — Theme picker: 6 presets plus custom background, button color, button shape and font.
- **F5** — Store, Analytics and Settings dashboard screens.
- **F6** — Landing page for the brand.

Changes made in this phase only live in the browser. Nothing is saved until the backend is connected.

### Step 1 — Project setup
Create Next.js + TypeScript + Tailwind + shadcn/ui project. Connect to GitHub. Deploy an empty page to Vercel.
✅ Test: the live Vercel link opens.

### Step 2 — Supabase + login
Create Supabase project, connect it. Sign up, log in, log out, forgot password (email + Google login).
✅ Test: create an account, log out, log back in.
⏸ Google login is paused (see Current status).

### Step 3 — Username + profile
After sign-up, user picks a unique username. Create the `profiles` table.
✅ Test: two accounts can't take the same username.

### Step 4 — Public page
`/username` shows profile photo, name, bio, socials, links. Mobile-first. 404 page for unknown usernames.
✅ Test: open it on your phone.

### Step 5 — Editor dashboard
Add / edit / delete / hide / drag-reorder blocks. Upload profile photo. Live phone preview updates instantly.
✅ Test: changes show on the public page.

### Step 6 — Themes
6 preset themes + custom colors, button shapes, fonts.
✅ Test: switch themes, check public page.

### Step 7 — Store (products)
Create product: title, description, price, cover image, upload file (private bucket). Products show as cards on the public page and get their own page `/username/product-slug`.
✅ Test: product appears; file can NOT be opened by guessing its URL.

### Step 8 — Stripe Connect + checkout
Connect Stripe button in Settings. Buy button → Stripe Checkout on creator's account. Webhook creates the order.
✅ Test: buy your own product in Stripe TEST mode.

### Step 9 — Automatic delivery
After payment: email buyer (Resend) with a secure download link (expires in 7 days, max 5 downloads). Thank-you page with the download button.

Also, from Step 2: connect Resend to Supabase as custom SMTP (Supabase → Authentication → Emails → SMTP Settings). That lifts Supabase's few-emails-per-hour limit and unlocks editing email templates. Then change the "Confirm signup" and "Reset password" templates to link to
`{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard` and
`{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password`.
`/auth/confirm` already handles these links, which work in any browser. Supabase's default links only work in the browser where the person signed up or asked for the reset.
✅ Test: test purchase → email arrives → file downloads.
✅ Test: sign up on a laptop, open the confirmation email on a phone, and it logs you in.

### Step 10 — Sales dashboard
Creator sees orders, revenue, buyer emails.

### Step 11 — Analytics
Track page views + link clicks. Charts for last 7 / 30 / 90 days, top links, top countries.

### Step 12 — Email capture block
A block where visitors leave their email (for freebies / lead magnets). Creator can export as CSV.

### Step 13 — PayPal (optional)
Add PayPal as a second checkout option.

### Step 14 — Our landing page + legal
Homepage for `[BRAND NAME]`, Terms of Service, Privacy Policy, Refund Policy, contact page.

### Step 15 — Security audit + launch
- Audit all Row Level Security policies
- Rate-limit sign-ups and checkout
- Verify Stripe webhook signatures
- Check no secret keys are exposed in the browser
- Switch Stripe to LIVE mode, connect the real domain

---

## 7. Later ideas (NOT now)
Custom domains per user · email broadcasts · courses · bookings/calls · affiliates · AI page builder · mobile app

---

## 8. Working rules for Claude Code
- One step at a time. Ask before starting the next.
- Before writing code, explain the plan in 3–5 simple sentences.
- After each step, tell the owner exactly how to test it.
- When an error is pasted, explain what went wrong simply, then fix it.
- Never put secret keys in code — use `.env.local` and Vercel environment variables, and explain where to paste them.
- Remind the owner to commit to GitHub after every working step.
