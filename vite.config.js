import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { handleEcwidApi } from './server/ecwid.js'

function apiPlugin() {
  const handleApi = async (req, res, next) => {
    if (req.url && req.url.startsWith('/api/ecwid')) {
      try {
        const handled = await handleEcwidApi(req, res);
        if (!handled) next();
      } catch (err) {
        console.error('Vite API proxy error:', err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal API error' }));
        }
      }
      return;
    }

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

