import { NextResponse } from "next/server";
import { getSession } from "./lib/get-session";
import { PUBLIC_ROUTES } from "./lib/routes";

export async function proxy(req: NextResponse) {
  const { pathname } = new URL(req.url);
  const session = await getSession();
  const user = session?.user;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  if (!user) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (user.role === 'USER' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};