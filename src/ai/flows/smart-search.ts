'use server';

/**
 * @fileOverview Finds the best property matches based on a natural language query.
 *
 * - smartSearch - A function that finds the best property matches.
 * - SmartSearchInput - The input type for the smartSearch function.
 * - SmartSearchOutput - The return type for the smartSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { properties } from '@/lib/mock-data';

const SmartSearchInputSchema = z.object({
  query: z.string().describe('The user\'s rental inquiry in natural language.'),
});
export type SmartSearchInput = z.infer<typeof SmartSearchInputSchema>;

const SmartSearchOutputSchema = z.object({
  matchedPropertyIds: z.array(z.string()).describe('A list of property IDs that best match the user\'s query.'),
  reasoning: z.string().describe('A brief explanation of why these properties were chosen.'),
});
export type SmartSearchOutput = z.infer<typeof SmartSearchOutputSchema>;

export async function smartSearch(
  input: SmartSearchInput
): Promise<SmartSearchOutput> {
  return smartSearchFlow(input);
}

const smartSearchPrompt = ai.definePrompt({
  name: 'smartSearchPrompt',
  input: {schema: z.object({
    query: SmartSearchInputSchema.shape.query,
    // Add properties to the prompt input schema
    properties: z.any().describe('A JSON string of all available properties.'),
  })},
  output: {schema: SmartSearchOutputSchema},
  prompt: `You are an expert real estate agent. Your task is to find the best rental properties for a user based on their natural language query.

Analyze the user's query and compare it against the list of available properties provided below.

Return a list of property IDs that are the best fit. Also provide a brief reasoning for your selection.

User Query: {{{query}}}

Available Properties (JSON):
{{{properties}}}

Analyze the query and properties and return the best matches.
`,
});

const smartSearchFlow = ai.defineFlow(
  {
    name: 'smartSearchFlow',
    inputSchema: SmartSearchInputSchema,
    outputSchema: SmartSearchOutputSchema,
  },
  async (input) => {
    // In a real app, you would fetch this from a database.
    // For this demo, we'll use the mock data directly.
    const allProperties = properties;

    const {output} = await smartSearchPrompt({
      query: input.query,
      properties: JSON.stringify(allProperties.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          type: p.type,
          price: p.price,
          location: p.location,
          amenities: p.amenities,
          availableNow: p.availableNow,
          furnishing: p.furnishing,
          details: p.details,
      }))),
    });

    return output!;
  }
);
