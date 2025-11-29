// Provider types
export type AIProvider = 'openai' | 'google' | 'anthropic' | 'xai';

export type ImageStyle = 'infographic' | 'poster' | 'diagram' | 'mindmap' | 'timeline';

// Plugin settings interface
export interface NanoBananaSettings {
  // API Keys
  googleApiKey: string;
  openaiApiKey: string;
  anthropicApiKey: string;
  xaiApiKey: string;

  // Prompt Generation
  selectedProvider: AIProvider;
  promptModel: string;

  // Image Generation
  imageModel: string;
  imageStyle: ImageStyle;

  // UX Settings
  showPreviewBeforeGeneration: boolean;
  attachmentFolder: string;
  autoRetryCount: number;
  showProgressModal: boolean;

  // Advanced
  customPromptPrefix: string;
}

// Progress states
export type ProgressStep =
  | 'analyzing'
  | 'generating-prompt'
  | 'preview'
  | 'generating-image'
  | 'saving'
  | 'embedding'
  | 'complete'
  | 'error';

export interface ProgressState {
  step: ProgressStep;
  progress: number;
  message: string;
  details?: string;
}

// Error types
export type ErrorType =
  | 'INVALID_API_KEY'
  | 'RATE_LIMIT'
  | 'NETWORK_ERROR'
  | 'GENERATION_FAILED'
  | 'CONTENT_FILTERED'
  | 'NO_CONTENT'
  | 'SAVE_ERROR'
  | 'UNKNOWN';

export interface GenerationError {
  type: ErrorType;
  message: string;
  details?: string;
  retryable: boolean;
}

// API Response types
export interface PromptGenerationResult {
  prompt: string;
  model: string;
  provider: AIProvider;
}

export interface ImageGenerationResult {
  imageData: string; // base64
  mimeType: string;
  model: string;
}

export interface GenerationResult {
  success: boolean;
  imagePath?: string;
  error?: GenerationError;
}

// Provider configurations
export interface ProviderConfig {
  name: string;
  endpoint: string;
  defaultModel: string;
  models: string[];
}

export const PROVIDER_CONFIGS: Record<AIProvider, ProviderConfig> = {
  openai: {
    name: 'OpenAI',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    defaultModel: 'gpt-4o',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo']
  },
  google: {
    name: 'Google Gemini',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    defaultModel: 'gemini-2.5-flash',
    models: ['gemini-2.5-flash', 'gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-1.5-flash']
  },
  anthropic: {
    name: 'Anthropic',
    endpoint: 'https://api.anthropic.com/v1/messages',
    defaultModel: 'claude-sonnet-4-20250514',
    models: ['claude-sonnet-4-20250514', 'claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307']
  },
  xai: {
    name: 'xAI',
    endpoint: 'https://api.x.ai/v1/chat/completions',
    defaultModel: 'grok-4-1-fast',
    models: ['grok-4-1-fast', 'grok-beta', 'grok-2']
  }
};

export const IMAGE_STYLES: Record<ImageStyle, string> = {
  infographic: 'Modern infographic with icons, charts, and visual hierarchy',
  poster: 'Bold poster design with strong typography and imagery',
  diagram: 'Technical diagram with clear connections and labels',
  mindmap: 'Mind map style with central concept and branches',
  timeline: 'Timeline format showing progression and milestones'
};
