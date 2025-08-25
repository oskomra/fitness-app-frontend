import { ThemeProvider } from "@/providers/theme-provider";
import AuthProvider from "@/providers/auth-provider";
import "./globals.css";
import SideBar from "@/components/side-bar";
import store from "@/store/store";
import ReduxProvider from "@/providers/redux-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>
              <div className="flex h-screen">
                <SideBar />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </ReduxProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
