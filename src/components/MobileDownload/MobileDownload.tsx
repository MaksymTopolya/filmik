import React, { useState, useEffect } from 'react';


interface DeferredPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
  }>;
}

const MobileDownload: React.FC = () => {

  const [deferredPrompt, setDeferredPrompt] = useState<DeferredPromptEvent | null>(null);
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      const e = event as DeferredPromptEvent; 
      e.preventDefault(); 
      setDeferredPrompt(e); 
      setShowButton(true); 
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); 
      deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          setDeferredPrompt(null);
          setShowButton(false); 
        });
    }
  };

  return (
    <div className="App">
      <h1>Download to your mobile screen</h1>
      {showButton && (
        <button className="add-to-home-screen" onClick={handleAddToHomeScreen}>
          Add to Home Screen
        </button>
      )}
    </div>
  );
};

export default MobileDownload;
