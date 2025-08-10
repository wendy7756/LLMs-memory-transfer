# 安装指南

## 前置要求

1. **支持的浏览器**
   - Chrome 70+ 
   - Firefox 60+
   - Edge 79+
   - Safari 13+

2. **Tampermonkey扩展**
   - 必须安装Tampermonkey扩展程序

## 步骤1: 安装Tampermonkey

### Chrome
1. 访问 [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. 点击"添加至Chrome"
3. 确认安装

### Firefox  
1. 访问 [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. 点击"添加到Firefox"
3. 确认安装

### Edge
1. 访问 [Microsoft Store](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
2. 点击"获取"
3. 确认安装

## 步骤2: 安装脚本

### 方法1: 从Greasy Fork安装（推荐）
1. 访问 [Greasy Fork页面](https://greasyfork.org/zh-CN/scripts/XXX-llm-memory-transfer)
2. 点击"安装此脚本"
3. 在Tampermonkey弹窗中点击"安装"

### 方法2: 从GitHub安装
1. 点击 [直接安装链接](https://github.com/wendy/LLMs-memory-transfer/raw/main/llm-memory-transfer.user.js)
2. 在Tampermonkey弹窗中点击"安装"

### 方法3: 手动安装
1. 复制 [脚本源码](https://raw.githubusercontent.com/wendy/LLMs-memory-transfer/main/llm-memory-transfer.user.js)
2. 打开Tampermonkey管理面板
3. 点击"创建新脚本"
4. 粘贴代码并保存

## 步骤3: 配置GitHub Token

### 创建Personal Access Token
1. 登录GitHub并访问 [Personal Access Tokens](https://github.com/settings/tokens)
2. 点击"Generate new token (classic)"
3. 设置Token名称，如"LLM Memory Transfer"
4. 勾选权限：
   - ✅ **gist** (必需)
5. 点击"Generate token"
6. **重要**: 复制并保存生成的token（只显示一次）

### 在脚本中配置
1. 访问任一支持的网站（ChatGPT/Claude/Gemini）
2. 右键点击页面 → Tampermonkey → LLM Memory Transfer → "配置Gist"
3. 输入刚才创建的GitHub Token
4. Gist ID留空（首次使用会自动创建）

## 步骤4: 验证安装

1. 打开 [ChatGPT](https://chatgpt.com)
2. 右键页面查看是否有Tampermonkey菜单
3. 应该能看到"导出ChatGPT数据"选项

## 常见问题

### Q: 安装后没有看到菜单选项？
A: 
- 确认Tampermonkey已启用
- 刷新页面
- 检查脚本是否在支持的域名上运行

### Q: GitHub Token验证失败？
A:
- 确认token有gist权限
- 检查token是否过期
- 确认网络连接正常

### Q: 脚本无法自动更新？
A:
- 在Tampermonkey设置中开启自动更新
- 检查更新URL是否正确

## 卸载

如需卸载脚本：
1. 打开Tampermonkey管理面板
2. 找到"LLM Memory Transfer"
3. 点击删除图标
4. 确认删除

## 技术支持

如遇问题，请：
1. 查看 [常见问题](../docs/FAQ.md)
2. 提交 [GitHub Issue](https://github.com/wendy/LLMs-memory-transfer/issues)
3. 查看浏览器控制台错误信息 