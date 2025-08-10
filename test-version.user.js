// ==UserScript==
// @name         LLM Memory Transfer TEST
// @namespace    https://github.com/wendy7756/LLMs-memory-transfer
// @version      0.1.3-TEST
// @description  测试版本 - 验证缓存清除
// @author       wendy
// @match        https://chat.openai.com/*
// @match        https://chatgpt.com/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('🎯 LLM Memory Transfer TEST v0.1.3 已加载!');
    
    function showTestAlert() {
        alert('✅ 测试版本 0.1.3-TEST 运行正常!\n如果你看到这个消息，说明缓存已清除。');
    }
    
    // 注册测试菜单
    GM_registerMenuCommand('🧪 测试版本检查', showTestAlert);
    
    // 页面加载完成后显示版本信息
    setTimeout(() => {
        console.log('🚀 如果看到这条消息，说明脚本正常运行');
    }, 1000);
    
})(); 