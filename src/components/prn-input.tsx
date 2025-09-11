"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BookMarked, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  prn: z.string().min(1, "Please enter your PRN to continue."),
});

type PrnInputProps = {
  onPrnSubmit: (prn: string) => void;
};

export function PrnInput({ onPrnSubmit }: PrnInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prn: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onPrnSubmit(values.prn);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BookMarked className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-3xl">Welcome to ClassCast</CardTitle>
          <CardDescription>Your daily schedule, simplified.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student PRN (Personal Registration Number)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2022BTECS00123" {...field} />
                    </FormControl>
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
