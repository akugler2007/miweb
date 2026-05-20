import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/edeen-air"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "eDeen — Tu centro de jardinería en Mallorca" },
      {
        name: "description",
        content:
          "Centro de jardinería en Palma de Mallorca. Plantas, paisajismo, floristería para eventos y la cafetería Es Berenar. Te recibimos como un invitado.",
      },
      { name: "author", content: "eDeen — Espacio Natural" },
      { property: "og:title", content: "eDeen — Tu centro de jardinería en Mallorca" },
      {
        property: "og:description",
        content:
          "Plantas, paisajismo, floristería y cafetería en Palma. Un espacio para reconectar con la naturaleza.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { pathname } = useLocation();

  if (pathname.startsWith('/stock')) {
    return <Outlet />;
  }

  const scenicRoutes = new Set([
    "/edeen-air",
    "/servicios",
    "/cafeteria",
    "/contacto",
    "/sobre-nosotros",
  ]);
  const hideFooter = scenicRoutes.has(pathname);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <SiteFooter />}
    </div>
  );
}
