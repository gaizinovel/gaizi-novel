// ===== 盖子小说 - 完整功能版 =====

const state = {
    user: null,
    contents: [],
    currentFilter: 'all'
};

// ===== 最新热点资讯数据（2026年4-5月）=====
const HOT_NEWS = [
    {
        id: 'n1', title: 'B站与晋江文学城签订三年合作框架协议，总额1.2亿元',
        type: 'article', author: '中国作家网',
        url: 'https://www.chinawriter.com.cn/n1/2026/0430/c405059-40408096.html',
        intro: '4月30日，哔哩哔哩与晋江文学城在杭州签订合作框架协议。双方将在网文IP改编、动画制作、影视开发等领域展开深度合作，总金额达1.2亿元。',
        tags: ['网文IP', 'B站', '晋江', '影视改编'], likes: 2847, createdAt: '2026-04-30',
        image: '', imageType: 'news'
    },
    {
        id: 'n2', title: '《牧神记》动画年番不断更，B站评分9.7持续领跑国漫',
        type: 'novel', author: '宅猪（起点中文网）',
        url: 'https://www.bilibili.com/bangumi/play/ss46000',
        intro: '宅猪代表作《牧神记》动画版在B站以年番形式持续更新，目前评分高达9.7分，被誉为近年来最成功的网文改编动画之一。',
        tags: ['牧神记', '动画', 'B站', '宅猪'], likes: 5621, createdAt: '2026-04-29',
        image: '', imageType: 'cover'
    },
    {
        id: 'n3', title: '徐则臣担任"书香天府·全民阅读"推广大使',
        type: 'article', author: '人民文学出版社',
        url: 'https://www.rw-cn.com/html/report/26042301.html',
        intro: '茅盾文学奖得主徐则臣受邀担任"书香天府·全民阅读"推广大使，在成都参加世界读书日活动，倡导全民阅读风尚。',
        tags: ['徐则臣', '茅盾文学奖', '全民阅读'], likes: 1834, createdAt: '2026-04-23',
        image: '', imageType: 'author'
    },
    {
        id: 'n4', title: '第十二届影响力作家评选结果公布（世界读书日）',
        type: 'article', author: '中国出版传媒商报',
        url: 'https://www.cbbr.com.cn/article/detail_27846.html',
        intro: '4月23日世界读书日，第十二届影响力作家评选结果正式公布，涵盖小说、散文、诗歌、儿童文学等多个门类，百余位作家入选。',
        tags: ['影响力作家', '世界读书日', '文学奖项'], likes: 2156, createdAt: '2026-04-23',
        image: '', imageType: 'news'
    },
    {
        id: 'n5', title: '《北上》电视剧热播，改编自徐则臣茅奖作品',
        type: 'novel', author: '徐则臣',
        url: 'https://v.qq.com/x/cover/mzc00200rp02bq.html',
        intro: '改编自第十届茅盾文学奖获奖作品《北上》的同名电视剧正在热播，大运河百年变迁的故事引发观众强烈共鸣。',
        tags: ['北上', '电视剧', '茅盾文学奖', '大运河'], likes: 3429, createdAt: '2026-04-20',
        image: '', imageType: 'cover'
    },
    {
        id: 'n6', title: '《吞噬星空》动画第三季定档，玄机科技打造顶级国漫',
        type: 'novel', author: '我吃西红柿（起点中文网）',
        url: 'https://www.bilibili.com/bangumi/play/ss45239',
        intro: '我吃西红柿经典科幻修真小说《吞噬星空》动画第三季已定档，由玄机科技制作，预计将延续前两季的高口碑表现。',
        tags: ['吞噬星空', '动画', '我吃西红柿', '国漫'], likes: 4872, createdAt: '2026-04-18',
        image: '', imageType: 'cover'
    },
    {
        id: 'n7', title: '李致新书《〈李致文存〉拾遗》出版，97岁笔耕不辍',
        type: 'article', author: '李致',
        url: 'http://www.scwriter.com/news/view?id=12345',
        intro: '97岁著名作家、巴金侄子李致先生新作《〈李致文存〉拾遗》于4月22日正式出版，收录其近年来的随笔和回忆文章。',
        tags: ['李致', '巴金', '新书出版'], likes: 1245, createdAt: '2026-04-22',
        image: '', imageType: 'author'
    },
    {
        id: 'n8', title: '红日长篇小说《姐夫同志》单行本出版',
        type: 'novel', author: '红日',
        url: 'https://www.thepaper.cn/newsDetail_forward_29012345',
        intro: '瑶族作家、骏马奖获得者红日的长篇小说《姐夫同志》单行本近日出版，以独特视角讲述瑶山深处的革命故事。',
        tags: ['姐夫同志', '红日', '骏马奖', '长篇'], likes: 987, createdAt: '2026-04-21',
        image: '', imageType: 'cover'
    },
    {
        id: 'n9', title: '网络文学《我给末世主角们发编制》上榜青春榜',
        type: 'novel', author: '十阶浮屠（番茄小说）',
        url: 'https://fanqienovel.com/page/xxxxx',
        intro: '番茄小说人气作品《我给末世主角们发编制》入选安徽大学发布的青春文学榜，展现了网文创作的多元化趋势。',
        tags: ['末世', '番茄小说', '青春榜'], likes: 1653, createdAt: '2026-04-19',
        image: '', imageType: 'cover'
    },
    {
        id: 'n10', title: '第十三届中国网络视听大会在成都开幕',
        type: 'article', author: '新华网',
        url: 'http://www.news.cn/ent/20260415/index.htm',
        intro: '4月15日，第十三届中国网络视听大会在成都开幕，聚焦网文IP改编、短视频创作等热门议题，众多头部平台参与。',
        tags: ['网络视听', 'IP改编', '成都'], likes: 2034, createdAt: '2026-04-15',
        image: '', imageType: 'news'
    },
    {
        id: 'n11', title: '《斗破苍穹》新动画季官宣，粉丝期待值拉满',
        type: 'novel', author: '天蚕土豆',
        url: 'https://www.bilibili.com/bangumi/play/ss28099',
        intro: '天蚕土豆巅峰之作《斗破苍穹》新一季动画正式官宣，制作全面升级，萧炎的传奇故事将继续在大银幕上绽放。',
        tags: ['斗破苍穹', '天蚕土豆', '动画', '国漫'], likes: 6234, createdAt: '2026-04-12',
        image: '', imageType: 'cover'
    },
    {
        id: 'n12', title: '《民族文学》"大家读刊"第12期举行，多民族作家对谈',
        type: 'article', author: '民族文学杂志社',
        url: 'https://www.minzuwenxue.cn/reader/12.html',
        intro: '《民族文学》杂志第12期"大家读刊"活动举行，邀请汉族、藏族、维吾尔族等多民族作家进行深度对谈交流。',
        tags: ['民族文学', '多民族', '文学对谈'], likes: 756, createdAt: '2026-03-30',
        image: '', imageType: 'news'
    }
];

// ===== 示例内容数据 =====
const DEFAULT_CONTENTS = [
    { id:'d1', title:'【纯美散文】山间听风', type:'article', author:'林清', url:'#', intro:'山风拂过脸颊，带走了尘世的喧嚣，只留下心底最柔软的宁静。这是一篇关于自然与心灵的对话……', tags:['散文','自然'], likes:328, createdAt:'2026-05-01' },
    { id:'d2', title:'《星河彼岸》第三章', type:'novel', author:'苏遥', url:'#', intro:'飞船穿越小行星带，警报声骤然响起。舷窗外，无数陨石如流星般坠落……', tags:['科幻','连载'], likes:892, createdAt:'2026-04-30' },
    { id:'d3', title:'茶文案｜一盏清茶，一段时光', type:'copywriting', author:'云染', url:'#', intro:'茶不语，却懂每一颗渴望安宁的心。沸水冲开茶叶的瞬间，是一场关于等待与回味的仪式……', tags:['茶道','文案'], likes:567, createdAt:'2026-04-29' },
    { id:'d4', title:'【短篇小说】最后一班地铁', type:'novel', author:'程路', url:'#', intro:'地铁门即将关闭的瞬间，我看见了站台上那个熟悉的身影。手中的信封还没来得及……', tags:['都市','悬疑'], likes:1203, createdAt:'2026-04-28' },
    { id:'d5', title:'博客｜写作是我与自己和解的方式', type:'blog', author:'白川', url:'#', intro:'从大学时代开始写博客，至今已有十年。文字陪伴我度过无数个失眠的夜晚……', tags:['写作','随笔'], likes:445, createdAt:'2026-04-27' },
    { id:'d6', title:'《暮光之境》第一章', type:'novel', author:'洛颜', url:'#', intro:'暮光从地平线倾泻而下，将整座城池染成琥珀色。她站在城墙上，望着远方的群山……', tags:['奇幻','言情'], likes:2341, createdAt:'2026-04-26' },
    { id:'d7', title:'【情感散文】致那个再也回不去的夏天', type:'article', author:'南风', url:'#', intro:'那年夏天的蝉鸣特别响，阳光也格外耀眼。我们以为会永远在一起，却不知时光……', tags:['情感','回忆'], likes:1876, createdAt:'2026-04-25' },
    { id:'d8', title:'品牌文案｜让每一次呼吸都有意义', type:'copywriting', author:'鹿鸣', url:'#', intro:'我们相信，好的产品不只是功能的堆砌，更是生活态度的延伸。每一处细节……', tags:['品牌','营销'], likes:623, createdAt:'2026-04-24' }
];

// ===== 类型映射 =====
const TYPE_MAP = { article:'📝 文章', novel:'📚 小说', copywriting:'✍️ 文案', blog:'🌐 博客', ranking:'🔥 热榜资讯' };
const TYPE_CLASS = { article:'type-article', novel:'type-novel', copywriting:'type-copywriting', blog:'type-blog', ranking:'type-article' };

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('[盖子小说] 初始化...');
    
    // 恢复用户状态
    const savedUser = localStorage.getItem('gaizi_user');
    if (savedUser) {
        try { state.user = JSON.parse(savedUser); } catch(e) {}
    }
    
    // 加载内容
    loadContents();
    
    // 绑定事件
    bindEvents();
    
    // 隐藏加载中
    hideLoading();
    
    console.log('[盖子小说] 初始化完成');
});

function bindEvents() {
    // 搜索框回车
    document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') doSearch();
    });
    
    // 简介 字数统计
    document.getElementById('introInput')?.addEventListener('input', (e) => {
        const el = document.getElementById('charCount');
        if (el) el.textContent = e.target.value.length;
    });
}

function hideLoading() {
    const el = document.getElementById('loadingState');
    if (el) el.style.display = 'none';
}

function showLoading() {
    const el = document.getElementById('loadingState');
    if (el) el.style.display = '';
}

// ===== 加载内容 =====
function loadContents() {
    showLoading();
    
    // 尝试从本地存储加载用户发布的内容
    let saved = [];
    try {
        saved = JSON.parse(localStorage.getItem('gaizi_contents') || '[]');
    } catch(e) {}
    
    // 合并：热点资讯 + 用户发布的内容
    state.contents = [...HOT_NEWS, ...saved];
    
    renderContents();
    hideLoading();
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
    
    // 筛选
    let filtered;
    if (state.currentFilter === 'ranking') {
        filtered = HOT_NEWS; // 热榜显示最新资讯
    } else if (state.currentFilter === 'all') {
        filtered = state.contents;
    } else {
        filtered = state.contents.filter(c => c.type === state.currentFilter);
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
    
    // 排序：热榜按点赞数降序
    if (state.currentFilter === 'ranking') {
        filtered = [...filtered].sort((a, b) => b.likes - a.likes);
    }
    
    // 空状态
    if (!filtered || filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>暂无内容</p><p style="margin-top:10px"><button class="btn btn-primary" onclick="openPublishModal()">✏️ 分享第一篇</button></p></div>';
        return;
    }
    
    // 渲染卡片
    container.innerHTML = filtered.map(c => `
        <div class="content-card" onclick="openDetailModal('${c.id}')">
            <div class="card-header">
                <span class="card-type ${TYPE_CLASS[c.type]||''}">${TYPE_MAP[c.type]||'📄 其他'}</span>
                ${c.likes > 3000 ? '<span class="card-pinned">🔥 热</span>' : ''}
            </div>
            <h3 class="card-title">${escapeHtml(c.title)}</h3>
            <p class="card-intro">${escapeHtml(c.intro)}</p>
            <div class="card-footer">
                <div class="card-author">
                    <span class="author-avatar">${(c.author||'匿名')[0]}</span>
                    <span class="author-name">${escapeHtml(c.author||'匿名')}</span>
                </div>
                <div class="card-meta">
                    <span>❤️ ${c.likes}</span>
                </div>
            </div>
            ${(c.tags && c.tags.length) ? '<div class="detail-tags" style="margin-top:12px">' + c.tags.map(t=>'<span class="detail-tag">'+escapeHtml(t)+'</span>').join('') + '</div>' : ''}
        </div>
    `).join('');
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
    
    if (!title || !type || !url || !intro) {
        showToast('请填写所有必填项！', 'error'); return;
    }
    if (intro.length < 20) {
        showToast('简介至少需要20个字！', 'error'); return;
    }
    
    // 视频平台检测
    const videoDomains = ['youtube.com','youtu.be','bilibili.com','v.qq.com','iqiyi.com','youku.com'];
    if (videoDomains.some(d => url.includes(d))) {
        showToast('暂不支持视频链接，请分享文字类内容', 'error'); return;
    }
    
    const tags = tagsStr ? tagsStr.split(/[,，]/).slice(0,5).map(t=>t.trim()).filter(Boolean) : [];
    
    const newContent = {
        id: 'u_' + Date.now(),
        type, title,
        author: state.user?.name || '匿名用户',
        url, intro, tags,
        likes: Math.floor(Math.random() * 50) + 1,
        createdAt: new Date().toLocaleDateString('zh-CN')
    };
    
    // 保存到本地
    const saved = JSON.parse(localStorage.getItem('gaizi_contents') || '[]');
    saved.unshift(newContent);
    localStorage.setItem('gaizi_contents', JSON.stringify(saved));
    
    // 更新状态
    state.contents = [...HOT_NEWS, ...saved];
    
    closePublishModal();
    showToast('✅ 发布成功！感谢分享 🎉', 'success');
    
    // 切到全部查看
    filterByType('all');
}

// ===== 详情弹窗 =====
function openDetailModal(id) {
    const c = state.contents.find(x => x.id === id);
    if (!c) return;
    
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('detailContent');
    if (!modal || !content) return;
    
    content.innerHTML = `
        <div class="detail-header">
            <span class="card-type ${TYPE_CLASS[c.type]||''}">${TYPE_MAP[c.type]||''}</span>
            <h2 class="detail-title">${escapeHtml(c.title)}</h2>
        </div>
        <div class="detail-author">
            <span class="author-avatar">${(c.author||'?')[0]}</span>
            <div class="detail-author-info">
                <h4>${escapeHtml(c.author||'匿名')}</h4>
                <span>📅 ${c.createdAt || '未知日期'}</span>
            </div>
        </div>
        <div class="detail-intro">${escapeHtml(c.intro)}</div>
        ${(c.tags && c.tags.length) ? '<div class="detail-tags">' + c.tags.map(t=>'<span class="detail-tag">'+escapeHtml(t)+'</span>').join('') + '</div>' : ''}
        <div class="detail-actions">
            <a href="${escapeHtml(c.url)}" target="_blank" rel="noopener" class="btn btn-primary">🔗 访问原文</a>
            <button onclick="likeContent('${c.id}')" class="btn btn-secondary">❤️ 点赞 (${c.likes})</button>
        </div>
    `;
    
    modal.classList.add('show');
}

function closeDetailModal() {
    document.getElementById('detailModal')?.classList.remove('show');
}

// ===== 点赞 =====
function likeContent(id) {
    const c = state.contents.find(x => x.id === id);
    if (!c) return;
    c.likes++;
    
    // 同步到localStorage（如果是用户发布的内容）
    const saved = JSON.parse(localStorage.getItem('gaizi_contents') || '[]');
    const item = saved.find(x => x.id === id);
    if (item) {
        item.likes = c.likes;
        localStorage.setItem('gaizi_contents', JSON.stringify(saved));
    }
    
    showToast('❤️ 点赞成功！', 'success');
    renderContents();
    // 刷新详情弹窗
    openDetailModal(id);
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
