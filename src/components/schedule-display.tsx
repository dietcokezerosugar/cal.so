"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { getGroupFromPRN, formatDate } from "@/lib/utils";
import type { ClassDetails, Timetable } from "@/types";
import { ClassCard } from "@/components/class-card";
import { BookMarked, CalendarIcon, Loader2, LogOut, Moon, Sun, UserCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type ScheduleDisplayProps = {
  prn: string;
  onChangePrn: () => void;
};

const dayMapping: { [key: number]: string } = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

export function ScheduleDisplay({ prn, onChangePrn }: ScheduleDisplayProps) {
  const [todaySchedule, setTodaySchedule] = useState<ClassDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { setTheme } = useTheme();
  
  const group = getGroupFromPRN(prn);

  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/timetable.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Timetable = await response.json();
        const dayOfWeek = dayMapping[selectedDate.getDay() as keyof typeof dayMapping];
        const scheduleForDay = data[group]?.[dayOfWeek] || [];
        setTodaySchedule(scheduleForDay);
      } catch (err) {
        setError("Could not fetch schedule. Please check your connection.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [group, selectedDate]);
  
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <BookMarked className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">
            Cal.so
          </h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 rounded-full p-2">
              <span className="font-bold sr-only sm:not-sr-only">{group}</span>
              <UserCircle className="h-6 w-6 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              PRN: {prn}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span>Toggle theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onChangePrn}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Change PRN</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-lg font-semibold text-foreground">
              Schedule
            </h2>
            <p className="text-sm text-muted-foreground">
              {formatDate(selectedDate)}
            </p>
        </div>
        <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className="w-auto justify-start text-left font-normal"
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{formatDate(selectedDate)}</span>
                <span className="sm:hidden">Change Date</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                />
            </PopoverContent>
        </Popover>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
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
        <Card className="flex h-48 flex-col items-center justify-center gap-4 border-dashed bg-muted/50">
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
