#!/bin/bash

# Build the project
npm run build

# Create env-config.js with the actual token
echo "window.ENV = { GITHUB_API_TOKEN: '$GITHUB_API_TOKEN' };" > dist/env-config.js

# Deploy to GitHub Pages
npm run deploy 