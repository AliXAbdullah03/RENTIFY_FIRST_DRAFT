'use server';

/**
 * @fileOverview Enhances property descriptions using AI to make them more appealing.
 *
 * - enhancePropertyDescription - A function that enhances the property description.
 * - EnhancePropertyDescriptionInput - The input type for the enhancePropertyDescription function.
 * - EnhancePropertyDescriptionOutput - The return type for the enhancePropertyDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePropertyDescriptionInputSchema = z.object({
  description: z.string().describe('The current description of the property.'),
  propertyType: z.string().describe('The type of property (e.g., apartment, house, room, car, commercial space).'),
  targetAudience: z
    .string()
    .optional()
    .describe('The target audience for the property (e.g., students, families, business travelers).'),
  keyFeatures: z
    .string()
    .optional()
    .describe('A comma-separated list of key features of the property.'),
});
export type EnhancePropertyDescriptionInput = z.infer<typeof EnhancePropertyDescriptionInputSchema>;

const EnhancePropertyDescriptionOutputSchema = z.object({
  enhancedDescription: z.string().describe('The enhanced description of the property.'),
  suggestedImprovements: z.string().describe('A summary of the suggested improvements made to the description.'),
});
export type EnhancePropertyDescriptionOutput = z.infer<typeof EnhancePropertyDescriptionOutputSchema>;

export async function enhancePropertyDescription(
  input: EnhancePropertyDescriptionInput
): Promise<EnhancePropertyDescriptionOutput> {
  return enhancePropertyDescriptionFlow(input);
}

const enhancePropertyDescriptionPrompt = ai.definePrompt({
  name: 'enhancePropertyDescriptionPrompt',
  input: {schema: EnhancePropertyDescriptionInputSchema},
  output: {schema: EnhancePropertyDescriptionOutputSchema},
  prompt: `You are an expert property description writer. You will enhance the provided property description to make it more appealing to potential renters.

Consider the property type, target audience, and key features to tailor the description.

Original Description: {{{description}}}
Property Type: {{{propertyType}}}
Target Audience: {{#if targetAudience}}{{{targetAudience}}}{{else}}General{{/if}}
Key Features: {{#if keyFeatures}}{{{keyFeatures}}}{{else}}Not specified{{/if}}

Enhanced Description (remember to include suggested improvements summary):
`,
});

const enhancePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'enhancePropertyDescriptionFlow',
    inputSchema: EnhancePropertyDescriptionInputSchema,
    outputSchema: EnhancePropertyDescriptionOutputSchema,
  },
  async input => {
    const {output} = await enhancePropertyDescriptionPrompt(input);
    return output!;
  }
);
