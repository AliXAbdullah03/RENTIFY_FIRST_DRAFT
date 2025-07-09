'use server';

/**
 * @fileOverview Generates catchy property titles using AI.
 *
 * - generatePropertyTitle - A function that generates property titles.
 * - GeneratePropertyTitleInput - The input type for the generatePropertyTitle function.
 * - GeneratePropertyTitleOutput - The return type for the generatePropertyTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePropertyTitleInputSchema = z.object({
  propertyType: z.string().describe('The type of property (e.g., apartment, house, room, car, commercial space).'),
  location: z.string().describe('The location of the property (e.g., New York, NY).'),
  keyFeatures: z
    .string()
    .optional()
    .describe('A comma-separated list of key features of the property.'),
});
export type GeneratePropertyTitleInput = z.infer<typeof GeneratePropertyTitleInputSchema>;

const GeneratePropertyTitleOutputSchema = z.object({
  titles: z.array(z.string()).describe('A list of 3-5 catchy and descriptive titles for the property listing.'),
});
export type GeneratePropertyTitleOutput = z.infer<typeof GeneratePropertyTitleOutputSchema>;

export async function generatePropertyTitle(
  input: GeneratePropertyTitleInput
): Promise<GeneratePropertyTitleOutput> {
  return generatePropertyTitleFlow(input);
}

const generatePropertyTitlePrompt = ai.definePrompt({
  name: 'generatePropertyTitlePrompt',
  input: {schema: GeneratePropertyTitleInputSchema},
  output: {schema: GeneratePropertyTitleOutputSchema},
  prompt: `You are a real estate marketing expert who excels at writing catchy and effective property listing titles.

Generate 3-5 compelling titles for the following property. The titles should be appealing to potential renters and highlight the key aspects.

Property Type: {{{propertyType}}}
Location: {{{location}}}
Key Features: {{#if keyFeatures}}{{{keyFeatures}}}{{else}}Not specified{{/if}}

Generate the titles now.
`,
});

const generatePropertyTitleFlow = ai.defineFlow(
  {
    name: 'generatePropertyTitleFlow',
    inputSchema: GeneratePropertyTitleInputSchema,
    outputSchema: GeneratePropertyTitleOutputSchema,
  },
  async input => {
    const {output} = await generatePropertyTitlePrompt(input);
    return output!;
  }
);
