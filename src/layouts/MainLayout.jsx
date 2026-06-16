import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { PWAInstallBanner } from "@/components/PWAInstallBanner.jsx";

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PWAInstallBanner />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
