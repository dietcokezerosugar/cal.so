"use client";

import { useState } from "react";
import type { ClassDetails } from "@/types";
import { Book, Clock, Loader2, MapPin, Sparkles, User } from "lucide-react";

import { moodAnalyzerSuggestion } from "@/ai/flows/mood-analyzer-suggestion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

type ClassCardProps = {
  classInfo: ClassDetails;
};

export function ClassCard({ classInfo }: ClassCardProps) {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleMoodAnalysis = async () => {
    if (suggestion) return; // Don't re-fetch if already have a suggestion
    setIsGenerating(true);
    try {
      const result = await moodAnalyzerSuggestion({ className: classInfo.subject });
      setSuggestion(result.sentimentSuggestion);
    } catch (error) {
      console.error("Failed to get mood suggestion:", error);
      toast({
        variant: "destructive",
        title: "AI Suggestion Failed",
        description: "Could not generate a suggestion at this time.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-primary/5 p-4">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-primary">
          <Book className="h-5 w-5" />
          {classInfo.subject}
        </CardTitle>
        <Popover onOpenChange={(open) => open && handleMoodAnalysis()}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-accent hover:bg-accent/10 hover:text-accent">
              <Sparkles className="h-5 w-5" />
              <span className="sr-only">Get motivation</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Vibe Check</h4>
              <div className="text-sm text-muted-foreground">
                {isGenerating && (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Brewing some motivation...</span>
                  </div>
                )}
                {suggestion}
              </div>
            </div>
          </PopoverContent>
        </Popover>
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
