#!/bin/bash

# Wix Environment Configuration Verification Script
# Run this to check if your .env.local is properly configured

echo "🔍 Checking Wix Configuration..."
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local not found!"
    echo "   Create it with: cp .env.wix .env.local"
    exit 1
fi

echo "✅ .env.local found"
echo ""

# Extract values
WIX_BASE=$(grep "VITE_WIX_FUNCTIONS_BASE=" .env.local | cut -d'=' -f2)
JWT_SECRET=$(grep "JWT_SECRET=" .env.local | cut -d'=' -f2)
WIX_API_KEY=$(grep "VITE_WIX_API_KEY=" .env.local | cut -d'=' -f2)
VERCEL_URL=$(grep "VITE_VERCEL_API_URL=" .env.local | cut -d'=' -f2)

echo "📋 Configuration Values:"
echo ""

# Check VITE_WIX_FUNCTIONS_BASE
if [ -z "$WIX_BASE" ] || [ "$WIX_BASE" = "https://ulysse-ruff-williams.wixsite.com/_functions" ]; then
    echo "⚠️  VITE_WIX_FUNCTIONS_BASE: NOT SET or using placeholder"
    echo "    Required format: https://your-site.wixsite.com/_functions"
    echo "    Action: Update with your actual Wix site URL"
else
    echo "✅ VITE_WIX_FUNCTIONS_BASE: Set"
    echo "    Value: $WIX_BASE"
fi

echo ""

# Check JWT_SECRET
if [ -z "$JWT_SECRET" ] || [ "$JWT_SECRET" = "your-jwt-secret-key-min-32-chars-12345678901234567890" ]; then
    echo "⚠️  JWT_SECRET: NOT SET or using placeholder"
    echo "    Required: 32+ character random string"
    echo "    Generate with: openssl rand -base64 32"
    echo "    Action: Update with generated secret"
else
    if [ ${#JWT_SECRET} -lt 32 ]; then
        echo "⚠️  JWT_SECRET: Too short (${#JWT_SECRET} chars, need 32+)"
        echo "    Generate new: openssl rand -base64 32"
    else
        echo "✅ JWT_SECRET: Set (${#JWT_SECRET} characters)"
    fi
fi

echo ""

# Check VITE_WIX_API_KEY
if [ -z "$WIX_API_KEY" ] || [ "$WIX_API_KEY" = "your-wix-api-key" ]; then
    echo "⚠️  VITE_WIX_API_KEY: NOT SET or using placeholder"
    echo "    Required if using Wix Collections API"
    echo "    Get from: https://manage.wix.com/account/custom-apps"
else
    echo "✅ VITE_WIX_API_KEY: Set"
fi

echo ""

# Check VITE_VERCEL_API_URL
if [ -z "$VERCEL_URL" ] || [ "$VERCEL_URL" = "http://localhost:5000/api" ]; then
    echo "✅ VITE_VERCEL_API_URL: Set (local development)"
    echo "    Value: $VERCEL_URL"
    echo "    Note: Update to production URL after deployment"
else
    echo "✅ VITE_VERCEL_API_URL: Set"
    echo "    Value: $VERCEL_URL"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Summary
if [ -z "$WIX_BASE" ] || [ "$WIX_BASE" = "https://ulysse-ruff-williams.wixsite.com/_functions" ] || \
   [ -z "$JWT_SECRET" ] || [ "$JWT_SECRET" = "your-jwt-secret-key-min-32-chars-12345678901234567890" ]; then
    echo "❌ Configuration INCOMPLETE"
    echo ""
    echo "📝 To fix:"
    echo "   1. Edit .env.local"
    echo "   2. Set VITE_WIX_FUNCTIONS_BASE to your Wix site URL"
    echo "   3. Set JWT_SECRET (generate: openssl rand -base64 32)"
    echo "   4. Restart dev server: npm run dev"
    echo ""
else
    echo "✅ Configuration looks GOOD!"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Restart dev server: npm run dev"
    echo "   2. Test login at: http://localhost:5173"
    echo "   3. If still failing, check Wix backend logs"
    echo ""
fi
