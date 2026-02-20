# Deploying Virya Design System

This is a Next.js 16 app with Supabase (auth, database, storage). The recommended way to deploy is **Vercel**.

---

## Deploy on push (GitHub → Vercel)

Every push to `main` can trigger a deploy using the included **GitHub Action** (`.github/workflows/deploy-vercel.yml`).

### One-time setup

1. **Create the project on Vercel**
   - Go to [vercel.com](https://vercel.com) → **Add New… → Project**.
   - Import your GitHub repo **acodemy-mm/dsviryadocument**.
   - Set **Root Directory** to `.` (repo root is already the app).
   - Add env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and optionally `SUPABASE_SERVICE_ROLE_KEY`.
   - Deploy once (so the project exists).

2. **Get Vercel IDs and token**
   - **Token:** [vercel.com/account/tokens](https://vercel.com/account/tokens) → Create Token (e.g. “GitHub Deploy”) → copy it.
   - **Org & Project ID:** In terminal (from your repo):
     ```bash
     cd design-system
     npx vercel link
     ```
     Choose your scope and the project you just created. Then open `.vercel/project.json` — it contains `orgId` and `projectId`. Copy those (then you can add `.vercel` to `.gitignore` if you like; it’s already ignored).

3. **Add GitHub Secrets**
   - Repo **acodemy-mm/dsviryadocument** → **Settings → Secrets and variables → Actions**.
   - **New repository secret** for each:
     - `VERCEL_TOKEN` = the token from step 2
     - `VERCEL_ORG_ID` = `orgId` from `.vercel/project.json`
     - `VERCEL_PROJECT_ID` = `projectId` from `.vercel/project.json`

4. **Push to main**
   - Any push to `main` will run the workflow and deploy to Vercel production.

---

## Option 1: Vercel (recommended)

1. **Push your code to GitHub** (if you haven’t already):
   ```bash
   cd design-system
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** → Sign in (e.g. with GitHub).

3. **Import the project**  
   “Add New…” → “Project” → import the GitHub repo.  
   Set **Root Directory** to `design-system` if the repo root is the parent folder.

4. **Set environment variables** (Vercel project → Settings → Environment Variables):

   | Name | Value | Notes |
   |------|--------|--------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | e.g. `https://xxxx.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | From Supabase Dashboard → Settings → API |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key | Optional; needed for admin setup / server-side admin actions. Keep secret. |

   Add them for **Production**, and optionally for Preview.

5. **Deploy**  
   Click “Deploy”. Vercel will run `npm run build` and then serve the app.

6. **After first deploy**  
   - Your site will be at `https://your-project.vercel.app`.
   - If you use Supabase Auth, add this URL in **Supabase Dashboard → Authentication → URL Configuration → Site URL** (and Redirect URLs if you use redirects).

---

## Option 2: Other platforms (Node server)

The app uses standard Next.js:

- **Build:** `npm run build`
- **Run:** `npm run start`

So you can deploy to any host that supports Node (e.g. **Railway**, **Render**, **Fly.io**, or a VPS):

1. Set **root directory** to the `design-system` folder (if the repo root is the parent).
2. Use **Build command:** `npm install && npm run build`  
   **Start command:** `npm run start`
3. Add the same **environment variables** as in the table above (in the host’s dashboard).

---

## Checklist before going live

- [ ] Supabase: **Database** – run `supabase-schema.sql` (and `supabase-add-image-urls.sql` if the table already existed).
- [ ] Supabase: **Storage** – `thumbnails` bucket exists (created by the schema); policies allow public read and authenticated upload/delete.
- [ ] Supabase: **Auth** – at least one user for admin; Site URL (and redirect URLs) set to your deployed URL.
- [ ] Env vars set on the hosting platform (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and optionally `SUPABASE_SERVICE_ROLE_KEY`).

---

## Custom domain (Vercel)

1. Vercel project → **Settings → Domains**.
2. Add your domain and follow the DNS instructions (CNAME or A record).
3. HTTPS is provided by Vercel once DNS is correct.
