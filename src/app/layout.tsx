import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Punith B | AI / ML & Backend Engineer",
  description:
    "Portfolio of Punith B, a Bengaluru-based engineer building AI-powered products, multi-agent systems and real-time backends.",
  keywords: ["Punith B", "AI Engineer", "Machine Learning", "Backend Developer", "FastAPI", "Django", "React", "Portfolio"],
  authors: [{ name: "Punith B" }],
  openGraph: {
    title: "Punith B | AI / ML & Backend Engineer",
    description: "AI-powered products, multi-agent systems and real-time backends.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#f1eee6" },
  ],
};

// Runs before paint so the saved (or system) theme never flashes the wrong palette.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
