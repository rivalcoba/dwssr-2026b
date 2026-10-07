// Importando configurador de Vite
import { defineConfig } from 'vite'
// Importando un admin de rutas
import { resolve } from 'node:path'

// Imports para crear Dirname
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

// Creando la variables de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    // Directorio Raiz de los archivos fuente del front-end
    root: 'src',
    // Configurando un servidor de desarrollo
    server:{
        // Puerto de escucha
        port: 5173,
        // Rigidez del puerto
        strictPort: true,
        // Escuchar en 0.0.0.0 para que el reenvio de puertos pueda alcanzarlo
        host: true,
        // El HTML lo sirve Express (otro origen), por lo que se requiere CORS
        cors: true,
        // Permitir el host dinamico de Codespaces
        allowedHosts: true,
        // HMR a traves del proxy HTTPS de Codespaces
        hmr: process.env.CODESPACE_NAME
            ? { protocol: 'wss', clientPort: 443, host: `${process.env.CODESPACE_NAME}-5173.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}` }
            : true
    },
    // Configurando el Build
    build: {
        // Directorio de salida del js para produccion
        outDir: "../dist",
        // Asegurando limpieza del folder del folder de produccion
        emptyOutDir: true,
        // Generar manifiesto para el servidor
        manifest: true,
        // Opciones de Empaquetado
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/main.js')
            }
        }
    },
    // Configuracion para el desarrollo
    publicDir: false
})