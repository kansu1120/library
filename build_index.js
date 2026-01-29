const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const removeMd = require("remove-markdown");

// Configuration
const CONTENT_DIRS = ["all", "library"];
const OUTPUT_FILE = "library/search_index.json";
const MAX_CONTENT_CHARS = 4000;
const EXCLUDED_DIRS = ["node_modules", ".git", ".github", "_layouts"];

/**
 * Recursively find all markdown files in the given directory
 */
function findMarkdownFiles(dir, baseDir = dir) {
  let results = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Skip excluded directories and files starting with '_'
      if (entry.name.startsWith("_") || EXCLUDED_DIRS.includes(entry.name)) {
        continue;
      }
      
      if (entry.isDirectory()) {
        results = results.concat(findMarkdownFiles(fullPath, baseDir));
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        results.push(fullPath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
  
  return results;
}

/**
 * Extract the first H1 heading from markdown content
 */
function extractFirstH1(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * Generate URL from file path
 */
function generateUrl(filePath) {
  // Get relative path from root
  let relativePath = filePath;
  
  // Normalize path separators
  relativePath = relativePath.replace(/\\/g, "/");
  
  // Remove .md extension
  relativePath = relativePath.replace(/\.md$/, "");
  
  // Handle index.md files - they should map to directory root
  if (relativePath.endsWith("/index")) {
    relativePath = relativePath.replace(/\/index$/, "/");
  } else {
    // For non-index files, just remove .md (no .html extension)
    relativePath = relativePath;
  }
  
  // Ensure URL starts with /library/
  if (!relativePath.startsWith("/")) {
    relativePath = "/" + relativePath;
  }
  
  if (!relativePath.startsWith("/library/")) {
    relativePath = "/library" + relativePath;
  }
  
  return relativePath;
}

/**
 * Normalize and resolve URL from front-matter permalink or url field
 */
function normalizePermalink(permalink) {
  if (!permalink) return null;
  
  let url = permalink.trim();
  
  // Ensure it starts with /
  if (!url.startsWith("/")) {
    url = "/" + url;
  }
  
  return url;
}

/**
 * Process a single markdown file and return index entry
 */
function processFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontMatter, content } = matter(fileContent);
    
    // Skip draft files
    if (frontMatter.draft === true) {
      return null;
    }
    
    // Determine title
    let title = frontMatter.title;
    if (!title) {
      title = extractFirstH1(content);
    }
    if (!title) {
      // Use filename as fallback
      title = path.basename(filePath, ".md");
    }
    
    // Determine URL
    let url;
    if (frontMatter.permalink) {
      url = normalizePermalink(frontMatter.permalink);
    } else if (frontMatter.url) {
      url = normalizePermalink(frontMatter.url);
    } else {
      url = generateUrl(filePath);
    }
    
    // Process content: strip markdown, normalize whitespace, truncate
    let processedContent = removeMd(content);
    processedContent = processedContent
      .replace(/\s+/g, " ")  // Normalize whitespace
      .trim()
      .substring(0, MAX_CONTENT_CHARS);
    
    return {
      title,
      url,
      content: processedContent
    };
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err.message);
    return null;
  }
}

/**
 * Main function to build the search index
 */
function buildSearchIndex() {
  console.log("Building search index...");
  
  const allFiles = [];
  
  // Find all markdown files in configured directories
  for (const dir of CONTENT_DIRS) {
    if (fs.existsSync(dir)) {
      const files = findMarkdownFiles(dir);
      console.log(`Found ${files.length} markdown files in ${dir}/`);
      allFiles.push(...files);
    } else {
      console.log(`Directory ${dir}/ not found, skipping`);
    }
  }
  
  console.log(`Total files found: ${allFiles.length}`);
  
  // Process all files
  const entries = [];
  for (const file of allFiles) {
    const entry = processFile(file);
    if (entry) {
      entries.push(entry);
    }
  }
  
  console.log(`Processed ${entries.length} files`);
  
  // Remove duplicates by URL (keep first occurrence)
  const seen = new Set();
  const uniqueEntries = [];
  for (const entry of entries) {
    if (!seen.has(entry.url)) {
      seen.add(entry.url);
      uniqueEntries.push(entry);
    }
  }
  
  if (uniqueEntries.length < entries.length) {
    console.log(`Removed ${entries.length - uniqueEntries.length} duplicate URLs`);
  }
  
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the index
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uniqueEntries, null, 2));
  console.log(`Search index written to ${OUTPUT_FILE}`);
  console.log(`Total entries: ${uniqueEntries.length}`);
}

// Run the builder
buildSearchIndex();
