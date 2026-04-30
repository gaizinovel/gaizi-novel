// Firebase 初始化配置
// ⚠️ 请替换为您自己的Firebase配置

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// 初始化Firebase
firebase.initializeApp(firebaseConfig);

// 导出Firebase服务
const auth = firebase.auth();
const db = firebase.firestore();

// 配置Firestore
db.settings({
    timestampsInSnapshots: true
});

// 导出
window.firebaseAuth = auth;
window.firebaseDb = db;
