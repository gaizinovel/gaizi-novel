// ===== 盖子小说 - 核心应用 =====

// 状态管理
const state = {
    user: null,
    contents: [],
    pinnedContents: [],
    currentFilter: 'all',
    confirmationResult: null,
    currentPinnedIndex: 0,
    lastDoc: null,
    hasMore: true
};

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    loadContents();
    setupRecaptcha();
    setupEventListeners();
});

// ===== 事件监听 =====
function setupEventListeners() {
    // 简介字数统计
    const introInput = document.getElementById('introInput');
    if (introInput) {
        introInput.addEventListener('input', () => {
            document.getElementById('charCount').textContent = introInput.value.length;
        });
    }
    
    // 用户下拉菜单
    document.addEventListener('click', (e) => {
        const dropdown = document.querySelector('.dropdown-menu');
        if (dropdown && !e.target.closest('.user-dropdown')) {
            dropdown.classList.remove('show');
        }
    });
    
    // 回车搜索
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            search();
        }
    });
}

// ===== 认证系统 =====
function initAuth() {
    auth.onAuthStateChanged((user) => {
        state.user = user;
        updateUserUI();
    });
}

function setupRecaptcha() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
            // reCAPTCHA solved
        }
    });
    window.recaptchaVerifier.render();
}

function openLoginModal() {
    if (state.user) {
        toggleUserDropdown();
        return;
    }
    document.getElementById('loginModal').classList.add('show');
    document.getElementById('phoneStep').style.display = 'block';
    document.getElementById('codeStep').style.display = 'none';
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('show');
}

function sendCode() {
    const phone = document.getElementById('phoneInput').value.trim();
    
    if (!phone || phone.length !== 11) {
        showToast('请输入正确的手机号', 'error');
        return;
    }
    
    const formattedPhone = '+86' + phone;
    
    auth.signInWithPhoneNumber(formattedPhone, window.recaptchaVerifier)
        .then((confirmationResult) => {
            state.confirmationResult = confirmationResult;
            document.getElementById('phoneStep').style.display = 'none';
            document.getElementById('codeStep').style.display = 'block';
            startResendTimer();
            showToast('验证码已发送', 'success');
        })
        .catch((error) => {
            console.error('发送验证码失败:', error);
            showToast('发送失败，请重试', 'error');
        });
}

function startResendTimer() {
    const btn = document.getElementById('resendBtn');
    let seconds = 60;
    btn.disabled = true;
    
    const timer = setInterval(() => {
        seconds--;
        btn.textContent = `${seconds}秒后重发`;
        if (seconds <= 0) {
            clearInterval(timer);
            btn.textContent = '重新获取';
            btn.disabled = false;
        }
    }, 1000);
}

function verifyCode() {
    const code = document.getElementById('codeInput').value.trim();
    
    if (!code || code.length !== 6) {
        showToast('请输入6位验证码', 'error');
        return;
    }
    
    state.confirmationResult.confirm(code)
        .then((result) => {
            closeLoginModal();
            showToast('登录成功', 'success');
        })
        .catch((error) => {
            console.error('验证失败:', error);
            showToast('验证码错误', 'error');
        });
}

function logout() {
    auth.signOut().then(() => {
        showToast('已退出登录', 'success');
    });
}

function toggleUserDropdown() {
    const dropdown = document.querySelector('.dropdown-menu');
    dropdown.classList.toggle('show');
}

function updateUserUI() {
    const userArea = document.getElementById('userArea');
    
    if (state.user) {
        const initial = state.user.phoneNumber ? 
            state.user.phoneNumber.slice(-4) : 'U';
        userArea.innerHTML = `
            <div class="user-dropdown">
                <div class="user-avatar" onclick="toggleUserDropdown()">${initial}</div>
                <div class="dropdown-menu">
                    <div class="dropdown-item" onclick="openPublishModal()">发布作品</div>
                    <div class="dropdown-item danger" onclick="logout()">退出登录</div>
                </div>
            </div>
        `;
    } else {
        userArea.innerHTML = `
            <button class="btn btn-primary" onclick="openLoginModal()">登录</button>
        `;
    }
}

// ===== 内容管理 =====
async function loadContents() {
    showLoading(true);
    
    try {
        const contentsRef = db.collection('contents')
            .where('status', '==', 'approved')
            .orderBy('createdAt', 'desc')
            .limit(20);
        
        const snapshot = await contentsRef.get();
        
        state.contents = [];
        state.lastDoc = null;
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            state.contents.push(data);
        });
        
        if (snapshot.docs.length > 0) {
            state.lastDoc = snapshot.docs[snapshot.docs.length - 1];
        }
        
        state.hasMore = snapshot.docs.length === 20;
        
        // 加载置顶内容
        await loadPinnedContents();
        
        renderContents();
        showLoading(false);
    } catch (error) {
        console.error('加载内容失败:', error);
        showLoading(false);
        // 显示空状态或错误
        state.contents = getDemoContents();
        renderContents();
    }
}

async function loadPinnedContents() {
    try {
        const pinnedRef = db.collection('contents')
            .where('status', '==', 'approved')
            .where('isPinned', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(10);
        
        const snapshot = await pinnedRef.get();
        
        state.pinnedContents = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            state.pinnedContents.push(data);
        });
        
        renderPinnedBanner();
    } catch (error) {
        console.error('加载置顶内容失败:', error);
    }
}

async function loadMore() {
    if (!state.hasMore || !state.lastDoc) return;
    
    try {
        const contentsRef = db.collection('contents')
            .where('status', '==', 'approved')
            .orderBy('createdAt', 'desc')
            .startAfter(state.lastDoc)
            .limit(20);
        
        const snapshot = await contentsRef.get();
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            state.contents.push(data);
        });
        
        if (snapshot.docs.length > 0) {
            state.lastDoc = snapshot.docs[snapshot.docs.length - 1];
        }
        
        state.hasMore = snapshot.docs.length === 20;
        
        renderContents();
        document.getElementById('loadMoreBtn').style.display = state.hasMore ? 'block' : 'none';
    } catch (error) {
        console.error('加载更多失败:', error);
    }
}

function renderContents() {
    const container = document.getElementById('contentList');
    const emptyState = document.getElementById('emptyState');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // 筛选
    let filtered = state.contents;
    if (state.currentFilter !== 'all') {
        filtered = state.contents.filter(c => c.type === state.currentFilter);
    }
    
    // 搜索
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(c => 
            c.title.toLowerCase().includes(searchTerm) || 
            c.intro.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    loadMoreBtn.style.display = state.hasMore ? 'block' : 'none';
    
    container.innerHTML = filtered.map(content => createCardHTML(content)).join('');
}

function createCardHTML(content) {
    const typeLabels = {
        article: '📝 文章',
        novel: '📚 小说',
        copywriting: '✍️ 文案',
        blog: '🌐 博客'
    };
    
    const date = content.createdAt ? 
        new Date(content.createdAt.seconds * 1000).toLocaleDateString('zh-CN') : 
        new Date().toLocaleDateString('zh-CN');
    
    const authorInitial = content.authorName ? content.authorName.charAt(0) : 'U';
    
    return `
        <article class="content-card" onclick="openDetailModal('${content.id}')">
            ${content.isPinned ? '<span class="card-pinned">置顶</span>' : ''}
            <div class="card-header">
                <span class="card-type type-${content.type}">${typeLabels[content.type]}</span>
            </div>
            <h3 class="card-title">${escapeHtml(content.title)}</h3>
            <p class="card-intro">${escapeHtml(content.intro)}</p>
            <div class="card-footer">
                <div class="card-author">
                    <span class="author-avatar">${authorInitial}</span>
                    <span class="author-name">${escapeHtml(content.authorName || '匿名用户')}</span>
                </div>
                <div class="card-meta">
                    <span>👍 ${content.likes || 0}</span>
                    <span>💬 ${content.commentCount || 0}</span>
                </div>
            </div>
        </article>
    `;
}

function filterByType(type) {
    state.currentFilter = type;
    
    // 更新UI
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.classList.toggle('active', tag.dataset.type === type);
    });
    
    // 热榜单独渲染
    if (type === 'ranking') {
        renderRanking();
    } else {
        renderContents();
    }
}

function search() {
    renderContents();
}

// ===== 置顶横幅 =====
function renderPinnedBanner() {
    const banner = document.getElementById('pinnedBanner');
    const track = document.getElementById('pinnedTrack');
    
    if (state.pinnedContents.length === 0) {
        banner.style.display = 'none';
        return;
    }
    
    banner.style.display = 'block';
    state.currentPinnedIndex = 0;
    
    const slider = document.createElement('div');
    slider.className = 'pinned-slider';
    slider.id = 'pinnedSlider';
    
    state.pinnedContents.forEach((content, index) => {
        const item = document.createElement('div');
        item.className = 'pinned-item';
        item.innerHTML = `<a href="#" onclick="event.preventDefault();openDetailModal('${content.id}')">${escapeHtml(content.title)}</a>`;
        slider.appendChild(item);
    });
    
    track.innerHTML = '';
    track.appendChild(slider);
    
    // 自动轮播
    setInterval(() => {
        if (state.pinnedContents.length > 1) {
            nextPinned();
        }
    }, 5000);
}

function prevPinned() {
    if (state.pinnedContents.length <= 1) return;
    state.currentPinnedIndex = (state.currentPinnedIndex - 1 + state.pinnedContents.length) % state.pinnedContents.length;
    updatePinnedSlider();
}

function nextPinned() {
    if (state.pinnedContents.length <= 1) return;
    state.currentPinnedIndex = (state.currentPinnedIndex + 1) % state.pinnedContents.length;
    updatePinnedSlider();
}

function updatePinnedSlider() {
    const slider = document.getElementById('pinnedSlider');
    if (slider) {
        slider.style.transform = `translateX(-${state.currentPinnedIndex * 100}%)`;
    }
}

// ===== 发布内容 =====
function openPublishModal() {
    if (!state.user) {
        showToast('请先登录', 'error');
        openLoginModal();
        return;
    }
    document.getElementById('publishModal').classList.add('show');
}

function closePublishModal() {
    document.getElementById('publishModal').classList.remove('show');
    document.getElementById('publishForm').reset();
    document.getElementById('charCount').textContent = '0';
}

async function submitContent(e) {
    e.preventDefault();
    
    if (!state.user) {
        showToast('请先登录', 'error');
        return;
    }
    
    const title = document.getElementById('titleInput').value.trim();
    const type = document.getElementById('typeSelect').value;
    const url = document.getElementById('urlInput').value.trim();
    const intro = document.getElementById('introInput').value.trim();
    const tagsInput = document.getElementById('tagsInput').value.trim();
    
    // 验证视频链接
    const videoDomains = ['youtube.com', 'youtu.be', 'bilibili.com', 'v.qq.com', 'iqiyi.com', 'youku.com', 'youtube.cn'];
    const isVideo = videoDomains.some(domain => url.toLowerCase().includes(domain));
    if (isVideo) {
        showToast('不支持视频平台链接', 'error');
        return;
    }
    
    // 解析标签
    const tags = tagsInput ? tagsInput.split(/[,，]/).slice(0, 5).map(t => t.trim()).filter(t => t) : [];
    
    try {
        await db.collection('contents').add({
            authorId: state.user.uid,
            authorName: state.user.phoneNumber ? `用户${state.user.phoneNumber.slice(-4)}` : '匿名用户',
            title,
            type,
            url,
            intro,
            tags,
            likes: 0,
            commentCount: 0,
            isPinned: false,
            status: 'approved', // 自动审核通过演示
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        closePublishModal();
        showToast('发布成功！', 'success');
        loadContents();
    } catch (error) {
        console.error('发布失败:', error);
        showToast('发布失败，请重试', 'error');
    }
}

// ===== 详情弹窗 =====
async function openDetailModal(contentId) {
    const content = state.contents.find(c => c.id === contentId);
    if (!content) return;
    
    document.getElementById('detailModal').classList.add('show');
    
    const typeLabels = {
        article: '📝 文章',
        novel: '📚 小说',
        copywriting: '✍️ 文案',
        blog: '🌐 博客'
    };
    
    const detailContent = document.getElementById('detailContent');
    detailContent.innerHTML = `
        <div class="detail-header">
            <span class="card-type type-${content.type} detail-type">${typeLabels[content.type]}</span>
            <h2 class="detail-title">${escapeHtml(content.title)}</h2>
            <div class="detail-author">
                <span class="author-avatar">${content.authorName ? content.authorName.charAt(0) : 'U'}</span>
                <div class="detail-author-info">
                    <h4>${escapeHtml(content.authorName || '匿名用户')}</h4>
                    <span>发布于 ${content.createdAt ? new Date(content.createdAt.seconds * 1000).toLocaleDateString('zh-CN') : '刚刚'}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-intro">${escapeHtml(content.intro)}</div>
        
        ${content.tags && content.tags.length > 0 ? `
            <div class="detail-tags">
                ${content.tags.map(tag => `<span class="detail-tag">#${escapeHtml(tag)}</span>`).join('')}
            </div>
        ` : ''}
        
        <div class="detail-actions">
            <a href="${escapeHtml(content.url)}" target="_blank" class="btn btn-primary">前往阅读 →</a>
        </div>
        
        <div class="detail-interaction">
            <div class="interaction-buttons">
                <button class="interaction-btn" onclick="toggleLike('${contentId}')">
                    👍 点赞 <span id="likeCount">${content.likes || 0}</span>
                </button>
                <button class="interaction-btn" onclick="focusComment()">
                    💬 评论 <span id="commentCount">${content.commentCount || 0}</span>
                </button>
                ${state.user && !content.isPinned ? `
                    <button class="interaction-btn pinned-btn" onclick="applyPinned('${contentId}')">
                        ⭐ 申请置顶
                    </button>
                ` : ''}
            </div>
            
            <div class="comments-section">
                <h4>评论</h4>
                ${state.user ? `
                    <div class="comment-input">
                        <input type="text" id="commentInput" placeholder="写下你的评论..." onkeypress="handleCommentKeypress(event, '${contentId}')">
                        <button class="btn btn-primary" onclick="submitComment('${contentId}')">发送</button>
                    </div>
                ` : '<p style="color: var(--secondary); margin-bottom: 16px;">登录后参与评论</p>'}
                <div class="comment-list" id="commentList">
                    <p style="color: var(--secondary); text-align: center; padding: 20px;">暂无评论</p>
                </div>
            </div>
        </div>
    `;
    
    // 加载评论
    loadComments(contentId);
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('show');
}

async function toggleLike(contentId) {
    if (!state.user) {
        showToast('请先登录', 'error');
        return;
    }
    
    try {
        const contentRef = db.collection('contents').doc(contentId);
        await contentRef.update({
            likes: firebase.firestore.FieldValue.increment(1)
        });
        
        const likeBtn = document.querySelector('.interaction-btn');
        likeBtn.classList.add('liked');
        likeBtn.disabled = true;
        
        showToast('点赞成功！', 'success');
    } catch (error) {
        console.error('点赞失败:', error);
    }
}

async function applyPinned(contentId) {
    if (!state.user) {
        showToast('请先登录', 'error');
        return;
    }
    
    const btn = document.querySelector('.pinned-btn');
    btn.classList.add('requested');
    btn.textContent = '已申请';
    btn.disabled = true;
    
    showToast('置顶申请已提交！', 'success');
}

function focusComment() {
    document.getElementById('commentInput').focus();
}

function handleCommentKeypress(e, contentId) {
    if (e.key === 'Enter') {
        submitComment(contentId);
    }
}

async function submitComment(contentId) {
    if (!state.user) {
        showToast('请先登录', 'error');
        return;
    }
    
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    try {
        await db.collection('contents').doc(contentId).collection('comments').add({
            userId: state.user.uid,
            userName: state.user.phoneNumber ? `用户${state.user.phoneNumber.slice(-4)}` : '匿名用户',
            content: text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        await db.collection('contents').doc(contentId).update({
            commentCount: firebase.firestore.FieldValue.increment(1)
        });
        
        input.value = '';
        loadComments(contentId);
        showToast('评论成功！', 'success');
    } catch (error) {
        console.error('评论失败:', error);
        showToast('评论失败', 'error');
    }
}

async function loadComments(contentId) {
    try {
        const commentsRef = db.collection('contents').doc(contentId)
            .collection('comments')
            .orderBy('createdAt', 'desc')
            .limit(50);
        
        const snapshot = await commentsRef.get();
        const list = document.getElementById('commentList');
        
        if (snapshot.empty) {
            list.innerHTML = '<p style="color: var(--secondary); text-align: center; padding: 20px;">暂无评论</p>';
            return;
        }
        
        list.innerHTML = snapshot.docs.map(doc => {
            const comment = doc.data();
            const time = comment.createdAt ? 
                new Date(comment.createdAt.seconds * 1000).toLocaleString('zh-CN') : '';
            return `
                <div class="comment-item">
                    <div class="comment-author">
                        <span class="author-avatar">${comment.userName ? comment.userName.charAt(0) : 'U'}</span>
                        <span>${escapeHtml(comment.userName || '匿名用户')}</span>
                        <time>${time}</time>
                    </div>
                    <p class="comment-text">${escapeHtml(comment.content)}</p>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('加载评论失败:', error);
    }
}

// ===== 工具函数 =====
function showLoading(show) {
    document.getElementById('loadingState').style.display = show ? 'block' : 'none';
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');
    
    toast.className = 'toast ' + type;
    toastText.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== 示例数据（Firebase未配置时显示） =====
function getDemoContents() {
    return [
        {
            id: 'demo1',
            title: '我在起点写小说的这三年',
            type: 'novel',
            intro: '从新人作者到月入过万，分享我的网文写作之路。包含投稿技巧、更新节奏、读者运营等实战经验...',
            authorName: '码字狂人',
            likes: 128,
            commentCount: 56,
            isPinned: true,
            createdAt: { seconds: Date.now() / 1000 - 86400 }
        },
        {
            id: 'demo2',
            title: '公众号爆款文案写作模板',
            type: 'copywriting',
            intro: '整理了100篇10万+文章的标题规律，提炼出这套万能文案模板，直接套用就能出爆款...',
            authorName: '文案小能手',
            likes: 89,
            commentCount: 34,
            isPinned: false,
            createdAt: { seconds: Date.now() / 1000 - 172800 }
        },
        {
            id: 'demo3',
            title: '从零搭建个人博客完整教程',
            type: 'blog',
            intro: '手把手教你用Hexo + GitHub Pages搭建免费博客，包含域名绑定、SEO优化、主题定制...',
            authorName: '技术宅',
            likes: 256,
            commentCount: 102,
            isPinned: true,
            createdAt: { seconds: Date.now() / 1000 - 259200 }
        },
        {
            id: 'demo4',
            title: '2026年自媒体写作趋势分析',
            type: 'article',
            intro: '深度解读AI时代的内容创作变革，普通人如何抓住写作红利，实现被动收入...',
            authorName: '内容创业者',
            likes: 178,
            commentCount: 67,
            isPinned: false,
            createdAt: { seconds: Date.now() / 1000 - 345600 }
        }
    ];
}

