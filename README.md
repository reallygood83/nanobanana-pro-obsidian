# 🍌 NanoBanana PRO

> Generate stunning Knowledge Posters (infographics) from your Obsidian notes using AI

![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-7C3AED?logo=obsidian&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

## ✨ Features

- 🎨 **AI-Powered Infographic Generation**: Transform your notes into beautiful visual posters
- 🤖 **Multiple AI Providers**: Choose from OpenAI, Google Gemini, Anthropic Claude, or xAI Grok
- 📝 **Prompt Preview & Edit**: Review and customize the generated prompt before creating images
- 📊 **5 Visual Styles**: Infographic, Poster, Diagram, Mind Map, Timeline
- 🔄 **Auto-Retry**: Automatic retry on transient failures with exponential backoff
- 📈 **Progress Tracking**: Real-time progress modal with step-by-step feedback
- 🌙 **Dark Mode Support**: Fully compatible with Obsidian's dark theme

## 📸 Screenshots

### Progress Modal
```
┌─────────────────────────────────────────┐
│  🎨 Knowledge Poster 생성 중...          │
│                                         │
│  ████████████░░░░░░░░ 60%              │
│                                         │
│  ✅ 1. 노트 분석 완료                    │
│  ✅ 2. 프롬프트 생성 완료                 │
│  🔄 3. 이미지 생성 중...                 │
│  ⏳ 4. 파일 저장 대기                    │
└─────────────────────────────────────────┘
```

### Prompt Preview
```
┌─────────────────────────────────────────┐
│  📝 프롬프트 미리보기                     │
│                                         │
│  🤖 모델: gemini-2.0-flash-exp          │
│  📊 스타일: Infographic                  │
│                                         │
│  [이미지 생성] [다시 생성] [취소]          │
└─────────────────────────────────────────┘
```

## 🚀 Installation

### Via BRAT (Recommended)

1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin
2. Open BRAT settings
3. Click "Add Beta Plugin"
4. Enter: `username/nanobanana-pro-obsidian`
5. Enable the plugin

### Manual Installation

1. Download the latest release from [Releases](https://github.com/username/nanobanana-pro-obsidian/releases)
2. Extract to your vault's `.obsidian/plugins/nanobanana-pro-obsidian/` folder
3. Reload Obsidian
4. Enable the plugin in Settings → Community Plugins

## ⚙️ Configuration

### API Keys

You'll need at least a **Google API Key** for image generation. Optionally configure other providers for prompt generation:

| Provider | Required | Purpose |
|----------|----------|---------|
| Google | ✅ Yes | Image generation (always required) |
| OpenAI | Optional | Prompt generation |
| Anthropic | Optional | Prompt generation |
| xAI | Optional | Prompt generation |

**Get your API keys:**
- [Google AI Studio](https://aistudio.google.com/apikey)
- [OpenAI Platform](https://platform.openai.com/api-keys)
- [Anthropic Console](https://console.anthropic.com/settings/keys)
- [xAI Console](https://console.x.ai/)

### Settings

| Setting | Default | Description |
|---------|---------|-------------|
| AI Provider | Google | Provider for prompt generation |
| Prompt Model | gemini-2.0-flash-exp | Model for generating image prompts |
| Image Model | gemini-2.0-flash-exp | Model for generating images |
| Image Style | Infographic | Visual style preset |
| Show Preview | ✅ Enabled | Preview prompt before generation |
| Show Progress | ✅ Enabled | Show progress modal |
| Attachment Folder | 999-Attachments | Where to save images |
| Auto-Retry Count | 2 | Retry on transient failures |

## 📖 Usage

### Generate Knowledge Poster

1. Open a note with content
2. Use Command Palette (`Cmd/Ctrl + P`)
3. Search for "Generate Knowledge Poster"
4. (Optional) Edit the prompt in preview modal
5. Wait for generation to complete
6. Image will be embedded at the top of your note

### Commands

| Command | Description |
|---------|-------------|
| Generate Knowledge Poster | Full generation process |
| Generate Prompt Only | Generate and copy prompt to clipboard |
| Regenerate Last Poster | Retry last generation with same prompt |

### Keyboard Shortcuts

You can assign custom hotkeys in Settings → Hotkeys:
- Search for "NanoBanana" to find all commands

## 🎨 Image Styles

| Style | Description | Best For |
|-------|-------------|----------|
| 📊 Infographic | Charts, icons, visual hierarchy | Data-driven content |
| 🎨 Poster | Bold typography, strong imagery | Announcements, summaries |
| 📐 Diagram | Technical, clear connections | System architecture |
| 🧠 Mind Map | Central concept with branches | Brainstorming, concepts |
| 📅 Timeline | Progression and milestones | Historical, processes |

## ❓ Troubleshooting

### "API key is not configured"
→ Go to Settings → NanoBanana PRO and add your API key

### "Rate limit exceeded"
→ Wait a few minutes and try again. Consider upgrading your API plan.

### "Content was blocked by safety filters"
→ Modify your note content or try a different style

### Image generation fails repeatedly
→ Try regenerating with a different style, or edit the prompt in preview mode

### No image in response
→ The model may not support image generation. Try `gemini-2.0-flash-exp` or similar.

## 🛠️ Development

### Build from source

```bash
# Clone the repository
git clone https://github.com/username/nanobanana-pro-obsidian.git
cd nanobanana-pro-obsidian

# Install dependencies
npm install

# Build for production
npm run build

# Development mode (watch)
npm run dev
```

### Project Structure

```
nanobanana-pro-obsidian/
├── src/
│   ├── main.ts              # Plugin entry point
│   ├── types.ts             # TypeScript interfaces
│   ├── settings.ts          # Settings tab UI
│   ├── settingsData.ts      # Default settings
│   ├── progressModal.ts     # Progress modal UI
│   ├── previewModal.ts      # Prompt preview modal
│   └── services/
│       ├── promptService.ts # AI prompt generation
│       ├── imageService.ts  # Image generation
│       └── fileService.ts   # File operations
├── manifest.json
├── package.json
├── styles.css
└── README.md
```

## 📝 Changelog

### v1.0.0
- Initial release
- Support for 4 AI providers (OpenAI, Google, Anthropic, xAI)
- 5 image styles
- Progress modal with step tracking
- Prompt preview and edit
- Auto-retry with exponential backoff
- Korean and English UI support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Obsidian](https://obsidian.md/) for the amazing platform
- [Google Gemini](https://ai.google.dev/) for image generation capabilities
- All the amazing AI providers making this possible

---

## 👨‍💻 Developer

**김문정 (Moon Jung Kim)** - 안양 박달초등학교

[![X (Twitter)](https://img.shields.io/badge/X-@reallygood83-000000?style=flat&logo=x&logoColor=white)](https://x.com/reallygood83)
[![YouTube](https://img.shields.io/badge/YouTube-배움의달인-FF0000?style=flat&logo=youtube&logoColor=white)](https://www.youtube.com/@%EB%B0%B0%EC%9B%80%EC%9D%98%EB%8B%AC%EC%9D%B8-p5v)

---

Made with 🍌 by NanoBanana PRO
