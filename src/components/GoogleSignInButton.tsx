import React, { useEffect, useRef } from 'react';
import { GoogleAuthService } from '../services/googleAuth';

interface GoogleSignInButtonProps {
  onSignIn?: () => void;
  className?: string;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ 
  onSignIn, 
  className = "" 
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const googleAuthService = GoogleAuthService.getInstance();

  useEffect(() => {
    if (buttonRef.current) {
      // Small delay to ensure Google API is loaded
      setTimeout(() => {
        try {
          googleAuthService.renderSignInButton(buttonRef.current!);
        } catch (error) {
          console.error('Error rendering Google Sign-In button:', error);
        }
      }, 100);
    }
  }, []);

  return (
    <div className={`google-signin-container ${className}`}>
      <div ref={buttonRef} id="google-signin-button"></div>
    </div>
  );
};
