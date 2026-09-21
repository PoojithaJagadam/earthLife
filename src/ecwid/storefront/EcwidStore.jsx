import React, { useEffect, useRef } from 'react';

const EcwidStore = () => {
  const storeId = import.meta.env.VITE_ECWID_STORE_ID;
  const storeDiv = useRef(null);

  useEffect(() => {
    if (!storeId) {
      console.error('Ecwid Store ID is missing in environment variables.');
      return;
    }

    // Load Ecwid Script if not already loaded
    if (!document.getElementById('ecwid-script')) {
      window.ecwid_script_defer = true;
      window.ecwid_dynamic_widgets = true;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.id = 'ecwid-script';
      script.async = true;
      script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=2024-01-01`;
      document.head.appendChild(script);
      
      script.onload = () => {
        if (window.xProductBrowser) {
          window.xProductBrowser("id=my-store-" + storeId);
        }
      };
    } else {
      // If script is already loaded, just inject the storefront
      if (window.xProductBrowser) {
        window.xProductBrowser("id=my-store-" + storeId);
      }
    }
  }, [storeId]);

  return (
    <div id={`my-store-${storeId}`} ref={storeDiv}>
      <p>Loading Store...</p>
    </div>
  );
};

export default EcwidStore;
