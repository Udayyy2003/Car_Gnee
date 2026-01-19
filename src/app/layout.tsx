import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Car Gnee - Waterless Shine & Care | Premium Eco-Friendly Car Cleaning",
  description: "Car Gnee offers premium waterless car cleaning services using eco-friendly solutions and high-GSM microfiber cloths. Get superior shine without damaging your car's paint or interior.",
  keywords: "waterless car wash, eco-friendly car cleaning, premium car care, car detailing, microfiber cleaning",
  openGraph: {
    title: "Car Gnee - Waterless Shine & Care",
    description: "Premium waterless car cleaning services using eco-friendly solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
