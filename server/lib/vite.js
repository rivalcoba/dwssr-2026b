// Biblioteca File Stream
import fs from 'node:fs'
// Biblioteca de rutas
import path from 'node:path'
import { abort } from 'node:process'
import { fileURLToPath } from 'node:url'
// Creando la variables de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
/**
 * Helper para Handlebars que genera las etiquetas de Vite
 * EN DESARROLLO: Conecta al servidor de desarrollo de Vite
 * EN PRODUCCION: Usa los compilados de Vite
 */
export function viteAssets(){
    // Obtener modo de ejecución
    const isDev = process.env.NODE_ENV !== 'production'
    // Rescatando la URL del servidor de desarrollo
    const viteDevServer = 
    process.env.VITE_DEV_SERVER || 'http://locahost:5173'

    // Si estamos en modo desarrollo
    if(isDev){
        // En desarrollo, cargamos los archivos
        // del front-end directamente del servidor
        // de Desarorllo de Vite
        return `
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `
    }
    // En produccion leemos el manifest
    // y generamos las estiquetas finales de produccion
    const manifestPath = 
    path.join(__dirname,'..','..','dist','.vite','manifest.json')

    // Si no existe el manifest
    if(!fs.existsSync(manifestPath)){
        console.warn("Vite manifest not found. Run 'npm run build'")
        return ''
    }
}