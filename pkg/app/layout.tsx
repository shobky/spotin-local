import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getCurrentSession } from "@/auth";
import { ThemeProvider } from "@/context/themeProvider";
import { ReduxProvider } from "@/context/reduxProvider";
import { SessionProvider } from "@/context/sessionProvider";
import Navigation from "@/components/navigation";
import ShortCutContainer from "@/components/container/shortCutContainer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotin",
  description: "Spotin's POS and Admin Dashboard",
};

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default async function RootLayout(props: Props) {
  const sesstion = await getCurrentSession();
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className}`}>
        <Toaster/>
        <ShortCutContainer />
        <ThemeProvider>
          <SessionProvider session={sesstion}>
            <ReduxProvider>
              <Navigation session={sesstion} />
              <div className="w-full h-[calc(100vh-3rem)] p-6">
                {props.children}
                {props.modal}
              </div>
            </ReduxProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
