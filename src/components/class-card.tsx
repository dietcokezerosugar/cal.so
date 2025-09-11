"use client";

import type { ClassDetails } from "@/types";
import { Book, Clock, FlaskConical, MapPin, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ClassCardProps = {
  classInfo: ClassDetails;
};

export function ClassCard({ classInfo }: ClassCardProps) {
  const isLab = classInfo.subject.toLowerCase().includes("(tutorial)") || classInfo.subject.toLowerCase().includes("(lab)");
  const Icon = isLab ? FlaskConical : Book;

  return (
    <Card className="overflow-hidden shadow-sm transition-shadow hover:shadow-md bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle className="flex items-center gap-3 text-base font-semibold text-card-foreground">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isLab ? 'bg-accent text-accent-foreground' : 'bg-primary/10 text-primary'}`}>
            <Icon className="h-5 w-5" />
          </div>
          {classInfo.subject.replace(/\s\((Tutorial|Lab)\)/i, "")}
        </CardTitle>
        {isLab && (
            <Badge variant="secondary">Lab Session</Badge>
        )}
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 pt-0 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{classInfo.time}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{classInfo.teacher}</span>
        </div>
        <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Room: {classInfo.room}</span>
        </div>
      </CardContent>
    </Card>
  );
}
