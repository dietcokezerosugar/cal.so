'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating emotional sentiment suggestions
 * related to a student's classes in their daily schedule.
 *
 * - moodAnalyzerSuggestion - A function that generates emotional sentiment suggestions for a given class.
 * - MoodAnalyzerSuggestionInput - The input type for the moodAnalyzerSuggestion function.
 * - MoodAnalyzerSuggestionOutput - The return type for the moodAnalyzerSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodAnalyzerSuggestionInputSchema = z.object({
  className: z.string().describe('The name of the class.'),
});
export type MoodAnalyzerSuggestionInput = z.infer<typeof MoodAnalyzerSuggestionInputSchema>;

const MoodAnalyzerSuggestionOutputSchema = z.object({
  sentimentSuggestion: z.string().describe('An emotional sentiment suggestion related to the class.'),
});
export type MoodAnalyzerSuggestionOutput = z.infer<typeof MoodAnalyzerSuggestionOutputSchema>;

export async function moodAnalyzerSuggestion(input: MoodAnalyzerSuggestionInput): Promise<MoodAnalyzerSuggestionOutput> {
  return moodAnalyzerSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moodAnalyzerSuggestionPrompt',
  input: {schema: MoodAnalyzerSuggestionInputSchema},
  output: {schema: MoodAnalyzerSuggestionOutputSchema},
  prompt: `As a student, generate an emotional sentiment suggestion related to the class: "{{{className}}}". This suggestion should quickly give a sense of motivation and fun aspects related to attending this class.  The suggestion should be one short sentence long.`,
});

const moodAnalyzerSuggestionFlow = ai.defineFlow(
  {
    name: 'moodAnalyzerSuggestionFlow',
    inputSchema: MoodAnalyzerSuggestionInputSchema,
    outputSchema: MoodAnalyzerSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
