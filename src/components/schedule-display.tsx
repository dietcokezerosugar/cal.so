"use client";

import { useState, useEffect } from "react";
import { getGroupFromPRN, formatDate } from "@/lib/utils";
import type { ClassDetails, Timetable } from "@/types";
import { ClassCard } from "@/components/class-card";
import { BookMarked, Loader2, LogOut, UserCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

type ScheduleDisplayProps = {
  prn: string;
  onChangePrn: () => void;
};

export function ScheduleDisplay({ prn, onChangePrn }: ScheduleDisplayProps) {
  const [todaySchedule, setTodaySchedule] = useState<ClassDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  
  const group = getGroupFromPRN(prn);

  useEffect(() => {
    // This runs only on the client
    setCurrentDate(new Date());

    const fetchSchedule = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/timetable.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Timetable = await response.json();
        const dayOfWeek = new Date().getDay().toString();
        const scheduleForToday = data.schedule[dayOfWeek]?.[group] || [];
        setTodaySchedule(scheduleForToday);
      } catch (err) {
        setError("Could not fetch schedule. Please check your connection.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [group]);
  
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookMarked className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold tracking-tight">
            ClassCast
          </h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <span className="font-bold">{group}</span>
              <UserCircle className="h-6 w-6 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              PRN: {prn}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onChangePrn}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Change PRN</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Today's Schedule
        </h2>
        <p className="text-muted-foreground">
          {currentDate ? formatDate(currentDate) : <Skeleton className="h-4 w-48 mt-1" />}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      ) : error ? (
        <Card className="text-center">
            <CardContent className="p-6">
                <p className="text-destructive">{error}</p>
            </CardContent>
        </Card>
      ) : todaySchedule.length > 0 ? (
        <div className="grid gap-4">
          {todaySchedule.map((classInfo, index) => (
            <ClassCard key={index} classInfo={classInfo} />
          ))}
        </div>
      ) : (
        <Card className="flex h-48 flex-col items-center justify-center gap-4 border-dashed">
            <CardContent className="p-6 text-center">
                <span className="text-5xl">🎉</span>
                <p className="mt-4 text-lg font-medium">No lectures today!</p>
                <p className="text-muted-foreground">Enjoy your day off.</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
