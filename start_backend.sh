#!/bin/bash
echo "🚀 Starting Backend Script..."
echo "Current Directory: $(pwd)"

# Check if MONGODB_URI is set
if [ -z "$MONGODB_URI" ]; then
  echo "❌ Error: MONGODB_URI is not set!"
else
  echo "✅ MONGODB_URI is set."
fi

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

# Check for server.js
if [ -f "server.js" ]; then
  echo "✅ server.js found."
else
  echo "❌ Error: server.js not found in $(pwd)"
  ls -F
  exit 1
fi

# Start the server
echo "🚀 executing: node server.js"
exec node server.js
