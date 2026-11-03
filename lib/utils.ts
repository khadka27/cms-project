import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractFaqsFromHtml(html: string): Array<{ question: string; answer: string }> {
  if (!html) return [];
  const regex = /data-faqs="([^"]+)"/g;
  let match;
  const allFaqs: Array<{ question: string; answer: string }> = [];
  while ((match = regex.exec(html)) !== null) {
    try {
      const raw = match[1];
      const decoded = raw.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
      const parsed = JSON.parse(decoded);
      if (Array.isArray(parsed)) {
        parsed.forEach((faq: any) => {
          if (faq.q && faq.a) {
            allFaqs.push({ question: faq.q, answer: faq.a });
          }
        });
      }
    } catch (e) {
      console.error("Failed to parse FAQ from HTML", e);
    }
  }
  return allFaqs;
}

export function wrapTablesInResponsiveDiv(html: string): string {
  if (!html) return html;

  // 1. Format checklist items: transform literal [ ] or [] or [x] in lists into polished styled checkboxes
  let formatted = html
    .replace(
      /<li>\s*\[\s*\]\s*/gi,
      '<li class="flex items-start gap-2.5 my-1.5 list-none"><span class="inline-flex items-center justify-center w-4 h-4 mt-1 rounded border-2 border-turquoise_surf/60 bg-white flex-shrink-0"></span><span>'
    )
    .replace(
      /<li>\s*\[x\]\s*/gi,
      '<li class="flex items-start gap-2.5 my-1.5 list-none"><span class="inline-flex items-center justify-center w-4 h-4 mt-1 rounded border-2 border-bright_teal_blue bg-bright_teal_blue text-white flex-shrink-0 text-[10px] font-bold leading-none">✓</span><span>'
    )
    .replace(
      /(<li[^>]*>)\s*\[\]\s*/gi,
      '$1<span class="inline-flex items-center justify-center w-4 h-4 mt-1 rounded border-2 border-turquoise_surf/60 bg-white flex-shrink-0 mr-2"></span>'
    );

  // 2. Wrap any table in a responsive container div to prevent horizontal overflow
  return formatted.replace(
    /(<table[^>]*>[\s\S]*?<\/table>)/gi,
    '<div class="table-responsive-container">$1</div>'
  );
}

