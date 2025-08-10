# Greasy Fork 发布模板

## 脚本信息

**脚本名称：** LLM Memory Transfer  
**版本：** 0.1.0  
**描述：** 在ChatGPT、Claude和Gemini之间迁移记忆和文档数据的强大工具  

## 详细描述

这是一个功能强大的Tampermonkey用户脚本，可以帮助你在不同的AI聊天平台之间迁移记忆和个人设置数据。

### ✨ 主要功能

🔄 **跨平台迁移** - 支持ChatGPT → Claude/Gemini的数据迁移  
📋 **智能提取** - 自动从ChatGPT的localStorage提取自定义指令和记忆  
☁️ **云端同步** - 通过GitHub Gist实现安全的数据同步  
🎯 **一键注入** - 在目标平台自动注入记忆块到新会话  
🛠️ **高度可配置** - 支持手动编辑和多种自定义选项  

### 🌐 支持的网站

- ✅ ChatGPT (chat.openai.com, chatgpt.com)
- ✅ Claude (claude.ai) 
- ✅ Gemini (gemini.google.com)

### 🚀 使用方法

1. **配置存储**：设置GitHub Token和Gist用于数据同步
2. **导出数据**：在ChatGPT页面导出记忆和自定义指令
3. **迁移使用**：在Claude或Gemini页面一键注入记忆块

### 🔒 安全性

- 数据存储在你的私有GitHub Gist中
- 不会上传任何数据到第三方服务
- 完全开源，代码透明可审查

### 📖 使用说明

#### 步骤1：配置GitHub存储
1. 访问 [GitHub Token页面](https://github.com/settings/tokens)
2. 创建新的Personal Access Token，勾选`gist`权限
3. 在脚本菜单中选择"配置Gist"，输入Token

#### 步骤2：导出ChatGPT数据  
1. 打开ChatGPT网站
2. 右键页面 → Tampermonkey → "导出ChatGPT数据"
3. 确认或编辑提取的信息
4. 数据会自动保存到GitHub Gist

#### 步骤3：在其他平台使用
1. 打开Claude或Gemini网站
2. 开始新会话
3. 右键页面 → Tampermonkey → "加载并注入记忆"
4. 选择是否自动发送

### ⚙️ 高级功能

- **自动发送**：可设置注入后自动发送记忆块
- **数据编辑**：支持手动编辑和补充记忆内容  
- **多设备同步**：通过Gist在多设备间同步配置
- **版本管理**：Gist提供完整的版本历史记录

### 🛠️ 故障排除

**常见问题：**
- 确保已正确配置GitHub Token权限
- 检查网络连接和Gist访问权限
- 在新会话页面进行记忆注入操作
- 查看浏览器控制台获取详细错误信息

**获取帮助：**
- [GitHub Issues](https://github.com/wendy/LLMs-memory-transfer/issues)
- [详细文档](https://github.com/wendy/LLMs-memory-transfer)
- [安装指南](https://github.com/wendy/LLMs-memory-transfer/blob/main/docs/INSTALL.md)

### 🤝 开源贡献

本项目完全开源，欢迎贡献代码和建议：
- GitHub: https://github.com/wendy/LLMs-memory-transfer
- 许可证: MIT License

---

## Greasy Fork 发布检查清单

### 发布前检查
- [ ] 脚本语法无错误
- [ ] 版本号与GitHub同步
- [ ] 测试所有支持的网站
- [ ] 更新说明文档
- [ ] 验证Tampermonkey头部信息

### 发布设置
- **语言**: 中文（简体）
- **类别**: 工具
- **标签**: chatgpt, claude, gemini, memory, transfer, tampermonkey
- **许可证**: MIT
- **兼容性**: Tampermonkey

### 更新流程
1. 在GitHub上发布新版本
2. 更新Greasy Fork脚本代码
3. 修改版本号和更新说明
4. 发布更新

### 注意事项
- 保持与GitHub版本同步
- 及时回复用户评论和问题
- 定期检查和更新兼容性
- 遵守Greasy Fork社区规范 