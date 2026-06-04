# Publicar cambios del día

Limpia el proyecto y sube al servidor (GitHub Pages / cenital.org) todos los cambios realizados hoy.

## Pasos a seguir

### 1. Limpieza de archivos innecesarios

Lista todos los archivos del proyecto con `git ls-files` y busca también archivos no rastreados con `git status`.

Detecta y elimina:

**Archivos de prueba obvios:**
- Nombres con "prueba", "pruba", "test", "tmp", "borrador" seguidos de número
- Archivos temporales: `*.tmp`, `*.bak`, `*.orig`, `*.log`
- Archivos de sistema: `Thumbs.db`, `.DS_Store`, `desktop.ini`

**Versiones intermedias de modelos STL (y otros archivos con versiones numéricas):**
- Cuando existe una serie como `nombre.stl`, `nombre1.stl`, `nombre2.stl`, `nombre3.stl`, conserva solo la de número más alto y elimina las anteriores.

Si encuentras archivos a eliminar, muéstralos al usuario y pide confirmación antes de borrar. Usa `git rm` para eliminarlos.

### 2. Revisar cambios del día

Ejecuta `git status` y `git diff` para ver qué ha cambiado.
Ejecuta `git log --since="00:00" --oneline` para ver los commits de hoy.

### 3. Crear commit y subir

Si hay cambios (incluyendo los archivos eliminados en la limpieza):

1. Analiza todos los cambios y redacta un mensaje de commit en español que resuma lo que se ha hecho hoy:
   - Empieza con un verbo en infinitivo (Añadir, Corregir, Actualizar, Eliminar, Mejorar…)
   - Máximo 72 caracteres en la primera línea
   - Si hay varios cambios importantes, añade viñetas en líneas adicionales

2. Ejecuta `git add -A`

3. Crea el commit:
   ```
   git commit -m "$(cat <<'EOF'
   [mensaje aquí]
   
   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   EOF
   )"
   ```

4. Ejecuta `git push origin main`

5. Confirma el push exitoso y muestra: https://cenital.org/

Si no hay ningún cambio que subir, informa al usuario de que el repositorio ya está actualizado.
