# Simulador 3D con Consejos Elegoo Centuri Carbon

Este es un proyecto web moderno e interactivo desarrollado con **React**, **Vite**, **TypeScript**, **Three.js (WebGL)** y **Tailwind CSS**.

Al descargar el archivo ZIP del proyecto, la página **no funcionará si abres el archivo `index.html` directamente (haciendo doble clic)** por dos razones del navegador web:
1. **Seguridad del Navegador (CORS):** Los navegadores modernos bloquean la carga manual de archivos de código (módulos ES6) si se acceden usando el protocolo `file://` (doble clic en tu archivo en el disco).
2. **Compilación necesaria:** Los navegadores no saben leer archivos `.tsx` (TypeScript con React) de manera nativa; necesitan que un compilador como Vite los organice y empaquete.

Sigue las siguientes instrucciones rápidas para ejecutar el proyecto en tu ordenador o subirlo a tu página web:

---

## 🚀 Cómo ejecutarlo en tu ordenador (Localmente)

Para poder ejecutar la aplicación en tu computadora, necesitas tener instalado **Node.js** (el entorno de ejecución estándar de JavaScript).

### Paso 1: Instala Node.js
Si aún no lo tienes, puedes descargarlo e instalarlo gratis desde su sitio web oficial:
👉 [https://nodejs.org/](https://nodejs.org/) (Descarga la versión recomendada **LTS**).

### Paso 2: Instala las dependencias del proyecto
Abre una terminal/consola en la carpeta del proyecto que has descomprimido y escribe:
```bash
npm install
```
*Esto instalará de forma segura todas las librerías necesarias del simulador en una carpeta llamada `node_modules` (incluyendo Three.js, React y Lucide Icons).*

### Paso 3: Arranca el servidor de desarrollo
Una vez finalizada la instalación de dependencias, arranca la aplicación ejecutando en la consola:
```bash
npm run dev
```
La aplicación se abrirá automáticamente en tu navegador o te dará una dirección local como:
🔗 **`http://localhost:3000`**

¡Listo! Ya podrás interactuar en tiempo real con el simulador, presionar los botones, cargar tus archivos STL y ver los consejos específicos para la Elegoo.

---

## ☁️ Cómo subirlo a tu propia página web (Hosting)

Si quieres subir este simulador para que cualquier persona lo vea públicamente en tu dominio o hosting (por ejemplo, Hostinger, GitHub Pages, Vercel, Netlify, o un servidor propio), debes **compilar el código**.

### Paso 1: Compila los archivos
Ejecuta el siguiente comando en tu terminal:
```bash
npm run build
```
*Este comando compilará, optimizará y empaquetará de forma óptima el código para que cargue super rápido en la web.*

### Paso 2: Sube la carpeta `dist`
Al terminar la compilación, se habrá creado una nueva carpeta llamada **`dist/`** en el directorio raíz del proyecto.
- **¡Esta es la carpeta que contiene tu web real!**
- Contiene un solo archivo `index.html` ya compilado y una carpeta automatizada `assets/` con el JavaScript, CSS y código optimizado.
- Copia y sube **el contenido de la carpeta `dist`** al directorio principal de tu hosting (usualmente llamado `public_html`, `www`, o la raíz de tu servidor FTP).

### Paso 3: ¡Listo para todo el mundo!
Una vez subidos los archivos de **`dist`** a tu hosting, tu sitio web cargará perfectamente cuando las personas accedan a tu dirección web publica (`https://tupagina.com`).

---

## 🐙 Despliegue Automático en GitHub Pages (La mejor opción)

He configurado un archivo de automatización llamado `.github/workflows/deploy.yml`. Gracias a esto, **no necesitas compilar nada en tu ordenador**. GitHub compilará el código y lo pondrá online de manera 100% gratuita por sí solo.

Sigue estos sencillos pasos:

1. **Sube tu código a GitHub:**
   Crea un repositorio en tu cuenta de GitHub (público o privado) y sube todos los archivos del proyecto (incluyendo la carpeta `.github`, `src`, `package.json`, etc.).

2. **Activa GitHub Actions en tu repositorio:**
   - En tu repositorio de GitHub, haz clic en la pestaña **Settings** (Configuración) en la parte superior.
   - En el menú lateral izquierdo, haz clic en **Pages**.
   - En la sección **Build and deployment**, busca la opción **Source** (Origen) y cambia el selector de "Deploy from a branch" (Desplegar desde una rama) a **GitHub Actions**.

3. **¡Listo!:**
   - Cada vez que hagas un `push` (o subas cambios) a la rama `main` o `master`, GitHub compilará tu aplicación automáticamente en unos segundos.
   - Podrás ver el progreso en la pestaña **Actions** de tu repositorio. En breve, tu web estará funcionando en:
     `https://<tu-usuario-de-github>.github.io/<nombre-del-repositorio>/`

