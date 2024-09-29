interface DynamicCSSProps {
  hrefs: string[];
}

export const DynamicCSS: React.FC<DynamicCSSProps> = ({ hrefs }) => {
  const staticStylesheets = hrefs.map((href) => {
    return <link key={href} rel="stylesheet" href={href} />
  });

  return <>
    {staticStylesheets}
  </>
};
