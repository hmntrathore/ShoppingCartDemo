import { GOOGLE_CONFIG, isGoogleOAuthConfigured } from '../config/google';
import { User } from '../types';

declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}

export class GoogleAuthService {
  private static instance: GoogleAuthService;
  private isInitialized = false;

  public static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  // Initialize Google Sign-In
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Check if Google OAuth is properly configured
    if (!isGoogleOAuthConfigured()) {
      console.warn('Google OAuth not configured. Using demo mode.');
      this.isInitialized = true;
      return;
    }

    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Google Auth can only be initialized in browser environment'));
        return;
      }

      // Check if Google API is already loaded
      if (window.google) {
        this.initializeGoogleSignIn();
        this.isInitialized = true;
        resolve();
        return;
      }

      // Load Google API script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        this.initializeGoogleSignIn();
        this.isInitialized = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google API'));
      };

      document.head.appendChild(script);
    });
  }

  private initializeGoogleSignIn(): void {
    if (!window.google) {
      throw new Error('Google API not loaded');
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CONFIG.CLIENT_ID,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true
    });
  }

  // Handle credential response from Google
  private handleCredentialResponse(response: any): void {
    try {
      // Decode the JWT token
      const userInfo = this.parseJwt(response.credential);
      
      const user: User = {
        id: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture
      };

      // Dispatch custom event with user data
      window.dispatchEvent(new CustomEvent('googleSignIn', { detail: user }));
    } catch (error) {
      console.error('Error handling Google credential response:', error);
      window.dispatchEvent(new CustomEvent('googleSignInError', { detail: error }));
    }
  }

  // Parse JWT token
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid JWT token');
    }
  }

  // Trigger Google Sign-In
  public signIn(): void {
    // Check if OAuth is configured
    if (!isGoogleOAuthConfigured()) {
      console.warn('Google OAuth not configured. Please set up your Client ID.');
      // Trigger demo sign-in for development
      this.triggerDemoSignIn();
      return;
    }

    if (!this.isInitialized || !window.google) {
      console.error('Google Sign-In not initialized');
      return;
    }

    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Fallback to popup if prompt is not displayed
        this.signInWithPopup();
      }
    });
  }

  // Demo sign-in for development when OAuth is not configured
  private triggerDemoSignIn(): void {
    const demoUser: User = {
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@example.com',
      picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };

    // Simulate a delay like real OAuth
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('googleSignIn', { detail: demoUser }));
    }, 1000);
  }

  // Sign in with popup (fallback method)
  private signInWithPopup(): void {
    const authUrl = `https://accounts.google.com/oauth/authorize?` +
      `client_id=${GOOGLE_CONFIG.CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(GOOGLE_CONFIG.REDIRECT_URI)}&` +
      `scope=${encodeURIComponent(GOOGLE_CONFIG.SCOPES.join(' '))}&` +
      `response_type=code&` +
      `access_type=offline`;

    window.open(authUrl, 'googleSignIn', 'width=500,height=600');
  }

  // Render Google Sign-In button
  public renderSignInButton(element: HTMLElement): void {
    // Check if OAuth is configured
    if (!isGoogleOAuthConfigured()) {
      // Create a demo button for development
      element.innerHTML = `
        <button class="demo-google-btn" style="
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px solid #dadce0;
          border-radius: 4px;
          background: white;
          color: #3c4043;
          font-family: 'Google Sans', arial, sans-serif;
          font-size: 14px;
          cursor: pointer;
          transition: box-shadow 0.15s;
        " onmouseover="this.style.boxShadow='0 1px 2px 0 rgba(60,64,67,.30), 0 1px 3px 1px rgba(60,64,67,.15)'"
           onmouseout="this.style.boxShadow='none'">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google (Demo)
        </button>
      `;
      
      const button = element.querySelector('.demo-google-btn') as HTMLElement;
      if (button) {
        button.addEventListener('click', () => this.triggerDemoSignIn());
      }
      return;
    }

    if (!this.isInitialized || !window.google) {
      console.error('Google Sign-In not initialized');
      return;
    }

    window.google.accounts.id.renderButton(element, {
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular'
    });
  }

  // Sign out
  public signOut(): void {
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    // Clear any stored tokens
    localStorage.removeItem('googleAuthToken');
  }
}
