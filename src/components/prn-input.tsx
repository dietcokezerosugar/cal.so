"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BookMarked, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  prn_suffix: z.string().length(4, "Please enter the last 4 digits of your PRN."),
});

type PrnInputProps = {
  onPrnSubmit: (prn: string) => void;
};

const PRN_PREFIX = "2025080";

export function PrnInput({ onPrnSubmit }: PrnInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prn_suffix: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const fullPrn = `${PRN_PREFIX}${values.prn_suffix}`;
    onPrnSubmit(fullPrn);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md border-0 bg-transparent sm:bg-card sm:border sm:shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BookMarked className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome to Cal.so</CardTitle>
          <CardDescription>Your daily schedule, simplified.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prn_suffix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last 4 Digits of your PRN</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <span className="rounded-md border border-input bg-background px-3 py-2 text-muted-foreground">{PRN_PREFIX}</span>
                        <Input placeholder="1234" {...field} maxLength={4} className="text-center" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Enter the last 4 digits of your Personal Registration Number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg">
                <LogIn className="mr-2 h-4 w-4" />
                View My Schedule
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
