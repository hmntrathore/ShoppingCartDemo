// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  // Get your Client ID from: https://console.developers.google.com/
  CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  
  // Redirect URI (for development)
  REDIRECT_URI: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
  
  // OAuth Scopes
  SCOPES: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]
};

// Check if Google OAuth is properly configured
export const isGoogleOAuthConfigured = (): boolean => {
  return GOOGLE_CONFIG.CLIENT_ID !== '' && 
         GOOGLE_CONFIG.CLIENT_ID !== 'your-google-client-id.apps.googleusercontent.com' &&
         !GOOGLE_CONFIG.CLIENT_ID.includes('your-');
};
