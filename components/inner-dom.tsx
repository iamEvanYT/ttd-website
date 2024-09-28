"use client";

import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import ReactDOM from 'react-dom';

interface InnerDOMProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  /**
   * The content to be rendered inside the iframe.
   */
  children: ReactNode;

  /**
   * The title attribute for the iframe, important for accessibility.
   */
  title: string;
}

/**
 * A React component that renders its children inside an iframe using React Portals.
 * It copies the parent document's styles into the iframe to ensure consistent styling.
 * Additionally, it injects styles to reset default margins, paddings, and prevent scrolling.
 * The iframe automatically resizes to fit its content without introducing scrollbars.
 * All links inside the iframe open in a new tab.
 * It also synchronizes class changes from the parent <html> to the iframe's <html>.
 * Scripts inside the iframe are detected and executed.
 */
export function InnerDOM({
  children,
  title,
  className,
  style,
  ...props
}: InnerDOMProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [wrapperDiv, setWrapperDiv] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) return;

    const handleLoad = () => {
      const iframeDoc = iframe.contentDocument;

      if (iframeDoc) {
        try {
          // Copy styles from parent to iframe
          Array.from(document.styleSheets)
            .filter(
              (styleSheet): styleSheet is CSSStyleSheet => {
                try {
                  // Attempt to access cssRules to filter out cross-origin stylesheets
                  return styleSheet.cssRules !== null;
                } catch (e) {
                  // If accessing cssRules throws an error, it's likely a cross-origin stylesheet
                  return false;
                }
              }
            )
            .forEach((styleSheet) => {
              const newStyle = iframeDoc.createElement('style');

              Array.from(styleSheet.cssRules).forEach((rule) => {
                newStyle.appendChild(
                  iframeDoc.createTextNode(rule.cssText)
                );
              });

              iframeDoc.head.appendChild(newStyle);
            });

          // Inject additional styles to reset margins, paddings, and prevent scrolling
          const resetStyle = iframeDoc.createElement('style');
          resetStyle.textContent = `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            html, body {
              height: auto;
              width: 100%;
            }
            body {
              overflow: hidden;
            }
            #iframe-wrapper {
              width: 100%;
            }
          `;
          iframeDoc.head.appendChild(resetStyle);

          // Create a wrapper div
          const wrapper = iframeDoc.createElement('div');
          wrapper.id = 'iframe-wrapper';
          iframeDoc.body.appendChild(wrapper);

          setWrapperDiv(wrapper);
          setMounted(true);
        } catch (error) {
          console.error('Error setting up iframe:', error);
        }
      }
    };

    // Check if the iframe is already loaded
    if (iframe.contentDocument?.readyState === 'complete') {
      handleLoad();
    } else {
      // Add load event listener
      iframe.addEventListener('load', handleLoad);
      // Set src to 'about:blank' to ensure a blank document
      iframe.src = 'about:blank';
    }

    // Cleanup event listener on unmount
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !wrapperDiv) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) return;

    /**
     * Updates the iframe's height based on the wrapper div's scrollHeight.
     */
    const updateIframeHeight = () => {
      const contentHeight = wrapperDiv.scrollHeight;
      iframe.style.height = `${contentHeight}px`;
    };

    /**
     * Enhances all links within the iframe to open in new tabs.
     */
    const enhanceLinks = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (element.tagName.toLowerCase() === 'a') {
          element.setAttribute('target', '_blank');
          element.setAttribute('rel', 'noopener noreferrer');
        }

        // Recursively apply to child nodes
        element.childNodes.forEach(child => enhanceLinks(child));
      }
    };

    /**
     * Processes all existing links within the iframe.
     */
    const processExistingLinks = () => {
      const links = wrapperDiv.querySelectorAll('a');
      links.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    };

    /**
     * MutationObserver callback to handle newly added links.
     */
    const handleMutations = (mutations: MutationRecord[]) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          enhanceLinks(node);
        });
      });
    };

    /**
     * Synchronizes the iframe's <html> classes with the parent <html> classes.
     */
    const synchronizeHtmlClasses = () => {
      const parentHtml = document.documentElement;
      const iframeHtml = iframeDoc.documentElement;

      // Get the current class list from the parent <html>
      const parentClasses = Array.from(parentHtml.classList);

      // Remove all existing classes from the iframe's <html>
      Array.from(iframeHtml.classList).forEach(cls => {
        iframeHtml.classList.remove(cls);
      });

      // Add all classes from the parent <html> to the iframe's <html>
      parentClasses.forEach(cls => {
        // Example: Map 'dark' to 'dark-mode' if needed
        const mappedClass = cls === 'dark' ? 'dark-mode' : cls;
        iframeHtml.classList.add(mappedClass);
      });
    };

    /**
     * Executes all <script> tags within the iframe's content.
     */
    const executeScripts = () => {
      const scripts = wrapperDiv.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = iframeDoc.createElement('script');
        // Copy all attributes
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        // Copy script content
        newScript.textContent = script.textContent || '';
        // Append the script to the iframe's head to execute it
        iframeDoc.head.appendChild(newScript);
        // Optionally, remove the original script to prevent duplication
        script.parentNode?.removeChild(script);
      });
    };

    // Initial height adjustment
    updateIframeHeight();

    // Enhance existing links
    processExistingLinks();

    // Synchronize classes initially
    synchronizeHtmlClasses();

    // Execute any scripts present initially
    executeScripts();

    // Setup ResizeObserver to watch for changes in the wrapper div
    const resizeObserver = new ResizeObserver(() => {
      updateIframeHeight();
    });

    resizeObserver.observe(wrapperDiv);

    // Setup MutationObserver to watch for new links being added
    const mutationObserver = new MutationObserver(mutations => {
      handleMutations(mutations);
      // After handling mutations, execute any new scripts
      executeScripts();
      // Update height in case new content affects layout
      updateIframeHeight();
    });
    mutationObserver.observe(wrapperDiv, {
      childList: true,
      subtree: true,
    });

    // Listen for image load events to adjust height after images load
    const images = wrapperDiv.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) {
        return;
      }
      img.addEventListener('load', updateIframeHeight);
    });

    // Setup MutationObserver to watch for class changes on the parent <html>
    const parentHtml = document.documentElement;
    const classMutationObserver = new MutationObserver(() => {
      synchronizeHtmlClasses();
      updateIframeHeight(); // Adjust height in case class changes affect layout
    });
    classMutationObserver.observe(parentHtml, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      classMutationObserver.disconnect();
      images.forEach((img) => {
        img.removeEventListener('load', updateIframeHeight);
      });
    };
  }, [mounted, wrapperDiv]);

  return (
    <>
      <iframe
        title={title}
        ref={iframeRef}
        className={className}
        style={{
          ...style,
          border: 'none',
          width: '100%',
          height: 'auto', // Allow height to be set dynamically
          overflow: 'hidden',
        }}
        {...props}
      >
        {mounted && wrapperDiv && ReactDOM.createPortal(children, wrapperDiv)}
      </iframe>
      <noscript>
        <div className="mx-auto max-w-[700px] md:text-xl text-center">
          You must enable JavaScript to view this page.
        </div>
      </noscript>
    </>
  );
}