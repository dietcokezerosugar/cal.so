"use client";

import { useState, useEffect } from 'react';
import { PrnInput } from '@/components/prn-input';
import { ScheduleDisplay } from '@/components/schedule-display';
import { Loader2 } from 'lucide-react';

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
    <main className="container mx-auto max-w-2xl p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      {!prn ? (
        <PrnInput onPrnSubmit={handlePrnSubmit} />
      ) : (
        <ScheduleDisplay prn={prn} onChangePrn={handleChangePrn} />
      )}
    </main>
  );
}
