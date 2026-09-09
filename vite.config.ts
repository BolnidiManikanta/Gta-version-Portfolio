import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function videoUploadPlugin(): Plugin {
  return {
    name: 'video-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-intro-bg', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks);
            const publicDir = path.resolve(__dirname, 'public');
            if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir, { recursive: true });
            }
            fs.writeFileSync(path.join(publicDir, 'intro-bg.png'), buffer);
            fs.writeFileSync(path.join(publicDir, 'image.png'), buffer);
            fs.writeFileSync(path.join(publicDir, 'bg.png'), buffer);

            const distDir = path.resolve(__dirname, 'dist');
            if (fs.existsSync(distDir)) {
              fs.writeFileSync(path.join(distDir, 'intro-bg.png'), buffer);
              fs.writeFileSync(path.join(distDir, 'image.png'), buffer);
              fs.writeFileSync(path.join(distDir, 'bg.png'), buffer);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, size: buffer.length }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });

      server.middlewares.use('/api/upload-intro-video', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks);
            const publicDir = path.resolve(__dirname, 'public');
            if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir, { recursive: true });
            }
            const filePath1 = path.join(publicDir, 'walking(2).mp4');
            const filePath2 = path.join(publicDir, 'walking.mp4');
            fs.writeFileSync(filePath1, buffer);
            fs.writeFileSync(filePath2, buffer);

            const distDir = path.resolve(__dirname, 'dist');
            if (fs.existsSync(distDir)) {
              fs.writeFileSync(path.join(distDir, 'walking(2).mp4'), buffer);
              fs.writeFileSync(path.join(distDir, 'walking.mp4'), buffer);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, size: buffer.length }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), videoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
