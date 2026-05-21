// scripts/sync-devto.js
// Fetches published articles from Dev.to and writes them to src/content/blog/
// Run: node scripts/sync-devto.js
// Requires Node 18+ (uses built-in fetch)

import { writeFileSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');

// ─── Config ───────────────────────────────────────────────
const DEVTO_USERNAME = process.env.DEVTO_USERNAME || 'YOUR_DEVTO_USERNAME';
const DEVTO_API_KEY  = process.env.DEVTO_API_KEY  || '';   // optional; only needed for drafts
// ──────────────────────────────────────────────────────────

async function fetchArticles() {
  const headers = { 'User-Agent': 'portfolio-sync/1.0' };
  if (DEVTO_API_KEY) headers['api-key'] = DEVTO_API_KEY;

  const res = await fetch(
    `https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=1000`,
    { headers }
  );

  if (!res.ok) throw new Error(`Dev.to API error: ${res.status} ${res.statusText}`);
  return res.json();
}

async function fetchArticleBody(id) {
  const res = await fetch(`https://dev.to/api/articles/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch article ${id}: ${res.status}`);
  const data = await res.json();
  return data.body_markdown ?? '';
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function toISODate(dateStr) {
  return new Date(dateStr).toISOString().split('T')[0];
}

function yamlStr(str) {
  // Wrap in quotes if it contains special YAML chars
  if (/[:#\[\]{}&*!|>'"%@`,]/.test(str) || str.includes('\n')) {
    return `"${str.replace(/"/g, '\\"')}"`;
  }
  return str;
}

function buildFrontmatter(article) {
  const lines = [
    '---',
    `title: ${yamlStr(article.title)}`,
    `summary: ${yamlStr(article.description || article.title)}`,
    `date: ${toISODate(article.published_at)}`,
  ];

  if (article.edited_at && article.edited_at !== article.published_at) {
    lines.push(`updated: ${toISODate(article.edited_at)}`);
  }

  if (article.tag_list?.length) {
    lines.push(`tags: [${article.tag_list.map(t => t.toLowerCase().replace(/\s+/g, '-')).join(', ')}]`);
  }

  lines.push(`devto_url: ${article.url}`);
  lines.push(`draft: false`);
  lines.push('---');

  return lines.join('\n');
}

function cleanBody(markdown) {
  // Dev.to liquid tags that won't render in MDX — convert or strip
  return markdown
    // {% youtube ID %} → plain link
    .replace(/\{%\s*youtube\s+(\S+)\s*%\}/g, 'https://www.youtube.com/watch?v=$1')
    // {% embed URL %} → plain link
    .replace(/\{%\s*embed\s+(\S+)\s*%\}/g, '$1')
    // {% link URL %} → plain link
    .replace(/\{%\s*link\s+(\S+)\s*%\}/g, '$1')
    // {% gist ID %} → note
    .replace(/\{%\s*gist\s+(\S+)\s*%\}/g, '_[Gist: $1]_')
    // strip remaining liquid tags
    .replace(/\{%[^%]*%\}/g, '')
    .trim();
}

function writePost(slug, frontmatter, body) {
  mkdirSync(BLOG_DIR, { recursive: true });
  const filePath = join(BLOG_DIR, `${slug}.mdx`);
  const content = `${frontmatter}\n\n${body}\n`;
  writeFileSync(filePath, content, 'utf-8');
  return filePath;
}

function existingPostContent(slug) {
  const filePath = join(BLOG_DIR, `${slug}.mdx`);
  try { return readFileSync(filePath, 'utf-8'); }
  catch { return null; }
}

async function main() {
  if (DEVTO_USERNAME === 'YOUR_DEVTO_USERNAME') {
    console.error('ERROR: Set DEVTO_USERNAME environment variable or update the constant in this file.');
    process.exit(1);
  }

  console.log(`Fetching articles for @${DEVTO_USERNAME}...`);
  const articles = await fetchArticles();
  console.log(`Found ${articles.length} published article(s).`);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const article of articles) {
    const slug = article.slug || slugify(article.title);
    const body = await fetchArticleBody(article.id);
    const frontmatter = buildFrontmatter(article);
    const cleaned = cleanBody(body);
    const newContent = `${frontmatter}\n\n${cleaned}\n`;

    const existing = existingPostContent(slug);

    if (existing === newContent) {
      skipped++;
      continue;
    }

    writePost(slug, frontmatter, cleaned);
    if (existing === null) {
      console.log(`  + created: ${slug}`);
      created++;
    } else {
      console.log(`  ~ updated: ${slug}`);
      updated++;
    }

    // Small delay to be polite to the API
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nDone. Created: ${created}, Updated: ${updated}, Unchanged: ${skipped}`);

  if (created === 0 && updated === 0) {
    // Signal to the workflow that nothing changed
    process.exit(0);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});