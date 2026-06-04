# Limpiar archivos innecesarios

Revisa el proyecto y elimina archivos basura, versiones intermedias y duplicados.

## Pasos a seguir

1. Lista todos los archivos del proyecto (especialmente `public/models/`) con `git ls-files`.

2. Detecta y elimina estas categorías:

   **Archivos de prueba obvios:**
   - Nombres con "prueba", "pruba", "test", "tmp", "borrador", seguidos de número
   - Archivos temporales: `*.tmp`, `*.bak`, `*.orig`, `*.log`
   - Archivos de sistema: `Thumbs.db`, `.DS_Store`, `desktop.ini`

   **Versiones intermedias de modelos STL:**
   - Cuando existe una serie como `nombre.stl`, `nombre1.stl`, `nombre2.stl`, `nombre3.stl`, conserva solo la de número más alto (la más reciente) y elimina las anteriores.
   - Mismo criterio para cualquier otro tipo de archivo con versiones numéricas.

3. Antes de eliminar, muestra al usuario la lista completa de lo que vas a borrar y pide confirmación.

4. Elimina los archivos confirmados con `git rm` (para que quede registrado en git).

5. Si se eliminó algo, haz commit con mensaje descriptivo en español y push a `origin main`.

6. Informa del espacio liberado aproximado (suma de tamaños eliminados).
