#!/usr/bin/env bash

# Set directory to project root
cd "$(dirname "$0")"

echo "=========================================================="
echo "  Maheen Fatima — Personal Portfolio Website Runner"
echo "=========================================================="

# Automatically detect or configure Node.js and npm path
export PATH="/tmp/node/bin:/opt/homebrew/bin:/usr/local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -n 1)/bin:$PATH"

# Verify Node.js availability
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js was not found in standard paths."
  echo "Please make sure Node.js is installed or run with Node available in PATH."
  exit 1
fi

echo "Using Node.js: $(node -v)"
echo "Using npm:     $(npm -v)"

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
  echo "Installing project dependencies..."
  npm install
fi

# Build project if production build is missing
if [ ! -d ".next" ]; then
  echo "Building optimized production build..."
  npm run build
fi

# Function to open browser after server responds
open_browser() {
  echo "Waiting for server to become ready on http://localhost:3000 ..."
  for i in {1..30}; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|304\|308"; then
      echo "Server is ready! Opening your default browser..."
      if command -v open >/dev/null 2>&1; then
        open "http://localhost:3000"
      elif command -v xdg-open >/dev/null 2>&1; then
        xdg-open "http://localhost:3000"
      fi
      break
    fi
    sleep 0.5
  done
}

# Launch browser opener in background
open_browser &

echo ""
echo "🚀 Starting portfolio on http://localhost:3000 ..."
echo "Press Ctrl+C to stop the server at any time."
echo "=========================================================="

# Start production server
npm start
