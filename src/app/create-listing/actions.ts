'use server';
import { enhancePropertyDescription, EnhancePropertyDescriptionInput, EnhancePropertyDescriptionOutput } from '@/ai/flows/enhance-property-description';
import { generatePropertyTitle, GeneratePropertyTitleInput, GeneratePropertyTitleOutput } from '@/ai/flows/generate-property-title';

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

export async function generateTitleAction(
  input: GeneratePropertyTitleInput
): Promise<GeneratePropertyTitleOutput> {
  try {
    const output = await generatePropertyTitle(input);
    return output;
  } catch (error) {
    console.error('Error generating titles:', error);
    // In a real app, you would handle this error more gracefully
    throw new Error('Failed to generate titles with AI.');
  }
}
