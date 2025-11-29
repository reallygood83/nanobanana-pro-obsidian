import { App, PluginSettingTab, Setting } from 'obsidian';
import NanoBananaPlugin from './main';
import { AIProvider, ImageStyle, PROVIDER_CONFIGS, IMAGE_STYLES } from './types';

export class NanoBananaSettingTab extends PluginSettingTab {
  plugin: NanoBananaPlugin;

  constructor(app: App, plugin: NanoBananaPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h1', { text: '🍌 NanoBanana PRO Settings' });

    // ==================== API Keys Section ====================
    containerEl.createEl('h2', { text: '🔑 API Keys' });

    new Setting(containerEl)
      .setName('Google API Key')
      .setDesc('Required for image generation. Get your key from Google AI Studio.')
      .addText(text => text
        .setPlaceholder('Enter your Google API key')
        .setValue(this.plugin.settings.googleApiKey)
        .onChange(async (value) => {
          this.plugin.settings.googleApiKey = value;
          await this.plugin.saveSettings();
        })
      )
      .addExtraButton(button => button
        .setIcon('external-link')
        .setTooltip('Get API Key')
        .onClick(() => {
          window.open('https://aistudio.google.com/apikey');
        })
      );

    new Setting(containerEl)
      .setName('OpenAI API Key')
      .setDesc('Optional. Used for prompt generation if OpenAI is selected.')
      .addText(text => text
        .setPlaceholder('Enter your OpenAI API key')
        .setValue(this.plugin.settings.openaiApiKey)
        .onChange(async (value) => {
          this.plugin.settings.openaiApiKey = value;
          await this.plugin.saveSettings();
        })
      )
      .addExtraButton(button => button
        .setIcon('external-link')
        .setTooltip('Get API Key')
        .onClick(() => {
          window.open('https://platform.openai.com/api-keys');
        })
      );

    new Setting(containerEl)
      .setName('Anthropic API Key')
      .setDesc('Optional. Used for prompt generation if Anthropic is selected.')
      .addText(text => text
        .setPlaceholder('Enter your Anthropic API key')
        .setValue(this.plugin.settings.anthropicApiKey)
        .onChange(async (value) => {
          this.plugin.settings.anthropicApiKey = value;
          await this.plugin.saveSettings();
        })
      )
      .addExtraButton(button => button
        .setIcon('external-link')
        .setTooltip('Get API Key')
        .onClick(() => {
          window.open('https://console.anthropic.com/settings/keys');
        })
      );

    new Setting(containerEl)
      .setName('xAI API Key')
      .setDesc('Optional. Used for prompt generation if xAI is selected.')
      .addText(text => text
        .setPlaceholder('Enter your xAI API key')
        .setValue(this.plugin.settings.xaiApiKey)
        .onChange(async (value) => {
          this.plugin.settings.xaiApiKey = value;
          await this.plugin.saveSettings();
        })
      )
      .addExtraButton(button => button
        .setIcon('external-link')
        .setTooltip('Get API Key')
        .onClick(() => {
          window.open('https://console.x.ai/');
        })
      );

    // ==================== Prompt Generation Section ====================
    containerEl.createEl('h2', { text: '🤖 Prompt Generation' });

    new Setting(containerEl)
      .setName('AI Provider')
      .setDesc('Select which AI provider to use for generating image prompts.')
      .addDropdown(dropdown => dropdown
        .addOptions({
          'google': 'Google Gemini',
          'openai': 'OpenAI',
          'anthropic': 'Anthropic',
          'xai': 'xAI (Grok)'
        })
        .setValue(this.plugin.settings.selectedProvider)
        .onChange(async (value: AIProvider) => {
          this.plugin.settings.selectedProvider = value;
          // Set default model for selected provider
          this.plugin.settings.promptModel = PROVIDER_CONFIGS[value].defaultModel;
          await this.plugin.saveSettings();
          this.display(); // Refresh to update model suggestions
        })
      );

    const providerConfig = PROVIDER_CONFIGS[this.plugin.settings.selectedProvider];
    new Setting(containerEl)
      .setName('Prompt Model')
      .setDesc(`Model to use for prompt generation. Suggestions: ${providerConfig.models.join(', ')}`)
      .addText(text => text
        .setPlaceholder(providerConfig.defaultModel)
        .setValue(this.plugin.settings.promptModel)
        .onChange(async (value) => {
          this.plugin.settings.promptModel = value;
          await this.plugin.saveSettings();
        })
      );

    // ==================== Image Generation Section ====================
    containerEl.createEl('h2', { text: '🖼️ Image Generation' });

    new Setting(containerEl)
      .setName('Image Model')
      .setDesc('Google Gemini model for image generation. Must support image output.')
      .addText(text => text
        .setPlaceholder('gemini-2.5-flash')
        .setValue(this.plugin.settings.imageModel)
        .onChange(async (value) => {
          this.plugin.settings.imageModel = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Image Style')
      .setDesc('Default style for generated posters.')
      .addDropdown(dropdown => dropdown
        .addOptions({
          'infographic': '📊 Infographic - Charts, icons, visual hierarchy',
          'poster': '🎨 Poster - Bold typography, strong imagery',
          'diagram': '📐 Diagram - Technical, clear connections',
          'mindmap': '🧠 Mind Map - Central concept with branches',
          'timeline': '📅 Timeline - Progression and milestones'
        })
        .setValue(this.plugin.settings.imageStyle)
        .onChange(async (value: ImageStyle) => {
          this.plugin.settings.imageStyle = value;
          await this.plugin.saveSettings();
        })
      );

    // ==================== UX Settings Section ====================
    containerEl.createEl('h2', { text: '⚙️ User Experience' });

    new Setting(containerEl)
      .setName('Show Preview Before Generation')
      .setDesc('Show the generated prompt and allow editing before creating the image.')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showPreviewBeforeGeneration)
        .onChange(async (value) => {
          this.plugin.settings.showPreviewBeforeGeneration = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Show Progress Modal')
      .setDesc('Display a progress indicator during generation.')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showProgressModal)
        .onChange(async (value) => {
          this.plugin.settings.showProgressModal = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Attachment Folder')
      .setDesc('Folder to save generated images. Will be created if it doesn\'t exist.')
      .addText(text => text
        .setPlaceholder('999-Attachments')
        .setValue(this.plugin.settings.attachmentFolder)
        .onChange(async (value) => {
          this.plugin.settings.attachmentFolder = value || '999-Attachments';
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Auto-Retry Count')
      .setDesc('Number of automatic retries on transient failures (0-5).')
      .addSlider(slider => slider
        .setLimits(0, 5, 1)
        .setValue(this.plugin.settings.autoRetryCount)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.autoRetryCount = value;
          await this.plugin.saveSettings();
        })
      );

    // ==================== Advanced Section ====================
    containerEl.createEl('h2', { text: '🔧 Advanced' });

    new Setting(containerEl)
      .setName('Custom Prompt Prefix')
      .setDesc('Optional text to prepend to all generated prompts.')
      .addTextArea(textarea => textarea
        .setPlaceholder('e.g., "Create in a minimalist style with blue color scheme..."')
        .setValue(this.plugin.settings.customPromptPrefix)
        .onChange(async (value) => {
          this.plugin.settings.customPromptPrefix = value;
          await this.plugin.saveSettings();
        })
      );

    // ==================== About Section ====================
    containerEl.createEl('h2', { text: 'ℹ️ About' });

    const aboutDiv = containerEl.createDiv({ cls: 'nanobanana-about' });
    aboutDiv.createEl('p', {
      text: 'NanoBanana PRO v1.0.0'
    });
    aboutDiv.createEl('p', {
      text: 'Generate beautiful Knowledge Posters from your notes using AI.'
    });

    const linksDiv = aboutDiv.createDiv({ cls: 'nanobanana-links' });
    linksDiv.createEl('a', {
      text: '📖 Documentation',
      href: 'https://github.com/username/nanobanana-pro-obsidian#readme'
    });
    linksDiv.createEl('span', { text: ' | ' });
    linksDiv.createEl('a', {
      text: '🐛 Report Issue',
      href: 'https://github.com/username/nanobanana-pro-obsidian/issues'
    });
  }
}
