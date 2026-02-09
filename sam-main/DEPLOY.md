# Deploy to Vercel

This application is configured for easy deployment on Vercel.

## Quick Deploy

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Navigate to your project and deploy:
```bash
cd sam-main
vercel
```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? (your account)
   - Link to existing project? **N**
   - Project name? (press enter for default or type your name)
   - Directory? `./` (press enter)
   - Override settings? **N**

4. Add environment variable:
```bash
vercel env add GEMINI_API_KEY
```
Paste your Google AI Studio API key when prompted.

5. Deploy to production:
```bash
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repository: `jadaunaryansingh/Smriti_1st_Year`
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `sam-main`
   - **Build Command**: `pnpm run build:client`
   - **Output Directory**: `dist/spa`
   - **Install Command**: `pnpm install`
6. Add Environment Variables:
   - `GEMINI_API_KEY`: Your Google AI Studio API key
   - `NODE_VERSION`: `20`
7. Click **"Deploy"**

## Important Notes

- **Serverless Functions**: API routes run as serverless functions on Vercel
- **Free Plan**: Includes 100GB bandwidth and unlimited requests
- **Auto-deploys**: Connected to GitHub - every push to main deploys automatically
- **Environment Variables**: Add your `GEMINI_API_KEY` in Vercel dashboard or via CLI

## Post-Deployment

1. Your app will be available at: `https://your-project.vercel.app`
2. Test the API: `https://your-project.vercel.app/api/ping`
3. Test features: Riddles, Coding Challenges, Quizzes, and Competitions

## Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify the root directory is set to `sam-main`
- Check build logs in Vercel dashboard

### App Works But AI Features Don't
- Verify `GEMINI_API_KEY` is set in Vercel environment variables
- Redeploy after adding environment variables
- Check Function logs in Vercel dashboard
- Make sure the model `gemini-2.5-flash` is available for your API key

### API Routes Return 404
- Check `vercel.json` routing configuration
- Verify `api/index.js` exists and is properly configured
- Check Function logs for errors

## Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Test production build locally
vercel dev
```

## Environment Variables Required

- `GEMINI_API_KEY` - Get from https://makersuite.google.com/app/apikey
- `NODE_VERSION` - Set to `20` (optional, defaults to 20)

## Vercel Configuration

The project includes `vercel.json` which configures:
- API routes routing to serverless functions
- SPA routing for client-side navigation
- Build and output directories

## Support

For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [GitHub Issues](https://github.com/jadaunaryansingh/Smriti_1st_Year/issues)

