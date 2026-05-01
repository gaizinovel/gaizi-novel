// ranking.js - 热榜模块（兼容层，不重复定义数据）
// 数据和渲染逻辑已统一到 app.js，此文件保留兼容性

// 如果 app.js 已加载 newsGridData，不再重复定义
if (typeof newsGridData === 'undefined') {
    // 兼容：仅当 app.js 未加载时才使用此处数据
}

// 渲染函数交给 app.js 的 renderNewsGrid() 处理
// 此文件不再重复注册，避免冲突
