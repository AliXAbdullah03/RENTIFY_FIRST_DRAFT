'use server';
import { enhancePropertyDescription, EnhancePropertyDescriptionInput, EnhancePropertyDescriptionOutput } from '@/ai/flows/enhance-property-description';

export async function enhanceDescriptionAction(
  input: EnhancePropertyDescriptionInput
): Promise<EnhancePropertyDescriptionOutput> {
  try {
    const output = await enhancePropertyDescription(input);
    return output;
  } catch (error) {
    console.error('Error enhancing description:', error);
    // In a real app, you would handle this error more gracefully
    throw new Error('Failed to enhance description with AI.');
  }
}
