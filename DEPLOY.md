# Deploy to Vercel

## Quick Deploy

### Option 1: Vercel Dashboard (Recommended)

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add Vercel landing page"
   git push origin main
   ```

2. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "Add New Project"
   - Import the repository: `draphael123/Time-clock`
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Your site will be live in minutes!**

### Option 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts** to link your project

### Option 3: GitHub Integration

1. Connect your GitHub account to Vercel
2. Vercel will automatically deploy on every push to main
3. Get preview deployments for pull requests

## Environment Variables

No environment variables needed for this project!

## Custom Domain

After deployment, you can add a custom domain in the Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain

## Build Settings

Vercel will automatically detect:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `out` (static export)
- **Install Command**: `npm install`

## Troubleshooting

If you encounter issues:

1. **Check Node version**: Vercel uses Node 18.x by default
2. **Check build logs**: View detailed logs in Vercel dashboard
3. **Local build test**: Run `npm run build` locally first

## Post-Deployment

After deployment, update the download link in `app/page.tsx` if needed to point to:
- GitHub releases (if you create releases)
- Direct GitHub zip download (current)
- Or your preferred hosting location

