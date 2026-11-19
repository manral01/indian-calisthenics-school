# Online Course: Setup Guide

The course pages are built. To switch them on, create 3 free accounts and paste their keys into Vercel. About 45 minutes in total.

Pages: `/course` (sales page), `/login`, `/learn` (student dashboard and video player), `/manual` (course manual, read online).

The Stage 1 manual and its free sample chapters (Welcome, 1.1.1) work already. Everything else needs the accounts below.

---

## 1. Supabase: student logins + database (free)

1. Go to supabase.com → **New project**. Name: `ics-course`. Region: **Mumbai**. Save the database password somewhere safe.
2. **SQL Editor → New query** → paste everything from `supabase/lms-schema.sql` → **Run**.
3. **Authentication → Sign In / Providers → Email**: keep it on. Turn **Confirm email** on.
4. **Authentication → Emails → Templates → Magic Link**: replace the body with:
   ```
   <h2>Your login code</h2>
   <p>Enter this code on Indian Calisthenics School: <strong>{{ .Token }}</strong></p>
   ```
   Do the same for the **Confirm signup** template.
5. **Authentication → URL Configuration**:
   - Site URL: `https://www.indiancalisthenicsschool.com`
   - Redirect URLs: add `https://www.indiancalisthenicsschool.com/**` and `https://*.vercel.app/**`
6. **Google login**: Authentication → Providers → Google → turn on. It asks for a Google Client ID and Secret: create them at console.cloud.google.com → APIs & Services → Credentials → OAuth client ID (Web). Use Supabase's "Callback URL" shown on that screen as the redirect URI.
7. **Email sending**: Supabase's built-in email only sends a few emails per hour. Before launch, connect a free Resend or Brevo account under **Authentication → Emails → SMTP Settings**.
8. Copy from **Project Settings → API**: Project URL, `anon` key, `service_role` key.

## 2. Razorpay: payments

1. razorpay.com → sign up and complete KYC (business PAN, bank account).
2. **Settings → API Keys → Generate**. Copy Key ID and Key Secret. (Start with **Test mode** keys, switch to Live keys at launch.)
3. **Settings → Webhooks → Add**:
   - URL: `https://www.indiancalisthenicsschool.com/api/lms/razorpay-webhook`
   - Secret: make up a long random password and copy it
   - Events: `payment.captured`, `order.paid`
4. For international buyers, ask Razorpay support to enable international cards.

## 3. Bunny Stream: course videos (pay-as-you-go, low cost)

1. bunny.net → **Stream → Add Video Library**. Name: `ics-course`. Pick Asia + Europe regions.
2. In the library: **Security** → turn on **Token authentication** and **Block direct URL file access**. Add `indiancalisthenicsschool.com` under allowed referrers.
3. Copy the **Library ID** and the **Token authentication key** (Security tab).
4. Upload each lesson video. Copy its **Video ID** into `stage1Videos` in `src/data/course.ts`, next to its lecture number (or send the list to Claude).

## Updating the course manual

Send Claude the new PDF, or run `python3 scripts/build-manual.py Stage-1-Foundation.pdf stage-1` and commit. Lessons and chapter titles update automatically. The PDF itself is never put on the website.

## 4. Paste keys into Vercel

Vercel → project → **Settings → Environment Variables**, for Production and Preview:

| Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_URL` | Supabase Project URL (same as above) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key (secret) |
| `RAZORPAY_KEY_ID` | Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret (secret) |
| `RAZORPAY_WEBHOOK_SECRET` | The webhook password you made up |
| `BUNNY_LIBRARY_ID` | Bunny library ID |
| `BUNNY_TOKEN_KEY` | Bunny token authentication key (secret) |

Then **Deployments → Redeploy**.

## 5. Set prices and launch

In `src/data/course.ts`:
- Set each stage's `priceInr` (e.g. `4999`) and `COURSE.bundlePriceInr`. `null` shows "Coming soon" with a WhatsApp "notify me" button.
- `COURSE.listed = true` (already on): "Online Course" is in the menu and footer and Google can index `/course`.

## Day-to-day

- **Who bought:** Supabase → Table Editor → `course_sales`. Razorpay dashboard shows the payments too.
- **Give someone free access** (gift, refund replacement, a coach): Supabase → SQL Editor:
  ```sql
  insert into enrollments (user_id, stage, note)
  select id, 'stage-1', 'gift' from auth.users where email = 'student@example.com';
  ```
  (They must have logged in once first.)
- **Remove access** (after a refund): `delete from enrollments where stage = 'stage-1' and user_id = (select id from auth.users where email = 'student@example.com');`
- **Test a purchase:** with Razorpay Test keys, pay with UPI ID `success@razorpay` or card `4111 1111 1111 1111`, any future expiry, any CVV.
