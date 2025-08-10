<div align="center">
  
# Contributing Guide

[中文](CONTRIBUTING.md) | English

Thank you for your interest in the LLM Memory Transfer project! We welcome all forms of contributions.

</div>

## 🚀 Quick Start

1. **Fork the project** - Click the Fork button in the top-right corner of the GitHub page
2. **Clone locally** - `git clone https://github.com/yourusername/LLMs-memery-transfer.git`
3. **Create branch** - `git checkout -b feature/your-feature-name`
4. **Make changes** - Edit code or documentation
5. **Commit changes** - `git commit -m "feat: describe your changes"`
6. **Push branch** - `git push origin feature/your-feature-name`
7. **Create PR** - Create a Pull Request on GitHub

## 📋 Types of Contributions

### 🐛 Bug Reports
- Use the [Bug Report Template](https://github.com/wendy7756/LLMs-memery-transfer/issues/new?template=bug_report.md)
- Provide detailed reproduction steps
- Include error screenshots or console logs
- Specify your environment information (browser, OS, etc.)

### 💡 Feature Suggestions
- Use the [Feature Request Template](https://github.com/wendy7756/LLMs-memery-transfer/issues/new?template=feature_request.md)
- Describe the feature requirements and use cases in detail
- Explain why this feature is useful
- Provide possible implementation ideas

### 📝 Documentation Improvements
- Fix spelling errors or grammar issues
- Improve clarity of existing documentation
- Add missing usage examples
- Translate documentation to other languages

### 💻 Code Contributions
- Fix known bugs
- Implement new features
- Improve performance
- Refactor code structure

## 🛠️ Development Environment Setup

### Prerequisites
- Modern browser with Tampermonkey installed
- Git
- Text editor (VSCode recommended)

### Local Development
```bash
# 1. Clone the project
git clone https://github.com/wendy7756/LLMs-memory-transfer.git
cd LLMs-memory-transfer

# 2. Install script in Tampermonkey
# Method 1: Copy llm-memory-transfer.user.js content to new script
# Method 2: Start local server
python3 -m http.server 8000
# Then visit http://localhost:8000/llm-memory-transfer.user.js

# 3. Develop and test
# After modifying script, click "Reload" in Tampermonkey
```

### Testing
Before submitting code, ensure:
- [ ] Script syntax is error-free (`node -c llm-memory-transfer.user.js`)
- [ ] Functionality tested on all supported websites
- [ ] New features have appropriate error handling
- [ ] Related documentation updated

## 📏 Code Standards

### JavaScript Code Style
- Use 4 spaces for indentation
- Use semicolons to end statements
- Use camelCase for variables and functions
- Use UPPER_CASE for constants
- Add necessary comments

### Commit Message Standards
Follow [Conventional Commits](https://conventionalcommits.org/) specification:

```
type(scope): brief description

detailed description (optional)

footer (optional)
```

**Types include:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation updates
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Add tests
- `chore`: Build process or auxiliary tool changes

**Example:**
```
feat(extractor): support ChatGPT Plus advanced settings extraction

- Add extraction for ChatGPT Plus user custom instructions
- Improve localStorage data parsing logic
- Add error handling mechanism

Closes #123
```

## 🔍 Pull Request Guidelines

### PR Title
- Use clear, descriptive titles
- Follow commit message standards
- Example: `feat: add support for Claude 3.5`

### PR Description
Please include the following information:
- **Changes**: Briefly describe what you did
- **Motivation**: Why this change is needed
- **Testing**: How to test these changes
- **Screenshots**: If there are UI changes, provide screenshots
- **Related Issues**: If fixing an issue, reference it

### PR Checklist
Before submitting PR, confirm:
- [ ] Code follows project standards
- [ ] Added necessary comments
- [ ] Tested all changes
- [ ] Updated related documentation
- [ ] No new errors introduced
- [ ] Backward compatible (if not, explain)

## 🏷️ Label System

We use the following labels to categorize issues and PRs:

**Type Labels:**
- `bug` - Bug reports
- `enhancement` - Feature enhancements
- `documentation` - Documentation related
- `question` - Questions and inquiries

**Priority Labels:**
- `priority: high` - High priority
- `priority: medium` - Medium priority
- `priority: low` - Low priority

**Status Labels:**
- `good first issue` - Suitable for new contributors
- `help wanted` - Help needed
- `wontfix` - Will not fix

## 🎯 Project Roadmap

### Short-term Goals (v0.2.0)
- [ ] Support more LLM platforms (Claude 3.5, GPT-4, etc.)
- [ ] Improve data extraction algorithms
- [ ] Add local backup functionality

### Medium-term Goals (v0.3.0)
- [ ] Graphical configuration interface
- [ ] Data sync conflict resolution
- [ ] Multi-language support

### Long-term Goals (v1.0.0)
- [ ] Mobile support
- [ ] Plugin ecosystem
- [ ] Enterprise features

## 💬 Community

- **GitHub Issues**: Report bugs and feature requests
- **GitHub Discussions**: General discussions and Q&A
- **Email**: Contact via email for security issues

## 🙏 Acknowledgments

Thanks to all contributors for their efforts! Your contributions make this project better.

## 📜 Code of Conduct

Participating in this project means you agree to abide by our Code of Conduct:

- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

Behavior that violates the Code of Conduct will not be tolerated.

## 🔄 Development Workflow

### For New Contributors
1. Look for issues labeled `good first issue`
2. Comment on the issue to express interest
3. Wait for maintainer assignment
4. Follow the development process above

### For Regular Contributors
1. Discuss major changes in issues first
2. Create feature branches for development
3. Write tests for new functionality
4. Update documentation as needed
5. Submit PR for review

### For Maintainers
1. Review PRs promptly
2. Provide constructive feedback
3. Merge approved changes
4. Tag releases regularly
5. Update project roadmap

## 🧪 Testing Guidelines

### Manual Testing
- Test on all supported platforms
- Verify cross-browser compatibility
- Check error handling scenarios
- Validate data extraction accuracy

### Automated Testing
Currently, we rely on manual testing, but we plan to add:
- Unit tests for core functions
- Integration tests for platform compatibility
- Performance benchmarks

## 📚 Documentation Standards

### Code Documentation
- Use JSDoc comments for functions
- Document complex algorithms
- Explain non-obvious code sections
- Keep comments up to date

### User Documentation
- Write clear, step-by-step instructions
- Include screenshots where helpful
- Provide troubleshooting sections
- Translate to multiple languages

## 🎖️ Recognition

Contributors will be recognized in:
- GitHub Contributors section
- Project README
- Release notes
- Special contributor badges (planned)

We appreciate all contributions, no matter how small! 
