import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { useAuth } from '../contexts/AuthContext';
import { isGoogleOAuthConfigured } from '../config/google';

export const Home: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to TravelPort Shop</h2>
        <p className="text-gray-600 mb-8">
          {isGoogleOAuthConfigured() 
            ? 'Please sign in with Google to start shopping' 
            : 'Sign in with demo account to start shopping'
          }
        </p>
        
        {!isGoogleOAuthConfigured() && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-blue-800 mb-2">Setup Real Google Authentication</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Currently running in demo mode. To enable real Google OAuth:
                </p>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Follow the setup guide in <code className="bg-blue-100 px-1 rounded">GOOGLE_OAUTH_SETUP.md</code></li>
                  <li>Create Google Cloud OAuth credentials</li>
                  <li>Update your <code className="bg-blue-100 px-1 rounded">.env</code> file with your Client ID</li>
                  <li>Restart the development server</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-8 shadow-md max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">Featured Products Preview</h3>
          <div className="grid grid-cols-1 gap-4">
            {products.slice(0, 3).map(product => (
              <div key={product.id} className="border rounded-lg p-4 opacity-50">
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-primary-600 font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h1>
        <p className="text-gray-600">Discover our curated selection of premium products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
