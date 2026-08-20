import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://growmify.com';
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

const staticRoutes = [
  '',
  '/about',
  '/careers',
  '/privacy',
  '/terms',
  '/showcase',
  '/contact',
  '/blogs',
];

async function generate() {
  console.log('Generating sitemap.xml...');
  let blogUrls = [];

  try {
    const response = await fetch(`${API_URL}/blogs`);
    if (response.ok) {
      const blogs = await response.json();
      blogUrls = blogs.map(blog => `/blog/${blog.id || blog._id}`);
      console.log(`Successfully fetched ${blogUrls.length} blogs for sitemap.`);
    } else {
      console.warn(`API returned status ${response.status}, skipping dynamic blogs.`);
    }
  } catch (error) {
    console.warn('Could not fetch dynamic blogs (backend may be offline). Sitemap will fall back to static pages only. Details: ', error.message);
  }

  const allRoutes = [...staticRoutes, ...blogUrls];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => {
    return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' || route === '/blogs' ? 'daily' : 'monthly'}</changefreq>
    <priority>${route === '' ? '1.0' : route === '/blogs' || route === '/showcase' ? '0.8' : '0.5'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  const __dirname = path.resolve();
  
  // Write to public/ directory (for development & source control)
  const publicPath = path.join(__dirname, 'public/sitemap.xml');
  fs.writeFileSync(publicPath, sitemapXml);
  console.log(`Sitemap written successfully to: ${publicPath}`);

  // Write to dist/ directory if it exists (for immediate production deployment)
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distPath, sitemapXml);
    console.log(`Sitemap copied successfully to: ${distPath}`);
  }
}

generate();
