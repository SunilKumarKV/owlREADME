import JSZip from 'jszip';

/**
 * Shared helper to create a temporary anchor element and trigger a file download.
 * Cleans up the object URL immediately after clicking.
 */
function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Initiates download of a plain text file (e.g. README.md or roadmap.md)
 */
export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  triggerDownload(blob, filename);
}

/**
 * Packages README.md and roadmap.md into a compressed ZIP file and triggers download.
 * Returns early if both content strings are empty to avoid creating an empty ZIP.
 */
export async function downloadZipPackage(
  readmeContent: string,
  roadmapContent: string,
  zipName: string = 'owlreadme-package.zip'
): Promise<void> {
  if (!readmeContent && !roadmapContent) return;
  const zip = new JSZip();
  if (readmeContent) {
    zip.file('README.md', readmeContent);
  }
  if (roadmapContent) {
    zip.file('roadmap.md', roadmapContent);
  }
  const content = await zip.generateAsync({ type: 'blob' });
  triggerDownload(content, zipName);
}

/**
 * Creates a JSON file containing the serialized Zustand store data for recovery or portability
 */
export function downloadJsonBackup(
  readmeData: any,
  roadmapData: any,
  filename: string = 'owlreadme-backup.json'
): void {
  const backup = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    data: {
      readme: {
        name: readmeData.name,
        role: readmeData.role,
        about: readmeData.about,
        skills: readmeData.skills,
        projects: readmeData.projects,
        socials: readmeData.socials,
        avatarUrl: readmeData.avatarUrl,
        followers: readmeData.followers,
        following: readmeData.following,
        publicRepos: readmeData.publicRepos,
        template: readmeData.template,
      },
      roadmap: {
        title: roadmapData.title,
        steps: roadmapData.steps,
        template: roadmapData.template,
      },
    },
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json;charset=utf-8' });
  triggerDownload(blob, filename);
}

/**
 * Creates a temporary iframe, copies global stylesheet references, inserts the HTML
 * representing the styled markdown document, and opens the system print dialogue.
 *
 * Security: the title is HTML-escaped to prevent XSS injection.
 * Robustness: uses doc.open()/write()/close() (widely supported) with a null-check on
 * window.frameElement before removal.
 */
export function exportToPdf(htmlContent: string, theme: string, title: string): void {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc) {
    console.error('Failed to create iframe for PDF rendering');
    document.body.removeChild(iframe);
    return;
  }

  // Sanitise the title to prevent XSS in the <title> tag
  const safeTitle = title.replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] ?? c)
  );

  // Gather stylesheet tags from parent document
  let styles = '';
  document.querySelectorAll('link[rel="stylesheet"], style').forEach((el) => {
    styles += el.outerHTML;
  });

  doc.open();
  doc.write(`<!DOCTYPE html>
<html>
  <head>
    <title>${safeTitle}</title>
    ${styles}
    <style>
      @media print {
        @page { margin: 1.5cm; }
        body {
          background: var(--background) !important;
          color: var(--foreground) !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
      body {
        padding: 24px;
        max-width: 900px;
        margin: 0 auto;
        background: var(--background);
        color: var(--foreground);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        transition: none !important;
      }
      .theme-preview-container {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        background: transparent !important;
      }
    </style>
  </head>
  <body class="theme-${theme}">
    <div class="theme-preview-container">
      ${htmlContent}
    </div>
    <script>
      window.onload = function() {
        setTimeout(function() {
          window.print();
          setTimeout(function() {
            if (window.frameElement) window.frameElement.remove();
          }, 500);
        }, 500);
      };
    <\/script>
  </body>
</html>`);
  doc.close();
}
