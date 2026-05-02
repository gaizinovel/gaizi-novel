// ===== 盖子小说 - 最终版 =====

const state = {
    user: null,
    userContents: [],
    currentFilter: 'all',
    isSearching: false,  // 搜索状态标志
    searchQuery: '',       // 当前搜索关键词
    userLikes: [],  // 用户已点赞的内容ID列表
    comments: {}    // 评论数据 { contentId: [comment1, comment2, ...] }
};

// ===== 2026年最新文学圈资讯（热榜专用）=====
const HOT_NEWS_2026 = [
    {
        id: 'news_1', title: '《玄鉴仙族》霸榜月票', subtitle: '2026年5月起点月票榜首',
        author: '季越人', source: '起点中文网',
        url: 'https://www.qidian.com/rank/yuepiao/page1/',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 83170, createdAt: '2026-05-02',
        desc: '季越人《玄鉴仙族》以8.3万月票登顶2026年5月起点月票榜冠军！家族修仙题材开创者，讲述陆江仙残魂附镜，传仙道授仙法，开启波澜壮阔的修仙新时代。'
    },
    {
        id: 'news_2', title: '《夜无疆》辰东新作', subtitle: '玄幻品类持续霸榜',
        author: '辰东', source: '起点中文网',
        url: 'https://www.qidian.com/book/1038450877/',
        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 42445, createdAt: '2026-05-01',
        desc: '辰东新书《夜无疆》持续领跑玄幻品类！那一天太阳落下再也没有升起……延续《遮天》《完美世界》辉煌，5月月票稳居前三。'
    },
    {
        id: 'news_3', title: '《没钱修什么仙？》爆火', subtitle: '高武修真新标杆',
        author: '熊狼狗', source: '起点中文网',
        url: 'https://www.qidian.com/book/1023345678/',
        image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 73762, createdAt: '2026-05-01',
        desc: '熊狼狗《没钱修什么仙？》稳居月票榜第二！老者:“你想报仇?” 现实半游戏化+塔防元素，5月热度持续攀升。'
    },
    {
        id: 'news_4', title: '《捞尸人》畅销冠军', subtitle: '都市灵异爆款',
        author: '纯洁滴小龙', source: '起点中文网',
        url: 'https://www.qidian.com/book/1039890335/',
        image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 56210, createdAt: '2026-05-02',
        desc: '纯洁滴小龙《捞尸人》登顶畅销榜冠军！人知鬼恐怖，鬼晓人心毒。传统灵异小说新标杆，5月月票稳居前五。'
    },
    {
        id: 'news_5', title: '5月科幻奇幻新书推荐', subtitle: '17173网文精选',
        author: '17173游戏网', source: '17173新闻',
        url: 'https://news.17173.com/content/05022026/004658271.shtml',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop',
        imageType: 'news', likes: 8921, createdAt: '2026-05-02',
        desc: '2026年5月科幻奇幻新书推荐！探索Sunyi Dean鬼魂故事、Matt Dinniman的Dungeon Crawler Carl续作等5本必读佳作，满足书迷期待。'
    },
    {
        id: 'news_6', title: '起点推荐周榜更新', subtitle: '热门小说TOP10',
        author: '起点中文网', source: '起点推荐榜',
        url: 'http://r.qidian.com/recom',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
        imageType: 'news', likes: 12340, createdAt: '2026-05-01',
        desc: '2026年5月起点推荐周榜更新！《夜无疆》《玄鉴仙族》《捞尸人》稳居前三，多部新品强势入围TOP10。'
    },
    {
        id: 'news_7', title: '《校花的贴身高手》15周年', subtitle: '鱼人二代经典之作',
        author: '鱼人二代', source: '企鹅号',
        url: 'https://so.html5.qq.com/page/real/search_news?docid=70000021_00569ee205819652',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 28450, createdAt: '2026-04-26',
        desc: '2026年4月鱼人二代《校花的贴身高手》连载15周年！起点女频大神转男频的标杆之作，起点闪屏庆祝这一里程碑。'
    },
    {
        id: 'news_8', title: '2026第17周新书完结', subtitle: '18本精品完结',
        author: '企鹅号', source: '网文资讯',
        url: 'https://so.html5.qq.com/page/real/search_news?docid=70000021_00569ee205819652',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
        imageType: 'news', likes: 6742, createdAt: '2026-04-26',
        desc: '2026第17周完结精品汇总：大烟缸《全球挖矿》等18本小说完结，万订作品1本，多部口碑佳作收官。'
    },
    {
        id: 'news_9', title: '《青山》会说话的肘子', subtitle: '玄幻新作持续热更',
        author: '会说话的肘子', source: '起点中文网',
        url: 'https://www.qidian.com/book/1038450878/',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop',
        imageType: 'cover', likes: 33280, createdAt: '2026-05-01',
        desc: '会说话的肘子新书《青山》5月月票3.3万！少时光阴长，泼酒翻红巷。权为砖墙利为瓦，宾朋倚满帐。'
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
    
    // 更新用户UI（登录状态）
    updateUserUI();
    
    // 初始化跑马灯内容
    updateMarquee();
    
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
    // 切换标签时清除搜索状态
    state.isSearching = false;
    state.currentFilter = type;
    state.searchQuery = '';
    document.getElementById('searchInput').value = '';
    
    // 更新按钮样式
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === type);
    });
    
    renderContents();
}

// ===== 搜索 =====
function doSearch() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!q) {
        state.isSearching = false;
        state.searchQuery = '';
        renderContents();
        return;
    }
    state.isSearching = true;
    state.searchQuery = q;
    // 合并热榜和用户内容
    const allContents = [...HOT_NEWS_2026, ...state.userContents];
    // 搜索范围：标题、作者、简介
    const results = allContents.filter(item => 
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.author && item.author.toLowerCase().includes(q)) ||
        (item.desc && item.desc.toLowerCase().includes(q))
    );
    renderSearchResults(results, q);
}

// 渲染搜索结果
function renderSearchResults(results, keyword) {
    const container = document.getElementById('contentList');
    if (!container) return;
    let html = `<div style="padding:16px;color:var(--secondary);font-size:14px;margin-bottom:12px;">搜索「${keyword}」找到 ${results.length} 条结果</div>`;
    if (results.length === 0) {
        html += '<div class="empty-state"><p>未找到相关内容</p><p style="margin-top:10px;font-size:13px;color:var(--secondary);">尝试搜索小说名、作家名或作品简介</p></div>';
    } else {
        results.forEach(item => {
            const typeLabel = TYPE_MAP[item.type] || '📄 内容';
            const typeClass = TYPE_CLASS[item.type] || '';
            const imgSrc = item.image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop';
            html += `
            <div class="content-card ${typeClass}" onclick="openDetailModal('${item.id}')">
                <div class="content-cover" style="background-image:url('${imgSrc}')"></div>
                <div class="content-info">
                    <div class="content-type">${typeLabel}</div>
                    <h3 class="content-title">${item.title}</h3>
                    <p class="content-desc">${item.desc || '暂无简介'}</p>
                    <div class="content-meta">
                        <span>✍️ ${item.author || '匿名'}</span>
                        <span>❤️ ${item.likes || 0}</span>
                    </div>
                </div>
            </div>`;
        });
    }
    container.innerHTML = html;
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
    // 用户内容按互动量排序（点赞+评论），优先置顶内容
    let userHot = state.userContents
        .filter(c => c.pinned || c.likes > 50) // 置顶内容 或 点赞>50
        .map(c => ({
            ...c,
            interaction: (c.likes || 0) + (c.comments || 0) * 2 // 评论权重更高
        }))
        .sort((a, b) => {
            // 置顶优先，然后按互动量
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return b.interaction - a.interaction;
        })
        .slice(0, 4); // 取前4个用户内容
    
    // 合并：用户热门内容 + 新闻资讯
    let allHot = [...userHot, ...HOT_NEWS_2026];
    
    // 按点赞排序，取前9
    allHot.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    allHot = allHot.slice(0, 9);
    
    if (allHot.length === 0) return '';
    
    return '<div class="ranking-grid">' + allHot.map(item => {
        const isUserContent = item.id.startsWith('u_');
        const pinnedBadge = isUserContent && item.pinned ? '<span class="ranking-badge pinned">📌 置顶</span>' : '';
        const hotBadge = isUserContent && item.likes > 500 ? '<span class="ranking-badge hot">🔥 热</span>' : '';
        const userBadge = isUserContent ? '<span class="ranking-badge user">👤 用户</span>' : '';
        
        return `
        <div class="ranking-card ${isUserContent ? 'user-content' : ''}" onclick="openRankingDetail('${item.id}')">
            <div class="ranking-image">
                <img src="${item.image || 'https://via.placeholder.com/400'}" alt="${escapeHtml(item.title)}" loading="lazy">
                <div class="ranking-badges">${pinnedBadge}${hotBadge}${userBadge}</div>
                <div class="ranking-overlay">
                    <span class="ranking-likes">❤️ ${item.likes || 0}</span>
                    ${isUserContent ? `<span class="ranking-comments">💬 ${item.comments || 0}</span>` : ''}
                </div>
            </div>
            <div class="ranking-info">
                <h3 class="ranking-title">${escapeHtml(item.title)}</h3>
                <p class="ranking-subtitle">${escapeHtml(item.subtitle || item.source || (isUserContent ? TYPE_MAP[item.type] : ''))}</p>
                <p class="ranking-author">${escapeHtml(item.author)}</p>
            </div>
        </div>
    `}).join('') + '</div>';
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
    
    // 刷新显示和跑马灯
    renderContents();
    updateMarquee();
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

// ===== 更新跑马灯内容 =====
function updateMarquee() {
    const marqueeContent = document.querySelector('#blogMarqueeInline .blog-marquee-inline-content');
    if (!marqueeContent) return;
    
    let items = [];
    
    // 1. 加入热榜新闻（前5条）
    HOT_NEWS_2026.slice(0, 5).forEach(news => {
        items.push(`<span>🔥 ${news.title}</span>`);
    });
    
    // 2. 加入用户最新发布的作品提示（前5条）
    const latestUserContents = state.userContents.slice(0, 5);
    latestUserContents.forEach(item => {
        const author = item.author || '匿名用户';
        items.push(`<span>📢 用户${author}发布了新作品《${item.title}》</span>`);
    });
    
    // 如果没有用户内容，加入默认提示
    if (latestUserContents.length === 0) {
        items.push('<span>✏️ 分享你创作的作品信息，让更多人看到它！</span>');
    }
    
    // 重复一次实现无缝滚动
    const content = items.join('') + items.join('');
    marqueeContent.innerHTML = content;
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
    const isLoggedIn = !!state.user;
    const currentUser = state.user?.name || '匿名用户';
    
    // 未登录时显示登录提示
    const loginPrompt = !isLoggedIn ? `
        <div class="comment-login-prompt">
            <p>🔐 登录后即可发表评论</p>
            <button class="btn btn-primary" onclick="openLoginModal()" style="margin-top:12px;">立即登录</button>
        </div>
    ` : '';
    
    // 登录后显示评论输入区
    const commentInputArea = isLoggedIn ? `
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
    ` : '';
    
    return `
        <div class="comments-section">
            <div class="comments-header">
                💬 评论 <span>(${comments.length})</span>
            </div>
            ${loginPrompt}
            ${commentInputArea}
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
    // 检查是否登录
    if (!state.user) {
        showToast('请先登录后再评论', 'info');
        openLoginModal();
        return;
    }
    
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
// ===== ��¼/ע�� =====
let pendingPhone = "";

function openLoginModal() {
    document.getElementById("loginModal")?.classList.add("show");
}

function closeLoginModal() {
    document.getElementById("loginModal")?.classList.remove("show");
    document.getElementById("loginStep1").style.display = "";
    document.getElementById("loginStep2").style.display = "none";
    document.getElementById("phoneInput").value = "";
    document.getElementById("codeInput").value = "";
    document.getElementById("codeInput2").value = "";
}

function sendCode() {
    const phone = document.getElementById("phoneInput")?.value.trim();
    if (!phone || phone.length !== 11) {
        showToast('请输入正确的11位手机号', 'error');
        return;
    }
    pendingPhone = phone;
    const btn = document.getElementById("sendCodeBtn");
    if (btn) { btn.disabled = true; btn.textContent = '发送中...'; }
    setTimeout(() => {
        const fakeCode = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("gaizi_verify_code_" + phone, fakeCode.toString());
        localStorage.setItem("gaizi_verify_time_" + phone, Date.now().toString());
        showToast('模拟验证码：' + fakeCode, 'info');
        if (btn) { btn.textContent = '已发送'; }
        document.getElementById("loginStep1").style.display = "none";
        document.getElementById("loginStep2").style.display = "";
        document.getElementById("codeInput2").focus();
        let countdown = 60;
        const timer = setInterval(() => {
            countdown--;
            if (btn) btn.textContent = countdown + '秒后重发';
            if (countdown <= 0) {
                clearInterval(timer);
                if (btn) { btn.disabled = false; btn.textContent = '重新发送'; }
            }
        }, 1000);
    }, 800);
}

function backToStep1() {
    document.getElementById("loginStep1").style.display = "";
    document.getElementById("loginStep2").style.display = "none";
    pendingPhone = "";
}

function submitLogin() {
    const phone = pendingPhone || document.getElementById("phoneInput")?.value.trim();
    const code = document.getElementById("codeInput")?.value.trim() || document.getElementById("codeInput2")?.value.trim();
    if (!code || code.length !== 6) {
        showToast('请输入6位验证码', 'error');
        return;
    }
    const savedCode = localStorage.getItem("gaizi_verify_code_" + phone);
    const savedTime = localStorage.getItem("gaizi_verify_time_" + phone);
    if (!savedCode || !savedTime) {
        showToast('请先获取验证码', 'error');
        return;
    }
    if (Date.now() - parseInt(savedTime) > 300000) {
        showToast('验证码已过期，请重新获取', 'error');
        return;
    }
    if (code !== savedCode) {
        showToast('验证码错误，请重新输入', 'error');
        return;
    }
    const user = {
        id: "user_" + Date.now(),
        phone: phone,
        name: '用户' + phone.slice(-4),
        createdAt: new Date().toISOString()
    };
    state.user = user;
    localStorage.setItem("gaizi_user", JSON.stringify(user));
    localStorage.removeItem("gaizi_verify_code_" + phone);
    localStorage.removeItem("gaizi_verify_time_" + phone);
    closeLoginModal();
    updateUserUI();
    showToast('登录成功，欢迎 ' + user.name, 'success');
}

function logout() {
    state.user = null;
    localStorage.removeItem("gaizi_user");
    updateUserUI();
    showToast('已退出登录', 'info');
}

function updateUserUI() {
    const userInfo = document.getElementById("userInfo");
    const loginBtn = document.getElementById("loginBtn");
    const userAvatar = document.getElementById("userAvatar");
    const userName = document.getElementById("userName");
    if (state.user && userInfo && loginBtn) {
        userInfo.classList.add("show");
        loginBtn.classList.add("hidden");
        if (userAvatar) userAvatar.textContent = state.user.name[0];
        if (userName) userName.textContent = state.user.name;
    } else if (userInfo && loginBtn) {
        userInfo.classList.remove("show");
        loginBtn.classList.remove("hidden");
    }
}

function handlePublish() {
    if (!state.user) {
        showToast('请先登录再发布内容', 'info');
        openLoginModal();
        return;
    }
    openPublishModal();
}
