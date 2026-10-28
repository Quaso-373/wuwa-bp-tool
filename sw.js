/* 鳴潮 BP：素材快取（動態立繪、頭像、立繪、圖標）
   素材第一次下載後存在瀏覽器裡，之後開網頁直接從本機讀，不用再等。
   index.html 與 assets.json 不快取，所以網頁本身更新會立刻生效。 */
const CACHE = 'bp-assets-v1';
const ASSET_DIRS = /\/(spine|avatar|portrait|element|faction)\//;
const ASSET_EXT = /\.(png|webp|jpg|jpeg|gif|skel|atlas)$/i;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith('bp-assets-') && k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.searchParams.has('__pre')) return;               // 預載器自己抓，不攔截
  if (!ASSET_DIRS.test(url.pathname) && !ASSET_EXT.test(url.pathname)) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = url.origin + url.pathname;
    const hit = await cache.match(key);
    if (hit) return hit;
    let res;
    try { res = await fetch(req); }
    catch (e) { await new Promise(r => setTimeout(r, 400)); res = await fetch(url.href, { cache: 'no-store' }); }   // 網路一時失敗：重試一次
    if (res.ok && res.type === 'basic') cache.put(key, res.clone()).catch(() => {});
    return res;
  })());
});
