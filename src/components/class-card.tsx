"use client";

import type { ClassDetails } from "@/types";
import { Book, Clock, FlaskConical, MapPin, User, Utensils, Library, Briefcase, Dumbbell } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ClassCardProps = {
  classInfo: ClassDetails;
};

export function ClassCard({ classInfo }: ClassCardProps) {
  const subjectLower = classInfo.subject.toLowerCase();
  const isLab = subjectLower.includes("lab") || subjectLower.includes("practice");
  const isBreak = subjectLower.includes("break") || subjectLower.includes("lunch");
  const isLibrary = subjectLower.includes("library");
  const isOffice = subjectLower.includes("office");
  const isSports = subjectLower.includes("sports");

  let Icon = Book;
  let cardStyle = "bg-card";
  let iconStyle = "bg-primary/10 text-primary";

  if (isLab) {
    Icon = FlaskConical;
    iconStyle = "bg-amber-500/10 text-amber-500";
    cardStyle = "border-amber-500/20 bg-amber-500/5";
  } else if (isBreak) {
    Icon = Utensils;
    iconStyle = "bg-green-500/10 text-green-500";
    cardStyle = "border-green-500/20 bg-green-500/5";
  } else if (isLibrary) {
    Icon = Library;
    iconStyle = "bg-blue-500/10 text-blue-500";
    cardStyle = "border-blue-500/20 bg-blue-500/5";
  } else if (isOffice) {
    Icon = Briefcase;
    iconStyle = "bg-purple-500/10 text-purple-500";
    cardStyle = "border-purple-500/20 bg-purple-500/5";
  } else if (isSports) {
    Icon = Dumbbell;
    iconStyle = "bg-red-500/10 text-red-500";
    cardStyle = "border-red-500/20 bg-red-500/5";
  }

  const isActivity = isBreak || isLibrary || isOffice || isSports;

  return (
    <Card className={`overflow-hidden shadow-sm transition-shadow hover:shadow-md ${cardStyle}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle className="flex items-center gap-3 text-base font-semibold text-card-foreground">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconStyle}`}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="flex-1">{classInfo.subject.replace(/\s\((Tutorial|Lab)\)/i, "")}</span>
        </CardTitle>
        {isLab && (
            <Badge variant="secondary" className="whitespace-nowrap border-amber-500/50 bg-amber-500/10 text-amber-500">
              Lab
            </Badge>
        )}
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 pt-0 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{classInfo.time}</span>
        </div>
        {!isActivity && (
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{classInfo.teacher}</span>
            </div>
            <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Room: {classInfo.room}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}