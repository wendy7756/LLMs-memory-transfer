# LLM Memory Transfer

一个强大的Tampermonkey用户脚本，可以在ChatGPT、Claude和Gemini之间迁移记忆和文档数据。

## 功能特点

- 🔄 **跨平台迁移**: 支持ChatGPT → Claude/Gemini的记忆迁移
- 📋 **智能提取**: 自动从ChatGPT的localStorage提取自定义指令和记忆
- ☁️ **云端同步**: 通过GitHub Gist实现数据同步和版本管理
- 🎯 **一键注入**: 在目标平台自动注入记忆块到新会话
- 🛠️ **高度可配置**: 支持手动编辑和自动发送等选项

## 安装方法

### 1. 安装Tampermonkey
- Chrome: [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- Firefox: [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- Edge: [Microsoft Store](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### 2. 安装脚本
从以下任一源安装：
- **Greasy Fork**: [LLM Memory Transfer](https://greasyfork.org/zh-CN/scripts/XXX-llm-memory-transfer)
- **GitHub Raw**: [直接安装](https://github.com/wendy/LLMs-memory-transfer/raw/main/llm-memory-transfer.user.js)

### 3. 配置GitHub Token
1. 访问 [GitHub Personal Access Tokens](https://github.com/settings/tokens)
2. 点击"Generate new token (classic)"
3. 勾选`gist`权限
4. 复制生成的token

## 使用流程

### 步骤1: 配置Gist存储
1. 在任意支持的网站页面右键点击Tampermonkey图标
2. 选择"配置Gist"
3. 输入GitHub Token和Gist ID（首次可留空自动创建）

### 步骤2: 导出ChatGPT数据
1. 打开 [ChatGPT](https://chatgpt.com)
2. 右键Tampermonkey → "从ChatGPT导出并上传"
3. 确认或编辑提取的记忆和自定义指令
4. 脚本会自动上传到GitHub Gist

### 步骤3: 导入到其他平台
1. 打开 [Claude](https://claude.ai) 或 [Gemini](https://gemini.google.com)
2. 开始新会话
3. 右键Tampermonkey → "从Gist加载并注入"
4. 选择是否自动发送记忆块

## 支持的网站

- ✅ ChatGPT (chat.openai.com, chatgpt.com)
- ✅ Claude (claude.ai)
- ✅ Gemini (gemini.google.com)

## 数据格式

脚本使用JSON格式存储记忆数据：

```json
{
  "version": 1,
  "exportedAt": "2024-01-01T00:00:00.000Z",
  "source": "chatgpt-localStorage",
  "profile": {
    "aboutYou": "关于你的信息",
    "replyStyle": "回复风格偏好",
    "language": "zh-CN",
    "tags": ["标签1", "标签2"]
  },
  "memoryItems": [
    {
      "key": "memory_key",
      "value": "记忆内容"
    }
  ],
  "knowledge": {
    "urls": ["https://example.com"],
    "notes": "额外笔记"
  }
}
```

## 安全说明

- 🔒 所有数据存储在你的私有GitHub Gist中
- 🚫 脚本不会收集或上传任何个人数据到第三方服务
- ⚠️ 请妥善保管GitHub Token，建议定期轮换

## 常见问题

### Q: 为什么无法提取ChatGPT的记忆？
A: 确保你已登录ChatGPT并设置了自定义指令。脚本主要从localStorage提取数据。

### Q: 注入后记忆块没有自动发送？
A: 可以在设置中开启"自动发送"，或手动点击发送按钮。

### Q: 支持其他LLM平台吗？
A: 目前支持主流的三个平台，未来会根据需求添加更多平台。

## 开发

### 本地开发
```bash
git clone https://github.com/wendy/LLMs-memory-transfer.git
cd LLMs-memory-transfer
```

### 更新脚本
1. 修改`llm-memory-transfer.user.js`
2. 更新版本号
3. 提交到GitHub
4. Greasy Fork会自动检测更新

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License

## 更新日志

### v0.1.0 (2024-01-01)
- 🎉 首次发布
- ✨ 支持ChatGPT数据导出
- ✨ 支持Claude/Gemini数据注入
- ✨ GitHub Gist同步功能
