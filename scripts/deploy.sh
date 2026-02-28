#!/bin/bash

echo "🚀 Nxt Leads Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the premium-leads-site directory"
    exit 1
fi

# Check for required environment variables
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local file not found"
    echo "📝 Please create .env.local with your production variables"
    echo "📖 See .env.example for required variables"
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "🔨 Building production version..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

echo "✅ Build successful!"
echo ""

echo "🌐 Deployment Options:"
echo "1. Vercel (Recommended)"
echo "2. Netlify" 
echo "3. Manual deployment"
echo ""

read -p "Choose deployment option (1-3): " -n 1 -r
echo

case $REPLY in
    1)
        echo "📦 Deploying to Vercel..."
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "📦 Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        # Deploy to Vercel
        vercel --prod
        
        echo "🎉 Deployment complete!"
        echo "🔗 Your site is live! Check the URL above."
        ;;
    2)
        echo "📦 Deploying to Netlify..."
        
        # Check if Netlify CLI is installed
        if ! command -v netlify &> /dev/null; then
            echo "📦 Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        # Deploy to Netlify
        netlify deploy --prod --dir=.next
        
        echo "🎉 Deployment complete!"
        ;;
    3)
        echo "📁 Manual deployment instructions:"
        echo ""
        echo "1. Upload the .next folder to your web server"
        echo "2. Set up Node.js environment"
        echo "3. Run: npm start"
        echo "4. Configure reverse proxy (nginx/apache)"
        echo ""
        echo "📖 See deploy.md for detailed instructions"
        ;;
    *)
        echo "❌ Invalid option. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎯 Post-Deployment Checklist:"
echo "✅ Test the website is loading"
echo "✅ Test user registration"  
echo "✅ Test payment processing"
echo "✅ Verify Discord notifications"
echo "✅ Check mobile responsiveness"
echo ""
echo "💰 Ready to start selling premium leads!"
echo "🚀 Nxt Leads is LIVE!"