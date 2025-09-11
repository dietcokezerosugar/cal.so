"use client";

import type { ClassDetails } from "@/types";
import { Book, Clock, MapPin, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ClassCardProps = {
  classInfo: ClassDetails;
};

export function ClassCard({ classInfo }: ClassCardProps) {
  return (
    <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 p-4">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-primary">
          <Book className="h-5 w-5" />
          {classInfo.subject}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{classInfo.time}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{classInfo.teacher}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{classInfo.room}</span>
        </div>
      </CardContent>
    </Card>
  );
}
