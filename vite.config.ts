import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  return {
    build: isBuild ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Ridr',
        fileName: (format) => `ridr.${format}.js`,
        formats: ['es', 'umd']
      },
      rollupOptions: {
        external: [],
        output: {
          globals: {}
        }
      },
      emptyOutDir: false,
      sourcemap: false,
      target: 'esnext'
    } : {
      sourcemap: true
    }
  }
});
