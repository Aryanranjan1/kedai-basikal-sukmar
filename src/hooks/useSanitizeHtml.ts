// src/hooks/useSanitizeHtml.ts
import { useState, useEffect } from 'react';

/**
 * A custom hook to sanitize HTML strings using DOMPurify.
 * Ensures DOMPurify only runs on the client-side to avoid SSR errors.
 *
 * @param htmlString The HTML string to sanitize.
 * @returns The sanitized HTML string, or an empty string during SSR.
 */
const useSanitizeHtml = (htmlString: string): string => {
  const [sanitizedHtml, setSanitizedHtml] = useState('');

  useEffect(() => {
    // Check if we are in a browser environment (client-side)
    if (typeof window !== 'undefined') {
      // Dynamically import dompurify only on the client side
      // This ensures it's not bundled or executed on the server.
      import('dompurify')
        .then(DOMPurifyModule => {
          // DOMPurify typically exports its main functionality as the 'default' export
          // in its ES module form. Sometimes it might be the module itself in certain
          // bundling contexts, so `DOMPurifyModule.default || DOMPurifyModule` handles both.
          const purifyInstance = DOMPurifyModule.default || DOMPurifyModule;

          if (typeof purifyInstance.sanitize === 'function') {
            setSanitizedHtml(purifyInstance.sanitize(htmlString));
            console.log("DOMPurify: HTML sanitized successfully on client.");
          } else {
            console.error("DOMPurify: 'sanitize' function not found on the imported module. Falling back to original HTML.");
            // In a production app, you might want to log this and ensure it doesn't happen.
            setSanitizedHtml(htmlString); // Fallback: return original if sanitize method is missing
          }
        })
        .catch(err => {
          console.error("DOMPurify: Failed to import dompurify. Falling back to original HTML.", err);
          setSanitizedHtml(htmlString); // Fallback: return original on import failure
        });
    } else {
      // During Server-Side Rendering (SSR), DOMPurify cannot run.
      // For safety, we return an empty string or a placeholder.
      // Returning the original string during SSR is risky as it won't be sanitized.
      setSanitizedHtml(''); // Return empty string during SSR to prevent issues
      console.warn("DOMPurify: Skipping HTML sanitization during Server-Side Rendering (SSR).");
    }
  }, [htmlString]); // Re-run effect if the HTML string changes

  return sanitizedHtml;
};

export default useSanitizeHtml;