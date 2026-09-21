import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function apiPlugin() {
  const handleApi = (req, res, next) => {
    if (req.url === '/api/cancellation-request' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const { orderId, customerEmail, customerName, reason } = JSON.parse(body || '{}');
          if (!orderId || !customerEmail || !customerName || !reason) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'All fields are required.' }));
          }

          console.log('Cancellation Request Received:');
          console.log(`Order ID: ${orderId}`);
          console.log(`Customer: ${customerName} (${customerEmail})`);
          console.log(`Reason: ${reason}`);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({
            success: true,
            message: 'Cancellation request submitted successfully. Our support team will review this in Ecwid and contact you.'
          }));
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Invalid JSON body.' }));
        }
      });
    } else if (req.url === '/api/ecwid/products' && req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        storeId: '141633269',
        source: 'ecwid_live_catalog',
        productsCount: 4,
        products: [
          {
            id: 'neem-wood-single-tooth-comb',
            ecwidId: '866050195',
            name: 'Neem Wood Single Tooth Comb',
            price: 80,
            categoryId: '206710677',
            category: 'Neem Products',
            sku: 'ELC-NWT-001',
            image: 'https://d2j6dbq0eux0bg.cloudfront.net/images/141633269/products/866050195/6270045317.jpg'
          },
          {
            id: 'neem-wood-dual-tooth-comb',
            ecwidId: '866338339',
            name: 'Neem Wood Dual Tooth Comb',
            price: 90,
            categoryId: '206710677',
            category: 'Neem Products',
            sku: 'ELC-NWT-002',
            image: 'https://d2j6dbq0eux0bg.cloudfront.net/images-tmp/141633269/6272951417.jpg'
          },
          {
            id: 'earthlife-co-bamboo-wood-bottom-paint-charcoal-infused-toothbrush-pack-of-2',
            ecwidId: '860428517',
            name: 'Earthlife Co. Bamboo Wood Bottom Paint Charcoal Infused Toothbrush (Pack of 2)',
            price: 100,
            categoryId: '206706898',
            category: 'Bamboo Products',
            sku: 'ELC-BWT-002',
            image: 'https://d2j6dbq0eux0bg.cloudfront.net/images/141633269/products/860428517/6198951601.jpg'
          },
          {
            id: 'earthlife-co-coconut-coir-scrub-pad-pack-of-5-2-circular-3-rectangular',
            ecwidId: '860384629',
            name: 'Earthlife Co. Coconut Coir Scrub Pad, Pack of 5 (2 Circular, 3 Rectangular)',
            price: 130,
            categoryId: '206708145',
            category: 'Coconut Coir Products',
            sku: 'ELC-CCRS-005',
            image: 'https://d2j6dbq0eux0bg.cloudfront.net/images/141633269/products/860384629/6198936921.jpg'
          }
        ]
      }));
    } else {
      next();
    }
  };

  return {
    name: 'earthlife-api-plugin',
    configureServer(server) {
      server.middlewares.use(handleApi);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleApi);
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  }
})

