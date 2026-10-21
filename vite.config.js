// Importando configurador de Vite
import { defineConfig } from 'vite';
// Importando un admin de rutas
import { resolve, dirname } from 'node:path';
// Importando tailwindcss
import tailwindcss from '@tailwindcss/vite';

// Imports para crear Dirname
import { fileURLToPath } from 'node:url';

// Creando la variables de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // Directorio Raiz de los archivos fuente del front-end
  root: 'src',
  // Agregando a Vite el plugin de tailwindcss
  plugins: [tailwindcss()],
  // Configurando un servidor de desarrollo
  server: {
    // Puerto de escucha
    port: 5173,
    // Rigidez del puerto
    strict: true,
  },
  // Configurando el Build
  build: {
    // Directorio de salida del js para produccion
    outDir: '../dist',
    // Asegurando limpieza del folder del folder de produccion
    emptyOutDir: true,
    // Generar manifiesto para el servidor
    manifest: true,
    // Opciones de Empaquetado
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js'),
      },
    },
  },
  // Configuracion para el desarrollo
  publicDir: false,
});
