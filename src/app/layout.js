import "./globals.css";

export const metadata = {
  title: "Basketball Stats",
  description: "A simple app to track basketball stats",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
