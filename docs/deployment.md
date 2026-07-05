# OwlREADME Production Deployment Guide

This guide details how to deploy OwlREADME to production, configure environment variables, setup search engine optimization (SEO), integrate web analytics, and configure error monitoring systems.

---

## ⚡ Deployment Options

### 1. Deploying to Vercel (Recommended)

OwlREADME is optimized to run on Vercel out of the box. The repository includes a [vercel.json](file:///Users/sunilkumarkv/Desktop/Projects/owlreadme/vercel.json) configuration that sets production security headers and caching headers.

#### Steps:
1. Push your code repository to GitHub.
2. Go to the [Vercel Dashboard](https://vercel.com) and click **Add New > Project**.
3. Import the `owlreadme` repository.
4. Expand **Environment Variables** and fill in the values (see the environment variables section below).
5. Click **Deploy**. Vercel will automatically build the Next.js App Router workspace and deploy it globally.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSunilKumarKV%2Fowlreadme)

---

### 2. Self-Hosting (Node.js & PM2)

To self-host the application on a Linux VM (AWS EC2, DigitalOcean Droplet, etc.):

#### Prerequisites:
- Node.js (v18+)
- pnpm (recommended)
- PM2 (process manager)

#### Steps:
1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/SunilKumarKV/owlreadme.git
   cd owlreadme
   pnpm install
   ```

2. Create a `.env.local` file with the production variables:
   ```env
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. Build the production application bundle:
   ```bash
   pnpm run build
   ```

4. Start the server using PM2 to keep it running in the background:
   ```bash
   pm2 start npm --name "owlreadme" -- run start
   ```

5. Configure a reverse proxy like Nginx to forward port `3000` to port `80/443` with SSL configured (e.g., via Let's Encrypt Certbot).

---

## ⚙️ Environment Variables Reference

| Variable Name | Required | Description | Example Value |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | **Yes** | Base URL of your deployed app (no trailing slash). Used for sitemaps and share links. | `https://owlreadme.com` |
| `GEMINI_API_KEY` | No | Server-side key for the Owl AI Assistant. Runs through secure route proxies to prevent client leaking. | `AIzaSyD...` |
| `NEXT_PUBLIC_ANALYTICS_ID` | No | Google Analytics (GA4) Measurement ID. If provided, mounts tracking code automatically. | `G-XXXXXXXX` |
| `NEXT_PUBLIC_SENTRY_DSN` | No | DSN key to configure Sentry or equivalent error tracking clients in production. | `https://sentry.io/...` |

---

## 🔍 SEO & Crawl Configurations

- **Sitemap**: A dynamic sitemap route is available at `/sitemap.xml`. It automatically maps primary routes (`/`, `/dashboard`, `/theme`, etc.) using the base `NEXT_PUBLIC_APP_URL` variable.
- **Robots.txt**: Set up at `/robots.txt` to block search crawler access to raw API routes `/api/*` and internal Next.js assets while index-crawling all user-facing paths.

---

## 📊 Telemetry & Analytics

Telemetry events are managed via [Analytics.tsx](file:///Users/sunilkumarkv/Desktop/Projects/owlreadme/src/components/Analytics.tsx). 
- To enable Google Analytics, simply add your measurement ID as `NEXT_PUBLIC_ANALYTICS_ID` in your host environment.
- The app tracks:
  - Page views (on route changes).
  - Telemetry logs (crashes, errors, API issues).

---

## 🛠️ Error Monitoring & Logging

Global error screens [error.tsx](file:///Users/sunilkumarkv/Desktop/Projects/owlreadme/src/app/error.tsx) and [global-error.tsx](file:///Users/sunilkumarkv/Desktop/Projects/owlreadme/src/app/global-error.tsx) catch unhandled crashes gracefully and log them.
- In production, these telemetry errors trigger tracking events to help you trace and fix UI bugs immediately.
- Integrate with professional telemetry providers (like Sentry or LogRocket) by configuring their setup scripts inside your deployment pipeline or direct import hooks.
