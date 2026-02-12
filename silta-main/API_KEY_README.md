# Google API Key Configuration

## Environment Variable

Your Google API key has been configured in the `.env` file:

```
VITE_GOOGLE_API_KEY=AIzaSyACPI5si4QrVImT91YyZSS55aqEfsu-6yw
```

## How to Use

### In Frontend Code (React/Vite)

Access the API key using Vite's environment variable system:

```typescript
// Direct access
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

// Example usage in a component
const MyComponent = () => {
  const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  
  // Use the API key for Google services
  // Example: Google Maps, Google Vision API, etc.
  
  return <div>...</div>;
};
```

### In Serverless Functions (Vercel)

For serverless functions in the `/api` directory, you'll need to:

1. **Set the environment variable in Vercel Dashboard:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add: `VITE_GOOGLE_API_KEY` = `AIzaSyACPI5si4QrVImT91YyZSS55aqEfsu-6yw`

2. **Access in serverless functions:**
   ```typescript
   // In api/your-endpoint/index.ts
   const apiKey = process.env.VITE_GOOGLE_API_KEY;
   ```

## Security Notes

⚠️ **Important:**
- The `.env` file is already in `.gitignore` and will NOT be committed to git
- For production deployment on Vercel, add the environment variable in the Vercel dashboard
- Never commit API keys to version control
- Consider restricting the API key to specific domains/IPs in Google Cloud Console

## Vercel Deployment

When deploying to Vercel, make sure to add the environment variable:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_GOOGLE_API_KEY` with value: `AIzaSyACPI5si4QrVImT91YyZSS55aqEfsu-6yw`
3. Select all environments (Production, Preview, Development)
4. Redeploy your application

