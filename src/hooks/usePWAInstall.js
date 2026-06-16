
import { useState, useEffect } from 'react';

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const checkIsInstalled = () => {
    // Check for standalone display mode (Android/Chrome)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    // Check for iOS standalone mode
    const isIOSStandalone = 'standalone' in window.navigator && window.navigator.standalone === true;
    return isStandalone || isIOSStandalone;
  };

  useEffect(() => {
    // Check if already installed on mount
    setIsInstalled(checkIsInstalled());

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      setCanInstall(false);
      setDeferredPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setCanInstall(false);
      setDeferredPrompt(null);
      setIsInstalled(true);
      return true;
    }
    
    return false;
  };

  return { canInstall, isInstalled, installApp };
}
