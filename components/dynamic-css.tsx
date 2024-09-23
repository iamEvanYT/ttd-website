'use client';

import { useEffect } from 'react';

interface DynamicCSSProps {
  hrefs: string[];
}

export const DynamicCSS: React.FC<DynamicCSSProps> = ({ hrefs }) => {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    hrefs.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    });

    // Cleanup function to remove the styles when the component unmounts
    return () => {
      links.forEach((link) => {
        document.head.removeChild(link);
      });
    };
  }, [hrefs]);

  return (
    <noscript>
      {Object.entries(hrefs).map(([_, href]) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </noscript>
  )
};
