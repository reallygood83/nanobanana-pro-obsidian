import { requestUrl } from 'obsidian';
import {
  AIProvider,
  PromptGenerationResult,
  GenerationError,
  PROVIDER_CONFIGS
} from '../types';
import { SYSTEM_PROMPT } from '../settingsData';

export class PromptService {
  /**
   * Generate an image prompt from note content using the specified AI provider
   */
  async generatePrompt(
    noteContent: string,
    provider: AIProvider,
    model: string,
    apiKey: string
  ): Promise<PromptGenerationResult> {
    if (!apiKey) {
      throw this.createError('INVALID_API_KEY', `${PROVIDER_CONFIGS[provider].name} API key is not configured`);
    }

    if (!noteContent.trim()) {
      throw this.createError('NO_CONTENT', 'Note content is empty');
    }

    try {
      const prompt = await this.callProvider(provider, model, apiKey, noteContent);
      return {
        prompt,
        model,
        provider
      };
    } catch (error) {
      if ((error as GenerationError).type) {
        throw error;
      }
      throw this.handleApiError(error, provider);
    }
  }

  private async callProvider(
    provider: AIProvider,
    model: string,
    apiKey: string,
    content: string
  ): Promise<string> {
    switch (provider) {
      case 'openai':
        return this.callOpenAI(model, apiKey, content);
      case 'google':
        return this.callGoogle(model, apiKey, content);
      case 'anthropic':
        return this.callAnthropic(model, apiKey, content);
      case 'xai':
        return this.callXAI(model, apiKey, content);
      default:
        throw this.createError('UNKNOWN', `Unknown provider: ${provider}`);
    }
  }

  private async callOpenAI(model: string, apiKey: string, content: string): Promise<string> {
    const response = await requestUrl({
      url: 'https://api.openai.com/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Create an image prompt for the following content:\n\n${content}` }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (response.status !== 200) {
      throw this.handleHttpError(response.status, response.text, 'openai');
    }

    const data = response.json;
    return data.choices[0]?.message?.content?.trim() || '';
  }

  private async callGoogle(model: string, apiKey: string, content: string): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await requestUrl({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // System instruction - REST API uses snake_case
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [{
          role: 'user',
          parts: [{
            text: `Create an image prompt for the following content:\n\n${content}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    if (response.status !== 200) {
      throw this.handleHttpError(response.status, response.text, 'google');
    }

    const data = response.json;

    // Debug: check if prompt was generated properly
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    if (!generatedText) {
      console.error('Gemini API response:', JSON.stringify(data, null, 2));
      throw this.createError('GENERATION_FAILED', 'Gemini API returned empty response. Check console for details.');
    }

    return generatedText;
  }

  private async callAnthropic(model: string, apiKey: string, content: string): Promise<string> {
    const response = await requestUrl({
      url: 'https://api.anthropic.com/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: `Create an image prompt for the following content:\n\n${content}` }
        ]
      })
    });

    if (response.status !== 200) {
      throw this.handleHttpError(response.status, response.text, 'anthropic');
    }

    const data = response.json;
    return data.content?.[0]?.text?.trim() || '';
  }

  private async callXAI(model: string, apiKey: string, content: string): Promise<string> {
    const response = await requestUrl({
      url: 'https://api.x.ai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Create an image prompt for the following content:\n\n${content}` }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (response.status !== 200) {
      throw this.handleHttpError(response.status, response.text, 'xai');
    }

    const data = response.json;
    return data.choices[0]?.message?.content?.trim() || '';
  }

  private handleHttpError(status: number, responseText: string, provider: AIProvider): GenerationError {
    if (status === 401 || status === 403) {
      return this.createError('INVALID_API_KEY', `Invalid ${PROVIDER_CONFIGS[provider].name} API key`);
    }
    if (status === 429) {
      return this.createError('RATE_LIMIT', 'API rate limit exceeded. Please wait and try again.', true);
    }
    if (status >= 500) {
      return this.createError('NETWORK_ERROR', 'Server error. Please try again later.', true);
    }
    return this.createError('GENERATION_FAILED', `API error: ${responseText}`);
  }

  private handleApiError(error: unknown, provider: AIProvider): GenerationError {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes('net::') || errorMessage.includes('network')) {
      return this.createError('NETWORK_ERROR', 'Network connection error. Check your internet connection.', true);
    }

    return this.createError('GENERATION_FAILED', `${PROVIDER_CONFIGS[provider].name} error: ${errorMessage}`);
  }

  private createError(type: GenerationError['type'], message: string, retryable = false): GenerationError {
    return { type, message, retryable };
  }
}
