import { App, Modal, Setting } from 'obsidian';
import { ImageStyle, ImageSize, CartoonCuts } from './types';

export interface QuickOptionsResult {
  confirmed: boolean;
  imageStyle: ImageStyle;
  imageSize: ImageSize;
  cartoonCuts: CartoonCuts;
  customCartoonCuts: number;
}

export class QuickOptionsModal extends Modal {
  private selectedStyle: ImageStyle;
  private selectedSize: ImageSize;
  private selectedCartoonCuts: CartoonCuts;
  private selectedCustomCuts: number;
  private onSubmit: (result: QuickOptionsResult) => void;
  private cartoonSettingsContainer: HTMLElement | null = null;

  constructor(
    app: App,
    currentStyle: ImageStyle,
    currentSize: ImageSize,
    currentCartoonCuts: CartoonCuts,
    currentCustomCuts: number,
    onSubmit: (result: QuickOptionsResult) => void
  ) {
    super(app);
    this.selectedStyle = currentStyle;
    this.selectedSize = currentSize;
    this.selectedCartoonCuts = currentCartoonCuts;
    this.selectedCustomCuts = currentCustomCuts;
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('nanobanana-quick-options');

    // Title
    contentEl.createEl('h2', {
      text: '🎨 Quick options',
      cls: 'nanobanana-modal-title'
    });

    contentEl.createEl('p', {
      text: 'Choose image style and resolution for this generation.',
      cls: 'nanobanana-modal-desc'
    });

    // Image Style dropdown
    new Setting(contentEl)
      .setName('Image style')
      .setDesc('Select the visual style for your knowledge poster')
      .addDropdown(dropdown => dropdown
        .addOptions({
          'infographic': '📊 Infographic - charts & visual hierarchy',
          'poster': '🎨 Poster - bold typography & imagery',
          'diagram': '📐 Diagram - technical connections',
          'mindmap': '🧠 Mind map - central concept & branches',
          'timeline': '📅 Timeline - progression & milestones',
          'cartoon': '🎬 Cartoon - comic strip panels'
        })
        .setValue(this.selectedStyle)
        .onChange((value: ImageStyle) => {
          this.selectedStyle = value;
          this.updateCartoonSettings();
        })
      );

    // Cartoon settings container (dynamically shown/hidden)
    this.cartoonSettingsContainer = contentEl.createDiv({ cls: 'nanobanana-cartoon-settings' });
    this.updateCartoonSettings();

    // Image Resolution dropdown
    new Setting(contentEl)
      .setName('Image resolution')
      .setDesc('Higher resolution = better quality (4K recommended for Korean text)')
      .addDropdown(dropdown => dropdown
        .addOptions({
          '1K': '1K - standard quality',
          '2K': '2K - high quality',
          '4K': '4K - ultra HD quality ⭐'
        })
        .setValue(this.selectedSize)
        .onChange((value: ImageSize) => {
          this.selectedSize = value;
        })
      );

    // Buttons container
    const buttonContainer = contentEl.createDiv({ cls: 'nanobanana-button-container' });

    // Cancel button
    const cancelBtn = buttonContainer.createEl('button', {
      text: 'Cancel',
      cls: 'nanobanana-btn nanobanana-btn-cancel'
    });
    cancelBtn.onclick = () => {
      this.onSubmit({
        confirmed: false,
        imageStyle: this.selectedStyle,
        imageSize: this.selectedSize,
        cartoonCuts: this.selectedCartoonCuts,
        customCartoonCuts: this.selectedCustomCuts
      });
      this.close();
    };

    // Generate button
    const generateBtn = buttonContainer.createEl('button', {
      text: '🚀 Generate',
      cls: 'nanobanana-btn nanobanana-btn-primary'
    });
    generateBtn.onclick = () => {
      this.onSubmit({
        confirmed: true,
        imageStyle: this.selectedStyle,
        imageSize: this.selectedSize,
        cartoonCuts: this.selectedCartoonCuts,
        customCartoonCuts: this.selectedCustomCuts
      });
      this.close();
    };

  }

  private updateCartoonSettings() {
    if (!this.cartoonSettingsContainer) return;

    // Clear container
    this.cartoonSettingsContainer.empty();

    // Only show cartoon settings when cartoon style is selected
    if (this.selectedStyle !== 'cartoon') {
      this.cartoonSettingsContainer.addClass('nanobanana-hidden');
      return;
    }

    this.cartoonSettingsContainer.removeClass('nanobanana-hidden');

    // Cartoon Cuts dropdown
    new Setting(this.cartoonSettingsContainer)
      .setName('Panel cuts')
      .setDesc('Number of panels in the comic strip')
      .addDropdown(dropdown => dropdown
        .addOptions({
          '4': '4 cuts (2×2 grid)',
          '6': '6 cuts (2×3 grid)',
          '8': '8 cuts (2×4 grid)',
          'custom': 'custom number'
        })
        .setValue(this.selectedCartoonCuts)
        .onChange((value: CartoonCuts) => {
          this.selectedCartoonCuts = value;
          this.updateCartoonSettings();
        })
      );

    // Custom cuts input (only shown when 'custom' is selected)
    if (this.selectedCartoonCuts === 'custom') {
      new Setting(this.cartoonSettingsContainer)
        .setName('Custom panel count')
        .setDesc('Enter number of panels (2-12 recommended)')
        .addText(text => text
          .setPlaceholder('4')
          .setValue(String(this.selectedCustomCuts))
          .onChange((value) => {
            const numValue = parseInt(value) || 4;
            this.selectedCustomCuts = Math.max(2, Math.min(12, numValue));
          })
        );
    }
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
