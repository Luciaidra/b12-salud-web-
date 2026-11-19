# B12 Salud Integral: landing page

Sitio web del centro de salud multidisciplinario **B12 Salud Integral** (Mario Bravo 3356, Mar del Plata). Lo hace Lucia para un cliente. Comunicación en español rioplatense (voseo); la usuaria prefiere instrucciones **paso a paso, de a uno**, esperando su confirmación.

## Dónde está todo
- **Código:** `index.html` (estructura y contenido), `main.js` (todo el JavaScript, sin frameworks, dividido en módulos que se inician por separado con `init()`), `styles.css` (CSS de Tailwind ya compilado). No usa Angular ni React.
- **Tailwind:** ya no se usa el CDN. La configuración está en `tailwind.config.js` y los estilos propios en `tailwind.input.css`. **Si se agregan clases de Tailwind nuevas**, hay que regenerar `styles.css`: `npx tailwindcss@3 -c tailwind.config.js -i tailwind.input.css -o styles.css --minify`.
- **`vercel.json`:** headers de seguridad (CSP, anti-iframe, etc.). La CSP permite el script chiquito del `<head>` por su hash: si se cambia ese script, hay que actualizar el hash en `vercel.json`. No agregar scripts inline nuevos: el JS va en `main.js`.
- **Fotos:** `img/` (consultorio, en WebP), `img/equipo/` (profesionales: se usan los recortes cuadrados `nombre-192.webp`; los originales quedan como respaldo). `Imagenes consultorio/` son los originales de WhatsApp, no se suben.
- **GitHub:** https://github.com/Luciaidra/b12-salud-web- (rama `main`). Claude tiene acceso al repo y puede subir los cambios directamente. Si se sube a mano por la web: Add file → Upload files → Commit changes; al subir fotos, arrastrar la carpeta para conservar la ruta `img/...`.
- **Publicado en Vercel**, conectado al repo de GitHub: se actualiza solo al subir cambios.
- Railway se dejó de usar (estaba pausado por un incidente de seguridad). Queda pendiente borrar el proyecto y la cuenta, y desinstalar la app de Railway en GitHub.
- `package.json` se borró (era de Railway; Vercel sirve el sitio como estático).
- `.claude/launch.json`: servidor local de prueba (http-server, puerto 5174). No subir.

## Datos reales del centro
- WhatsApp: 223 696-2636 (`5492236962636`, constante `WHATSAPP_NUMERO` en el script).
- Horario: lunes a viernes de 8 a 20 h; sábados y domingos cerrado.
- Instagram: https://www.instagram.com/b12.salud (no usan Facebook ni LinkedIn).
- WhatsApp: el número se cambia sólo en `main.js` (`WHATSAPP_NUMERO` y `WHATSAPP_TEXTO`); los links con `data-wa` se actualizan solos.
- Los turnos se piden **solo por WhatsApp**, con un mensaje ya escrito; no hay formulario.

## Secciones de la página (en orden)
1. Navbar con logo (recreado en CSS con Cormorant Garamond: "B12" grande y "SALUD INTEGRAL" superpuesto, sobre un recuadro oliva `#8f9677`).
2. Hero con foto de la fachada (`img/fachada.jpg`).
3. Especialidades (7, generadas desde el array `especialidades` en JS): Kinesiología, FKT, RPG, Osteopatía, ATM, Terapia Ocupacional, Nutrición. Tienen filtros y botón de WhatsApp.
4. El Centro: texto y carrusel cuadrado con 8 fotos, flechas, puntos y swipe. Los nombres de las fotos de consultorio son "Consultorio de Osteopatía" y "Consultorio de RPG".
5. Profesionales (fondo oscuro), en este orden: Lic. Lourdes Benitez (RPG/Kinesiología, va primera), Lic. Iñaki Baviello (Kinesiología FKT), Lic. Paula Riveros Safenreider (Osteopatía/ATM), Virginia Pérez (Osteopatía y Terapia Manual), Lic. M. Belén González (Salud Cerebral/Terapia Ocupacional), Lic. Marina Boero (Nutrición). Las fotos van en círculos de 96 px; cada una es un recorte cuadrado de 192×192 (`img/equipo/nombre-192.webp`). **Belén todavía no tiene foto** (muestra las iniciales "BG"). La foto de Virginia es un primer plano y la de Marina sale de una captura de Instagram; si llegan mejores, reemplazarlas.
6. Obras sociales y prepagas: caja desplegable con buscador, 57 coberturas en 5 categorías (array `obrasSociales` en JS).
7. Turnos y Contacto: dirección, WhatsApp, horarios, mapa de Google embebido y botones de WhatsApp por especialidad.
8. Alquiler de consultorios para otros profesionales (dos fotos `img/alquiler-consultorio-*.webp`, botón de WhatsApp con mensaje propio). No mencionar camillas: los consultorios son para distintas ramas de la salud.
9. Footer.

## Decisiones tomadas
- Se quitaron Psicopedagogía y a la psicopedagoga Sheila Stebner (ya no está en el centro).
- Solo se muestran especialidades que tienen un profesional.
- Paleta: tonos salvia/oliva y crema; tipografías Fraunces (títulos) e Inter (texto).

## Ideas pendientes
- Páginas legales (privacidad, términos): se quitaron los links del footer hasta tener el texto del cliente.
- Mapa: reemplazar el `src` del iframe por el código oficial de Google Maps (Compartir → Insertar un mapa).
- Foto de Belén.
- Posible dominio propio (por ejemplo `b12saludintegral.com.ar`) conectado a Vercel.
