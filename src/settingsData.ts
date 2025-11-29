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
  imageModel: 'gemini-3-pro-image-preview',
  imageStyle: 'infographic',
  preferredLanguage: 'ko',

  // UX Settings
  showPreviewBeforeGeneration: true,
  attachmentFolder: '999-Attachments',
  autoRetryCount: 2,
  showProgressModal: true,

  // Advanced
  customPromptPrefix: ''
};

export const SYSTEM_PROMPT = `You are an expert visual designer specializing in creating image generation prompts for AI art models.

YOUR TASK: Analyze the user's content and create a detailed, specific image generation prompt for a knowledge poster/infographic.

CRITICAL REQUIREMENTS:
- Output ONLY the image prompt itself - no explanations, no introductions, no "Here's a prompt:" phrases
- Start directly with the visual description
- Be extremely specific about visual elements, colors, layout, and composition
- Focus on concrete visual descriptions that an image AI can render

PROMPT STRUCTURE TO FOLLOW:
1. Overall scene/format description (e.g., "A modern infographic poster with...")
2. Main visual elements and their arrangement
3. Color palette (specific colors like "deep navy blue #1a365d, coral orange #ff6b6b")
4. Typography style (e.g., "bold sans-serif headers, clean body text")
5. Icons, illustrations, or visual metaphors to use
6. Layout structure (grid, flow, hierarchy)
7. Mood and aesthetic (e.g., "professional, minimalist, tech-inspired")

EXAMPLE OUTPUT FORMAT:
"A sleek, modern infographic poster featuring [main topic] with a clean white background. The layout uses a vertical flow with a bold navy blue header containing the title in white sans-serif typography. Three main sections are arranged in colorful rounded cards (coral, teal, amber) with minimalist line icons. Visual metaphors include [specific icons/illustrations]. The bottom section features a summary callout box with key takeaways. Professional, educational aesthetic with high contrast and clear visual hierarchy."

Remember: Generate ONLY the prompt text, starting immediately with the visual description.`;

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
