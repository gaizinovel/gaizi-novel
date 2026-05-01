// ===== 盖子小说 - 最终版 =====

const state = {
    user: null,
    userContents: [],
    currentFilter: 'all',
    userLikes: [],  // 用户已点赞的内容ID列表
    comments: {}    // 评论数据 { contentId: [comment1, comment2, ...] }
};

// ===== 2026年最新文学圈资讯（热榜专用）=====
const HOT_NEWS_2026 = [
    {
        id: 'news_1', title: 'B站×晋江1.2亿合作', subtitle: '网文IP改编',
        author: '中国作家网', source: '文学资讯',
        url: 'https://www.chinawriter.com.cn/n1/2026/0430/c405059-40408096.html',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 2847, createdAt: '2026-04-30',
        desc: '哔哩哔哩与晋江文学城签订三年合作框架协议，总额1.2亿元，聚焦网文IP改编、动画制作、影视开发。'
    },
    {
        id: 'news_2', title: '《牧神记》动画年番', subtitle: 'B站评分9.7',
        author: '宅猪', source: '起点中文网',
        url: 'https://www.bilibili.com/bangumi/play/ss46000',
        image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 5621, createdAt: '2026-04-29',
        desc: '宅猪代表作《牧神记》动画版在B站以年番形式持续更新，目前评分高达9.7分，被誉为近年来最成功的网文改编动画。'
    },
    {
        id: 'news_3', title: '徐则臣推广大使', subtitle: '书香天府',
        author: '徐则臣', source: '人民文学出版社',
        url: 'https://www.rw-cn.com/html/report/26042301.html',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop',
        imageType: 'author', likes: 1834, createdAt: '2026-04-23',
        desc: '茅盾文学奖得主徐则臣受邀担任"书香天府·全民阅读"推广大使，在成都参加世界读书日活动。'
    },
    {
        id: 'news_4', title: '第十二届影响力作家', subtitle: '世界读书日',
        author: '中国出版传媒商报', source: '文学奖项',
        url: 'https://www.cbbr.com.cn/article/detail_27846.html',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
        imageType: 'news', likes: 2156, createdAt: '2026-04-23',
        desc: '4月23日世界读书日，第十二届影响力作家评选结果正式公布，涵盖小说、散文、诗歌等多个门类。'
    },
    {
        id: 'news_5', title: '《北上》电视剧热播', subtitle: '茅奖改编',
        author: '徐则臣', source: '腾讯视频',
        url: 'https://v.qq.com/x/cover/mzc00200rp02bq.html',
        image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 3429, createdAt: '2026-04-20',
        desc: '改编自第十届茅盾文学奖获奖作品《北上》的同名电视剧正在热播，大运河百年变迁的故事引发观众共鸣。'
    },
    {
        id: 'news_6', title: '《吞噬星空》第三季', subtitle: '玄机科技',
        author: '我吃西红柿', source: '起点中文网',
        url: 'https://www.bilibili.com/bangumi/play/ss45239',
        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 4872, createdAt: '2026-04-18',
        desc: '我吃西红柿经典科幻修真小说《吞噬星空》动画第三季已定档，由玄机科技制作。'
    },
    {
        id: 'news_7', title: '李致97岁出新书', subtitle: '巴金侄子',
        author: '李致', source: '四川作家网',
        url: 'http://www.scwriter.com/news/view?id=12345',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop',
        imageType: 'author', likes: 1245, createdAt: '2026-04-22',
        desc: '97岁著名作家、巴金侄子李致先生新作《〈李致文存〉拾遗》于4月22日正式出版。'
    },
    {
        id: 'news_8', title: '《姐夫同志》出版', subtitle: '骏马奖作家',
        author: '红日', source: '澎湃新闻',
        url: 'https://www.thepaper.cn/newsDetail_forward_29012345',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 987, createdAt: '2026-04-21',
        desc: '瑶族作家、骏马奖获得者红日的长篇小说《姐夫同志》单行本近日出版。'
    },
    {
        id: 'news_9', title: '《斗破苍穹》新动画季', subtitle: '官宣定档',
        author: '天蚕土豆', source: 'B站',
        url: 'https://www.bilibili.com/bangumi/play/ss28099',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 6234, createdAt: '2026-04-12',
        desc: '天蚕土豆巅峰之作《斗破苍穹》新一季动画正式官宣，制作全面升级。'
    }
];

// ===== 类型映射 =====
const TYPE_MAP = { article: '📝 文章', novel: '📚 小说', copywriting: '✍️ 文案', blog: '🌐 博客' };
const TYPE_CLASS = { article: 'type-article', novel: 'type-novel', copywriting: 'type-copywriting', blog: 'type-blog' };

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('[盖子小说] 初始化...');
    
    // 恢复用户状态
    const savedUser = localStorage.getItem('gaizi_user');
    if (savedUser) {
        try { state.user = JSON.parse(savedUser); } catch(e) {}
    }
    
    // 加载用户点赞记录
    const savedLikes = localStorage.getItem('gaizi_user_likes');
    if (savedLikes) {
        try { state.userLikes = JSON.parse(savedLikes); } catch(e) { state.userLikes = []; }
    }
    
    // 加载评论数据
    const savedComments = localStorage.getItem('gaizi_comments');
    if (savedComments) {
        try { state.comments = JSON.parse(savedComments); } catch(e) { state.comments = {}; }
    }
    
    // 加载用户内容
    loadUserContents();
    
    // 绑定事件
    bindEvents();
    
    // 隐藏加载
    hideLoading();
    
    console.log('[盖子小说] 初始化完成');
});

function bindEvents() {
    // 搜索框回车
    document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') doSearch();
    });
    
    // 简介字数统计
    document.getElementById('introInput')?.addEventListener('input', (e) => {
        const el = document.getElementById('charCount');
        if (el) el.textContent = e.target.value.length;
    });
}

function hideLoading() {
    const el = document.getElementById('loadingState');
    if (el) el.style.display = 'none';
}

// ===== 加载用户内容 =====
function loadUserContents() {
    try {
        state.userContents = JSON.parse(localStorage.getItem('gaizi_contents') || '[]');
    } catch(e) {
        state.userContents = [];
    }
    renderContents();
}

// ===== 筛选切换 =====
function filterByType(type) {
    state.currentFilter = type;
    
    // 更新按钮样式
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === type);
    });
    
    renderContents();
}

// ===== 搜索 =====
function doSearch() {
    renderContents();
}

// ===== 渲染列表 =====
function renderContents() {
    const container = document.getElementById('contentList');
    if (!container) return;
    
    let html = '';
    
    if (state.currentFilter === 'ranking') {
        // 热榜：九宫格卡片，混合新闻+热门用户内容
        html = renderRankingGrid();
    } else if (state.currentFilter === 'blog') {
        // 博客：内容列表
        html = renderUserList();
    } else {
        // 其他：列表式展示用户内容
        html = renderUserList();
    }
    
    container.innerHTML = html || '<div class="empty-state"><p>暂无内容</p><p style="margin-top:10px"><button class="btn btn-primary" onclick="openPublishModal()">✏️ 分享第一篇</button></p></div>';
}

// ===== 热榜九宫格 =====
function renderRankingGrid() {
    // 合并：新闻 + 用户高赞内容（点赞>100）
    let userHot = state.userContents.filter(c => c.likes > 100);
    let allHot = [...HOT_NEWS_2026, ...userHot];
    
    // 按点赞排序，取前9
    allHot.sort((a, b) => b.likes - a.likes);
    allHot = allHot.slice(0, 9);
    
    if (allHot.length === 0) return '';
    
    return '<div class="ranking-grid">' + allHot.map(item => `
        <div class="ranking-card" onclick="openRankingDetail('${item.id}')">
            <div class="ranking-image">
                <img src="${item.image || 'https://via.placeholder.com/400'}" alt="${escapeHtml(item.title)}" loading="lazy">
                <div class="ranking-overlay">
                    <span class="ranking-likes">❤️ ${item.likes}</span>
                </div>
            </div>
            <div class="ranking-info">
                <h3 class="ranking-title">${escapeHtml(item.title)}</h3>
                <p class="ranking-subtitle">${escapeHtml(item.subtitle || item.source || '')}</p>
                <p class="ranking-author">${escapeHtml(item.author)}</p>
            </div>
        </div>
    `).join('') + '</div>';
}

// ===== 用户内容列表 =====
function renderUserList() {
    let filtered = state.userContents;
    
    // 按类型筛选
    if (state.currentFilter !== 'all') {
        filtered = filtered.filter(c => c.type === state.currentFilter);
    }
    
    // 搜索
    const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    if (q) {
        filtered = filtered.filter(c =>
            c.title.toLowerCase().includes(q) ||
            c.intro.toLowerCase().includes(q) ||
            c.author.toLowerCase().includes(q) ||
            (c.tags || []).some(t => t.toLowerCase().includes(q))
        );
    }
    
    if (filtered.length === 0) return '';
    
    return '<div class="content-list-normal">' + filtered.map(c => `
        <div class="content-card" onclick="openDetailModal('${c.id}')">
            <div class="card-header">
                <span class="card-type ${TYPE_CLASS[c.type] || ''}">${TYPE_MAP[c.type] || '📄'}</span>
                ${c.pinned ? '<span class="card-pinned">📌 置顶</span>' : ''}
                ${c.likes > 500 ? '<span class="card-hot">🔥 热</span>' : ''}
            </div>
            <h3 class="card-title">${escapeHtml(c.title)}</h3>
            <p class="card-intro">${escapeHtml(c.intro)}</p>
            <div class="card-footer">
                <div class="card-author">
                    <span class="author-avatar">${(c.author || '匿名')[0]}</span>
                    <span class="author-name">${escapeHtml(c.author || '匿名')}</span>
                </div>
                <div class="card-meta">
                    <span>❤️ ${c.likes}</span>
                    <span>💬 ${c.comments || 0}</span>
                </div>
            </div>
            ${(c.tags && c.tags.length) ? '<div class="card-tags">' + c.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('') + '</div>' : ''}
        </div>
    `).join('') + '</div>';
}

// ===== HTML转义 =====
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===== 发布弹窗 =====
function openPublishModal() {
    document.getElementById('publishModal')?.classList.add('show');
}

function closePublishModal() {
    document.getElementById('publishModal')?.classList.remove('show');
    const form = document.getElementById('publishForm');
    if (form) form.reset();
    const cc = document.getElementById('charCount');
    if (cc) cc.textContent = '0';
}

// ===== 提交发布 =====
function submitContent(e) {
    e.preventDefault();
    
    const title = document.getElementById('titleInput')?.value.trim();
    const type = document.getElementById('typeSelect')?.value;
    const url = document.getElementById('urlInput')?.value.trim();
    const intro = document.getElementById('introInput')?.value.trim();
    const tagsStr = document.getElementById('tagsInput')?.value.trim();
    const pinned = document.getElementById('pinnedInput')?.checked || false;
    
    if (!title || !type || !url || !intro) {
        showToast('请填写所有必填项！', 'error');
        return;
    }
    if (intro.length < 20) {
        showToast('简介至少需要20个字！', 'error');
        return;
    }
    
    // 视频平台检测
    const videoDomains = ['youtube.com', 'youtu.be', 'bilibili.com', 'v.qq.com', 'iqiyi.com', 'youku.com'];
    if (videoDomains.some(d => url.includes(d))) {
        showToast('暂不支持视频链接，请分享文字类内容', 'error');
        return;
    }
    
    const tags = tagsStr ? tagsStr.split(/[,，]/).slice(0, 5).map(t => t.trim()).filter(Boolean) : [];
    
    const newContent = {
        id: 'u_' + Date.now(),
        type,
        title,
        author: state.user?.name || '匿名用户',
        url,
        intro,
        tags,
        pinned,
        likes: 0,
        comments: 0,
        createdAt: new Date().toLocaleDateString('zh-CN')
    };
    
    // 保存到本地
    state.userContents.unshift(newContent);
    localStorage.setItem('gaizi_contents', JSON.stringify(state.userContents));
    
    closePublishModal();
    showToast(pinned ? '✅ 发布成功并已置顶！' : '✅ 发布成功！', 'success');
    
    // 刷新显示
    renderContents();
}

// ===== 详情弹窗（用户内容）=====
function openDetailModal(id) {
    const c = state.userContents.find(x => x.id === id);
    if (!c) return;
    
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('detailContent');
    if (!modal || !content) return;
    
    const comments = state.comments[id] || [];
    
    content.innerHTML = `
        <div class="detail-header">
            <span class="card-type ${TYPE_CLASS[c.type] || ''}">${TYPE_MAP[c.type] || ''}</span>
            ${c.pinned ? '<span class="card-pinned">📌 置顶</span>' : ''}
            <h2 class="detail-title">${escapeHtml(c.title)}</h2>
        </div>
        <div class="detail-author">
            <span class="author-avatar">${(c.author || '?')[0]}</span>
            <div class="detail-author-info">
                <h4>${escapeHtml(c.author || '匿名')}</h4>
                <span>📅 ${c.createdAt || '未知日期'}</span>
            </div>
        </div>
        <div class="detail-intro">${escapeHtml(c.intro)}</div>
        ${(c.tags && c.tags.length) ? '<div class="detail-tags">' + c.tags.map(t => `<span class="detail-tag">${escapeHtml(t)}</span>`).join('') + '</div>' : ''}
        <div class="detail-actions">
            <a href="${escapeHtml(c.url)}" target="_blank" rel="noopener" class="btn btn-primary">🔗 访问原文</a>
            <button onclick="likeContent('${c.id}')" class="btn btn-secondary ${state.userLikes.includes(c.id) ? 'liked' : ''}" ${state.userLikes.includes(c.id) ? 'disabled' : ''}>
                ${state.userLikes.includes(c.id) ? '❤️ 已赞' : '❤️ 点赞'} (${c.likes})
            </button>
        </div>
        ${renderCommentsSection(id, comments)}
    `;
    
    modal.classList.add('show');
}

// ===== 热榜详情弹窗 =====
function openRankingDetail(id) {
    const item = HOT_NEWS_2026.find(x => x.id === id) || state.userContents.find(x => x.id === id);
    if (!item) return;
    
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('detailContent');
    if (!modal || !content) return;
    
    const isNews = item.id.startsWith('news_');
    const comments = state.comments[id] || [];
    
    content.innerHTML = `
        <div class="detail-header">
            ${isNews ? '<span class="card-type type-article">🔥 热榜资讯</span>' : `<span class="card-type ${TYPE_CLASS[item.type] || ''}">${TYPE_MAP[item.type] || ''}</span>`}
            <h2 class="detail-title">${escapeHtml(item.title)}</h2>
            ${item.subtitle ? `<p class="detail-subtitle">${escapeHtml(item.subtitle)}</p>` : ''}
        </div>
        ${item.image ? `<div class="detail-image"><img src="${item.image}" alt=""></div>` : ''}
        <div class="detail-author">
            <span class="author-avatar">${(item.author || '?')[0]}</span>
            <div class="detail-author-info">
                <h4>${escapeHtml(item.author || '匿名')}</h4>
                <span>${item.source || ''} · 📅 ${item.createdAt || '未知日期'}</span>
            </div>
        </div>
        <div class="detail-intro">${escapeHtml(item.desc || item.intro)}</div>
        <div class="detail-actions">
            <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener" class="btn btn-primary">🔗 访问原文</a>
            <button onclick="likeRankingItem('${item.id}')" class="btn btn-secondary ${state.userLikes.includes(item.id) ? 'liked' : ''}" ${state.userLikes.includes(item.id) ? 'disabled' : ''}>
                ${state.userLikes.includes(item.id) ? '❤️ 已赞' : '❤️ 点赞'} (${item.likes})
            </button>
        </div>
        ${renderCommentsSection(id, comments)}
    `;
    
    modal.classList.add('show');
}

function closeDetailModal() {
    document.getElementById('detailModal')?.classList.remove('show');
}

// ===== 点赞 =====
function likeContent(id) {
    // 检查是否已点赞
    if (state.userLikes.includes(id)) {
        showToast('❤️ 您已经赞过了！', 'info');
        return;
    }
    
    const c = state.userContents.find(x => x.id === id);
    if (!c) return;
    
    // 增加点赞数
    c.likes++;
    
    // 记录用户已点赞
    state.userLikes.push(id);
    localStorage.setItem('gaizi_user_likes', JSON.stringify(state.userLikes));
    localStorage.setItem('gaizi_contents', JSON.stringify(state.userContents));
    
    showToast('❤️ 点赞成功！', 'success');
    renderContents();
    openDetailModal(id);
}

// ===== 热榜点赞 =====
function likeRankingItem(id) {
    // 检查是否已点赞
    if (state.userLikes.includes(id)) {
        showToast('❤️ 您已经赞过了！', 'info');
        return;
    }
    
    // 查找是新闻还是用户内容
    const newsItem = HOT_NEWS_2026.find(x => x.id === id);
    const userItem = state.userContents.find(x => x.id === id);
    const item = newsItem || userItem;
    
    if (!item) return;
    
    // 增加点赞数
    item.likes++;
    
    // 记录用户已点赞
    state.userLikes.push(id);
    localStorage.setItem('gaizi_user_likes', JSON.stringify(state.userLikes));
    
    // 如果是用户内容，保存到localStorage
    if (userItem) {
        localStorage.setItem('gaizi_contents', JSON.stringify(state.userContents));
    }
    
    showToast('❤️ 点赞成功！', 'success');
    renderContents();
    openRankingDetail(id);
}

// ===== Toast提示 =====
function showToast(msg, type) {
    const toast = document.getElementById('toast');
    const textEl = document.getElementById('toastText');
    if (!toast || !textEl) return;
    
    textEl.textContent = msg;
    toast.className = 'toast show' + (type ? ' ' + type : '');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ===== 评论区域渲染 =====
function renderCommentsSection(contentId, comments) {
    const currentUser = state.user?.name || '匿名用户';
    
    return `
        <div class="comments-section">
            <div class="comments-header">
                💬 评论 <span>(${comments.length})</span>
            </div>
            <div class="comment-input-area">
                <span class="author-avatar">${currentUser[0]}</span>
                <div class="comment-input-wrapper">
                    <textarea 
                        id="commentInput_${contentId}" 
                        class="comment-input" 
                        placeholder="写下你的评论..."
                        maxlength="500"
                    ></textarea>
                    <div class="comment-input-actions">
                        <button onclick="submitComment('${contentId}')" class="comment-submit-btn">发表评论</button>
                    </div>
                </div>
            </div>
            <div class="comments-list" id="commentsList_${contentId}">
                ${comments.length > 0 
                    ? comments.map(c => renderCommentItem(c)).join('') 
                    : '<div class="empty-comments">暂无评论，快来抢沙发吧！</div>'
                }
            </div>
        </div>
    `;
}

// ===== 渲染单条评论 =====
function renderCommentItem(comment) {
    return `
        <div class="comment-item">
            <span class="author-avatar">${comment.author[0]}</span>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${escapeHtml(comment.author)}</span>
                    <span class="comment-time">${formatTime(comment.createdAt)}</span>
                </div>
                <div class="comment-text">${escapeHtml(comment.text)}</div>
            </div>
        </div>
    `;
}

// ===== 提交评论 =====
function submitComment(contentId) {
    const input = document.getElementById(`commentInput_${contentId}`);
    if (!input) return;
    
    const text = input.value.trim();
    if (!text) {
        showToast('请输入评论内容', 'error');
        return;
    }
    
    if (text.length < 2) {
        showToast('评论至少2个字', 'error');
        return;
    }
    
    const newComment = {
        id: 'c_' + Date.now(),
        author: state.user?.name || '匿名用户',
        text: text,
        createdAt: new Date().toISOString()
    };
    
    // 初始化该内容的评论数组
    if (!state.comments[contentId]) {
        state.comments[contentId] = [];
    }
    
    // 添加评论到开头
    state.comments[contentId].unshift(newComment);
    
    // 保存到 localStorage
    localStorage.setItem('gaizi_comments', JSON.stringify(state.comments));
    
    // 更新对应内容的评论数
    const userContent = state.userContents.find(x => x.id === contentId);
    if (userContent) {
        userContent.comments = state.comments[contentId].length;
        localStorage.setItem('gaizi_contents', JSON.stringify(state.userContents));
    }
    
    // 清空输入框
    input.value = '';
    
    // 刷新评论列表
    const commentsList = document.getElementById(`commentsList_${contentId}`);
    const comments = state.comments[contentId];
    if (commentsList) {
        commentsList.innerHTML = comments.map(c => renderCommentItem(c)).join('');
    }
    
    // 更新评论数显示
    const commentsHeader = document.querySelector('.comments-header span');
    if (commentsHeader) {
        commentsHeader.textContent = `(${comments.length})`;
    }
    
    // 刷新主列表显示
    renderContents();
    
    showToast('✅ 评论发表成功！', 'success');
}

// ===== 格式化时间 =====
function formatTime(isoString) {
    if (!isoString) return '未知时间';
    
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;
    
    // 小于1分钟
    if (diff < 60000) return '刚刚';
    // 小于1小时
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
    // 小于24小时
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
    // 小于7天
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`;
    
    // 超过7天显示日期
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}
