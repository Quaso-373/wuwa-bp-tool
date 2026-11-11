/* ============================================================
   鳴潮 BP：角色資料（改版、出新角色時只要改這個檔案）

   新增一名角色要做的事：
   1. 在 baseChars 加一行：id（英文代號，不可重複）、name（中文名）、en（英文名）、
      el（屬性：Glacio 冷凝 / Fusion 熱熔 / Electro 導電 / Aero 氣動 / Spectro 衍射 / Havoc 湮滅）、rarity（4 或 5）。
      圖檔檔名預設用中文名；不同時加 fileName。
   2. 放圖：avatar/<名字>.webp（頭像）、portrait/<名字>.webp（立繪）、audio/<名字>.mp3（語音，可省略）。
   3. 有動態立繪的話，把檔案放進 spine/<資料夾>/，並在 SPINE_MAP 加上 id: ['資料夾', '檔名']。
   4. 在 FACTION_MEMBERS 把 id 加進所屬勢力（不加就不顯示勢力徽記）。
   5. 想讓新角色排在選角清單最前面，把 id 加到 PINNED_ORDER。
   6. 素材有增減時，重新產生 assets.json（預載清單）。
   ============================================================ */
const baseChars = [
  { id: 'xin', name: '心', en: 'Hsin', el: 'Electro', rarity: 5 },
  { id: 'suoming', name: '鎖暝', en: 'Suoming', el: 'Electro', rarity: 5 },
  { id: 'emis', name: '愛彌斯', en: 'Aemis', el: 'Fusion', rarity: 5 },
  { id: 'luhess', name: '陸·赫斯', en: 'Lu Hess', el: 'Spectro', rarity: 5 },
  { id: 'lynae', name: '琳奈', en: 'Lynae', el: 'Spectro', rarity: 5 },
  { id: 'mornye', name: '莫寧', en: 'Mornye', el: 'Fusion', rarity: 5 },
  { id: 'chisa', name: '千咲', en: 'Chisa', el: 'Havoc', rarity: 5 },
  { id: 'buling', name: '卜靈', en: 'Buling', el: 'Electro', rarity: 4 },
  { id: 'qiuyuan', name: '仇遠', en: 'Qiuyuan', el: 'Aero', rarity: 5 },
  { id: 'galbrena', name: '嘉貝莉娜', en: 'Galbrena', el: 'Fusion', rarity: 5 },
  { id: 'zani', name: '贊妮', en: 'Zani', el: 'Spectro', rarity: 5 },
  { id: 'augusta', name: '奧古斯塔', en: 'Augusta', el: 'Electro', rarity: 5 },
  { id: 'iuno', name: '尤諾', en: 'Iuno', el: 'Aero', rarity: 5 },
  { id: 'lupa', name: '露帕', en: 'Lupa', el: 'Fusion', rarity: 5 },
  { id: 'phrolova', name: '弗洛洛', en: 'Phrolova', el: 'Havoc', rarity: 5 },
  { id: 'cartethyia', name: '卡提希婭', en: 'Cartethyia', el: 'Aero', rarity: 5 },
  { id: 'ciaccona', name: '夏空', en: 'Ciaccona', el: 'Aero', rarity: 5 },
  { id: 'cantarella', name: '坎特蕾拉', en: 'Cantarella', el: 'Havoc', rarity: 5 },
  { id: 'brant', name: '布蘭特', en: 'Brant', el: 'Fusion', rarity: 5 },
  { id: 'phoebe', name: '菲比', en: 'Phoebe', el: 'Spectro', rarity: 5 },
  { id: 'carlotta', name: '珂萊塔', en: 'Carlotta', el: 'Glacio', rarity: 5 },
  { id: 'roccia', name: '洛可可', en: 'Roccia', el: 'Havoc', rarity: 5 },
  { id: 'camellya', name: '椿', en: 'Camellya', el: 'Havoc', rarity: 5 },
  { id: 'shorekeeper', name: '守岸人', en: 'Shorekeeper', el: 'Spectro', rarity: 5 },
  { id: 'xiangliyao', name: '相里要', en: 'Xiangli Yao', el: 'Electro', rarity: 5 },
  { id: 'zhezhi', name: '折枝', en: 'Zhezhi', el: 'Glacio', rarity: 5 },
  { id: 'jinhsi', name: '今汐', en: 'Jinhsi', el: 'Spectro', rarity: 5 },
  { id: 'changli', name: '長離', en: 'Changli', el: 'Fusion', rarity: 5 },
  { id: 'jiyan', name: '忌炎', en: 'Jiyan', el: 'Aero', rarity: 5 },
  { id: 'yinlin', name: '吟霖', en: 'Yinlin', el: 'Electro', rarity: 5 },
  { id: 'verina', name: '維里奈', en: 'Verina', el: 'Spectro', rarity: 5 },
  { id: 'calcharo', name: '卡卡羅', en: 'Calcharo', el: 'Electro', rarity: 5 },
  { id: 'encore', name: '安可', en: 'Encore', el: 'Fusion', rarity: 5 },
  { id: 'jianxin', name: '鑑心', en: 'Jianxin', el: 'Aero', rarity: 5 },
  { id: 'lingyang', name: '凌陽', en: 'Lingyang', el: 'Glacio', rarity: 5 },
  { id: 'lumi', name: '燈燈', en: 'Lumi', el: 'Electro', rarity: 4 },
  { id: 'youhu', name: '釉瑚', en: 'Youhu', el: 'Glacio', rarity: 4 },
  { id: 'danjin', name: '丹瑾', en: 'Danjin', el: 'Havoc', rarity: 4 },
  { id: 'mortefi', name: '莫特斐', en: 'Mortefi', el: 'Fusion', rarity: 4 },
  { id: 'sanhua', name: '散華', en: 'Sanhua', el: 'Glacio', rarity: 4 },
  { id: 'chixia', name: '熾霞', en: 'Chixia', el: 'Fusion', rarity: 4 },
  { id: 'baizhi', name: '白芷', en: 'Baizhi', el: 'Glacio', rarity: 4 },
  { id: 'yangyang', name: '秧秧', en: 'Yangyang', el: 'Aero', rarity: 4 },
  { id: 'aalto', name: '秋水', en: 'Aalto', el: 'Aero', rarity: 4 },
  { id: 'yuanwu', name: '淵武', en: 'Yuanwu', el: 'Electro', rarity: 4 },
  { id: 'taoqi', name: '桃祈', en: 'Taoqi', el: 'Havoc', rarity: 4 },
  { id: 'sigrlinn', name: '西格莉卡', en: 'Sigrlinn', el: 'Aero', rarity: 5 },
  { id: 'feixue', name: '緋雪', en: 'Feixue', el: 'Glacio', rarity: 5 },
  { id: 'danya', name: '達妮婭', en: 'Danya', el: 'Fusion', rarity: 5 },
  { id: 'lucy', name: '露西', en: 'Lucy', el: 'Spectro', rarity: 5 },
  { id: 'rebecca', name: '麗貝卡', en: 'Rebecca', el: 'Electro', rarity: 5 },
  { id: 'losera', name: '洛瑟菈', en: 'Losera', el: 'Glacio', rarity: 5 },
  { id: 'rover_spectro_m', name: '漂泊者·衍射', en: 'Rover (Spectro)', el: 'Spectro', rarity: 5, fileName: '漂泊者(男)' },
  { id: 'rover_havoc_f', name: '漂泊者·湮滅', en: 'Rover (Havoc)', el: 'Havoc', rarity: 5, fileName: '漂泊者(女)' },
  { id: 'rover_aero_m', name: '漂泊者·氣動', en: 'Rover (Aero)', el: 'Aero', rarity: 5, fileName: '漂泊者(男)' },
  { id: 'rover_electro_f', name: '漂泊者·導電', en: 'Rover (Electro)', el: 'Electro', rarity: 5, fileName: '漂泊者(女)' },
  { id: 'jingran', name: '景燃', en: 'Jingran', el: 'Fusion', rarity: 5 },
  { id: 'qingxiao', name: '清宵', en: 'Qingxiao', el: 'Aero', rarity: 5 },
  { id: 'suisui', name: '穗穗', en: 'Suisui', el: 'Glacio', rarity: 5 },
  { id: 'xuanling', name: '玄翎', en: 'Xuanling', el: 'Havoc', rarity: 5 }
];

/* 角色 id → Spine 資料夾 / 檔名（./spine/<資料夾>/<檔名>.skel） */
const SPINE_MAP = {
  xin:['Portraits_Xin','Portraits_Xin'], suoming:['Portraits_Suoming','Portraits_Suoming'],
  emis:['Portraits_Aimisi','Portraits_Aimisi'], luhess:['Portraits_Luhesi','Portraits_Luhesi'], lynae:['Portraits_Linnai','Portraits_Linnai'],
  mornye:['Portraits_Moning','Portraits_Moning'], chisa:['Portraits_Qianxiao','Portraits_Qianxiao'], buling:['Portraits_Buling','Portraits_Buling'],
  qiuyuan:['Portraits_Qiuyuan','Portraits_Qiuyuan'], galbrena:['Portraits_Jiabeilina','Portraits_Jiabeilina'], zani:['Portraits_Zanni','Portraits_Zanni'],
  augusta:['Portraits_Aogusita','Portraits_Aogusita'], iuno:['Portraits_Younuo','Portraits_Younuo'], lupa:['Portraits_Lupa','Portraits_Lupa'],
  phrolova:['Portraits_Fuluoluo','Portraits_Fuluoluo'], cartethyia:['Portraits_Katixiya','Portraits_Katixiya'], ciaccona:['Portraits_Xiakong','Portraits_Xiakong'],
  cantarella:['Portraits_Kanteleila','Portraits_Kanteleila'], brant:['Portraits_Bulante','Portraits_Bulante'], phoebe:['Portraits_Feibi','Portraits_Feibi'],
  carlotta:['Portraits_Kelaita','Portraits_Kelaita'], roccia:['Portraits_Luokeke','Portraits_Luokeke'], camellya:['Portraits_Chun','Portraits_Chun'],
  shorekeeper:['Portraits_Shouanren','Portraits_Shouanren'], xiangliyao:['Portraits_Xiangliyao','Portraits_Xiangliyao'], zhezhi:['Portraits_Zhezhi','Portraits_Zhezhi'],
  jinhsi:['Portraits_Jinxi','Portraits_Jinxi'], changli:['Portraits_Changli','Portraits_Changli'], jiyan:['Portraits_Jiyan','Portraits_Jiyan'],
  yinlin:['Portraits_Yinlin','Portraits_Yinlin'], verina:['Portraits_Weilinai','Portraits_Weilinai'], calcharo:['Portraits_Kakaluo','Portraits_Kakaluo'],
  encore:['Portraits_Anke','Portraits_Anke'], jianxin:['Portraits_Jianxin','Portraits_Jianxin'], lingyang:['Portraits_Lingyang','Portraits_Lingyang'],
  lumi:['Portraits_Dengdeng','Portraits_Dengdeng'], youhu:['Portraits_Youhu','Portraits_Youhu'], danjin:['Portraits_Danjin','Portraits_Danjin'],
  mortefi:['Portraits_Motefei','Portraits_Motefei'], sanhua:['Portraits_Sanhua','Portraits_Sanhua'], chixia:['Portraits_Chixia','Portraits_ChiXia'],
  baizhi:['Portraits_Baizhi','Portraits_Baizhi'], yangyang:['Portraits_Yangyang','Portraits_Yangyang'], aalto:['Portraits_Qiushui','Portraits_Qiushui'],
  yuanwu:['Portraits_Yuanwu','Portraits_Yuanwu'], taoqi:['Portraits_Taoqi','Portraits_Taoqi'], sigrlinn:['Portraits_Xigelika','Portraits_Xigelika'],
  feixue:['Portraits_Feixue','Portraits_Feixue'], danya:['Portraits_Daniya','Portraits_Daniya'], lucy:['Portraits_Lucy','Portraits_Lucy'],
  rebecca:['Portraits_Rebecca','Portraits_Rebecca'], losera:['Portraits_LuoSeLa','Portraits_LuoSeLa'],
  rover_spectro_m:['Portraits_Male','Portraits_Male'], rover_havoc_f:['Portraits_Female','Portraits_Female'],
  rover_aero_m:['Portraits_Male','Portraits_Male'], rover_electro_f:['Portraits_Female','Portraits_Female'],
  jingran:['Portraits_Jingran','Portraits_Jingran'], qingxiao:['Portraits_Qingxiao','Portraits_Qingxiao'],
  suisui:['Portraits_Suisui','Portraits_Suisui'], xuanling:['Portraits_Xuanling','Portraits_Xuanling'],
};

/* 勢力（依官網共鳴者分類）：faction/<代號>.png 優先，沒有就讀官網圖 */
const FACTIONS = {
  hl: { name: '瑝瓏', file: 'logo-hl-big-b7dfb835.png' },
  hha: { name: '黑海岸', file: 'logo-hha-big-ead4fd8a.png' },
  linaxita: { name: '拉古那', file: 'logo-linaxita-big-86b895f6.png' },
  qq: { name: '七丘', file: 'logo-qq-big-2f711973.webp' },
  xjxy: { name: '星炬學院', file: 'logo-xjxy-big-ddbed192.webp' },
  lhsk: { name: '深空聯合', file: 'logo-lhsk-big-e149e131.webp' },
  lyr: { name: '羅伊族', file: 'logo-lyr-big-03ab933c.webp' },
  zy: { name: '灼櫻', file: 'logo-zy-big-12373a0d.webp' },
  cxh: { name: '殘星會', file: 'logo-cxh-big-4e7ed75e.webp' },
  unknown: { name: '未知', file: 'logo-other-big-6aab58e2.png' },
  other: { name: '其他', file: 'logo-unkonw-big-59c12fe7.png' },
};
const FACTION_MEMBERS = {
  hl: ['xin', 'suoming', 'jingran', 'qingxiao', 'suisui', 'xuanling', 'qiuyuan', 'lumi', 'youhu', 'xiangliyao', 'zhezhi', 'changli', 'jinhsi', 'yinlin', 'jiyan', 'lingyang', 'verina', 'jianxin', 'taoqi', 'yuanwu', 'danjin', 'mortefi', 'sanhua', 'baizhi', 'chixia', 'yangyang'],
  hha: ['buling', 'galbrena', 'camellya', 'shorekeeper', 'encore', 'aalto'],
  linaxita: ['cartethyia', 'ciaccona', 'zani', 'cantarella', 'brant', 'phoebe', 'roccia', 'carlotta'],
  qq: ['iuno', 'augusta', 'lupa'],
  xjxy: ['luhess', 'emis', 'lynae', 'chisa'],
  lhsk: ['losera', 'mornye'],
  lyr: ['sigrlinn'],
  zy: ['feixue'],
  cxh: ['phrolova'],
  unknown: ['rebecca', 'lucy', 'rover_spectro_m', 'rover_havoc_f', 'rover_aero_m', 'rover_electro_f'],
  other: ['danya', 'calcharo'],
};

/* 選角清單置頂順序（新角色放前面） */
const PINNED_ORDER = ['xin', 'suoming', 'jingran', 'qingxiao', 'suisui', 'xuanling', 'losera', 'rebecca', 'lucy', 'danya', 'feixue', 'sigrlinn'];
