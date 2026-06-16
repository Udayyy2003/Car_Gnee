import { usePWAInstall } from "@/hooks/usePWAInstall";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useState } from "react";

export function PWAInstallBanner() {
  const { canInstall, isInstalled, installApp } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isInstalled || !canInstall || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    const installed = await installApp();
    if (installed) {
      toast.success("Car Gnee installed successfully!");
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#2d8b3f] to-[#1a5c27] text-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex-1">
        <h3 className="text-lg sm:text-xl font-bold mb-1">Install Car Gnee App</h3>
        <p className="text-sm sm:text-base opacity-90">
          Get quick access to your dashboard from your home screen.
        </p>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Button
          onClick={handleInstall}
          className="bg-white text-[#2d8b3f] hover:bg-gray-100 font-semibold flex-1 sm:flex-none"
        >
          Install App
        </Button>
        <Button
          variant="ghost"
          onClick={() => setIsDismissed(true)}
          className="text-white hover:bg-white/20 p-2"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}