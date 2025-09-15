# Agencia Viajes - Desarrollo

Proyecto Next.js (App Router) con componentes personalizados para hero, galería, autenticación y un flujo de reserva simple.

Despliegue
- Este proyecto se despliega fácilmente en Vercel —conectar el repositorio y permitir despliegues automáticos.
- Asegúrate de añadir las variables de entorno en la configuración de Vercel (Settings → Environment Variables) según `.env.example`.

Autenticación
- Configurado con NextAuth en `app/api/auth/[...nextauth]/route.ts`. Añade las credenciales de Google y Facebook en Vercel.

Pedidos / Reservas
- Actualmente los pedidos se persisten en `data/orders.json` (archivo local) para pruebas. En producción recomendamos usar Supabase, PostgreSQL, MongoDB o un servicio similar compatible con Vercel.

Imágenes
- La imagen principal usada en la página está en `public/images/IMG_3241.JPG`. Si sustituyes la imagen, asegúrate de mantener el mismo nombre o actualizar `app/page.tsx`.

Flujo de trabajo local
1. Instala dependencias: 
```bash
npm install
```
2. Ejecuta en desarrollo:
```bash
npm run dev
```
3. Para pruebas de autenticación, agrega variables en `.env` o en el panel de Vercel.

Notas finales
- Esta rama `feat/hero-gallery-auth` añade la hero, la galería, botones de autenticación y un checkout/endpoint de pedidos.
# Vercel cache bust
