# Publicar cambios del día

Sube al servidor (GitHub Pages / cenital.org) todos los cambios realizados hoy.

## Pasos a seguir

1. Ejecuta `git status` y `git diff` para ver exactamente qué ha cambiado.

   Antes de preparar el commit, revisa si hay archivos innecesarios que eliminar:
   - Archivos temporales: `*.tmp`, `*.log`, `*.bak`, `*.orig`
   - Archivos de sistema: `Thumbs.db`, `.DS_Store`, `desktop.ini`
   - Archivos de build obsoletos o duplicados
   - Archivos de prueba que ya no se usan
   
   Si encuentras alguno, elimínalos con `git rm` o `Remove-Item` antes de continuar. Informa al usuario de lo que eliminaste.

2. Ejecuta `git log --since="00:00" --oneline` para ver los commits de hoy (si los hay).

3. Analiza los cambios y redacta un mensaje de commit en español que resuma de forma clara y concisa lo que se ha hecho hoy. El mensaje debe:
   - Empezar con un verbo en infinitivo (Añadir, Corregir, Actualizar, Eliminar, Mejorar…)
   - Ser descriptivo pero breve (máximo 72 caracteres en la primera línea)
   - Si hay varios cambios importantes, añade líneas adicionales con viñetas

4. Ejecuta `git add -A` para preparar todos los cambios.

5. Crea el commit con el mensaje redactado. Usa este formato exacto:
   ```
   git commit -m "$(cat <<'EOF'
   [mensaje aquí]
   
   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   EOF
   )"
   ```

6. Ejecuta `git push origin main` para subir los cambios a GitHub (y desplegar en cenital.org vía GitHub Pages).

7. Confirma que el push fue exitoso y muestra la URL del sitio: https://cenital.org/

Si no hay cambios que subir, informa al usuario de que el repositorio ya está actualizado.
