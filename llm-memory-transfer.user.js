// ==UserScript==
// @name         LLM Memory Transfer
// @namespace    https://github.com/wendy7756/LLMs-memory-transfer
// @version 0.1.1
// @description  在ChatGPT、Claude和Gemini之间迁移记忆和文档数据
// @description:en Transfer memories and documents between ChatGPT, Claude, and Gemini
// @author       wendy
// @match        https://chat.openai.com/*
// @match        https://chatgpt.com/*
// @match        https://claude.ai/*
// @match        https://gemini.google.com/*
// @match        https://bard.google.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @connect      api.github.com
// @connect      gist.github.com
// @license      Apache-2.0
// @supportURL   https://github.com/wendy7756/LLMs-memory-transfer/issues
// @updateURL    https://github.com/wendy7756/LLMs-memory-transfer/raw/main/llm-memory-transfer.user.js
// @downloadURL  https://github.com/wendy7756/LLMs-memory-transfer/raw/main/llm-memory-transfer.user.js
// ==/UserScript==

/*
 * Copyright 2025 wendy
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
    'use strict';

    // 配置常量
    const CONFIG = {
        version: '0.1.0',
        storageKeys: {
            gistToken: 'llm_mt_gist_token',
            gistId: 'llm_mt_gist_id',
            gistFile: 'llm-memory.json',
            autoSend: 'llm_mt_auto_send',
            lastExport: 'llm_mt_last_export'
        },
        sites: {
            chatgpt: ['chat.openai.com', 'chatgpt.com'],
            claude: ['claude.ai'],
            gemini: ['gemini.google.com', 'bard.google.com']
        }
    };

    // 工具函数
    const Utils = {
        getCurrentSite() {
            const hostname = window.location.hostname;
            for (const [site, domains] of Object.entries(CONFIG.sites)) {
                if (domains.some(domain => hostname.includes(domain))) {
                    return site;
                }
            }
            return 'unknown';
        },

        log(message, type = 'info') {
            console.log(`[LLM Memory Transfer] ${type.toUpperCase()}: ${message}`);
        },

        showNotification(message, type = 'info') {
            GM_notification({
                title: 'LLM Memory Transfer',
                text: message,
                timeout: 3000
            });
        },

        showConfirm(message, title = '确认') {
            return new Promise((resolve) => {
                const result = confirm(`${title}\n\n${message}`);
                resolve(result);
            });
        },

        showPrompt(message, defaultValue = '', title = '输入') {
            return new Promise((resolve) => {
                const result = prompt(`${title}\n\n${message}`, defaultValue);
                resolve(result);
            });
        },

        truncateText(text, maxLength = 100) {
            if (!text || text.length <= maxLength) return text;
            return text.substring(0, maxLength) + '...';
        },

        formatDate(date = new Date()) {
            return date.toISOString().split('T')[0];
        }
    };

    // GitHub API 操作
    const GitHubAPI = {
        async request({ method = 'GET', url, token, data }) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method,
                    url,
                    headers: {
                        'Authorization': `token ${token}`,
                        'Accept': 'application/vnd.github+json',
                        'Content-Type': 'application/json',
                        'User-Agent': 'LLM-Memory-Transfer-UserScript'
                    },
                    data: data ? JSON.stringify(data) : undefined,
                    timeout: 10000,
                    onload: (response) => {
                        try {
                            const result = response.responseText ? JSON.parse(response.responseText) : null;
                            if (response.status >= 200 && response.status < 300) {
                                resolve(result);
                            } else {
                                reject(new Error(`GitHub API错误 ${response.status}: ${result?.message || '未知错误'}`));
                            }
                        } catch (e) {
                            if (response.status >= 200 && response.status < 300) {
                                resolve(null);
                            } else {
                                reject(new Error(`响应解析失败: ${e.message}`));
                            }
                        }
                    },
                    onerror: () => reject(new Error('网络请求失败')),
                    ontimeout: () => reject(new Error('请求超时'))
                });
            });
        },

        async createGist(token, fileName, content) {
            const gistData = {
                description: 'LLM Memory Transfer - 记忆和文档数据同步',
                public: false,
                files: {
                    [fileName]: {
                        content: JSON.stringify(content, null, 2)
                    }
                }
            };

            return this.request({
                method: 'POST',
                url: 'https://api.github.com/gists',
                token,
                data: gistData
            });
        },

        async updateGist(token, gistId, fileName, content) {
            const updateData = {
                files: {
                    [fileName]: {
                        content: JSON.stringify(content, null, 2)
                    }
                }
            };

            return this.request({
                method: 'PATCH',
                url: `https://api.github.com/gists/${gistId}`,
                token,
                data: updateData
            });
        },

        async getGist(token, gistId) {
            return this.request({
                method: 'GET',
                url: `https://api.github.com/gists/${gistId}`,
                token
            });
        }
    };

    // 数据提取器
    const DataExtractor = {
        getEmptyProfile() {
            return {
                version: 1,
                exportedAt: new Date().toISOString(),
                source: Utils.getCurrentSite(),
                profile: {
                    aboutYou: '',
                    replyStyle: '',
                    language: 'zh-CN',
                    preferences: {},
                    tags: []
                },
                memoryItems: [],
                conversations: [],
                knowledge: {
                    urls: [],
                    documents: [],
                    notes: ''
                },
                customInstructions: {
                    systemPrompt: '',
                    userPrompt: ''
                }
            };
        },

        extractFromChatGPT() {
            Utils.log('开始从ChatGPT提取数据');
            const profile = this.getEmptyProfile();
            const extractedData = {};

            // 从localStorage提取数据
            for (const key of Object.keys(localStorage)) {
                if (this.isRelevantKey(key)) {
                    try {
                        const value = localStorage.getItem(key);
                        extractedData[key] = value ? JSON.parse(value) : value;
                    } catch (e) {
                        extractedData[key] = localStorage.getItem(key);
                    }
                }
            }

            // 尝试提取自定义指令
            this.extractCustomInstructions(extractedData, profile);
            
            // 尝试提取记忆项
            this.extractMemoryItems(extractedData, profile);

            // 尝试从页面提取信息
            this.extractFromPage(profile);

            Utils.log(`提取完成，找到 ${profile.memoryItems.length} 个记忆项`);
            return { profile, rawData: extractedData };
        },

        isRelevantKey(key) {
            const relevantPatterns = [
                'custom', 'instruction', 'memory', 'prompt', 'setting',
                'preference', 'profile', 'user', 'persona',
                'oai', 'chatgpt', 'openai', 'gpt'
            ];
            const keyLower = key.toLowerCase();
            return relevantPatterns.some(pattern => keyLower.includes(pattern));
        },

        extractCustomInstructions(data, profile) {
            // 常见的自定义指令存储键
            const instructionKeys = Object.keys(data).filter(key => 
                /instruction|custom|prompt|profile|about|system|setting/i.test(key)
            );

            for (const key of instructionKeys) {
                const value = data[key];
                if (typeof value === 'string' && value.length > 10) {
                    if (/system|about|profile/i.test(key)) {
                        profile.profile.aboutYou = value;
                    } else if (/style|reply|response|tone/i.test(key)) {
                        profile.profile.replyStyle = value;
                    }
                } else if (typeof value === 'object' && value) {
                    // 尝试从对象中提取
                    for (const [subKey, subValue] of Object.entries(value)) {
                        if (typeof subValue === 'string' && subValue.length > 10) {
                            profile.memoryItems.push({
                                key: `${key}.${subKey}`,
                                value: subValue,
                                source: 'localStorage',
                                type: 'custom_instruction'
                            });
                        }
                    }
                }
            }
        },

        extractMemoryItems(data, profile) {
            for (const [key, value] of Object.entries(data)) {
                if (typeof value === 'string' && value.length > 5) {
                    profile.memoryItems.push({
                        key,
                        value: Utils.truncateText(value, 500),
                        source: 'localStorage',
                        type: 'memory'
                    });
                } else if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        if (typeof item === 'string' && item.length > 5) {
                            profile.memoryItems.push({
                                key: `${key}[${index}]`,
                                value: Utils.truncateText(item, 500),
                                source: 'localStorage',
                                type: 'array_item'
                            });
                        }
                    });
                }
            }
        },

        extractFromPage(profile) {
            // 尝试从页面提取用户名等信息
            const userNameElements = document.querySelectorAll('[data-testid*="user"], .user-name, .profile-name');
            for (const el of userNameElements) {
                const text = el.textContent?.trim();
                if (text && text.length > 1 && text.length < 50) {
                    profile.profile.tags.push(`用户名: ${text}`);
                    break;
                }
            }
        },

        /**
         * 尝试通过ChatGPT私有接口获取最近会话
         * 注意：该功能依赖已登录的Web会话，且仅在页面允许调用时生效。
         */
        async fetchRecentConversations(maxConversations = 3, maxMessagesPerConv = 10) {
            try {
                const base = window.location.origin; // 兼容 chat.openai.com / chatgpt.com
                const listResp = await fetch(`${base}/backend-api/conversations?offset=0&limit=${maxConversations}`, {
                    credentials: 'include'
                });
                if (!listResp.ok) throw new Error(`列表请求失败: ${listResp.status}`);
                const listJson = await listResp.json();
                const items = listJson.items || listJson.conversations || [];

                const results = [];
                for (const conv of items.slice(0, maxConversations)) {
                    const id = conv.id || conv.conversation_id || conv.uuid;
                    const title = conv.title || conv.summary || '';
                    const createdAt = conv.create_time || conv.created_at || conv.created;
                    const updatedAt = conv.update_time || conv.updated_at || conv.updated;

                    const detailResp = await fetch(`${base}/backend-api/conversation/${id}`, {
                        credentials: 'include'
                    });
                    if (!detailResp.ok) {
                        results.push({ id, title, createdAt, updatedAt, messages: [] });
                        continue;
                    }
                    const detailJson = await detailResp.json();

                    const mapping = detailJson.mapping || {};
                    const messages = [];
                    for (const node of Object.values(mapping)) {
                        const msg = node && node.message;
                        if (!msg || !msg.content) continue;
                        const role = msg.author?.role || msg.role;
                        let text = '';
                        const content = msg.content;
                        if (Array.isArray(content.parts)) {
                            text = content.parts.filter(p => typeof p === 'string').join('\n');
                        } else if (typeof content === 'string') {
                            text = content;
                        } else if (Array.isArray(content)) {
                            text = content.map(p => (typeof p === 'string' ? p : '')).join('\n');
                        }
                        if (role && text) {
                            messages.push({ role, content: Utils.truncateText(text, 2000) });
                        }
                    }

                    // 简单按长度或创建顺序截断
                    const sliced = messages.slice(0, maxMessagesPerConv);
                    results.push({ id, title, createdAt, updatedAt, messages: sliced });
                }
                return results;
            } catch (e) {
                Utils.log(`获取最近会话失败: ${e.message}`, 'error');
                return [];
            }
        }
    };

    // 内容注入器
    const ContentInjector = {
        buildMemoryBlock(profile) {
            const lines = [];
            
            lines.push('=== LLM记忆迁移 v' + CONFIG.version + ' ===');
            lines.push(`数据来源: ${profile.source} | 导出时间: ${Utils.formatDate(new Date(profile.exportedAt))}`);
            lines.push('');

            // 个人资料
            if (profile.profile.aboutYou) {
                lines.push('【关于我】');
                lines.push(profile.profile.aboutYou);
                lines.push('');
            }

            if (profile.profile.replyStyle) {
                lines.push('【回复风格】');
                lines.push(profile.profile.replyStyle);
                lines.push('');
            }

            // 记忆项
            if (profile.memoryItems.length > 0) {
                lines.push('【记忆事项】');
                const displayItems = profile.memoryItems.slice(0, 15); // 限制显示数量
                displayItems.forEach((item, index) => {
                    lines.push(`${index + 1}. ${item.key}: ${Utils.truncateText(item.value, 200)}`);
                });
                
                if (profile.memoryItems.length > 15) {
                    lines.push(`... 还有 ${profile.memoryItems.length - 15} 项记忆`);
                }
                lines.push('');
            }

            // 知识链接
            if (profile.knowledge.urls.length > 0) {
                lines.push('【相关链接】');
                profile.knowledge.urls.slice(0, 10).forEach((url, index) => {
                    lines.push(`${index + 1}. ${url}`);
                });
                lines.push('');
            }

            // 额外笔记
            if (profile.knowledge.notes) {
                lines.push('【额外笔记】');
                lines.push(profile.knowledge.notes);
                lines.push('');
            }

            lines.push('请在本次会话中记住以上所有信息，并根据我的偏好和历史记忆进行回复。');

            return lines.join('\n');
        },

        findTextInput() {
            // 按优先级查找输入框
            const selectors = [
                'textarea[placeholder*="消息"], textarea[placeholder*="Message"]',
                'textarea:not([disabled]):not([readonly])',
                'div[contenteditable="true"][role="textbox"]',
                'div[contenteditable="true"]',
                '#prompt-textarea',
                '[data-testid*="input"]'
            ];

            for (const selector of selectors) {
                const element = document.querySelector(selector);
                if (element && this.isVisibleInput(element)) {
                    return element;
                }
            }

            return null;
        },

        isVisibleInput(element) {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return rect.height > 20 && 
                   rect.width > 100 && 
                   style.display !== 'none' && 
                   style.visibility !== 'hidden';
        },

        insertText(element, text) {
            if (!element) return false;

            element.focus();

            if (element.tagName.toLowerCase() === 'textarea' || element.tagName.toLowerCase() === 'input') {
                // 处理textarea和input
                element.value = text;
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
                // 处理contenteditable
                element.innerHTML = '';
                element.textContent = text;
                element.dispatchEvent(new Event('input', { bubbles: true }));
            }

            // 触发额外事件以确保兼容性
            element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
            element.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));

            return true;
        },

        findSendButton() {
            const selectors = [
                'button[type="submit"]',
                'button[aria-label*="Send"], button[aria-label*="发送"]',
                'button[data-testid*="send"]',
                'button:has(svg[data-testid*="send"])',
                'button:has(.send-icon)',
                '[role="button"][aria-label*="Send"]'
            ];

            for (const selector of selectors) {
                const button = document.querySelector(selector);
                if (button && !button.disabled && this.isVisibleButton(button)) {
                    return button;
                }
            }

            return null;
        },

        isVisibleButton(button) {
            const rect = button.getBoundingClientRect();
            const style = window.getComputedStyle(button);
            return rect.height > 10 && 
                   rect.width > 10 && 
                   style.display !== 'none' && 
                   style.visibility !== 'hidden';
        },

        async injectMemory(profile, autoSend = false) {
            const memoryBlock = this.buildMemoryBlock(profile);
            const inputElement = this.findTextInput();

            if (!inputElement) {
                throw new Error('未找到输入框，请确保在新会话页面操作');
            }

            const success = this.insertText(inputElement, memoryBlock);
            if (!success) {
                throw new Error('文本插入失败');
            }

            Utils.showNotification('记忆块已注入到输入框');

            if (autoSend) {
                // 延迟发送，确保文本插入完成
                setTimeout(() => {
                    const sendButton = this.findSendButton();
                    if (sendButton) {
                        sendButton.click();
                        Utils.showNotification('记忆块已自动发送');
                    } else {
                        Utils.showNotification('未找到发送按钮，请手动发送');
                    }
                }, 500);
            }

            return true;
        }
    };

    // 主要功能模块
    const MemoryTransfer = {
        async configureGist() {
            try {
                const currentToken = await GM_getValue(CONFIG.storageKeys.gistToken, '');
                const token = await Utils.showPrompt(
                    '获取步骤：github.com/settings/tokens → Generate new token (classic) → 勾选gist权限\n\n' +
                    '⚠️ Token格式：ghp_xxxxxxxxxxxxxx',
                    currentToken,
                    'GitHub Token配置'
                );

                if (!token) return;

                // 验证Token格式
                if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
                    Utils.showNotification('❌ Token格式不正确！应为 ghp_xxx 或 github_pat_xxx');
                    return;
                }

                // 测试Token是否有效
                Utils.showNotification('正在验证Token...');
                try {
                    await GitHubAPI.request({
                        method: 'GET',
                        url: 'https://api.github.com/user',
                        token
                    });
                } catch (e) {
                    Utils.showNotification(`❌ Token验证失败: ${e.message}`);
                    return;
                }

                let gistId = await GM_getValue(CONFIG.storageKeys.gistId, '');
                gistId = await Utils.showPrompt(
                    '留空将自动创建新的Gist',
                    gistId,
                    'Gist ID（可选）'
                );

                if (!gistId) {
                    Utils.showNotification('正在创建新的Gist...');
                    const emptyProfile = DataExtractor.getEmptyProfile();
                    const newGist = await GitHubAPI.createGist(token, CONFIG.storageKeys.gistFile, emptyProfile);
                    gistId = newGist.id;
                    Utils.showNotification(`✅ 新Gist已创建: ${gistId}`);
                }

                await GM_setValue(CONFIG.storageKeys.gistToken, token);
                await GM_setValue(CONFIG.storageKeys.gistId, gistId);

                Utils.showNotification('✅ Gist配置完成！');

            } catch (error) {
                Utils.log(`配置Gist失败: ${error.message}`, 'error');
                Utils.showNotification(`❌ 配置失败: ${error.message}`);
            }
        },

        async exportFromChatGPT() {
            if (Utils.getCurrentSite() !== 'chatgpt') {
                alert('请在ChatGPT页面执行此操作');
                return;
            }

            try {
                const { profile } = DataExtractor.extractFromChatGPT();

                // 简化：只询问是否包含最近会话
                const includeConvs = await Utils.showConfirm(
                    '是否包含最近的对话记录（最多3条）？\n\n' +
                    '包含对话记录可以帮助目标AI更好地理解你的聊天风格和偏好。',
                    '导出选项'
                );
                
                if (includeConvs) {
                    Utils.showNotification('正在获取最近会话...');
                    const conversations = await DataExtractor.fetchRecentConversations(3, 12);
                    profile.conversations = conversations;
                }

                // 设置默认值
                if (!profile.profile.replyStyle) {
                    profile.profile.replyStyle = '简洁、专业、中文回复';
                }

                // 保存到Gist
                const token = await GM_getValue(CONFIG.storageKeys.gistToken, '');
                const gistId = await GM_getValue(CONFIG.storageKeys.gistId, '');

                if (!token || !gistId) {
                    throw new Error('请先配置Gist');
                }

                await GitHubAPI.updateGist(token, gistId, CONFIG.storageKeys.gistFile, profile);
                await GM_setValue(CONFIG.storageKeys.lastExport, new Date().toISOString());

                Utils.showNotification('数据导出成功！');
                Utils.log('数据已成功导出到Gist');

            } catch (error) {
                Utils.log(`导出失败: ${error.message}`, 'error');
                alert(`导出失败: ${error.message}`);
            }
        },

        async loadAndInject() {
            const currentSite = Utils.getCurrentSite();
            if (!['claude', 'gemini'].includes(currentSite)) {
                alert('请在Claude或Gemini页面执行此操作');
                return;
            }

            try {
                const token = await GM_getValue(CONFIG.storageKeys.gistToken, '');
                const gistId = await GM_getValue(CONFIG.storageKeys.gistId, '');

                if (!token || !gistId) {
                    throw new Error('请先配置Gist');
                }

                Utils.showNotification('正在从Gist加载数据...');
                const gistData = await GitHubAPI.getGist(token, gistId);
                const fileContent = gistData.files[CONFIG.storageKeys.gistFile];

                if (!fileContent) {
                    throw new Error('Gist中未找到记忆数据文件');
                }

                const profile = JSON.parse(fileContent.content);
                
                const autoSend = await GM_getValue(CONFIG.storageKeys.autoSend, false);
                
                if (!autoSend) {
                    const shouldSend = await Utils.showConfirm(
                        `记忆项: ${profile.memoryItems.length} 个\n` +
                        `导出时间: ${Utils.formatDate(new Date(profile.exportedAt))}\n\n` +
                        '是否立即发送到对话框？（否则只注入到输入框）',
                        '✅ 数据加载成功'
                    );
                    
                    await ContentInjector.injectMemory(profile, shouldSend);
                } else {
                    await ContentInjector.injectMemory(profile, true);
                }

            } catch (error) {
                Utils.log(`加载失败: ${error.message}`, 'error');
                Utils.showNotification(`❌ 加载失败: ${error.message}`);
            }
        },

        async toggleAutoSend() {
            const current = await GM_getValue(CONFIG.storageKeys.autoSend, false);
            const newValue = !current;
            await GM_setValue(CONFIG.storageKeys.autoSend, newValue);
            Utils.showNotification(`自动发送已${newValue ? '开启' : '关闭'}`);
        },

        async showStatus() {
            try {
                const token = await GM_getValue(CONFIG.storageKeys.gistToken, '');
                const gistId = await GM_getValue(CONFIG.storageKeys.gistId, '');
                const lastExport = await GM_getValue(CONFIG.storageKeys.lastExport, '');
                const autoSend = await GM_getValue(CONFIG.storageKeys.autoSend, false);

                let status = 'LLM Memory Transfer 状态\n\n';
                status += `版本: ${CONFIG.version}\n`;
                status += `当前站点: ${Utils.getCurrentSite()}\n`;
                status += `Gist配置: ${token && gistId ? '✅ 已配置' : '❌ 未配置'}\n`;
                status += `上次导出: ${lastExport ? Utils.formatDate(new Date(lastExport)) : '从未导出'}\n`;
                status += `自动发送: ${autoSend ? '✅ 开启' : '❌ 关闭'}\n`;

                if (token && gistId) {
                    try {
                        const gistData = await GitHubAPI.getGist(token, gistId);
                        const fileContent = gistData.files[CONFIG.storageKeys.gistFile];
                        if (fileContent) {
                            const profile = JSON.parse(fileContent.content);
                            status += `\nGist数据:\n`;
                            status += `- 记忆项: ${profile.memoryItems.length} 个\n`;
                            status += `- 数据来源: ${profile.source}\n`;
                            status += `- 最后更新: ${Utils.formatDate(new Date(profile.exportedAt))}\n`;
                        }
                    } catch (e) {
                        status += '\nGist数据: ❌ 加载失败\n';
                    }
                }

                // 创建状态显示界面
                const statusDiv = document.createElement('div');
                statusDiv.style.cssText = `
                    position: fixed; top: 20px; right: 20px; z-index: 10000;
                    background: white; border: 2px solid #4CAF50; border-radius: 8px;
                    padding: 20px; max-width: 400px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;
                `;
                statusDiv.innerHTML = `
                    <div style="font-weight: bold; color: #4CAF50; margin-bottom: 10px;">
                        🔍 LLM Memory Transfer 状态
                    </div>
                    <pre style="margin: 0; white-space: pre-wrap;">${status}</pre>
                    <button onclick="this.parentElement.remove()" style="
                        margin-top: 15px; padding: 8px 16px; background: #4CAF50; color: white;
                        border: none; border-radius: 4px; cursor: pointer;
                    ">关闭</button>
                `;
                document.body.appendChild(statusDiv);

                // 10秒后自动关闭
                setTimeout(() => {
                    if (statusDiv.parentElement) {
                        statusDiv.remove();
                    }
                }, 10000);

            } catch (error) {
                Utils.showNotification(`❌ 获取状态失败: ${error.message}`);
            }
        }
    };

    // 存储菜单ID以便清理
    let menuIds = [];

    // 初始化和菜单注册
    function initialize() {
        const currentSite = Utils.getCurrentSite();
        
        Utils.log(`脚本已加载，当前站点: ${currentSite}`);

        // 清除已有菜单（如果有的话）
        menuIds.forEach(id => {
            try {
                GM_unregisterMenuCommand(id);
            } catch (e) {
                // 忽略错误
            }
        });
        menuIds = [];

        // 注册通用菜单
        menuIds.push(GM_registerMenuCommand('📋 查看状态', MemoryTransfer.showStatus));
        menuIds.push(GM_registerMenuCommand('⚙️ 配置Gist', MemoryTransfer.configureGist));

        // 根据站点注册特定菜单
        if (currentSite === 'chatgpt') {
            menuIds.push(GM_registerMenuCommand('📤 导出ChatGPT数据', MemoryTransfer.exportFromChatGPT));
        } else if (['claude', 'gemini'].includes(currentSite)) {
            menuIds.push(GM_registerMenuCommand('📥 加载并注入记忆', MemoryTransfer.loadAndInject));
            menuIds.push(GM_registerMenuCommand('🔄 切换自动发送', MemoryTransfer.toggleAutoSend));
        }

        // 添加样式
        addCustomStyles();
    }

    function addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* LLM Memory Transfer 样式 */
            .llm-memory-injected {
                border: 2px solid #4CAF50 !important;
                box-shadow: 0 0 10px rgba(76, 175, 80, 0.3) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // 防止重复初始化 - 使用全局标识
    const INIT_KEY = 'llm_memory_transfer_initialized';
    
    function safeInitialize() {
        if (window[INIT_KEY]) {
            Utils.log('脚本已初始化，跳过重复初始化');
            return;
        }
        window[INIT_KEY] = true;
        Utils.log('开始初始化脚本');
        initialize();
    }

    // 等待页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', safeInitialize);
    } else {
        // 确保页面完全加载后再初始化
        setTimeout(safeInitialize, 100);
    }

})(); 