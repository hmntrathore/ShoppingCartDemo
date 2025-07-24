# TravelPort Shopping Web Application

A modern, responsive shopping web application built with React, TypeScript, and Google Authentication.

## 🚀 Features

- **Real Google Authentication**: Secure login with Google OAuth 2.0
- **Product Catalog**: Browse a curated selection of products with images, descriptions, and ratings
- **Shopping Cart**: Add, remove, and manage items with persistent cart state
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Cart count and user state updates in real-time
- **TypeScript**: Full type safety and better developer experience

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Routing**: React Router DOM

## 📦 Installation

1. **Clone the repository** (or use this existing project)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Google OAuth** (see [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for detailed instructions):
   - Create a Google Cloud project
   - Configure OAuth consent screen
   - Create OAuth 2.0 credentials
   - Update `.env` file with your Client ID

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header with auth
│   ├── ProductCard.tsx # Product display card
│   └── GoogleSignInButton.tsx # Google OAuth button
├── contexts/           # React context providers
│   ├── AuthContext.tsx # Authentication state
│   └── CartContext.tsx # Shopping cart state
├── services/           # External service integrations
│   └── googleAuth.ts   # Google OAuth service
├── config/             # Configuration files
│   └── google.ts       # Google OAuth configuration
├── data/              # Mock data and constants
│   └── products.ts    # Product catalog data
├── pages/             # Page components
│   ├── Home.tsx       # Product listing page
│   └── Cart.tsx       # Shopping cart page
├── types/             # TypeScript definitions
│   └── index.ts       # App-wide type definitions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
├── vite-env.d.ts      # Vite environment types
└── index.css          # Global styles
```

## 🎯 Key Features Explained

### Authentication
- Real Google OAuth 2.0 integration
- JWT token parsing and validation
- User session persistence via localStorage
- Secure sign-out functionality

### Shopping Cart
- Add/remove products
- Quantity management
- Real-time total calculation
- Persistent state across sessions

### Product Catalog
- Image gallery with Unsplash integration
- Star ratings display
- Stock level indicators
- Responsive grid layout

## 🚀 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

The project includes pre-configured:
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full feature set with grid layouts
- **Tablet** - Adapted layouts for touch interfaces
- **Mobile** - Optimized for small screens

## 🔒 Security Notes

- **Google OAuth Setup Required**: Follow the setup guide in `GOOGLE_OAUTH_SETUP.md`
- **Environment Variables**: Use `.env` file for sensitive configuration
- **HTTPS Required**: Use HTTPS in production for OAuth security
- **Client-Side Only**: This is a client-side implementation (consider server-side for production)

## 🎨 UI/UX Features

- **Modern Design** - Clean, minimalist interface
- **Smooth Animations** - CSS transitions and hover effects
- **Intuitive Navigation** - Clear user flow and feedback
- **Accessibility** - Semantic HTML and ARIA labels

## 🚀 Deployment

To deploy this application:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider of choice:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for demonstration purposes. Feel free to use as a starting point for your own projects.
