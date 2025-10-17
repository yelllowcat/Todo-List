# Todo-List

A modern todo list application built with vanilla JavaScript and Webpack.

## Live Demos

- **GitHub Pages**: https://yelllowcat.github.io/Todo-List/
- **Netlify**: (Deploy to get your URL)

## Deployment

### Deploy to Netlify

#### Option 1: Using Netlify CLI (Recommended)

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod
   ```

3. Follow the prompts:
   - Authorize with Netlify
   - Create a new site or link to existing
   - Publish directory: `build`

#### Option 2: Using Netlify Web UI

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Click "Deploy site"

#### Option 3: Drag and Drop

1. Build the project:
   ```bash
   npm run build
   ```
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `build` folder

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```
