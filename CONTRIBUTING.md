<div align="center">
  
# 贡献指南

中文 | [English](CONTRIBUTING_EN.md)

感谢你对LLM Memory Transfer项目的关注！我们欢迎所有形式的贡献。

</div>

## 🚀 快速开始

1. **Fork项目** - 点击GitHub页面右上角的Fork按钮
2. **克隆到本地** - `git clone https://github.com/你的用户名/LLMs-memery-transfer.git`
3. **创建分支** - `git checkout -b feature/你的功能名称`
4. **进行更改** - 编辑代码或文档
5. **提交更改** - `git commit -m "feat: 描述你的更改"`
6. **推送分支** - `git push origin feature/你的功能名称`
7. **创建PR** - 在GitHub上创建Pull Request

## 📋 贡献类型

### 🐛 报告Bug
- 使用 [Bug报告模板](https://github.com/wendy7756/LLMs-memery-transfer/issues/new?template=bug_report.md)
- 提供详细的复现步骤
- 包含错误截图或控制台日志
- 说明你的环境信息（浏览器、操作系统等）

### 💡 功能建议
- 使用 [功能请求模板](https://github.com/wendy7756/LLMs-memery-transfer/issues/new?template=feature_request.md)
- 详细描述功能需求和使用场景
- 解释为什么这个功能有用
- 提供可能的实现思路

### 📝 文档改进
- 修正拼写错误或语法问题
- 改进现有文档的清晰度
- 添加缺失的使用示例
- 翻译文档到其他语言

### 💻 代码贡献
- 修复已知的bug
- 实现新功能
- 改进性能
- 重构代码结构

## 🛠️ 开发环境设置

### 前置要求
- 安装了Tampermonkey的现代浏览器
- Git
- 文本编辑器（推荐VSCode）

### 本地开发
```bash
# 1. 克隆项目
git clone https://github.com/wendy7756/LLMs-memery-transfer.git
cd LLMs-memery-transfer

# 2. 在Tampermonkey中安装脚本
# 方法1: 直接复制llm-memory-transfer.user.js内容到新脚本
# 方法2: 启动本地服务器
python3 -m http.server 8000
# 然后访问 http://localhost:8000/llm-memory-transfer.user.js

# 3. 进行开发和测试
# 修改脚本后，在Tampermonkey中点击"重新加载"
```

### 测试
在提交代码前，请确保：
- [ ] 脚本语法无错误（`node -c llm-memory-transfer.user.js`）
- [ ] 在所有支持的网站上测试功能
- [ ] 新功能有适当的错误处理
- [ ] 更新了相关文档

## 📏 代码规范

### JavaScript代码风格
- 使用4个空格缩进
- 使用分号结束语句
- 变量和函数使用camelCase命名
- 常量使用UPPER_CASE命名
- 添加必要的注释

### 提交信息规范
遵循 [Conventional Commits](https://conventionalcommits.org/) 规范：

```
类型(范围): 简短描述

详细描述（可选）

Footer（可选）
```

**类型包括：**
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 代码重构
- `test`: 添加测试
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat(extractor): 支持提取ChatGPT Plus的高级设置

- 增加对ChatGPT Plus用户自定义指令的提取
- 改进localStorage数据解析逻辑
- 添加错误处理机制

Closes #123
```

## 🔍 Pull Request 指南

### PR标题
- 使用清晰、描述性的标题
- 遵循提交信息规范
- 例如：`feat: 添加对Claude 3.5的支持`

### PR描述
请包含以下信息：
- **更改内容**：简要描述你做了什么
- **动机**：为什么需要这个更改
- **测试**：如何测试这些更改
- **截图**：如果有UI变化，请提供截图
- **相关Issue**：如果修复了某个issue，请引用它

### PR检查清单
提交PR前请确认：
- [ ] 代码遵循项目规范
- [ ] 添加了必要的注释
- [ ] 测试了所有更改
- [ ] 更新了相关文档
- [ ] 没有引入新的错误
- [ ] 向后兼容（如果不是，请说明）

## 🏷️ 标签系统

我们使用以下标签来分类issues和PRs：

**类型标签：**
- `bug` - Bug报告
- `enhancement` - 功能增强
- `documentation` - 文档相关
- `question` - 问题咨询

**优先级标签：**
- `priority: high` - 高优先级
- `priority: medium` - 中优先级  
- `priority: low` - 低优先级

**状态标签：**
- `good first issue` - 适合新贡献者
- `help wanted` - 需要帮助
- `wontfix` - 不会修复

## 🎯 项目路线图

### 短期目标（v0.2.0）
- [ ] 支持更多LLM平台（Claude 3.5、GPT-4等）
- [ ] 改进数据提取算法
- [ ] 添加本地备份功能

### 中期目标（v0.3.0）  
- [ ] 图形化配置界面
- [ ] 数据同步冲突解决
- [ ] 多语言支持

### 长期目标（v1.0.0）
- [ ] 移动端支持
- [ ] 插件生态系统
- [ ] 企业版功能

## 💬 社区

- **GitHub Issues**: 报告bug和功能请求
- **GitHub Discussions**: 一般讨论和问答
- **Email**: 安全问题请发送邮件联系

## 🙏 致谢

感谢所有贡献者的努力！你们的贡献让这个项目变得更好。

## 📜 行为准则

参与本项目意味着你同意遵守我们的行为准则：

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 专注于对社区最有利的事情
- 对其他社区成员表现出同理心

违反行为准则的行为将不被容忍。 
