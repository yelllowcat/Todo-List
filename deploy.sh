#!/bin/bash

# Build the project for production
echo "Building project..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
  echo "Build failed - build directory not found"
  exit 1
fi

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Switch to gh-pages branch
echo "Switching to gh-pages branch..."
git checkout gh-pages

# Remove old files (except build, node_modules, .git)
echo "Cleaning gh-pages branch..."
find . -maxdepth 1 ! -name 'build' ! -name 'node_modules' ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} + 2>/dev/null

# Move build contents to root
echo "Moving build files to root..."
mv build/* .
rmdir build

# Add and commit
echo "Committing changes..."
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages
echo "Pushing to gh-pages..."
git push origin gh-pages

# Switch back to original branch
echo "Switching back to $CURRENT_BRANCH..."
git checkout $CURRENT_BRANCH

echo "Deployment complete! Your site should be live at https://yelllowcat.github.io/Todo-List/"
