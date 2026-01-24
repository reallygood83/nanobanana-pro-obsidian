import { App, Modal } from 'obsidian';
import { NanoBananaSettings, PROVIDER_CONFIGS, IMAGE_STYLES, PreferredLanguage } from './types';
import { getMessages, UIMessages } from './i18n';

export interface PreviewModalResult {
  confirmed: boolean;
  prompt: string;
  regenerate: boolean;
}

export class PreviewModal extends Modal {
  private prompt: string;
  private settings: NanoBananaSettings;
  private onConfirm: (result: PreviewModalResult) => void;
  private promptTextarea: HTMLTextAreaElement;
  private messages: UIMessages;

  constructor(
    app: App,
    prompt: string,
    settings: NanoBananaSettings,
    onConfirm: (result: PreviewModalResult) => void,
    language: PreferredLanguage = 'en'
  ) {
    super(app);
    this.prompt = prompt;
    this.settings = settings;
    this.onConfirm = onConfirm;
    this.messages = getMessages(language);
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.addClass('nanobanana-preview-modal');

    // Title
    contentEl.createEl('h2', {
      text: this.messages.previewTitle,
      cls: 'nanobanana-preview-title'
    });

    // Info section
    const infoSection = contentEl.createDiv({ cls: 'nanobanana-preview-info' });

    infoSection.createDiv({
      cls: 'nanobanana-preview-info-item',
      text: `${this.messages.previewPromptModel}: ${PROVIDER_CONFIGS[this.settings.selectedProvider].name} - ${this.settings.promptModel}`
    });

    infoSection.createDiv({
      cls: 'nanobanana-preview-info-item',
      text: `${this.messages.previewImageModel}: ${this.settings.imageModel}`
    });

    infoSection.createDiv({
      cls: 'nanobanana-preview-info-item',
      text: `${this.messages.previewStyle}: ${IMAGE_STYLES[this.settings.imageStyle]}`
    });

    // Prompt textarea
    const textareaContainer = contentEl.createDiv({ cls: 'nanobanana-textarea-container' });
    textareaContainer.createEl('label', {
      text: this.messages.previewPromptLabel,
      cls: 'nanobanana-textarea-label'
    });

    this.promptTextarea = textareaContainer.createEl('textarea', {
      cls: 'nanobanana-prompt-textarea'
    });
    this.promptTextarea.value = this.prompt;
    this.promptTextarea.rows = 10;

    // Character count
    const charCount = textareaContainer.createDiv({ cls: 'nanobanana-char-count' });
    charCount.setText(`${this.prompt.length} ${this.messages.previewCharacters}`);

    this.promptTextarea.addEventListener('input', () => {
      charCount.setText(`${this.promptTextarea.value.length} ${this.messages.previewCharacters}`);
    });

    // Tips section
    const tipsSection = contentEl.createDiv({ cls: 'nanobanana-tips' });
    tipsSection.createEl('p', { text: this.messages.previewTipsTitle });
    const tipsList = tipsSection.createEl('ul');
    tipsList.createEl('li', { text: this.messages.previewTip1 });
    tipsList.createEl('li', { text: this.messages.previewTip2 });
    tipsList.createEl('li', { text: this.messages.previewTip3 });

    // Buttons
    const buttonContainer = contentEl.createDiv({ cls: 'nanobanana-button-container' });

    // Generate Image button
    const generateButton = buttonContainer.createEl('button', {
      text: this.messages.previewGenerate,
      cls: 'mod-cta'
    });
    generateButton.addEventListener('click', () => {
      this.onConfirm({
        confirmed: true,
        prompt: this.promptTextarea.value,
        regenerate: false
      });
      this.close();
    });

    // Regenerate Prompt button
    const regenerateButton = buttonContainer.createEl('button', {
      text: this.messages.previewRegenerate
    });
    regenerateButton.addEventListener('click', () => {
      this.onConfirm({
        confirmed: true,
        prompt: '',
        regenerate: true
      });
      this.close();
    });

    // Cancel button
    const cancelButton = buttonContainer.createEl('button', {
      text: this.messages.cancel
    });
    cancelButton.addEventListener('click', () => {
      this.onConfirm({
        confirmed: false,
        prompt: '',
        regenerate: false
      });
      this.close();
    });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
