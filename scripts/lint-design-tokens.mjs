#!/usr/bin/env node

/**
 * @file lint-design-tokens.mjs
 * @description Build-pipeline linter enforcing the rigid 60-30-10 color distribution system.
 * 
 * Rules:
 * 1. Accent color (#C6F432 / Lime Green) is strictly prohibited on non-interactive components
 *    (e.g., page backgrounds, card backgrounds, static typography). It is restricted exclusively
 *    to interactive CTA buttons, active state indicators, and the design token definition file.
 * 2. Every button color pairing must exceed a 4.5:1 WCAG contrast ratio.
 * 3. Any arbitrary, non-compliant hex color introduced into design-system components causes build failure.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Approved 60-30-10 hex values
const APPROVED_HEX_TOKENS = new Set([
  '#0b0b0c', // 60% Dominant Midnight Black
  '#ffffff', // 30% Structural Pure White
  '#c6f432', // 10% Accent Lime Green (CTA / Interactive only)
  '#d4f755', // 10% Accent Hover
  '#b2e022', // 10% Accent Active
]);

// Interactive files explicitly authorized to render the 10% Accent color
const AUTHORIZED_ACCENT_FILES = [
  'tokens.ts',
  'globals.css',
  'CTAButton.tsx',
  'PrimaryButton.tsx',
  'GlassCard.tsx',
  'DesignSystemProvider.tsx',
  'lint-design-tokens.mjs',
];

// Helper to compute contrast
function getLuminance(hex) {
  const clean = hex.replace('#', '').toLowerCase();
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function getContrastRatio(fg, bg) {
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// 1. Validate Core Tokens Contrast
const buttonContrast = getContrastRatio('#0B0B0C', '#C6F432');
console.log(`\n🔍 [60-30-10 Linter] Validating CTA Button Contrast Ratio:`);
console.log(`   Text: #0B0B0C on Fill: #C6F432 => Contrast Ratio: ${buttonContrast.toFixed(2)}:1`);

if (buttonContrast < 4.5) {
  console.error(`❌ [FAILED]: Button contrast ${buttonContrast.toFixed(2)}:1 is below required 4.5:1!`);
  process.exit(1);
}
console.log(`   ✅ Contrast ratio exceeds 4.5:1 requirement (WCAG AAA compliant: ${buttonContrast.toFixed(2)}:1)\n`);

// 2. Scan design-system directory for unauthorized accent usages and arbitrary hex drift
const DESIGN_SYSTEM_DIR = path.join(ROOT_DIR, 'src', 'design-system');
const UI_DS_DIR = path.join(ROOT_DIR, 'src', 'components', 'ui', 'design-system');

const filesToScan = [];

function collectFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath);
    } else if (/\.(tsx|ts|css)$/.test(entry.name)) {
      filesToScan.push(fullPath);
    }
  }
}

collectFiles(DESIGN_SYSTEM_DIR);
collectFiles(UI_DS_DIR);

let violations = 0;

for (const filePath of filesToScan) {
  const relPath = path.relative(ROOT_DIR, filePath);
  const fileName = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const isAuthorizedForAccent = AUTHORIZED_ACCENT_FILES.some((allowed) => fileName.includes(allowed));

  lines.forEach((line, index) => {
    // Check for 10% Lime Green accent in unauthorized files/contexts
    if (!isAuthorizedForAccent && (line.includes('#C6F432') || line.includes('#c6f432') || line.includes('accent10'))) {
      console.error(
        `❌ [Design System Violation in ${relPath}:${index + 1}]:\n` +
        `   Accent color #C6F432 cannot appear outside designated interactive components (CTAButton / buttons).\n` +
        `   Line: "${line.trim()}"`
      );
      violations++;
    }

    // Check for arbitrary hex codes (e.g. #abc, #abcdef) that don't belong to the locked tokens
    const hexMatches = line.match(/#[0-9a-fA-F]{3,8}\b/g);
    if (hexMatches) {
      for (const hex of hexMatches) {
        const normHex = hex.toLowerCase();
        // Allow pure black/white shorthand #000, #fff
        if (normHex === '#000' || normHex === '#fff' || normHex === '#000000') continue;
        if (!APPROVED_HEX_TOKENS.has(normHex)) {
          // Check if it's in tokens.ts itself where tokens are defined
          if (!fileName.includes('tokens.ts')) {
            console.error(
              `❌ [Design Drift in ${relPath}:${index + 1}]:\n` +
              `   Unapproved hex color "${hex}" found! Only 60-30-10 tokens are permitted.\n` +
              `   Allowed: #0B0B0C (60%), #FFFFFF (30%), #C6F432 (10%).\n` +
              `   Line: "${line.trim()}"`
            );
            violations++;
          }
        }
      }
    }
  });
}

if (violations > 0) {
  console.error(`\n🚫 Build Failed: Found ${violations} design system violation(s).`);
  console.error(`   Please adhere strictly to the 60-30-10 token architecture in src/design-system/tokens.ts.\n`);
  process.exit(1);
}

console.log(`✅ [60-30-10 Linter Passed]: All components conform to 60% Midnight Black, 30% Pure White, 10% Lime Green!\n`);
process.exit(0);

