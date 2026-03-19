// === Text-to-Image Templates ===
// Used by TemplateCard component
// Shape: { id, title, icon, prompt, fillable: [{ key, label, default }] }
export const textToImageTemplates = [
  {
    id: 'animal',
    title: '可愛動物',
    icon: '🐶',
    prompt: '請幫我畫一張圖片：{subject}，風格：{style}',
    fillable: [
      { key: 'subject', label: '主題', default: '一隻可愛的小狗在公園玩球' },
      { key: 'style', label: '風格', default: '卡通風格，色彩鮮豔' },
    ]
  },
  {
    id: 'scene',
    title: '夢幻場景',
    icon: '🏰',
    prompt: '請幫我畫一張圖片：{subject}，風格：{style}',
    fillable: [
      { key: 'subject', label: '主題', default: '一座夢幻的城堡，像童話世界' },
      { key: 'style', label: '風格', default: '夢幻、柔和的色調' },
    ]
  },
  {
    id: 'free',
    title: '自由創作',
    icon: '🦕',
    prompt: '請幫我畫一張圖片：{subject}，風格：{style}',
    fillable: [
      { key: 'subject', label: '主題', default: '一隻恐龍在吃冰淇淋' },
      { key: 'style', label: '風格', default: '卡通風格，可愛、有趣' },
    ]
  },
  {
    id: 'birthday',
    title: '生日卡片',
    icon: '🎂',
    prompt: '請幫我畫一張生日卡片的圖片：主題：{theme}，元素：{elements}，風格：{style}，色調：{color}，請在圖片中加上文字：{text}',
    fillable: [
      { key: 'theme', label: '主題', default: '溫馨的生日祝福' },
      { key: 'elements', label: '元素', default: '氣球、蛋糕、彩帶' },
      { key: 'style', label: '風格', default: '可愛、溫暖的插畫風格' },
      { key: 'color', label: '色調', default: '粉色和金色為主' },
      { key: 'text', label: '文字', default: '生日快樂' },
    ]
  },
  {
    id: 'sticker',
    title: 'LINE 貼圖',
    icon: '💬',
    prompt: '請幫我畫一張 LINE 貼圖風格的圖片：角色：{character}，動作：{action}，文字：{text}，風格：貼圖風格，簡單可愛，白色背景',
    fillable: [
      { key: 'character', label: '角色', default: '一隻可愛的橘色貓咪' },
      { key: 'action', label: '動作', default: '開心地揮手說早安' },
      { key: 'text', label: '文字', default: '早安' },
    ]
  },
  {
    id: 'travel',
    title: '旅遊想像圖',
    icon: '✈️',
    prompt: '請幫我畫一張旅遊風景圖：地點：{place}，季節：{season}，畫面：{scene}，風格：{style}',
    fillable: [
      { key: 'place', label: '地點', default: '日本櫻花小鎮' },
      { key: 'season', label: '季節', default: '春天，櫻花盛開' },
      { key: 'scene', label: '畫面', default: '小橋流水，兩旁櫻花樹' },
      { key: 'style', label: '風格', default: '水彩畫，柔和浪漫' },
    ]
  },
]

// === Photo Edit Templates ===
// Used by PhotoEditCard component
// Shape: { id, title, icon, prompt, fillable: [{ key, label, default }], instruction }
export const photoEditTemplates = [
  {
    id: 'style-transfer',
    title: '照片變畫風',
    icon: '🎨',
    prompt: '請把這張照片變成{style}風格，保留原本的構圖和主體',
    fillable: [
      { key: 'style', label: '風格', default: '宮崎駿動畫' },
    ],
    instruction: '複製文字 → 打開 Gemini → 貼上 → 上傳照片 → 送出',
  },
  {
    id: 'cartoon-me',
    title: '把自己變卡通',
    icon: '🧑‍🎨',
    prompt: '請把這張照片裡的人物變成{style}風格的卡通角色，背景改成{background}',
    fillable: [
      { key: 'style', label: '風格', default: '皮克斯動畫' },
      { key: 'background', label: '背景', default: '夢幻的星空' },
    ],
    instruction: '複製文字 → 打開 Gemini → 貼上 → 上傳你的照片 → 送出',
  },
  {
    id: 'scene-change',
    title: '換場景',
    icon: '🌅',
    prompt: '請把這張照片的背景改成{scene}，保留照片中的主體不變，風格：{style}',
    fillable: [
      { key: 'scene', label: '場景', default: '巴黎鐵塔前的夕陽' },
      { key: 'style', label: '風格', default: '照片寫實' },
    ],
    instruction: '複製文字 → 打開 Gemini → 貼上 → 上傳照片 → 送出',
  },
  {
    id: 'add-element',
    title: '照片加料',
    icon: '✨',
    prompt: '請在這張照片中加入{element}，要跟原本的照片融合自然，風格：{style}',
    fillable: [
      { key: 'element', label: '加什麼', default: '一隻可愛的柴犬坐在旁邊' },
      { key: 'style', label: '風格', default: '照片寫實，自然融合' },
    ],
    instruction: '複製文字 → 打開 Gemini → 貼上 → 上傳照片 → 送出',
  },
]

// === Styles ===
// Used by StylePicker component
// Shape: { name, icon, keyword, desc }
export const styles = [
  { name: '卡通風格', icon: '🎪', keyword: '卡通風格，色彩鮮豔', desc: '可愛、活潑' },
  { name: '水彩畫', icon: '🎨', keyword: '水彩畫，柔和浪漫', desc: '柔和、浪漫' },
  { name: '油畫', icon: '🖌️', keyword: '油畫，厚重經典', desc: '厚重、經典' },
  { name: '鉛筆素描', icon: '✏️', keyword: '鉛筆素描，簡潔文藝', desc: '簡潔、文藝' },
  { name: '照片寫實', icon: '📷', keyword: '照片寫實風格', desc: '像真的一樣' },
  { name: '日系動漫', icon: '🇯🇵', keyword: '日系動漫風格，精緻', desc: '漫畫、精緻' },
  { name: '宮崎駿', icon: '🏔️', keyword: '宮崎駿吉卜力動畫風格', desc: '夢幻、溫暖' },
  { name: '迪士尼', icon: '🏰', keyword: '迪士尼動畫風格', desc: '經典、夢幻' },
  { name: '皮克斯', icon: '🤖', keyword: '皮克斯 3D 動畫風格', desc: '立體、可愛' },
  { name: '浮世繪', icon: '🌊', keyword: '日本浮世繪風格', desc: '傳統、藝術' },
  { name: '蒸氣龐克', icon: '⚙️', keyword: '蒸氣龐克風格，復古機械', desc: '復古、機械' },
  { name: '極簡線條', icon: '〰️', keyword: '極簡線條插畫，黑白', desc: '簡約、現代' },
]

// === Cartoon Styles (for photo editing showcase) ===
// Uses same shape as photoEditTemplates for PhotoEditCard compatibility
export const cartoonStyles = [
  {
    id: 'ghibli',
    title: '宮崎駿風格',
    icon: '🏔️',
    prompt: '請把這張照片變成宮崎駿吉卜力動畫風格，保留原本的構圖',
    instruction: '複製文字 → 打開 Gemini → 貼上 → 上傳照片 → 送出',
    desc: '溫暖色調、手繪感、夢幻背景',
  },
  {
    id: 'disney',
    title: '迪士尼風格',
    icon: '🏰',
    prompt: '請把這張照片變成迪士尼動畫風格的角色',
    instruction: '複製文字 → 打開 Gemini → 貼上 → 上傳照片 → 送出',
    desc: '大眼睛、精緻表情、夢幻光影',
  },
  {
    id: 'pixar',
    title: '皮克斯風格',
    icon: '🤖',
    prompt: '請把這張照片變成皮克斯 3D 動畫風格',
    instruction: '複製文字 → 打開 Gemini → 貼上 → 上傳照片 → 送出',
    desc: '立體感、Q版比例、鮮豔色彩',
  },
  {
    id: 'shinkai',
    title: '新海誠風格',
    icon: '🌆',
    prompt: '請把這張照片變成新海誠動畫風格，光影細膩',
    instruction: '複製文字 → 打開 Gemini → 貼上 → 上傳照片 → 送出',
    desc: '唯美光影、天空細節、都市景觀',
  },
  {
    id: 'marvel',
    title: '美式漫畫風',
    icon: '💥',
    prompt: '請把這張照片變成美式漫畫（Marvel 風格）',
    instruction: '複製文字 → 打開 Gemini → 貼上 → 上傳照片 → 送出',
    desc: '粗線條、鮮豔色塊、英雄感',
  },
  {
    id: 'webtoon',
    title: '韓國 Webtoon',
    icon: '📱',
    prompt: '請把這張照片變成韓國 Webtoon 漫畫風格',
    instruction: '複製文字 → 打開 Gemini → 貼上 → 上傳照片 → 送出',
    desc: '清新畫風、柔和色調、細膩',
  },
]

// === Free mode examples ===
export const freeExamples = [
  '一隻貓咪坐在窗台上曬太陽，油畫風格',
  '外星人在金門喝高粱酒，卡通風格，搞笑',
  '日本櫻花小鎮的春天，水彩畫，柔和浪漫',
  '一隻恐龍在吃冰淇淋，卡通風格，可愛有趣',
  '金門古厝的夕陽，照片寫實風格',
  '貓咪當大廚在煮麵，卡通風格',
  '一隻穿太空裝的柴犬在月球上吃珍珠奶茶，可愛卡通風格',
]
