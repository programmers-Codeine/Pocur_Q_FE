import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import 'dotenv/config';

// const fileName = fileURLToPath(import.meta.url);
// const dirName = path.dirname(fileName);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
    tsconfigPaths(),
  ],
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(dirName, 'key.pem')),
  //     cert: fs.readFileSync(path.resolve(dirName, 'cert.pem')),
  //   },
  // },
  define: {
    'process.env': process.env,
  },
});
