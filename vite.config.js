import { defineConfig, loadEnv } from 'vite';
import contactHandler from './api/contact.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    root: '.',
    publicDir: 'public',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      host: true,
    },
    plugins: [
      {
        name: 'api-contact-middleware',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res) => {
            let bodyStr = '';
            req.on('data', chunk => {
              bodyStr += chunk;
            });
            req.on('end', async () => {
              if (bodyStr) {
                try {
                  req.body = JSON.parse(bodyStr);
                } catch {
                  req.body = bodyStr;
                }
              }
              res.status = (code) => {
                res.statusCode = code;
                return res;
              };
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                return res;
              };
              try {
                await contactHandler(req, res);
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: false, error: 'Internal Server Error' }));
              }
            });
          });
        }
      }
    ]
  };
});
