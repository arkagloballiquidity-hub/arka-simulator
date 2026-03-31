# 🚀 ARKA Alpha Fund — Investment Simulator
## Deployment Guide · Estimated time: 20 min · Cost: $0/month

---

## INCLUDED FILES

```
arka-simulator/
├── index.html            ← Full app (single file, production-ready)
├── logo.png              ← ARKA logo
├── vercel.json           ← Vercel static site config
├── SUPABASE_SCHEMA.sql   ← Run this in Supabase SQL Editor
└── DEPLOYMENT_GUIDE.md   ← This file
```

---

## STEP 1 — SUPABASE (5 min)

1. Go to https://app.supabase.com → your project (or create free one)
2. **SQL Editor** → **New Query**
3. Paste `SUPABASE_SCHEMA.sql` contents → **Run**
4. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon public` key

---

## STEP 2 — CONFIGURE index.html (2 min)

Open `index.html` and find these lines near the top of the `<script>` block:

```js
const SB_URL = 'YOUR_SUPABASE_URL';
const SB_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Replace with your Supabase values:
```js
const SB_URL = 'https://xxxxxxxxxxxx.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI...';
```

> ⚠️ Without Supabase the simulator still works — PDF downloads fine, leads just won't be saved.

---

## STEP 3 — GITHUB (5 min)

```bash
cd path/to/arka-simulator
git init
git add .
git commit -m "feat: ARKA Alpha Fund Investment Simulator v1.0"
git branch -M main
git remote add origin https://github.com/YOUR_USER/arka-simulator.git
git push -u origin main
```

---

## STEP 4 — VERCEL (3 min)

1. Go to https://vercel.com/new
2. **Import Git Repository** → select `arka-simulator`
3. Framework Preset: **Other** (Static)
4. Click **Deploy**
5. Vercel gives you a URL like `arka-simulator-xxxx.vercel.app`

---

## STEP 5 — CUSTOM DOMAIN (5 min)

1. Vercel Dashboard → your project → **Settings → Domains**
2. Add: `portfolio.arkaglobalinvestments.com`
3. In your DNS (GoDaddy / Cloudflare / Namecheap):
   ```
   Type:  CNAME
   Name:  portfolio
   Value: cname.vercel-dns.com
   TTL:   Auto
   ```
4. Wait 5–30 min for DNS propagation

---

## STEP 6 — VERIFY LEADS IN SUPABASE

After someone fills the form and downloads their PDF:
1. Supabase → **Table Editor** → `leads` table
2. You'll see: name, email, whatsapp, strategy, capital, years, monthly

---

## FEATURES SUMMARY

| Feature | Status |
|---------|--------|
| Bilingual ES / EN | ✅ Toggle in navbar |
| 3 ARKA Strategies (18%, 24%, 36%) | ✅ |
| Multi-page PDF (auto page breaks) | ✅ |
| PDF in selected language | ✅ |
| Lead capture → Supabase | ✅ |
| Compound interest + inflation | ✅ |
| ARKA vs S&P 500 vs CETES vs Bank | ✅ |
| Year-by-year table (all years) | ✅ |
| Onboarding & custody in PDF | ✅ |
| Responsive (mobile/tablet/desktop) | ✅ |
| Logo fallback (SVG inline) | ✅ |

---

## POST-DEPLOY CHECKLIST

- [ ] SUPABASE_SCHEMA.sql executed
- [ ] SB_URL and SB_KEY configured in index.html
- [ ] GitHub repo created and pushed
- [ ] Vercel deployment successful
- [ ] Custom domain CNAME configured
- [ ] Test simulation end-to-end
- [ ] Test PDF download (ES and EN)
- [ ] Verify lead appears in Supabase table
- [ ] Test on mobile

---

## SUPPORT

Issues? Open DevTools (F12) → Console tab → look for red errors.
Most common: wrong Supabase URL or key → double-check Step 2.
