// Firebase 初始化（延迟加载，不阻塞页面）
// Firebase 配置 - 可选功能，缺失时不影响核心使用
(function() {
    try {
        if (typeof firebase === 'undefined') return;
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT.firebaseapp.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT.appspot.com",
            messagingSenderId: "YOUR_SENDER_ID",
            appId: "YOUR_APP_ID"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        window.firebaseAuth = firebase.auth();
        window.firebaseDb = firebase.firestore();
    } catch(e) {
        console.warn('Firebase 初始化跳过（可选功能）:', e.message);
    }
})();
