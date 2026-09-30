import "./globals.css";

export const metadata = {
  title: "دايت كينج",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="bg-surface font-body-md text-on-surface">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
