import { Main } from "@/components/template/main";
import "./globals.css";
import { SearchProvider } from "@/context/searchContext";
import { Toaster } from "sonner";

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
      <body>
        <SearchProvider>
          <Main>{children}</Main>
          <Toaster richColors position="top-center"/>
        </SearchProvider>
      </body>
    </html>
  );
}
