// Biblioteca File Stream
import fs from 'node:fs'
// Biblioteca de rutas
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
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
    // Usa el dominio reenviado por Codespaces y conserva localhost para desarrollo local.
    const codespaceName = process.env.CODESPACE_NAME
    const forwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
    const defaultViteDevServer = codespaceName && forwardingDomain
        ? `https://${codespaceName}-5173.${forwardingDomain}`
        : 'http://localhost:5173'
    const viteDevServer = process.env.VITE_DEV_SERVER || defaultViteDevServer

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
    // Leyendo y parseando a JSON el archivo
    // de manifiesto que genera vite en la compilacion
    // de los archivos del front-end
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    // Obteniendo la ruta del punto de entrada del front-end
    const mainEntry = manifest['main.js']
    // Guarda el main.js
    if(!mainEntry){
        console.warn('Archivo main.js no esta disponible en el manifiesto de Vite')
        return ''
    }

    let tags = '';

    // CSS files
    if(mainEntry.css){
        mainEntry.css.forEach(cssFile => {
            tags += `<link rel="stylesheet" href="/${cssFile}">\n`
        });
    }

    // JS files
    tags += `<script type="module" src="/${mainEntry.file}" defer></script>`;

    return tags;
}

/*
* Funcion registradora del Helper de Handlebars
*/
export function registerViteHelper(hbs){
    hbs.registerHelper('viteAssets', ()=>{
        // Sanitizando la salida del helper
        return new hbs.SafeString(viteAssets())
    })
}