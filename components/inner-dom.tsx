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

    const updateIframeHeight = () => {
      const contentHeight = wrapperDiv.scrollHeight;
      iframe.style.height = `${contentHeight}px`;
    };

    // Initial height adjustment
    updateIframeHeight();

    // Setup ResizeObserver to watch for changes in the wrapper div
    const resizeObserver = new ResizeObserver(() => {
      updateIframeHeight();
    });

    resizeObserver.observe(wrapperDiv);

    // Listen for image load events to adjust height after images load
    const images = wrapperDiv.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) {
        return;
      }
      img.addEventListener('load', updateIframeHeight);
    });

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
      images.forEach((img) => {
        img.removeEventListener('load', updateIframeHeight);
      });
    };
  }, [mounted, wrapperDiv]);

  return <>
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
  </>;
}