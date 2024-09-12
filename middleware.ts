// middleware.ts
import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/utils/lib';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Excluir la ruta /login del middleware
  const { pathname } = req.nextUrl;
  if (pathname === '/login') {
    return res; // Deja pasar la ruta /login sin redirigir
  }

  try {
    // Obtener la sesión
    const session = await getIronSession(req, res, sessionOptions);

    console.log('datos de sesión:', session);

    if (!session?.email || !session?.isLoggedIn) {
      // Redirige al usuario no autenticado a la página de login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } catch (error) {
    console.error('Error obteniendo la sesión:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: '/dashboard/:path*', // Aplica el middleware solo para /dashboard y sus subrutas
};
