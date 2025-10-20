import { auth } from '@/auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Rutas públicas - acceso libre
  const publicPaths = [
    '/',
    '/login',
    '/api/auth',
    '/_next',
    '/favicon.ico'
  ];

  const isPublicPath = publicPaths.some(path => 
    nextUrl.pathname === path || 
    nextUrl.pathname.startsWith('/api/auth') ||
    nextUrl.pathname.startsWith('/_next') ||
    nextUrl.pathname.match(/\.(png|jpg|jpeg|svg|ico)$/)
  );

  // Si es una ruta pública, permitir acceso
  if (isPublicPath) {
    return;
  }

  // 🔒 RUTAS PROTEGIDAS: Si no está logueado y quiere acceder al dashboard
  if (!isLoggedIn && nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  // Si está logueado y está en el login, redirigir al dashboard
  if (isLoggedIn && nextUrl.pathname === '/login') {
    return Response.redirect(new URL('/dashboard', nextUrl));
  }
});

export const config = {
  matcher: [
    // Aplica middleware a todas las rutas excepto las estáticas
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};