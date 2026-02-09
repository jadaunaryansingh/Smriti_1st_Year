# Deploy to Render

This application is configured for easy deployment on Render.com.

## Quick Deploy

### Option 1: Using Blueprint (Recommended)

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **"New +"** → **"Blueprint"**
4. Connect your GitHub repository
5. Render will automatically detect `render.yaml` and set up the service
6. Add your environment variables:
   - `GEMINI_API_KEY`: Your Google AI Studio API key (get it from https://makersuite.google.com/app/apikey)
7. Click **"Apply"** and wait for deployment

### Option 2: Manual Setup

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Name**: `mega-platform` (or your preferred name)
   - **Region**: Oregon (US West) or choose closest to you
   - **Branch**: `main`
   - **Runtime**: Node
   - **Build Command**: `pnpm install && pnpm run build`
   - **Start Command**: `pnpm start`
6. Add Environment Variables:
   - `GEMINI_API_KEY`: Your Google AI Studio API key
   - `NODE_VERSION`: `20.11.1`
   - `PING_MESSAGE`: `ping pong`
7. Click **"Create Web Service"**

## Important Notes

- **Free Plan**: The app will spin down after 15 minutes of inactivity and take ~30 seconds to restart
- **Health Check**: Configured at `/api/ping`
- **Environment Variables**: Make sure to add your `GEMINI_API_KEY` or the AI features won't work

## Post-Deployment

1. Your app will be available at: `https://your-app-name.onrender.com`
2. Test the API: `https://your-app-name.onrender.com/api/ping`
3. Test features: Riddles, Coding Challenges, Quizzes, and Competitions

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node version matches (20.11.1)
- Check build logs for specific errors

### App Works But AI Features Don't
- Verify `GEMINI_API_KEY` is set in Render environment variables
- Check it's the correct key from Google AI Studio
- Make sure the model `gemini-2.5-flash` is available for your API key

### Slow Initial Load
- This is normal on the free tier - the app "spins down" after inactivity
- Upgrade to a paid plan for always-on service

## Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Support

For deployment issues, check:
- [Render Documentation](https://render.com/docs)
- [GitHub Issues](your-repo-url/issues)
