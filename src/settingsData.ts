import { NanoBananaSettings } from './types';

export const DEFAULT_SETTINGS: NanoBananaSettings = {
  // API Keys
  googleApiKey: '',
  openaiApiKey: '',
  anthropicApiKey: '',
  xaiApiKey: '',

  // Prompt Generation
  selectedProvider: 'google',
  promptModel: 'gemini-2.5-flash',

  // Image Generation
  imageModel: 'gemini-2.5-flash',
  imageStyle: 'infographic',

  // UX Settings
  showPreviewBeforeGeneration: true,
  attachmentFolder: '999-Attachments',
  autoRetryCount: 2,
  showProgressModal: true,

  // Advanced
  customPromptPrefix: ''
};

export const SYSTEM_PROMPT = `You are an expert visual designer and infographic creator. Your task is to analyze the given content and generate a detailed prompt for creating a visually stunning knowledge poster/infographic.

The prompt you generate will be used by an AI image generation model. Be specific about:
1. Visual layout and composition
2. Color scheme and style
3. Typography hierarchy
4. Icons and visual elements
5. Data visualization if applicable
6. Overall mood and aesthetic

Generate ONLY the image prompt, no explanations or additional text.

Important guidelines:
- The poster should be educational and informative
- Use modern, clean design principles
- Include visual representations of key concepts
- Make it visually engaging and easy to understand
- The text in the image should be minimal but impactful
- Focus on visual storytelling

Output format: A single, detailed image generation prompt.`;

export const IMAGE_GENERATION_PROMPT_TEMPLATE = `Create a stunning, professional knowledge poster/infographic with the following specifications:

STYLE: {style}

CONTENT TO VISUALIZE:
{prompt}

Design requirements:
- Modern, clean aesthetic with professional typography
- Clear visual hierarchy with main title, subtopics, and details
- Use icons and visual metaphors to represent concepts
- Include subtle decorative elements that enhance readability
- Color palette should be harmonious and professional
- Layout should guide the eye through the information
- Text should be minimal but impactful
- Include visual representations of data/concepts where applicable
- Make it suitable for educational/professional use
- Ensure high contrast for readability`;
