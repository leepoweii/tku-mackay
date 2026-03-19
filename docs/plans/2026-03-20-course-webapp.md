# 松年大學 AI 畫圖課程 Web App 實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 純前端 Vue 3 課程網頁，整合教學內容 + 一鍵複製 prompt 模板 + Gemini 連結，讓 20 位長輩掃 QR Code 就能跟著操作。

**Architecture:** Vue 3 + Vite SPA，slide-like navigation（左右鍵/滑動翻頁）。所有 prompt 模板存在 JS data files，一鍵複製到剪貼簿，學員開 Gemini 貼上使用。不需後端。部署到 Vercel。

**Tech Stack:** Vue 3 (Composition API), Vite, vanilla CSS (no Tailwind — keep simple, match existing slides aesthetic)

**Gemini 連結策略：** 每個練習頁面底部有「📋 複製」→「🚀 打開 Gemini 貼上去」兩步驟。Gemini URL: `https://gemini.google.com/app`

---

## File Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── logos/                    ← SVG logos (copy from slides/)
├── src/
│   ├── main.js                  ← Mount Vue app
│   ├── App.vue                  ← Slide navigation + page router
│   ├── style.css                ← Global styles (senior-friendly)
│   ├── data/
│   │   ├── templates.js         ← All prompt templates (text-to-image, photo edit, styles)
│   │   └── pages.js             ← Page order & metadata
│   ├── composables/
│   │   └── useClipboard.js      ← Copy to clipboard + toast
│   ├── components/
│   │   ├── SlideNav.vue         ← Bottom nav bar (prev/next/page number)
│   │   ├── TemplateCard.vue     ← Prompt template with [fillable] highlights + copy button
│   │   ├── StylePicker.vue      ← Style cards grid (click to copy style keyword)
│   │   ├── GuidedMode.vue       ← Three-field input → combine → preview → copy
│   │   ├── GeminiButton.vue     ← "Open Gemini" link button
│   │   ├── CopyToast.vue        ← "Copied!" notification
│   │   └── PhotoEditCard.vue    ← Photo editing prompt template + instructions
│   └── pages/
│       ├── P01Title.vue          ← 標題
│       ├── P02Login.vue          ← 登入 Gemini（用 Gmail）
│       ├── P03Outline.vue        ← 今天的流程
│       ├── P04Recap.vue          ← 上週回顧（Prompt Template = 食譜）
│       ├── P05Concept.vue        ← 新概念（食譜 → 點菜）
│       ├── P06Demo.vue           ← 老師示範提示
│       ├── P07Secrets.vue        ← 三個秘密（主題+場景+風格）
│       ├── P08Formula.vue        ← 萬用公式（顏色拆解）
│       ├── P09Styles.vue         ← 風格詞彙 gallery（互動，點擊複製）
│       ├── P10Practice1.vue      ← 練習 1：模板複製（文字生圖）
│       ├── P11Practice2.vue      ← 練習 2：引導模式（三個框）
│       ├── P12Practice3.vue      ← 練習 3：自由創作
│       ├── P13Break.vue          ← 中場休息
│       ├── P14Advanced1.vue      ← 進階 1：照片改圖（風格轉換）
│       ├── P15Advanced2.vue      ← 進階 2：照片 + 文字（場景合成）
│       ├── P16Advanced3.vue      ← 進階 3：生日卡片
│       ├── P17Advanced4.vue      ← 進階 4：LINE 貼圖
│       ├── P18StyleShowcase.vue  ← 卡通風格大全（宮崎駿、迪士尼、皮克斯…）
│       ├── P19Share.vue          ← 分享時間
│       ├── P20Homework.vue       ← 回家作業
│       └── P21End.vue            ← 結束
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/vite.config.js`
- Create: `frontend/index.html`
- Create: `frontend/src/main.js`
- Create: `frontend/src/App.vue` (skeleton)
- Create: `frontend/src/style.css`

- [ ] **Step 1: Initialize Vite + Vue 3 project**

```bash
cd /Users/pwlee/Documents/Github/tku-mackay
npm create vite@latest frontend -- --template vue
cd frontend && npm install
```

- [ ] **Step 2: Clean up boilerplate + set up auto-registering page system**

Remove default Vite starter content. Set up `App.vue` with slide navigation skeleton:
- Current slide index (reactive)
- Keyboard nav (← →), touch swipe, bottom nav buttons
- **Use `import.meta.glob` to auto-register pages** — new pages are automatically picked up as they are created:

```javascript
// In App.vue
const pageModules = import.meta.glob('./pages/*.vue', { eager: true })
const componentMap = Object.fromEntries(
  Object.entries(pageModules).map(([path, mod]) => {
    const name = path.match(/\/(P\d+\w+)\.vue$/)[1]
    return [name, mod.default]
  })
)
```

This means Tasks 5-8 can create page files that are immediately navigable without touching App.vue again.

- [ ] **Step 3: Create `style.css` — senior-friendly global styles**

```css
/* Match existing slides aesthetic (warm orange/brown palette) */
:root {
  --bg: #FFFFFF;
  --text: #1A1A1A;
  --accent: #B5411F;
  --accent2: #9A5A1E;
  --green: #3D6E3C;
  --blue: #2D6080;
  --card: #FFFFFF;
  --card-border: #C09A6E;
  --light: #F0E0CC;
  --template-bg: #FFF5E8;
}
/* Font size: minimum 18px body, 20px+ for inputs */
/* Button: minimum 48x48px touch target */
/* Mobile-first responsive */
```

- [ ] **Step 4: Copy logos from slides/**

```bash
cp -r slides/logos/ frontend/public/logos/
```

- [ ] **Step 5: Verify dev server runs**

```bash
cd frontend && npm run dev
```

- [ ] **Step 6: Commit**

---

## Task 2: Core Composable — useClipboard

**Files:**
- Create: `frontend/src/composables/useClipboard.js`

- [ ] **Step 1: Implement clipboard composable**

```javascript
// useClipboard.js
import { ref } from 'vue'

const toastMessage = ref('')
const toastVisible = ref(false)

export function useClipboard() {
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    toastMessage.value = '✅ 已複製！可以貼到 Gemini 了'
    toastVisible.value = true
    setTimeout(() => { toastVisible.value = false }, 2500)
  }

  return { copyText, toastMessage, toastVisible }
}
```

- [ ] **Step 2: Commit**

---

## Task 3: Core Components

> **DEPENDENCY NOTE:** Implement Task 4 Step 1 (templates.js) FIRST, then build these components. Data shapes must be locked before components.

**Files:**
- Create: `frontend/src/components/SlideNav.vue`
- Create: `frontend/src/components/TemplateCard.vue`
- Create: `frontend/src/components/GeminiButton.vue`
- Create: `frontend/src/components/CopyToast.vue`
- Create: `frontend/src/components/StylePicker.vue`
- Create: `frontend/src/components/GuidedMode.vue`
- Create: `frontend/src/components/PhotoEditCard.vue`

### 3a: SlideNav

- [ ] **Step 1: Build SlideNav.vue**

Bottom navigation bar: ◀ [page / total] ▶
Props: `current`, `total`
Emits: `prev`, `next`
Style: fixed bottom, white bg, rounded, shadow (match existing slides)

- [ ] **Step 2: Wire into App.vue**

Add keyboard (← →), touch swipe, and click navigation.

### 3b: CopyToast

- [ ] **Step 3: Build CopyToast.vue**

Fixed top-center toast notification. Uses `useClipboard()` reactive state.
Shows "✅ 已複製！可以貼到 Gemini 了" for 2.5 seconds.

### 3c: TemplateCard

- [ ] **Step 4: Build TemplateCard.vue**

Props: `template` object `{ title, icon, prompt, fillable: [{key, default, options?}] }`

Layout:
```
┌──────────────────────────────────┐
│ 🐶 [title]              [📋 複製] │
│                                   │
│ 請幫我畫一張圖片：                 │
│ [一隻可愛的小狗在公園玩球]        │ ← 黃色高亮，可點擊編輯
│ 風格：[卡通風格，色彩鮮豔]        │ ← 黃色高亮
│                                   │
│ 💡 黃色的部分可以換成你想要的！    │
└──────────────────────────────────┘
```

- Fillable sections rendered as `<span class="fill" contenteditable>` or inline `<input>`
- Copy button copies **resolved prompt** (with user's edits)
- One-click copy to clipboard

### 3d: GeminiButton

- [ ] **Step 5: Build GeminiButton.vue**

Large button: "🚀 打開 Gemini 貼上去畫圖 →"
Opens `https://gemini.google.com/app` in new tab.
Optional prop: `label` to customize text.
For photo editing pages: "🚀 打開 Gemini，貼上文字再上傳照片 →"

### 3e: StylePicker

- [ ] **Step 6: Build StylePicker.vue**

Grid of style cards. Props: `styles` array of `{ name, icon, keyword, desc }`.
Click a card → copies the keyword to clipboard.
Highlight selected style.

### 3f: GuidedMode

- [ ] **Step 7: Build GuidedMode.vue**

Three input fields:
- 🎯 主題 (Textbox, with placeholder)
- 🌍 場景 (Textbox, with placeholder)
- 🎨 風格 (Dropdown from styles list)

Below: 📝 即時預覽 of combined prompt (readonly, auto-updates).
Below: [📋 複製完整描述] + [🚀 打開 Gemini]

### 3g: PhotoEditCard

- [ ] **Step 8: Build PhotoEditCard.vue**

Props: `template` object `{ title, icon, prompt, instruction }`

Layout:
```
┌──────────────────────────────────┐
│ 🎨 [title]               [📋 複製] │
│                                    │
│ 📝 複製這段文字：                   │
│ "把這張照片變成[宮崎駿動畫]風格"    │
│                                    │
│ 📸 操作步驟：                       │
│ 1. 按上面的「複製」                 │
│ 2. 打開 Gemini                     │
│ 3. 貼上文字                        │
│ 4. 按 📎 上傳你的照片               │
│ 5. 按送出！                        │
│                                    │
│ [🚀 打開 Gemini，貼文字再傳照片 →]  │
└──────────────────────────────────┘
```

- [ ] **Step 9: Commit all components**

---

## Task 4: Data Files — Templates & Styles

**Files:**
- Create: `frontend/src/data/templates.js`
- Create: `frontend/src/data/pages.js`

- [ ] **Step 1: Create templates.js**

All prompt templates organized by category:

```javascript
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
  // 進階
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

// cartoonStyles — uses same shape as photoEditTemplates for PhotoEditCard compatibility
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
```

- [ ] **Step 2: Create pages.js**

```javascript
export const pages = [
  { id: 'title', component: 'P01Title', section: '開場' },
  { id: 'login', component: 'P02Login', section: '開場' },
  { id: 'outline', component: 'P03Outline', section: '開場' },
  { id: 'recap', component: 'P04Recap', section: '回顧' },
  { id: 'concept', component: 'P05Concept', section: '新概念' },
  { id: 'demo', component: 'P06Demo', section: '示範' },
  { id: 'secrets', component: 'P07Secrets', section: '教學' },
  { id: 'formula', component: 'P08Formula', section: '教學' },
  { id: 'styles', component: 'P09Styles', section: '教學' },
  { id: 'practice1', component: 'P10Practice1', section: '文字生圖' },
  { id: 'practice2', component: 'P11Practice2', section: '文字生圖' },
  { id: 'practice3', component: 'P12Practice3', section: '文字生圖' },
  { id: 'break', component: 'P13Break', section: '休息' },
  { id: 'photo1', component: 'P14Advanced1', section: '照片改圖' },
  { id: 'photo2', component: 'P15Advanced2', section: '照片改圖' },
  { id: 'advanced1', component: 'P16Advanced3', section: '進階應用' },
  { id: 'advanced2', component: 'P17Advanced4', section: '進階應用' },
  { id: 'showcase', component: 'P18StyleShowcase', section: '風格大全' },
  { id: 'share', component: 'P19Share', section: '收尾' },
  { id: 'homework', component: 'P20Homework', section: '收尾' },
  { id: 'end', component: 'P21End', section: '收尾' },
]
```

- [ ] **Step 3: Commit**

---

## Task 5: Lesson Pages (Static Content)

**Files:** Create all pages in `frontend/src/pages/`

These pages are mostly static content, matching the existing slides-week3.html aesthetic.

- [ ] **Step 1: P01Title — 標題頁**

「用 AI 畫出你的想像世界」+ 副標題 + 日期

- [ ] **Step 2: P02Login — 登入 Gemini**

「打開 Gemini」指示：
- 用手機開 gemini.google.com
- 用你的 Gmail 帳號登入
- 沒有帳號？用小卡（備用 ChatGPT 帳號）
- 大按鈕：「🚀 打開 Gemini」

- [ ] **Step 3: P03Outline — 今天的流程**

六個步驟 list（同原投影片 slide 3，更新為新流程）

- [ ] **Step 4: P04Recap — 上週回顧**

「Prompt Template = 食譜」四元素回顧（角色+任務+格式+限制）
用卡片展示，連結到這週的內容

- [ ] **Step 5: P05Concept — 食譜 → 點菜**

```
上週：你學會了寫食譜（Prompt Template）
這週：用食譜來點菜！

食譜 → 告訴 AI 你想要什麼
點菜 → AI 幫你畫出來
```

- [ ] **Step 6: P06Demo — 老師示範提示頁**

提示老師在投影幕用 Gemini 示範：
1. 打一句話 → AI 畫圖
2. 展示「刻意失敗」的例子
3. 示範上傳照片 → AI 改風格

- [ ] **Step 7: P07Secrets — 三個秘密**

主題 + 場景 + 風格（三張卡片，同原投影片 slide 11）

- [ ] **Step 8: P08Formula — 萬用公式**

主題 + 場景 + 動作 + 風格（顏色拆解，同原投影片 slide 12）

- [ ] **Step 9: P13Break — 中場休息**

大字「☕ 中場休息 5 分鐘」

- [ ] **Step 10: P19Share — 分享時間**

「來分享你的作品！」+ 三個問題

- [ ] **Step 11: P20Homework — 回家作業**

四項作業 + 特別作業「用 Gemini 或 ChatGPT 再試一次」
下堂預告：用 AI 寫你的生命故事

- [ ] **Step 12: P21End — 結束**

「謝謝大家！有問題在 LINE 群問」

- [ ] **Step 13: Commit all lesson pages**

---

## Task 6: Interactive Pages — Text-to-Image Practices

**Files:**
- Create: `frontend/src/pages/P09Styles.vue`
- Create: `frontend/src/pages/P10Practice1.vue`
- Create: `frontend/src/pages/P11Practice2.vue`
- Create: `frontend/src/pages/P12Practice3.vue`

- [ ] **Step 1: P09Styles — 風格詞彙 gallery（互動）**

使用 `StylePicker` component，展示 12 種風格。
點擊任一風格 → 複製 keyword → toast 顯示「已複製！」
告訴學員：「等一下練習的時候可以回來這頁選風格」

- [ ] **Step 2: P10Practice1 — 模板複製（文字生圖）**

三張 `TemplateCard`（動物、場景、自由創作）。
每張卡片：黃色高亮可編輯區域 + 一鍵複製 + Gemini 按鈕。
底部提示：「📋 複製 → 🚀 打開 Gemini → 貼上 → 送出 → 看圖！」

- [ ] **Step 3: P11Practice2 — 引導模式（三個框）**

使用 `GuidedMode` component。
三個框對應三個秘密（主題+場景+風格 dropdown）。
即時預覽完整 prompt。
複製 + Gemini 按鈕。

- [ ] **Step 4: P12Practice3 — 自由創作**

一個大 textarea + 範例按鈕（點擊填入範例）。
範例：「外星人在金門喝高粱酒，卡通風格」等 5 個。
複製 + Gemini 按鈕。

- [ ] **Step 5: Commit**

---

## Task 7: Interactive Pages — Photo Editing

**Files:**
- Create: `frontend/src/pages/P14Advanced1.vue`
- Create: `frontend/src/pages/P15Advanced2.vue`

- [ ] **Step 1: P14Advanced1 — 照片改圖（風格轉換）**

使用 `PhotoEditCard` component，展示 3 個模板：
1. 照片變畫風（水彩/油畫/素描）
2. 把自己變卡通（皮克斯/宮崎駿）
3. 換場景（巴黎鐵塔/海邊夕陽）

每張卡片有操作步驟提示：
「複製 → 打開 Gemini → 貼上 → 📎 上傳照片 → 送出」

- [ ] **Step 2: P15Advanced2 — 照片 + 文字（場景合成）**

使用 `PhotoEditCard`，更進階的模板：
1. 照片加料（加一隻貓/加櫻花）
2. 照片變漫畫分鏡
3. 照片生成 LINE 大頭貼

- [ ] **Step 3: Commit**

---

## Task 8: Interactive Pages — Advanced Practices

**Files:**
- Create: `frontend/src/pages/P16Advanced3.vue`
- Create: `frontend/src/pages/P17Advanced4.vue`
- Create: `frontend/src/pages/P18StyleShowcase.vue`

- [ ] **Step 1: P16Advanced3 — 生日卡片**

使用 `TemplateCard`，birthday template。
提示：「做好可以存到手機，傳 LINE 祝福朋友！」

- [ ] **Step 2: P17Advanced4 — LINE 貼圖**

使用 `TemplateCard`，sticker template。
提示換成不同問候語：「謝謝」「辛苦了」「晚安」

- [ ] **Step 3: P18StyleShowcase — 卡通風格大全**

使用 `cartoonStyles` data + `PhotoEditCard` component（field names aligned: `title`, `icon`, `prompt`, `instruction`, `desc`）。
展示 6 種知名動畫風格，每個都有一鍵複製 + Gemini 按鈕。
告訴學員：「選一個你喜歡的風格，上傳你的照片試試看！」

- [ ] **Step 4: Commit**

---

## Task 9: App.vue — Wire Everything Together

**Files:**
- Modify: `frontend/src/App.vue`

- [ ] **Step 1: Import all page components and wire slide navigation**

Dynamic component `<component :is="currentPage" />` based on slide index.
Keyboard (← →), touch swipe, bottom nav.
Page indicator shows section name.

- [ ] **Step 2: Add CopyToast to App.vue**

Global toast positioned fixed top-center.

- [ ] **Step 3: Test full navigation flow**

Dev server → navigate all 21 pages → verify no errors.

- [ ] **Step 4: Commit**

---

## Task 10: Polish — Mobile, Responsive, Final QA

**Files:**
- Modify: `frontend/src/style.css`
- Modify: various components

- [ ] **Step 1: Mobile responsive testing**

- Test on iPhone Safari (most students use iPhone)
- Verify: font size ≥ 18px, buttons ≥ 48px, no horizontal scroll
- Fix any overflow / layout issues

- [ ] **Step 2: Touch swipe refinement**

- Swipe left/right to navigate
- Prevent accidental swipes when editing text inputs

- [ ] **Step 3: Print/PDF export**

Add `@media print` styles so each page = one printed page (backup for no-WiFi scenario).

- [ ] **Step 4: Final QA — test complete course flow**

Simulate the entire class:
1. Open on phone
2. Navigate through all 21 pages
3. Copy templates, open Gemini link
4. Verify all templates render correctly
5. Test photo edit instructions are clear

- [ ] **Step 5: Commit**

---

## Task 11: Deployment

**Files:**
- Create: `frontend/vercel.json` (if needed)

- [ ] **Step 1: Build**

```bash
cd frontend && npm run build
```

- [ ] **Step 2: Deploy to Vercel**

```bash
cd frontend && npx vercel --prod
```

Or connect GitHub repo to Vercel for auto-deploy.

- [ ] **Step 3: Generate QR Code**

Generate QR code for the deployed URL, save as PNG for printing/projecting.

- [ ] **Step 4: Final commit + push**

---

## Summary

| Task | Description | Est. Time |
|------|-------------|-----------|
| 1 | Project scaffolding | 10 min |
| 2 | useClipboard composable | 5 min |
| 3 | Core components (7) | 30 min |
| 4 | Data files (templates, styles) | 15 min |
| 5 | Lesson pages (12 static) | 30 min |
| 6 | Text-to-image practices (4) | 15 min |
| 7 | Photo editing pages (2) | 10 min |
| 8 | Advanced practices (3) | 10 min |
| 9 | Wire App.vue | 10 min |
| 10 | Polish + mobile QA | 20 min |
| 11 | Deploy | 10 min |
| **Total** | | **~2.5 hr** |
