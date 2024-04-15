// components/GoogleTagManager.js

import Script from 'next/script';

const GoogleTagManager = () => (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=G-20KCVGFPL5`}
    />
    <Script id="gtag-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-20KCVGFPL5');
      `}
    </Script>
  </>
);

export default GoogleTagManager;
