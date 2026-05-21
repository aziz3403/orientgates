# Setup Guides for The Orient Gates

Three things on this page need real-world credentials before they go live:
**Resend** (email sending), **Stripe** (card payments), and a small set of
**photos** for /heritage and /craftsmanship. Each section below is a
step-by-step checklist you can hand to a junior assistant.

---

## 1. Resend — send the contact form to info@theorientgates.com

The contact form already saves every submission to Supabase (visible in
`/admin/inquiries`). To also receive an email when someone submits, do this:

### Step 1: create the account
1. Go to https://resend.com/signup
2. Sign up with `info@theorientgates.com` (or any email you control)

### Step 2: verify the domain
1. In the Resend dashboard → **Domains** → **Add Domain** → type `theorientgates.com`
2. Resend will show you 3–4 DNS records to add (looks like `_resend.theorientgates.com`, `_dmarc`, plus SPF/DKIM)
3. Open **Vercel** → https://vercel.com/dashboard → project `orient-gates` → **Settings** → **Domains** → click `theorientgates.com` → **DNS Records**
4. Click **Add Record** for each of Resend's records. Pay attention to type (TXT, CNAME, MX) and host (the part before `.theorientgates.com`)
5. Back in Resend, click **Verify DNS Records**. It may take 5–30 minutes to propagate; just wait and refresh
6. When the status flips to **Verified ✓**, the domain is ready

### Step 3: create an API key
1. In Resend → **API Keys** → **Create API Key**
2. Name it `production` and give it **Sending access** permission for `theorientgates.com`
3. Copy the `re_...` key — you only see it once

### Step 4: add to Vercel
Run in your project terminal:

```sh
echo "re_PASTE_KEY_HERE" | vercel env add RESEND_API_KEY production
echo "re_PASTE_KEY_HERE" | vercel env add RESEND_API_KEY preview
echo "re_PASTE_KEY_HERE" | vercel env add RESEND_API_KEY development
```

Optionally, set the From address (defaults to `no-reply@theorientgates.com`):

```sh
echo "inquiries@theorientgates.com" | vercel env add RESEND_FROM_ADDRESS production
```

### Step 5: redeploy
```sh
vercel --prod
```

### Test
Submit the contact form at https://theorientgates.com/contact. Within seconds
you should receive a styled email at `info@theorientgates.com`, with reply-to
set to the inquirer — hitting Reply talks directly to them.

---

## 2. Stripe — accept card payments for purchasable pieces

Most of your pieces are by inquiry; a few are marked `purchasable` and have a
price. For those, online card payment is a much better experience than email
back-and-forth. The code is already wired — you just need keys.

### Step 1: create the account
1. https://dashboard.stripe.com/register
2. Sign up with your business email; verify your identity (Stripe will ask
   for tax ID, bank account, business address)

### Step 2: take the test keys first
In **Stripe Dashboard** (top-right toggle: **Test mode** ON):

1. **Developers** → **API keys**
2. Copy the **Publishable key** (`pk_test_...`)
3. Reveal and copy the **Secret key** (`sk_test_...`)

### Step 3: add the test keys to Vercel
```sh
echo "pk_test_PASTE_HERE" | vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
echo "pk_test_PASTE_HERE" | vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY preview
echo "pk_test_PASTE_HERE" | vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY development

echo "sk_test_PASTE_HERE" | vercel env add STRIPE_SECRET_KEY production
echo "sk_test_PASTE_HERE" | vercel env add STRIPE_SECRET_KEY preview
echo "sk_test_PASTE_HERE" | vercel env add STRIPE_SECRET_KEY development
```

### Step 4: set up the webhook
1. **Stripe Dashboard** → **Developers** → **Webhooks** → **Add endpoint**
2. URL: `https://theorientgates.com/api/webhooks/stripe`
3. Listen for these events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
   - `checkout.session.expired`
4. After creating, click **Reveal signing secret** — copy the `whsec_...`

```sh
echo "whsec_PASTE_HERE" | vercel env add STRIPE_WEBHOOK_SECRET production
echo "whsec_PASTE_HERE" | vercel env add STRIPE_WEBHOOK_SECRET preview
echo "whsec_PASTE_HERE" | vercel env add STRIPE_WEBHOOK_SECRET development
```

### Step 5: redeploy + test
```sh
vercel --prod
```

Add a purchasable piece (one with `type=purchasable`, `availability=available`,
and a numeric `price`) to your cart and go through checkout. Use Stripe's test
card: `4242 4242 4242 4242`, any future expiry, any CVC, any postcode.

Verify in Supabase that the row in `public.orders` flips from `pending` to
`paid` after the webhook fires.

### Step 6: go live
When you're ready, in the Stripe dashboard toggle **Test mode** OFF and repeat
Step 2 → Step 4 with `pk_live_...` and `sk_live_...` (overwrite the same env
vars). Create a separate live-mode webhook endpoint and use that webhook
signing secret.

---

## 3. Photos still needed — Gemini prompts

Save each generated image to `~/Downloads` and tell me when ready; I'll
optimize and slot them in.

### The founder (today's generation — Aziz)
> A composed portrait of a refined Levantine man in his 30s–40s, dark hair,
> trimmed beard, wearing an open-collar white linen shirt and dark blazer.
> Standing three-quarters towards the camera in an old Damascene courtyard
> with carved stone arches, mother-of-pearl-inlaid console table beside him.
> Warm late-afternoon light, deep shadow. Cinematic, editorial fashion
> photography aesthetic. Sharp, real, no plastic skin. 4:5 portrait.

**Target file:** `public/images/founder-portrait.jpg`

### The grandfather and father (archival)
> A formal sepia-toned 1950s studio portrait of a Damascene gentleman in
> his 50s, three-piece suit, narrow tie, a small lapel pin. Backdrop is
> hand-painted neutral. Slight texture and grain consistent with mid-20th
> century studio photography. 4:5 portrait.

**Target file:** `public/images/grandfather-tawfik.jpg`

> A 1980s color photograph (slightly faded chemistry, warm tone) of a man
> in his 40s in a tailored brown suit, standing beside an antique cabinet
> in a gallery. Slight grain. 4:5 portrait.

**Target file:** `public/images/father-fawaz.jpg`

### Showroom interiors (one per city)
> A wide interior shot of a private antique gallery — high ceiling, deep
> midnight-blue panelled walls with gilded mouldings, dark herringbone
> parquet floor, soft directional lighting from bespoke wall sconces. A
> single museum-quality mother-of-pearl-inlaid console table is staged on
> the left with a round MOP mirror above it. Two antique velvet chairs
> face it. Empty, calm, no people. 16:9 landscape.

**Target file:** `public/images/showroom-damascus.jpg` (and `-beirut.jpg`,
`-rome.jpg`, `-brooklyn.jpg` — vary the architectural details for each: Damascene
arches and a fountain in the background for Damascus, Lebanese Levantine
stone arches for Beirut, Roman frescoed walls for Rome, exposed brick and a
tall window with the Manhattan skyline for Brooklyn)

### Certificate of authenticity sample (for the trust section)
> An overhead flat-lay photograph of a printed certificate of authenticity
> on heavy cream cotton paper, with elegant gold serif typography reading
> "Certificate of Authenticity — The Orient Gates" and a Damascene
> geometric hexagonal seal at the bottom. The certificate rests on a deep
> walnut surface beside a brass magnifying glass and a small piece of
> mother-of-pearl. Warm light. 4:3 landscape.

**Target file:** `public/images/certificate-sample.jpg`

### Workshop wide shot (for craftsmanship page)
> A wide environmental shot of a small Damascene craftsman's workshop —
> wooden workbenches under a single warm pendant lamp, walls covered in
> hand tools and shells in sorted trays, partially finished mother-of-pearl
> inlaid panels leaning against the wall. Dust motes in the light. No
> people. 3:2 landscape.

**Target file:** `public/images/workshop-wide.jpg`

---

## What's already done

- ✅ `info@theorientgates.com` is wired into Footer + Contact + Legal pages
- ✅ Four WhatsApp numbers (NYC / Beirut / Rome / Damascus) are clickable links
- ✅ Privacy, Terms, and Legal Notice pages exist with real content
- ✅ Favicon set, OG image, link-preview metadata
- ✅ Contact form saves to Supabase even without email
- ✅ `/admin/inquiries` inbox so you can see every submission
- ✅ Stripe code is fully scaffolded — adding the env vars in Step 3 turns
      it on. Removing them turns it back off.
