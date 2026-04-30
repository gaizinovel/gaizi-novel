# 盖子小说 - 部署指南

## 📋 部署清单

### 第一步：创建Firebase项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 点击「创建项目」→ 输入项目名称「gaizi-novel」
3. 进入「构建」→「Authentication」→「开始」
4. 选择「手机」登录提供方
5. 点击「Web」→ 注册应用 → 复制配置

### 第二步：配置Firebase

编辑 `js/firebase-init.js`，替换配置：

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 第三步：启用Firestore数据库

1. Firebase Console → 构建 → Firestore Database
2. 点击「创建数据库」
3. 选择「测试模式」（开发用）
4. 选择最近区域（asia-east1 台湾 或 asia-northeast1 日本）

### 第四步：创建GitHub仓库

1. 登录 GitHub
2. 点击右上角「+」→ New repository
3. 仓库名：`gaizi-novel`
4. 选择 Public
5. 点击 Create repository

### 第五步：上传代码

在 `gaizi-novel` 文件夹打开终端：

```bash
git init
git add .
git commit -m "Initial commit - 盖子小说"
git branch -M main
git remote add origin https://github.com/你的用户名/gaizi-novel.git
git push -u origin main
```

### 第六步：启用GitHub Pages

1. GitHub仓库 → Settings → Pages
2. Source 选择 `main` 分支和 `/ (root)`
3. 点击 Save
4. 等待几分钟后访问：`https://你的用户名.github.io/gaizi-novel`

## 🔧 Firebase 安全规则

为Firestore添加安全规则（开发环境测试规则）：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contents/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /contents/{content}/comments/{comment} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## ✅ 验证部署

访问你的GitHub Pages地址，检查：
- [ ] 页面正常加载
- [ ] 手机号登录弹窗可打开
- [ ] 示例内容正常显示（Firebase配置后）

## 🎨 自定义域名（可选）

1. 购买域名（如 gaizi.cn）
2. GitHub Pages → Custom domain → 输入域名
3. 在域名服务商添加DNS记录：
   - CNAME: www → 你的用户名.github.io
   - A记录: @ → 185.199.108.153 等（GitHub IP）

## 📱 功能说明

| 功能 | 状态 | 说明 |
|------|------|------|
| 手机登录 | ✅ | Firebase Auth |
| 发布内容 | ✅ | Firestore |
| 内容展示 | ✅ | 实时同步 |
| 置顶功能 | ✅ | 管理员审核 |
| 评论互动 | ✅ | 子集合 |
| 点赞 | ✅ | 计数器 |

## 🐛 常见问题

**Q: 验证码收不到？**
A: Firebase手机验证需要在国内配置审核，可能需要企业账号。建议先用演示数据测试功能。

**Q: 部署后页面空白？**
A: 检查浏览器控制台（F12），可能是Firebase配置错误。

**Q: 如何删除演示数据？**
A: Firebase Console → Firestore → 选择文档 → 删除

---

有问题？提交 Issue 或 联系开发者。
