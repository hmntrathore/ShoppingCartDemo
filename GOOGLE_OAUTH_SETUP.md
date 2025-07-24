# Google OAuth Setup Guide

## 🔧 Setting up Real Google Authentication

Follow these steps to enable real Google OAuth authentication in your TravelPort shopping app:

### Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (for user profile information)

### Step 2: Configure OAuth Consent Screen

1. In the Google Cloud Console, go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type (for testing with any Google account)
3. Fill in the required information:
   - **App name**: TravelPort Shopping
   - **User support email**: Your email
   - **Developer contact information**: Your email
4. Add scopes:
   - `userinfo.email`
   - `userinfo.profile`
5. Add test users (for development)

### Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Configure:
   - **Name**: TravelPort Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (for development)
     - Your production domain (when deploying)
   - **Authorized redirect URIs**: 
     - `http://localhost:3000` (for development)
     - Your production domain (when deploying)

### Step 4: Update Environment Variables

1. Copy your **Client ID** from the Google Cloud Console
2. Update the `.env` file in your project root:

```env
VITE_GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
VITE_APP_URL=http://localhost:3000
```

3. Also update the `index.html` meta tag:

```html
<meta name="google-signin-client_id" content="your-actual-client-id.apps.googleusercontent.com">
```

### Step 5: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Click "Sign in with Google" and test the authentication flow

### 🔒 Security Considerations

- **Never commit real credentials to version control**
- **Use environment variables for sensitive data**
- **Implement proper error handling**
- **Add rate limiting in production**
- **Use HTTPS in production**

### 🚀 Production Deployment

When deploying to production:

1. Update your OAuth credentials with your production domain
2. Set environment variables in your hosting platform
3. Ensure HTTPS is enabled
4. Update CORS settings if needed

### 🛠️ Troubleshooting

**Common Issues:**

1. **"Invalid Client ID"**: Verify your Client ID is correct
2. **"Redirect URI mismatch"**: Ensure your redirect URIs match exactly
3. **"Access blocked"**: Add your domain to authorized origins
4. **CORS errors**: Check your JavaScript origins configuration

### 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In JavaScript Guide](https://developers.google.com/identity/sign-in/web)
- [Google Cloud Console](https://console.cloud.google.com/)

---

## 🎯 Current Implementation Features

✅ **Real Google OAuth Integration**
✅ **JWT Token Parsing**
✅ **User Profile Data Extraction**
✅ **Session Persistence**
✅ **Automatic Sign-In Button Rendering**
✅ **Error Handling**
✅ **Environment Variable Configuration**
✅ **TypeScript Support**

The implementation is production-ready once you configure your Google OAuth credentials!
