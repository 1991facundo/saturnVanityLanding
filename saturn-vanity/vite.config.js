import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          // Copia los archivos dentro de 'components'
          src: 'components/**/*',
          dest: 'components'
        },
        {
          // Copia los archivos JSON dentro de 'locales'
          src: 'locales/*.json',
          dest: 'locales'
        }
      ]
    })
  ],
  server: {
    hmr: {
      overlay: false,  
    },
  },
  resolve: {
    alias: {
      '@': '/src',  
    },
  },
});
