#!/usr/bin/env bash

# ==============================================================================
#  Maheen Fatima — Personal Portfolio Website
#  Single One-Click Launcher for macOS
# ==============================================================================

# Ensure script runs from the portfolio root directory
cd "$(dirname "$0")" || exit 1

# Configure PATH to detect Node.js across all common macOS installation paths
export PATH="/usr/local/bin:/opt/homebrew/bin:/tmp/node/bin:$HOME/.nvm/versions/node/$(ls "$HOME/.nvm/versions/node" 2>/dev/null | tail -n 1)/bin:$HOME/.volta/bin:$HOME/.asdf/shims:$PATH"

echo "=========================================================="
echo "  🚀 Starting Maheen Fatima's Portfolio Website"
echo "=========================================================="

# Check for Node.js installation
if ! command -v node >/dev/null 2>&1; then
  echo "❌ Error: Node.js is not found in your PATH."
  echo "   Please install Node.js (https://nodejs.org) to run this portfolio."
  echo "   Press any key to exit..."
  read -n 1
  exit 1
fi

echo "✔ Node.js: $(node -v)"
echo "✔ npm:     $(npm -v)"
echo ""

# Free up port 3000 if already occupied by an old session
EXISTING_PID=$(lsof -ti :3000 2>/dev/null)
if [ -n "$EXISTING_PID" ]; then
  echo "ℹ Port 3000 is occupied. Stopping previous instance (PID: $EXISTING_PID)..."
  kill -9 $EXISTING_PID 2>/dev/null
  sleep 1
fi

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
  echo "📦 Installing project dependencies..."
  npm install || { echo "❌ npm install failed"; exit 1; }
fi

# Build project if .next build directory is missing
if [ ! -d ".next" ]; then
  echo "⚙️ Creating production build..."
  npm run build || { echo "❌ Build failed"; exit 1; }
fi

# Auto-open browser when the server becomes ready
open_browser() {
  for i in {1..40}; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200\|304\|308"; then
      echo "✔ Server is live! Opening browser..."
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

# Launch browser-opening daemon in background
open_browser &

echo ""
echo "🌐 Website running at: http://localhost:3000"
echo "   Press Ctrl + C in this terminal window to stop the server."
echo "=========================================================="
echo ""

# Launch production server
npm start
