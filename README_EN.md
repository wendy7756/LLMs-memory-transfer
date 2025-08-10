# LLM Memory Transfer

**🌍 Languages: [中文](README.md) | English**

A powerful Tampermonkey userscript that enables seamless memory and document transfer between ChatGPT, Claude, and Gemini.

[![GitHub Stars](https://img.shields.io/github/stars/wendy7756/LLMs-memery-transfer?style=social)](https://github.com/wendy7756/LLMs-memery-transfer)
[![GitHub Forks](https://img.shields.io/github/forks/wendy7756/LLMs-memery-transfer?style=social)](https://github.com/wendy7756/LLMs-memery-transfer)
[![GitHub Issues](https://img.shields.io/github/issues/wendy7756/LLMs-memery-transfer)](https://github.com/wendy7756/LLMs-memery-transfer/issues)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-yellow.svg)](https://opensource.org/licenses/Apache-2.0)
[![Greasy Fork](https://img.shields.io/badge/Greasy%20Fork-Install-brightgreen)](https://greasyfork.org/zh-CN/scripts/XXX-llm-memory-transfer)

## ✨ Features

- 🔄 **Cross-Platform Transfer** - Support memory migration from ChatGPT → Claude/Gemini
- 📋 **Smart Extraction** - Automatically extract custom instructions and memories from ChatGPT's localStorage
- ☁️ **Cloud Sync** - Secure data synchronization via GitHub Gist
- 🎯 **One-Click Injection** - Automatically inject memory blocks into new conversations on target platforms
- 🛠️ **Highly Configurable** - Support manual editing and auto-send options

## 🌐 Supported Platforms

- ✅ ChatGPT (chat.openai.com, chatgpt.com)
- ✅ Claude (claude.ai)
- ✅ Gemini (gemini.google.com)

## 🚀 Installation

### Step 1: Install Tampermonkey
- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- **Edge**: [Microsoft Store](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### Step 2: Install Script
Choose one of the following methods:
- **Greasy Fork**: [LLM Memory Transfer](https://greasyfork.org/zh-CN/scripts/XXX-llm-memory-transfer)
- **GitHub Raw**: [Direct Install](https://github.com/wendy7756/LLMs-memory-transfer/raw/main/llm-memory-transfer.user.js)

### Step 3: Configure GitHub Token
1. Visit [GitHub Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Check the `gist` permission
4. Copy the generated token

## 📖 Usage

### Step 1: Configure Gist Storage
1. Right-click on any supported website → Tampermonkey → LLM Memory Transfer → "Configure Gist"
2. Enter your GitHub Token and Gist ID (leave empty for auto-creation)

### Step 2: Export ChatGPT Data
1. Open [ChatGPT](https://chatgpt.com)
2. Right-click → Tampermonkey → "Export ChatGPT Data"
3. Confirm or edit the extracted information
4. The script will automatically upload to GitHub Gist

### Step 3: Import to Other Platforms
1. Open [Claude](https://claude.ai) or [Gemini](https://gemini.google.com)
2. Start a new conversation
3. Right-click → Tampermonkey → "Load and Inject Memory"
4. Choose whether to auto-send the memory block

## 📊 Data Format

The script uses JSON format to store memory data:

```json
{
  "version": 1,
  "exportedAt": "2024-01-01T00:00:00.000Z",
  "source": "chatgpt-localStorage",
  "profile": {
    "aboutYou": "Information about you",
    "replyStyle": "Preferred reply style",
    "language": "en-US",
    "tags": ["tag1", "tag2"]
  },
  "memoryItems": [
    {
      "key": "memory_key",
      "value": "memory content"
    }
  ],
  "knowledge": {
    "urls": ["https://example.com"],
    "notes": "Additional notes"
  }
}
```

## 🔒 Security

- 🔒 All data is stored in your private GitHub Gist
- 🚫 The script does not collect or upload any personal data to third-party services
- ⚠️ Please keep your GitHub Token secure and rotate it regularly

## 🛠️ Development

### Local Development
```bash
git clone https://github.com/wendy7756/LLMs-memory-transfer.git
cd LLMs-memory-transfer
```

### Script Update
1. Modify `llm-memory-transfer.user.js`
2. Update version number
3. Commit to GitHub
4. Greasy Fork will automatically detect updates

## 🤝 Contributing

We welcome all forms of contributions! Whether it's reporting bugs, suggesting features, improving documentation, or submitting code.

### How to Contribute

1. **Report Issues**
   - Use our [Bug Report Template](https://github.com/wendy7756/LLMs-memery-transfer/issues/new?template=bug_report.md)
   - Provide detailed error information and reproduction steps

2. **Suggest Features**
   - Use our [Feature Request Template](https://github.com/wendy7756/LLMs-memery-transfer/issues/new?template=feature_request.md)
   - Describe the use case and expected functionality

3. **Submit Code**
   ```bash
   # After forking the project
   git clone https://github.com/yourusername/LLMs-memery-transfer.git
   cd LLMs-memery-transfer
   
   # Create feature branch
   git checkout -b feature/your-feature-name
   
   # Commit changes
   git commit -m "feat: add new feature"
   
   # Push and create Pull Request
   git push origin feature/your-feature-name
   ```

4. **Improve Documentation**
   - Fix typos or inaccurate descriptions
   - Add usage examples or FAQ
   - Translate documentation to other languages

### Development Guidelines

- Maintain consistent code style
- Add necessary comments
- Test your changes
- Update relevant documentation

### Contributors

Thanks to all contributors who make this project better!

For detailed contribution guidelines, see [CONTRIBUTING_EN.md](CONTRIBUTING_EN.md).

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=wendy7756/LLMs-memery-transfer&type=Date)](https://star-history.com/#wendy7756/LLMs-memery-transfer&Date)

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE).

This means you can:
- ✅ Commercial use
- ✅ Modify code
- ✅ Distribute code
- ✅ Private use
- ✅ Patent use

You must:
- 📋 Include copyright notice
- 📋 Include license text
- 📋 State changes made

## 💡 Disclaimer

- This tool is for legal personal data management only
- Please comply with the terms of service of each platform
- Protect your privacy when using
- The author assumes no responsibility for any usage risks

## 🆕 Changelog

### v0.1.0 (2025-08-10)
- 🎉 Initial release of LLM Memory Transfer
- ✨ Support for ChatGPT memory and custom instruction extraction
- ✨ GitHub Gist cloud synchronization
- ✨ One-click memory injection for Claude and Gemini
- ✨ Auto-detection and adaptation for different platform input boxes
- ✨ Configurable auto-send functionality
- ✨ Complete error handling and user feedback mechanisms
- ✨ Manual editing and data supplementation support
- ✨ Multi-device configuration synchronization
- ✨ Detailed status checking and diagnostic features

For the complete changelog, see [CHANGELOG.md](CHANGELOG.md). 