// ===== 盖子小说 - 纯本地模式（无需Firebase）=====

const state = {
    user: { uid: 'local_user', phoneNumber: '' },
    contents: [],
    pinnedContents: [],
    currentFilter: 'all',
    currentPinnedIndex: 0
};

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    loadContents();
    setupEventListeners();
});

// ===== 事件监听 =====
function setupEventListeners() {
    const introInput = document.getElementById('introInput');
    if (introInput) {
        introInput.addEventListener('input', () => {
            document.getElementById('charCount').textContent = introInput.value.length;
        });
    }
    document.addEventListener('click', (e) => {
        const dropdown = document.querySelector('.dropdown-menu');
        if (dropdown && !e.target.closest('.user-dropdown')) {
            dropdown.classList.remove('show');
        }
    });
    document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') search();
    });
}

// ===== 登录/发布（无需登录）=====
function openLoginModal() {
    state.user = { uid: 'local_user', phoneNumber: '' };
    closeLoginModal();
    showToast('已进入分享模式', 'success');
    renderContents();
}

function closeLoginModal() {
    document.getElementById('loginModal')?.classList.remove('show');
}

function openPublishModal() {
    document.getElementById('publishModal')?.classList.add('show');
}

function closePublishModal() {
    document.getElementById('publishModal')?.classList.remove('show');
    document.getElementById('publishForm')?.reset();
    document.getElementById('charCount').textContent = '0';
}

// ===== 发布内容 =====
function submitContent(e) {
    e.preventDefault();
    const title = document.getElementById('titleInput')?.value.trim();
    const type = document.getElementById('typeSelect')?.value;
    const url = document.getElementById('urlInput')?.value.trim();
    const intro = document.getElementById('introInput')?.value.trim();
    const tagsInput = document.getElementById('tagsInput')?.value.trim();

    if (!title || !type || !url || !intro) {
        showToast('请填写必填项！', 'error'); return;
    }
    if (intro.length < 20) {
        showToast('简介至少需要20个字！', 'error'); return;
    }
    const videoDomains = ['youtube.com','youtu.be','bilibili.com','v.qq.com','iqiyi.com','youku.com'];
    if (videoDomains.some(d => url.toLowerCase().includes(d))) {
        showToast('不支持视频平台链接', 'error'); return;
    }
    const tags = tagsInput ? tagsInput.split(/[,，]/).slice(0,5).map(t=>t.trim()).filter(t=>t) : [];

    const newContent = {
        id: 'c_' + Date.now(),
        type, title,
        author: '匿名用户',
        url, intro, tags,
        likes: Math.floor(Math.random() * 500) + 10,
        createdAt: new Date().toLocaleDateString('zh-CN'),
        pinned: false
    };

    const saved = JSON.parse(localStorage.getItem('gaizi_contents') || '[]');
    saved.unshift(newContent);
    localStorage.setItem('gaizi_contents', JSON.stringify(saved));
    state.contents = saved;

    closePublishModal();
    showToast('发布成功！', 'success');
    renderContents();
    document.getElementById('publishForm')?.reset();
    document.getElementById('charCount').textContent = '0';
}

// ===== 加载内容 =====
function loadContents() {
    const saved = JSON.parse(localStorage.getItem('gaizi_contents') || '[]');
    if (saved.length > 0) {
        state.contents = saved;
        renderContents();
        return;
    }
    // 示例数据
    state.contents = [
        { id:'d1', title:'【纯美散文】山间听风', type:'article', author:'林清', url:'https://mp.weixin.qq.com/s/example1', intro:'山风拂过脸颊，带走了尘世的喧嚣，只留下心底最柔软的宁静。这是一篇关于自然与心灵的对话……', tags:['散文','自然'], likes:328, createdAt:'2026-05-01' },
        { id:'d2', title:'《星河彼岸》第三章', type:'novel', author:'苏遥', url:'https://mp.weixin.qq.com/s/example2', intro:'飞船穿越小行星带，警报声骤然响起。舷窗外，无数陨石如流星般坠落……', tags:['科幻','连载'], likes:892, createdAt:'2026-04-30' },
        { id:'d3', title:'茶文案｜一盏清茶，一段时光', type:'copywriting', author:'云染', url:'https://mp.weixin.qq.com/s/example3', intro:'茶不语，却懂每一颗渴望安宁的心。沸水冲开茶叶的瞬间，是一场关于等待与回味的仪式……', tags:['茶道','文案'], likes:567, createdAt:'2026-04-29' },
        { id:'d4', title:'【短篇小说】最后一班地铁', type:'novel', author:'程路', url:'https://mp.weixin.qq.com/s/example4', intro:'地铁门即将关闭的瞬间，我看见了站台上那个熟悉的身影。手中的信封还没来得及……', tags:['都市','悬疑'], likes:1203, createdAt:'2026-04-28' },
        { id:'d5', title:'博客｜写作是我与自己和解的方式', type:'blog', author:'白川', url:'https://mp.weixin.qq.com/s/example5', intro:'从大学时代开始写博客，至今已有十年。文字陪伴我度过无数个失眠的夜晚……', tags:['写作','随笔'], likes:445, createdAt:'2026-04-27' },
        { id:'d6', title:'《暮光之境》第一章', type:'novel', author:'洛颜', url:'https://mp.weixin.qq.com/s/example6', intro:'暮光从地平线倾泻而下，将整座城池染成琥珀色。她站在城墙上，望着远方的群山……', tags:['奇幻','言情'], likes:2341, createdAt:'2026-04-26' },
        { id:'d7', title:'【情感散文】致那个再也回不去的夏天', type:'article', author:'南风', url:'https://mp.weixin.qq.com/s/example7', intro:'那年夏天的蝉鸣特别响，阳光也格外耀眼。我们以为会永远在一起，却不知时光……', tags:['情感','回忆'], likes:1876, createdAt:'2026-04-25' },
        { id:'d8', title:'品牌文案｜让每一次呼吸都有意义', type:'copywriting', author:'鹿鸣', url:'https://mp.weixin.qq.com/s/example8', intro:'我们相信，好的产品不只是功能的堆砌，更是生活态度的延伸。每一处细节……', tags:['品牌','营销'], likes:623, createdAt:'2026-04-24' }
    ];
    renderContents();
    renderPinnedSlider();
}

// ===== 渲染列表 =====
function renderContents() {
    const container = document.getElementById('contentList');
    if (!container) return;
    const typeMap = { article:'📝 文章', novel:'📚 小说', copywriting:'✍️ 文案', blog:'🌐 博客' };
    const filtered = state.currentFilter === 'all'
        ? state.contents
        : state.contents.filter(c => c.type === state.currentFilter);
    const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const searched = q ? filtered.filter(c =>
        c.title.toLowerCase().includes(q) || c.intro.toLowerCase().includes(q) ||
        c.author.toLowerCase().includes(q) || (c.tags||[]).some(t=>t.toLowerCase().includes(q))
    ) : filtered;

    if (searched.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>暂无内容，去<a href="#" onclick="openPublishModal();return false;">发布第一篇</a>吧！</p></div>';
        return;
    }
    container.innerHTML = searched.map(c => `
        <div class="card" onclick="openDetailModal('${c.id}')">
            <div class="card-tag">${typeMap[c.type]||'📄 未知'}</div>
            <h3 class="card-title">${c.title}</h3>
            <p class="card-intro">${c.intro.slice(0,80)}…</p>
            <div class="card-meta">
                <span class="card-author">👤 ${c.author}</span>
                <span class="card-likes">❤️ ${c.likes}</span>
            </div>
            <div class="card-tags">${(c.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        </div>
    `).join('');
}

// ===== 筛选 =====
function setFilter(type) {
    state.currentFilter = type;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-filter="${type}"]`)?.classList.add('active');
    renderContents();
}

function search() { renderContents(); }

// ===== 详情弹窗 =====
function openDetailModal(id) {
    const c = state.contents.find(x => x.id === id);
    if (!c) return;
    document.getElementById('detailModal')?.classList.add('show');
    const typeMap = { article:'📝 文章', novel:'📚 小说', copywriting:'✍️ 文案', blog:'🌐 博客' };
    document.getElementById('detailContent').innerHTML = `
        <h2 class="detail-title">${c.title}</h2>
        <div class="detail-meta">
            <span>${typeMap[c.type]||''}</span>
            <span>👤 ${c.author}</span>
            <span>❤️ ${c.likes}</span>
            <span>📅 ${c.createdAt}</span>
        </div>
        <p class="detail-intro">${c.intro}</p>
        <div class="detail-tags">${(c.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <a href="${c.url}" target="_blank" class="btn btn-primary">🔗 访问原文</a>
        <button onclick="likeContent('${c.id}')" class="btn btn-secondary" style="margin-left:10px">👍 点赞</button>
    `;
}
function closeDetailModal() { document.getElementById('detailModal')?.classList.remove('show'); }
function likeContent(id) {
    const c = state.contents.find(x => x.id === id);
    if (!c) return;
    c.likes++;
    localStorage.setItem('gaizi_contents', JSON.stringify(state.contents));
    document.getElementById('detailLikes').textContent = '❤️ ' + c.likes;
    renderContents();
}

// ===== 置顶轮播（静态占位）=====
function renderPinnedSlider() {}

// ===== Toast提示 =====
function showToast(msg, type) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    document.getElementById('toastText').textContent = msg;
    toast.className = 'toast show ' + (type||'');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== 用户下拉 =====
function toggleUserDropdown() {
    document.querySelector('.dropdown-menu')?.classList.toggle('show');
}
function updateUserUI() {}

// ===== 用户登出 =====
function logout() {
    state.user = null;
    localStorage.removeItem('gaizi_user');
    showToast('已退出', 'success');
    renderContents();
}