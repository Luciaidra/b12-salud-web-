# B12 Salud Integral: landing page

Sitio web del centro de salud multidisciplinario **B12 Salud Integral** (Mario Bravo 3356, Mar del Plata). Lo hace Lucia para un cliente. Comunicación en español rioplatense (voseo); la usuaria prefiere instrucciones **paso a paso, de a uno**, esperando su confirmación.

## Dónde está todo
- **Código:** `index.html` (un solo archivo: HTML + Tailwind CSS por CDN + JavaScript sin frameworks). No usa Angular ni React.
- **Fotos:** `img/` (consultorio), `img/equipo/` (profesionales). `Imagenes consultorio/` son los originales de WhatsApp, no se suben.
- **GitHub:** https://github.com/Luciaidra/b12-salud-web- (rama `main`). Claude tiene acceso al repo y puede subir los cambios directamente. Si se sube a mano por la web: Add file → Upload files → Commit changes; al subir fotos, arrastrar la carpeta para conservar la ruta `img/...`.
- **Publicado en Vercel**, conectado al repo de GitHub: se actualiza solo al subir cambios.
- Railway se dejó de usar (estaba pausado por un incidente de seguridad). Queda pendiente borrar el proyecto y la cuenta, y desinstalar la app de Railway en GitHub.
- `package.json` (usa `serve`) quedó de cuando estaba en Railway; Vercel no lo necesita.
- `.claude/launch.json`: servidor local de prueba (http-server, puerto 5174). No subir.

## Datos reales del centro
- WhatsApp: 223 696-2636 (`5492236962636`, constante `WHATSAPP_NUMERO` en el script).
- Horario: lunes a viernes de 8 a 20 h; sábados y domingos cerrado.
- Instagram: https://www.instagram.com/b12.salud (no usan Facebook ni LinkedIn).
- Los turnos se piden **solo por WhatsApp**, con un mensaje ya escrito; no hay formulario.

## Secciones de la página (en orden)
1. Navbar con logo (recreado en CSS con Cormorant Garamond: "B12" grande y "SALUD INTEGRAL" superpuesto, sobre un recuadro oliva `#8f9677`).
2. Hero con foto de la fachada (`img/fachada.jpg`).
3. Especialidades (7, generadas desde el array `especialidades` en JS): Kinesiología, FKT, RPG, Osteopatía, ATM, Terapia Ocupacional, Nutrición. Tienen filtros y botón de WhatsApp.
4. El Centro: texto y carrusel cuadrado con 8 fotos, flechas, puntos y swipe. Los nombres de las fotos de consultorio son "Consultorio de Osteopatía" y "Consultorio de RPG".
5. Profesionales (fondo oscuro), en este orden: Lic. Lourdes Benitez (RPG/Kinesiología, va primera), Lic. Iñaki Baviello (Kinesiología FKT), Lic. Paula Riveros Safenreider (Osteopatía/ATM), Virginia Pérez (Osteopatía y Terapia Manual), Lic. M. Belén González (Salud Cerebral/Terapia Ocupacional), Lic. Marina Boero (Nutrición). Las fotos van en círculos de 96 px, con recorte uniforme por estilos inline (width/left/top). **Belén todavía no tiene foto** (muestra las iniciales "BG"). La foto de Virginia es un primer plano y la de Marina sale de una captura de Instagram; si llegan mejores, reemplazarlas.
6. Obras sociales y prepagas: caja desplegable con buscador, 57 coberturas en 5 categorías (array `obrasSociales` en JS).
7. Turnos y Contacto: dirección, WhatsApp, horarios, mapa de Google embebido y botones de WhatsApp por especialidad.
8. Alquiler de consultorios para otros profesionales (dos fotos `img/alquiler-consultorio-*.webp`, botón de WhatsApp con mensaje propio). No mencionar camillas: los consultorios son para distintas ramas de la salud.
9. Footer.

## Decisiones tomadas
- Se quitaron Psicopedagogía y a la psicopedagoga Sheila Stebner (ya no está en el centro).
- Solo se muestran especialidades que tienen un profesional.
- Paleta: tonos salvia/oliva y crema; tipografías Fraunces (títulos) e Inter (texto).

## Ideas pendientes
- Foto de Belén.
- Posible dominio propio (por ejemplo `b12saludintegral.com.ar`) conectado a Vercel.
