import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Toaster } from '@/Components/ui/toaster';
import { Button } from '@/Components/ui/button';
import { ArrowRight, Menu } from 'lucide-react';

export default function App({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Deteksi layar besar
  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 1024; // lg: breakpoint (1024px)
      setIsLargeScreen(large);

      // Jika layar besar, pastikan sidebar tetap terbuka
      if (large) {
        setShowSidebar(true);
      }
    };

    handleResize(); // check pertama kali
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="flex items-start relative min-h-screen">
        {/* Tombol toggle hanya muncul di layar kecil */}
        {!isLargeScreen && (
          <Button
            onClick={() => setShowSidebar((prev) => !prev)}
            className="fixed top-1/2 -left-1 z-[100] lg:hidden"
            variant="outline"
            size="icon"
          >
            <ArrowRight />
          </Button>
        )}

        {/* Sidebar */}
        <Sidebar show={showSidebar} setShow={setShowSidebar} />

        {/* Main content */}
        <main
          className={`transition-all duration-300 w-full ${
            isLargeScreen ? 'lg:ml-[300px]' : ''
          }`}
        >
          {children}
        </main>

        <Toaster />
      </div>
    </>
  );
}
