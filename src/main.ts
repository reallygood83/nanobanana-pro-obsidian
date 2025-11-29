import { Plugin, MarkdownView, Notice, TFile } from 'obsidian';
import { NanoBananaSettings, GenerationError, ProgressState } from './types';
import { DEFAULT_SETTINGS } from './settingsData';
import { NanoBananaSettingTab } from './settings';
import { PromptService } from './services/promptService';
import { ImageService } from './services/imageService';
import { FileService } from './services/fileService';
import { ProgressModal } from './progressModal';
import { PreviewModal, PreviewModalResult } from './previewModal';

export default class NanoBananaPlugin extends Plugin {
  settings: NanoBananaSettings;
  private promptService: PromptService;
  private imageService: ImageService;
  private fileService: FileService;
  private lastPrompt: string = '';
  private lastNoteFile: TFile | null = null;
  private isGenerating: boolean = false;

  async onload() {
    await this.loadSettings();

    // Initialize services
    this.promptService = new PromptService();
    this.imageService = new ImageService();
    this.fileService = new FileService(this.app);

    // Register commands
    this.addCommand({
      id: 'generate-knowledge-poster',
      name: 'Generate Knowledge Poster',
      callback: () => this.generatePoster()
    });

    this.addCommand({
      id: 'generate-prompt-only',
      name: 'Generate Prompt Only (Copy to Clipboard)',
      callback: () => this.generatePromptOnly()
    });

    this.addCommand({
      id: 'regenerate-last-poster',
      name: 'Regenerate Last Poster',
      callback: () => this.regenerateLastPoster()
    });

    // Register settings tab
    this.addSettingTab(new NanoBananaSettingTab(this.app, this));

    console.log('NanoBanana PRO loaded');
  }

  onunload() {
    console.log('NanoBanana PRO unloaded');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  /**
   * Main generation flow
   */
  async generatePoster(): Promise<void> {
    if (this.isGenerating) {
      new Notice('Generation already in progress');
      return;
    }

    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!activeView || !activeView.file) {
      new Notice('Please open a note first');
      return;
    }

    const noteFile = activeView.file;
    const noteContent = await this.app.vault.read(noteFile);

    if (!noteContent.trim()) {
      new Notice('Note is empty. Please add some content first.');
      return;
    }

    // Check for required API key
    if (!this.settings.googleApiKey) {
      new Notice('Google API key is required for image generation. Please configure it in settings.');
      return;
    }

    // Get API key for selected provider
    const providerKey = this.getProviderApiKey();
    if (!providerKey) {
      new Notice(`${this.settings.selectedProvider} API key is not configured. Please check settings.`);
      return;
    }

    this.isGenerating = true;
    this.lastNoteFile = noteFile;

    let progressModal: ProgressModal | null = null;

    try {
      // Show progress modal if enabled
      if (this.settings.showProgressModal) {
        progressModal = new ProgressModal(this.app, this.settings.preferredLanguage);
        progressModal.open();
      }

      // Step 1: Generate prompt
      this.updateProgress(progressModal, {
        step: 'generating-prompt',
        progress: 20,
        message: '프롬프트 생성 중...'
      });

      const promptResult = await this.executeWithRetry(async () => {
        return await this.promptService.generatePrompt(
          noteContent,
          this.settings.selectedProvider,
          this.settings.promptModel,
          providerKey
        );
      });

      let finalPrompt = promptResult.prompt;
      this.lastPrompt = finalPrompt;

      // Add custom prefix if configured
      if (this.settings.customPromptPrefix) {
        finalPrompt = `${this.settings.customPromptPrefix}\n\n${finalPrompt}`;
      }

      // Step 2: Preview (if enabled)
      if (this.settings.showPreviewBeforeGeneration) {
        if (progressModal) {
          progressModal.close();
          progressModal = null;
        }

        const previewResult = await this.showPreviewModal(finalPrompt);

        if (!previewResult.confirmed) {
          this.isGenerating = false;
          return;
        }

        if (previewResult.regenerate) {
          this.isGenerating = false;
          return this.generatePoster(); // Recursive call to regenerate
        }

        finalPrompt = previewResult.prompt;

        // Reopen progress modal for image generation
        if (this.settings.showProgressModal) {
          progressModal = new ProgressModal(this.app, this.settings.preferredLanguage);
          progressModal.open();
        }
      }

      // Step 3: Generate image
      this.updateProgress(progressModal, {
        step: 'generating-image',
        progress: 50,
        message: '이미지 생성 중...'
      });

      const imageResult = await this.executeWithRetry(async () => {
        return await this.imageService.generateImage(
          finalPrompt,
          this.settings.googleApiKey,
          this.settings.imageModel,
          this.settings.imageStyle,
          this.settings.preferredLanguage
        );
      });

      // Step 4: Save image
      this.updateProgress(progressModal, {
        step: 'saving',
        progress: 80,
        message: '파일 저장 중...'
      });

      const imagePath = await this.fileService.saveImage(
        imageResult.imageData,
        imageResult.mimeType,
        noteFile,
        this.settings.attachmentFolder
      );

      // Step 5: Embed in note
      this.updateProgress(progressModal, {
        step: 'embedding',
        progress: 95,
        message: '노트에 삽입 중...'
      });

      await this.fileService.embedImageInNote(noteFile, imagePath);

      // Success
      this.updateProgress(progressModal, {
        step: 'complete',
        progress: 100,
        message: '완료!'
      });

      if (progressModal) {
        progressModal.showSuccess(imagePath);
      } else {
        new Notice('✅ Knowledge Poster generated successfully!');
      }

    } catch (error) {
      const genError = error as GenerationError;

      if (progressModal) {
        progressModal.showError(genError);
      } else {
        new Notice(`❌ Generation failed: ${genError.message}`);
      }

      console.error('NanoBanana PRO error:', error);
    } finally {
      this.isGenerating = false;
    }
  }

  /**
   * Generate prompt only and copy to clipboard
   */
  async generatePromptOnly() {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!activeView || !activeView.file) {
      new Notice('Please open a note first');
      return;
    }

    const noteContent = await this.app.vault.read(activeView.file);

    if (!noteContent.trim()) {
      new Notice('Note is empty');
      return;
    }

    const providerKey = this.getProviderApiKey();
    if (!providerKey) {
      new Notice(`${this.settings.selectedProvider} API key is not configured`);
      return;
    }

    try {
      new Notice('Generating prompt...');

      const result = await this.promptService.generatePrompt(
        noteContent,
        this.settings.selectedProvider,
        this.settings.promptModel,
        providerKey
      );

      await navigator.clipboard.writeText(result.prompt);
      this.lastPrompt = result.prompt;

      new Notice('✅ Prompt copied to clipboard!');
    } catch (error) {
      const genError = error as GenerationError;
      new Notice(`❌ Failed: ${genError.message}`);
    }
  }

  /**
   * Regenerate using the last prompt
   */
  async regenerateLastPoster() {
    if (!this.lastPrompt) {
      new Notice('No previous generation found. Please generate a poster first.');
      return;
    }

    if (!this.lastNoteFile) {
      new Notice('Original note not found. Please generate a new poster.');
      return;
    }

    // Check if file still exists
    const file = this.app.vault.getAbstractFileByPath(this.lastNoteFile.path);
    if (!file || !(file instanceof TFile)) {
      new Notice('Original note was moved or deleted');
      return;
    }

    if (this.isGenerating) {
      new Notice('Generation already in progress');
      return;
    }

    this.isGenerating = true;

    let progressModal: ProgressModal | null = null;

    try {
      if (this.settings.showProgressModal) {
        progressModal = new ProgressModal(this.app, this.settings.preferredLanguage);
        progressModal.open();
      }

      // Skip to image generation
      this.updateProgress(progressModal, {
        step: 'generating-image',
        progress: 40,
        message: '이미지 생성 중...'
      });

      const imageResult = await this.executeWithRetry(async () => {
        return await this.imageService.generateImage(
          this.lastPrompt,
          this.settings.googleApiKey,
          this.settings.imageModel,
          this.settings.imageStyle,
          this.settings.preferredLanguage
        );
      });

      this.updateProgress(progressModal, {
        step: 'saving',
        progress: 80,
        message: '파일 저장 중...'
      });

      const imagePath = await this.fileService.saveImage(
        imageResult.imageData,
        imageResult.mimeType,
        this.lastNoteFile,
        this.settings.attachmentFolder
      );

      this.updateProgress(progressModal, {
        step: 'embedding',
        progress: 95,
        message: '노트에 삽입 중...'
      });

      await this.fileService.embedImageInNote(this.lastNoteFile, imagePath);

      if (progressModal) {
        progressModal.showSuccess(imagePath);
      } else {
        new Notice('✅ Poster regenerated successfully!');
      }

    } catch (error) {
      const genError = error as GenerationError;
      if (progressModal) {
        progressModal.showError(genError);
      } else {
        new Notice(`❌ Regeneration failed: ${genError.message}`);
      }
    } finally {
      this.isGenerating = false;
    }
  }

  /**
   * Show preview modal and wait for user decision
   */
  private showPreviewModal(prompt: string): Promise<PreviewModalResult> {
    return new Promise((resolve) => {
      const modal = new PreviewModal(
        this.app,
        prompt,
        this.settings,
        (result) => resolve(result),
        this.settings.preferredLanguage
      );
      modal.open();
    });
  }

  /**
   * Execute operation with auto-retry
   */
  private async executeWithRetry<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    let lastError: GenerationError | null = null;

    for (let attempt = 0; attempt <= this.settings.autoRetryCount; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as GenerationError;

        if (!lastError.retryable || attempt === this.settings.autoRetryCount) {
          throw lastError;
        }

        // Exponential backoff
        const delay = Math.pow(2, attempt) * 1000;
        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  /**
   * Update progress modal
   */
  private updateProgress(modal: ProgressModal | null, state: ProgressState) {
    if (modal) {
      modal.updateProgress(state);
    }
  }

  /**
   * Get API key for the selected provider
   */
  private getProviderApiKey(): string {
    switch (this.settings.selectedProvider) {
      case 'openai':
        return this.settings.openaiApiKey;
      case 'google':
        return this.settings.googleApiKey;
      case 'anthropic':
        return this.settings.anthropicApiKey;
      case 'xai':
        return this.settings.xaiApiKey;
      default:
        return '';
    }
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
