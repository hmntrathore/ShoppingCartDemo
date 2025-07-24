import React from 'react';
import { ShoppingCart, User, LogOut, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { GoogleSignInButton } from './GoogleSignInButton';
import { isGoogleOAuthConfigured } from '../config/google';

export const Header: React.FC = () => {
  const { user, signIn, signOut, loading } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700">
              TravelPort Shop
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <img 
                    src={user.picture} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                </div>
                
                <Link to="/cart" className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col items-end gap-2">
                {!isGoogleOAuthConfigured() && (
                  <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-md">
                    <AlertCircle className="w-4 h-4" />
                    Demo Mode - Configure Google OAuth for real authentication
                  </div>
                )}
                <div className="flex items-center gap-4">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                      <span className="text-sm text-gray-600">Signing in...</span>
                    </div>
                  ) : (
                    <>
                      <GoogleSignInButton className="mr-2" />
                      <button
                        onClick={signIn}
                        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        <User className="w-4 h-4" />
                        {isGoogleOAuthConfigured() ? 'Sign in with Google' : 'Demo Sign In'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
