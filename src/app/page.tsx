
"use client";

import { useState, useEffect } from 'react';
import { PrnInput } from '@/components/prn-input';
import { ScheduleDisplay } from '@/components/schedule-display';
import { Loader2, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [prn, setPrn] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedPrn = localStorage.getItem('classcast_prn');
      if (storedPrn) {
        setPrn(storedPrn);
      }
    } catch (error) {
      console.error("Could not access localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePrnSubmit = (newPrn: string) => {
    try {
      localStorage.setItem('classcast_prn', newPrn);
      setPrn(newPrn);
    } catch (error) {
      console.error("Could not write to localStorage", error);
    }
  };

  const handleChangePrn = () => {
    try {
      localStorage.removeItem('classcast_prn');
      setPrn(null);
    } catch (error) {
      console.error("Could not remove from localStorage", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <main className="container mx-auto max-w-2xl p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
        {!prn ? (
          <PrnInput onPrnSubmit={handlePrnSubmit} />
        ) : (
          <ScheduleDisplay prn={prn} onChangePrn={handleChangePrn} />
        )}
      </main>
      <footer className="fixed bottom-4 right-0 left-0 flex justify-center items-center text-center text-xs text-muted-foreground p-2 sm:justify-end sm:right-4 sm:left-auto">
        <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border shadow-sm">
          Made with 
          <Heart className="inline-block h-3 w-3 mx-1 text-red-500 fill-red-500" />
          by{' '}
          <Link
            href="https://x.com/snc0x"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary font-medium"
          >
            snc0x
          </Link>
        </div>
      </footer>
    </>
  );
}
