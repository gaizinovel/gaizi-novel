
// ===== 热榜新闻数据 =====
const newsGridData = [
    { title: 'B站再度牵手晋江原创，三年1.2亿掘金网文IP改编市场', type: '影视改编', icon: '🎬', color: '#E74C3C', intro: 'B站与晋江原创订立三年综合合作框架协议，交易上限1.2亿元。《天官赐福》动画总播放量破5.1亿。', link: 'http://www.cb.com.cn/index/show/bzyc/cv/cv135179711641', date: '2026-04-30' },
    { title: '第十一届茅盾文学奖颁奖盛典在乌镇举行', type: '作家获奖', icon: '🏆', color: '#F39C12', intro: '东西《回响》、乔叶《宝水》、孙甘露《千里江山图》、杨志军《雪山大地》、刘亮程《本巴》五位获奖者齐聚乌镇。', link: 'https://www.thecover.cn/news/qXTJI5bc9xiH90qSdq8Jkw==', date: '2026-04-30' },
    { title: '阅文集团战略升级：《斗破苍穹年番》获年度会员挚爱动漫', type: '行业动态', icon: '📈', color: '#9B59B6', intro: '阅文集团宣布基于腾讯新文创生态战略升级，《斗破苍穹年番》《平凡之路》等IP持续发力。', link: 'https://www.thecover.cn/news/7564109', date: '2026-04-28' },
    { title: '中国网文出海作品突破1万部！《庆余年》《赘婿》领跑海外', type: '影视改编', icon: '🌍', color: '#E91E63', intro: '新丽传媒入选国家文化出口重点企业，《庆余年》海外发行获评国家文化出口重点项目。', link: 'https://www.thecover.cn/news/7888374', date: '2026-04-26' },
    { title: '茅奖得主徐则臣出镜荐书：《从一个蛋开始》展现真实的我', type: '作家动态', icon: '✍️', color: '#3498DB', intro: '新晋茅盾文学奖得主徐则臣亲自编选22年散文随笔38篇名篇结集出版。', link: 'https://www.thecover.cn/video/dsB03ak/BJM=', date: '2026-04-26' },
    { title: '《人民文学》主编徐则臣广西读者见面会圆满举办', type: '作家动态', icon: '📝', color: '#E67E22', intro: '人民阅卷·广西行暨读者活动周在南宁举行，主编徐则臣表示要让读者的面目越来越具体清晰。', link: 'https://www.chinawriter.com.cn/403990/index.html', date: '2026-04-29' },
    { title: '五位新晋茅奖作家乌镇座谈：伟大作品需要从不同角度丰富', type: '作家动态', icon: '🖊️', color: '#16A085', intro: '东西、乔叶、孙甘露、杨志军、刘亮程五位新晋茅盾文学奖获得者畅谈创作心得与文学理想。', link: 'https://www.thecover.cn/news/QwASdx/Gii%2BH90qSdq8Jkw==', date: '2026-04-05' },
    { title: '《牧神记》动画年番不断更，B站评分9.7成国漫黑马', type: '新书推荐', icon: '🔥', color: '#2C3E50', intro: '宅猪同名小说改编《牧神记》动画由玄机科技制作，B站评分高达9.7分。', link: 'https://www.163.com/dy/article/JS7UCJMT055669QJ.html', date: '2026-04-20' }
];

// ===== 热榜渲染 =====
function renderRanking() {
    const container = document.getElementById('contentList');
    const emptyState = document.getElementById('emptyState');
    if (emptyState) emptyState.style.display = 'none';

    const sortedNews = [...newsGridData].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    let cards = sortedNews.map((news, index) => {
        return '<div class="news-list-card" onclick="showNewsModal(' + index + ')" data-index="' + index + '">' +
            '<div class="list-card-icon" style="background:' + news.color + '">' + news.icon + '</div>' +
            '<div class="list-card-content">' +
            '<div class="list-card-type">' + news.type + '</div>' +
            '<h3 class="list-card-title">' + escapeHtml(news.title) + '</h3>' +
            '<p class="list-card-intro">' + escapeHtml(news.intro) + '</p>' +
            '</div><div class="list-card-arrow">→</div></div>';
    }).join('');

    container.innerHTML = '<div class="news-list-section"><div class="news-list">' + cards + '</div></div>';
}

// ===== 热榜弹窗 =====
function showNewsModal(index) {
    var news = newsGridData[index];
    var modal = document.getElementById('detailModal');
    if (modal) modal.classList.add('show');
    var detailContent = document.getElementById('detailContent');
    if (detailContent) {
        var badgeStyle = 'display:inline-block;padding:4px 12px;border-radius:12px;background:' + news.color + '20;color:' + news.color + ';font-size:12px;';
        detailContent.innerHTML = '<div class="detail-header">' +
            '<span style="' + badgeStyle + '">' + news.icon + ' ' + news.type + '</span>' +
            '<h2 class="detail-title" style="margin-top:12px;">' + escapeHtml(news.title) + '</h2>' +
            '<span style="font-size:13px;color:#888;margin-top:4px;display:block;">' + news.date + '</span>' +
            '</div><div class="detail-intro">' + escapeHtml(news.intro) + '</div>' +
            '<div class="detail-actions"><a href="' + news.link + '" target="_blank" class="btn btn-primary">阅读原文 →</a></div>';
    }
}
