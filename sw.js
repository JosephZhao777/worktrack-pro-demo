// WorkTrack AI ---- 最小化 Service Worker
// 目的只有一个:满足浏览器"可安装为桌面/主屏幕 App"(PWA)的技术前提——浏览器要求
// 页面必须注册一个带 fetch 处理器的 Service Worker 才会显示"安装 App"这个入口。
//
// 刻意不做任何离线缓存(如实披露):这个 App 的所有真实数据(员工/库存/考勤/工资/
// 请假)都来自后端接口,不是纯静态展示型网站,产品还在快速迭代。如果这里缓存 HTML/JS/
// API 响应,用户装了桌面版之后很容易看到"过期的旧版界面"或者"缓存住的旧数据",
// 比现在这种"完全联网才能用"体验更差、更容易造成困惑。所以这里始终原样转发请求到
// 网络,不做任何缓存拦截——以后如果产品变得更稳定、想加"弱网/离线也能看只读数据"
// 这类体验,再回来给这个文件加真正的缓存策略。
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
