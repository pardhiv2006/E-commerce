#!/bin/bash
echo "🛠️ Starting Backend Build Script..."
echo "Current Directory: $(pwd)"

# Navigate to server directory
if [ -d "server" ]; then
  echo "📂 'server' directory found. Entering..."
  cd server
  echo "New Directory: $(pwd)"
else
  echo "❌ Error: 'server' directory NOT found!"
  ls -F
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Build Complete."
