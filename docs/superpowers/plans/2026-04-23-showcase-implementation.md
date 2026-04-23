# 樂齡 AI 創作成果展 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 tku-mackay 站從課程導覽改成成果展首頁，並建立 7 張個人頁（1 老師 + 6 學員），資料缺的放 placeholder 讓學員補。

**Architecture:** 純靜態 HTML，共用 `stories/stories.css`，每頁 HTML 只含結構 + 個人色 tokens。首頁用 playlist 卡片列表。Suno 改成外連按鈕（沿用 ahui.html 模式）。

**Tech Stack:** HTML5 / CSS3 / 零框架 / Vercel 靜態部署

**Reference:**
- Spec: `docs/superpowers/specs/2026-04-23-showcase-design.md`
- CSS 靈感來源：`stories/ahui.html`
- 現有首頁：`index.html`

---

## 學員資料對照表

這份表是後續 Task 3–8 的 source of truth。每位學員 HTML 的填入值都從這裡取。

| 欄位 | Nini | Bella | 北投女巫 | Johnson | 阿勃勒 | 新埔梁阿姨 | 老師 |
|---|---|---|---|---|---|---|---|
| **slug** | `nini` | `bella` | `beitou-wizard` | `johnson` | `abeler` | `xinpu-liang` | `teacher` |
| **歌曲標題** | 人生重啟的旅程 | 我的故事-海風慢活 | 豆花袋影 | 雪地禮拜 | 端午的味道 | 永不退色的記憶 | [待定] |
| **學員名** | Nini | Bella | 北投女巫 | Johnson | 阿勃勒 | 新埔梁阿姨 | 李柏緯（老師） |
| **頭銜** | 家庭主婦 | 退休人員 | 自由業 | 私人企業公司退休 | 自由業 | 退休人員 | 課程指導 |
| **Suno URL** | `https://suno.com/s/sxDjFGzuFjMGGE2L` | `https://suno.com/s/Wglum4fZPBwsoOPo` | `https://suno.com/s/xklMUyFosHCHBFyK` | `https://suno.com/s/ovPVW3K8ZhMZEa7z` | _(placeholder)_ | `https://suno.com/song/b55db7e2-7e1d-4854-835b-dfea0db9bc26?sh=ZXAfVQMel9wy8Ydu` | _(placeholder)_ |
| **歌詞** | ✅ 完整 | ✅ 完整 | ✅ 完整 | _(placeholder)_ | _(placeholder)_ | ✅ 完整 | _(placeholder)_ |
| **故事** | ✅ 散文完整 | ✅ 散文完整 | ✅ 散文完整 | 只有短 bio | ✅ 散文完整 | ✅ 散文完整 | _(老師自介)_ |
| **Hero 色系** | 暖棕 → 磚紅 | 海藍 → 暖沙 | 深紫 → 粉煙 | 雪白 → 灰藍 | 艾草綠 → 土金 | 夜藍 → 磚橘 | 暖金 → 深藍 |

**Nini 歌詞／故事完整內文**（來自使用者提供）：

歌詞：
```
《人生重啟的旅程》
[Verse]
二十五年前　我站在門口
中年回校園　英語像高牆
開學第一天　鉛筆盒一打開
紙條落下　心就亮了
[Chorus]
馬克·吐溫在你字跡裡發光：
勇氣不是無懼　而是對抗恐懼、戰勝恐懼
深夜伏案時　我不再慌張
一步一步　走向夢的方向
[Bridge]
規定只能用英英字典　字小得像考驗
教授送我放大鏡　把路照得更清楚
最後我拿到心理學學位
回首才懂：歲月不是障礙，是沃土
```

故事：
```
二十五年前，我站在美國大學校園的門口，懷著一顆如小學新生般忐忑不安的心。身為中年重返校園的留學生，英語像是一道難以跨越的高牆，橫亙在知識與我之間，每一門課都伴隨著與生字對話的時光。

開學第一天，當我打開鉛筆盒時，發現一張紙條，紙條上，馬克·吐溫的名言隨著先生的熟悉的字跡耀然紙上：「勇氣並非無懼，而是對抗恐懼、戰勝恐懼。」這行字，成了我深夜伏案時最溫暖的光，也是最堅實的支柱。

當時的國際班教授規定只能用英英字典，歲月痕跡讓書頁上的字跡顯得遙遠。細小字跡對我而言，是一道巨大的阻礙。教授知曉我的困境後，送了我一份禮物——一只精緻的放大鏡。教授的善意如同一股流進心底的暖流，照亮了我求學之路。

最終，我以優異的成績取得了心理學學位。如今回首，這段人生重啟的旅程教會了我：歲月從來不是學習的障礙，而是「有志者事竟成」的沃土。
```

**自介一句話**（給 index.html 卡片用的摘要，非所有卡片都有——實作時從故事首句或 bio 首句取）：
- Nini: 我的人生觀是活到老學到老。
- Bella: 人生不一定要很快，但一定要有自己的節奏。
- 北投女巫: 與地熱谷比鄰而居，幻想著自己是從外太空來的精靈。
- Johnson: 經營服裝公司 50 年，孩子已成家立業，過著退休生活。
- 阿勃勒: 出生就住在溫泉聞名的北投，好山好水。
- 新埔梁阿姨: 出生在台灣一個空軍眷村，那裡有一種踏實的溫暖。
- 老師: 謝謝大家陪我走過這學期。

**其他學員的完整歌詞 / 故事**在 CSV `/Users/pwlee/Downloads/松年大學 AI 課程 作品 (回覆) - 表單回覆 1.csv`，實作時以此為準，並做清理（去 markdown `###`/`---`、strip、保留 emoji 和 `[Section]` 標記、保留全形空白 `　`）。

---

### Task 1: 建立 stories/stories.css 共用樣式

**Files:**
- Create: `stories/stories.css`

這份 CSS 從 `stories/ahui.html` 的 `<style>` 區塊抽出通用部分，加上 CSS vars 支援每頁自訂 hero 漸層色。

- [ ] **Step 1: Create `stories/stories.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300;400;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #FDFAF5;
  --text: #1C1C1C;
  --accent: #B85C4A;
  --accent-light: #F5EAE7;
  --gold: #9A7A3A;
  --gold-light: #F5EFE0;
  --border: #DDD0C0;
  --muted: #6B6560;
  /* 每頁可 override 這兩個 hero 漸層色 */
  --hero-from: #2C1F3A;
  --hero-to: #9B6060;
}

body {
  font-family: 'Noto Sans TC', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.8;
}

/* ===== TOP NAV ===== */
.top-nav {
  max-width: 720px;
  margin: 0 auto;
  padding: 16px 20px 0;
}
.top-nav a {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}
.top-nav a:hover { text-decoration: underline; }

/* ===== HERO ===== */
.hero {
  background: linear-gradient(160deg, var(--hero-from) 0%, var(--hero-to) 100%);
  color: white;
  text-align: center;
  padding: 64px 24px 48px;
  margin-top: 16px;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.course-badge {
  display: inline-block;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 0.85rem;
  letter-spacing: 2px;
  margin-bottom: 16px;
  position: relative;
}
.hero h1 {
  font-family: 'Noto Serif TC', serif;
  font-size: clamp(2rem, 6vw, 3.2rem);
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 4px;
  position: relative;
}
.hero .subtitle {
  font-size: 1rem;
  opacity: 0.8;
  letter-spacing: 1px;
  position: relative;
}

/* ===== CONTAINER ===== */
.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

/* ===== ALBUM SECTION ===== */
.album-section {
  margin-top: -24px;
  text-align: center;
  position: relative;
  z-index: 2;
}
.album-cover {
  width: clamp(200px, 60vw, 280px);
  height: clamp(200px, 60vw, 280px);
  margin: 0 auto 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--hero-from), var(--hero-to));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
  font-family: 'Noto Serif TC', serif;
}
.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}
.song-title {
  font-family: 'Noto Serif TC', serif;
  font-size: clamp(1.4rem, 4vw, 1.8rem);
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text);
}
.listen-btn {
  display: inline-block;
  background: var(--accent);
  color: white;
  text-decoration: none;
  padding: 14px 32px;
  border-radius: 32px;
  font-weight: 500;
  font-size: 1rem;
  transition: transform 0.15s, box-shadow 0.15s;
}
.listen-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(184,92,74,0.3);
}
.listen-btn.disabled {
  background: var(--border);
  color: var(--muted);
  cursor: not-allowed;
  pointer-events: none;
}

/* ===== DIVIDER ===== */
.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 40px 0;
}

/* ===== SECTION TITLE ===== */
.section-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--accent);
  border-left: 3px solid var(--accent);
  padding-left: 12px;
}

/* ===== LYRICS ===== */
.lyrics {
  background: var(--gold-light);
  padding: 28px 24px;
  border-radius: 12px;
  font-family: 'Noto Serif TC', serif;
  line-height: 2;
  color: #3A3530;
  white-space: pre-wrap;
}
.stanza { margin-bottom: 20px; }
.stanza:last-child { margin-bottom: 0; }
.stanza-label {
  display: inline-block;
  background: var(--gold);
  color: white;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 2px 10px;
  border-radius: 10px;
  margin-bottom: 6px;
  letter-spacing: 1px;
}

/* ===== STORY (散文) ===== */
.story {
  font-size: 1rem;
  line-height: 2;
  color: #3A3530;
}
.story p { margin-bottom: 1em; }
.story p:last-child { margin-bottom: 0; }

/* ===== PROFILE ===== */
.profile {
  background: var(--accent-light);
  padding: 24px;
  border-radius: 12px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.profile-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--gold), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}
.profile-info .name {
  font-family: 'Noto Serif TC', serif;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 4px;
}
.profile-info .title {
  font-size: 0.9rem;
  color: var(--muted);
  margin-bottom: 12px;
}
.profile-info .bio {
  font-size: 0.95rem;
  line-height: 1.9;
  color: #3A3530;
}

/* ===== PLACEHOLDER NOTE ===== */
.placeholder-note {
  text-align: center;
  padding: 32px 20px;
  color: var(--muted);
  background: var(--gold-light);
  border-radius: 12px;
  font-size: 0.95rem;
  line-height: 1.8;
}

/* ===== FOOTER ===== */
.page-footer {
  text-align: center;
  padding: 32px 20px;
  border-top: 1px solid var(--border);
  margin-top: 40px;
  font-size: 0.82rem;
  color: var(--muted);
}
.page-footer a { color: var(--accent); text-decoration: none; }

/* ===== MOBILE ===== */
@media (max-width: 600px) {
  .profile { flex-direction: column; align-items: center; text-align: center; }
  .lyrics { padding: 20px 16px; }
}

/* ===== PRINT ===== */
@media print {
  .hero { padding: 40px 24px 32px; }
  .listen-btn, .top-nav { display: none; }
  body { background: white; }
}
```

- [ ] **Step 2: Commit**

```bash
git add stories/stories.css
git commit -m "feat: add shared stories.css for student pages"
```

---

### Task 2: 建立 stories/teacher.html（Opener，placeholder）

這是第一個使用 `stories.css` 的頁面，也作為後續 6 位學員頁的結構 template。所有 placeholder 部分用明確的 copy 提示「作品製作中」，等老師寫完歌再填。

**Files:**
- Create: `stories/teacher.html`

- [ ] **Step 1: Create `stories/teacher.html`**

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>班級主題曲 — 李柏緯｜樂齡 AI 創作成果展</title>
  <meta property="og:title" content="班級主題曲 — 李柏緯">
  <meta property="og:description" content="在馬偕好厝邊松年大學，用 AI 把人生故事寫成一首歌。">
  <link rel="stylesheet" href="stories.css">
  <style>
    body { --hero-from: #9A7A3A; --hero-to: #2D4A6B; }
  </style>
</head>
<body>

<div class="top-nav"><a href="../index.html">← 回成果展</a></div>

<div class="hero">
  <div class="course-badge">馬偕好厝邊松年大學 · 樂齡 AI 創作課程</div>
  <h1>班級主題曲</h1>
  <p class="subtitle">寫給一起走過這學期的你們</p>
</div>

<div class="container">
  <div class="album-section">
    <div class="album-cover">🎓</div>
    <div class="song-title">[待定]</div>
    <a class="listen-btn disabled" aria-disabled="true">🎵 歌曲製作中</a>
  </div>

  <hr class="divider">

  <div class="section-title">歌詞</div>
  <div class="placeholder-note">
    🎼 這首歌還在寫中——<br>
    等 6 位同學的故事都聽完，我會把緣分寫成一首歌送大家。
  </div>

  <hr class="divider">

  <div class="section-title">關於創作者</div>
  <div class="profile">
    <div class="profile-photo">👨‍🏫</div>
    <div class="profile-info">
      <div class="name">李柏緯</div>
      <div class="title">課程指導 · 114 下學期</div>
      <div class="bio">
        這學期帶著大家玩 AI、採訪人生故事、寫歌做曲，謝謝 6 位同學信任我，把故事交給我。這張班級專輯是我們共同的作品。
      </div>
    </div>
  </div>
</div>

<div class="page-footer">
  <p>© 2026 馬偕好厝邊松年大學 · 樂齡 AI 創作成果展</p>
  <p style="margin-top:6px;">課程網站：<a href="../index.html">tku-mackay.vercel.app</a></p>
</div>

</body>
</html>
```

- [ ] **Step 2: 本地開啟驗證**

Run: `open stories/teacher.html`
Expected: Hero 是暖金→深藍漸層，album-cover 顯示 🎓，「歌曲製作中」按鈕灰色，placeholder-note 顯示「這首歌還在寫中」訊息，沒有 console error（打開 DevTools Network 確認 stories.css 200）

- [ ] **Step 3: Commit**

```bash
git add stories/teacher.html
git commit -m "feat: add teacher opener page (placeholder)"
```

---

### Task 3: 建立 stories/nini.html（Nini · 人生重啟的旅程）

**Files:**
- Create: `stories/nini.html`（從 `teacher.html` 複製 + 套 Nini 的資料）

- [ ] **Step 1: 從 teacher.html 複製並填入資料**

使用以下 HTML（基於 teacher.html 結構，替換所有學員特定欄位）：

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>人生重啟的旅程 — Nini｜樂齡 AI 創作成果展</title>
  <meta property="og:title" content="人生重啟的旅程 — Nini">
  <meta property="og:description" content="二十五年前，我站在美國大學校園的門口⋯⋯">
  <link rel="stylesheet" href="stories.css">
  <style>
    body { --hero-from: #8B5A3C; --hero-to: #B85C4A; }
  </style>
</head>
<body>

<div class="top-nav"><a href="../index.html">← 回成果展</a></div>

<div class="hero">
  <div class="course-badge">馬偕好厝邊松年大學 · 樂齡 AI 創作課程</div>
  <h1>人生重啟的旅程</h1>
  <p class="subtitle">Nini · 家庭主婦</p>
</div>

<div class="container">
  <div class="album-section">
    <div class="album-cover">人</div>
    <div class="song-title">人生重啟的旅程</div>
    <a class="listen-btn" href="https://suno.com/s/sxDjFGzuFjMGGE2L" target="_blank" rel="noopener">🎵 在 Suno 上聆聽</a>
  </div>

  <hr class="divider">

  <div class="section-title">歌詞</div>
  <div class="lyrics">
    <div class="stanza">
      <div class="stanza-label">Verse</div>
      二十五年前　我站在門口<br>
      中年回校園　英語像高牆<br>
      開學第一天　鉛筆盒一打開<br>
      紙條落下　心就亮了
    </div>
    <div class="stanza">
      <div class="stanza-label">Chorus</div>
      馬克·吐溫在你字跡裡發光：<br>
      勇氣不是無懼　而是對抗恐懼、戰勝恐懼<br>
      深夜伏案時　我不再慌張<br>
      一步一步　走向夢的方向
    </div>
    <div class="stanza">
      <div class="stanza-label">Bridge</div>
      規定只能用英英字典　字小得像考驗<br>
      教授送我放大鏡　把路照得更清楚<br>
      最後我拿到心理學學位<br>
      回首才懂：歲月不是障礙，是沃土
    </div>
  </div>

  <hr class="divider">

  <div class="section-title">📖 歌曲背後的故事</div>
  <div class="story">
    <p>二十五年前，我站在美國大學校園的門口，懷著一顆如小學新生般忐忑不安的心。身為中年重返校園的留學生，英語像是一道難以跨越的高牆，橫亙在知識與我之間，每一門課都伴隨著與生字對話的時光。</p>
    <p>開學第一天，當我打開鉛筆盒時，發現一張紙條，紙條上，馬克·吐溫的名言隨著先生的熟悉的字跡耀然紙上：「勇氣並非無懼，而是對抗恐懼、戰勝恐懼。」這行字，成了我深夜伏案時最溫暖的光，也是最堅實的支柱。</p>
    <p>當時的國際班教授規定只能用英英字典，歲月痕跡讓書頁上的字跡顯得遙遠。細小字跡對我而言，是一道巨大的阻礙。教授知曉我的困境後，送了我一份禮物——一只精緻的放大鏡。教授的善意如同一股流進心底的暖流，照亮了我求學之路。</p>
    <p>最終，我以優異的成績取得了心理學學位。如今回首，這段人生重啟的旅程教會了我：歲月從來不是學習的障礙，而是「有志者事竟成」的沃土。</p>
  </div>

  <hr class="divider">

  <div class="section-title">關於創作者</div>
  <div class="profile">
    <div class="profile-photo">👩</div>
    <div class="profile-info">
      <div class="name">Nini</div>
      <div class="title">家庭主婦</div>
      <div class="bio">
        我的人生觀是活到老學到老。我喜歡旅行，烹飪，做糕餅。
      </div>
    </div>
  </div>
</div>

<div class="page-footer">
  <p>© 2026 馬偕好厝邊松年大學 · 樂齡 AI 創作成果展</p>
  <p style="margin-top:6px;">課程網站：<a href="../index.html">tku-mackay.vercel.app</a></p>
</div>

</body>
</html>
```

- [ ] **Step 2: 本地開啟驗證**

Run: `open stories/nini.html`
Expected: Hero 暖棕→磚紅漸層，album-cover 顯示「人」字，Suno 按鈕可點，歌詞有 Verse/Chorus/Bridge 三段小標 + 全形空白保留，故事分四段有段落間距

- [ ] **Step 3: Commit**

```bash
git add stories/nini.html
git commit -m "feat: add Nini page — 人生重啟的旅程"
```

---

### Task 4: 建立 stories/bella.html（Bella · 我的故事-海風慢活）

**Files:**
- Create: `stories/bella.html`
- Ref: CSV 第 3 筆

**資料處理注意事項：**
- Bella 的「簡介」欄位以 `### 🌊 我的故事` 開頭，後面有散文體故事 → 拆成「故事」段落，清除 markdown `###`、`---`、`👇` 留 🌊 emoji
- Bella 的頭銜為「退休人員」
- 「自介一句話」用故事首句：「人生不一定要很快，但一定要有自己的節奏」
- Hero 色：`--hero-from: #4A7B8C; --hero-to: #E8C4A0;`（海藍 → 暖沙）
- album-cover 大字：「海」
- 歌詞完整內容從 CSV `你的歌詞` 欄位取，已知有 `[Intro]`、`[Verse 1]`、`[Verse 2]`、`[Chorus]` 等段落（553 字）

- [ ] **Step 1: 建立 bella.html**

複製 `stories/nini.html` 為 `stories/bella.html`，做以下替換：
- `<title>`：`我的故事-海風慢活 — Bella｜樂齡 AI 創作成果展`
- `og:title`：`我的故事-海風慢活 — Bella`
- `og:description`：故事首句
- `body` style vars：`--hero-from: #4A7B8C; --hero-to: #E8C4A0;`
- `.hero h1`：`我的故事-海風慢活`
- `.hero .subtitle`：`Bella · 退休人員`
- `.album-cover`：`海`
- `.song-title`：`我的故事-海風慢活`
- `.listen-btn href`：`https://suno.com/s/Wglum4fZPBwsoOPo`
- 歌詞：從 CSV `你的歌詞` 欄位取，每個 `[Intro]`/`[Verse 1]`/`[Verse 2]`/`[Chorus]` 等用 `<div class="stanza"><div class="stanza-label">...</div>...</div>` 包起來，內部換行用 `<br>`
- 故事：從 CSV `個人簡介` 欄位取，清除 `### 🌊 我的故事`、`---`、`👇` 等 markdown，保留 🌊 emoji 當段首裝飾；用空白行切段落，每段包 `<p>`
- `.profile-photo`：`👩`
- `.name`：`Bella`
- `.title`：`退休人員`
- `.bio`：「我一直覺得，人生不一定要很快，但一定要有自己的節奏。」（取故事首句當 bio 濃縮）

- [ ] **Step 2: 本地開啟驗證**

Run: `open stories/bella.html`
Expected: Hero 海藍→暖沙漸層，album-cover 顯示「海」，歌詞各段有對應 stanza-label，故事分段清楚，沒有殘留 `###` 或 `---` 符號

- [ ] **Step 3: Commit**

```bash
git add stories/bella.html
git commit -m "feat: add Bella page — 我的故事-海風慢活"
```

---

### Task 5: 建立 stories/beitou-wizard.html（北投女巫 · 豆花袋影）

**Files:**
- Create: `stories/beitou-wizard.html`
- Ref: CSV 第 4 筆

**資料處理注意事項：**
- 學員名 `北投女巫  `（尾端有空白）→ strip 成「北投女巫」
- 頭銜「自由業」
- 簡介裡用 `"..."` 雙引號包「自己是否是從外太空來的精靈」→ 保留雙引號作風格
- Hero 色：`--hero-from: #4A2E5C; --hero-to: #C98FB3;`（深紫 → 粉煙）
- album-cover：`豆`
- Suno URL：`https://suno.com/s/xklMUyFosHCHBFyK`
- 歌詞：CSV 549 字，有 `[Intro]`/`[Verse 1]`/`[Chorus]` 等段落

- [ ] **Step 1: 建立 beitou-wizard.html**

複製 `stories/nini.html` 為 `stories/beitou-wizard.html`，做以下替換：
- `<title>`：`豆花袋影 — 北投女巫｜樂齡 AI 創作成果展`
- `og:description`：「小生長在北投，與地熱谷比鄰而居⋯⋯」
- `body` style vars：`--hero-from: #4A2E5C; --hero-to: #C98FB3;`
- `.hero h1`：`豆花袋影`
- `.hero .subtitle`：`北投女巫 · 自由業`
- `.album-cover`：`豆`
- `.song-title`：`豆花袋影`
- `.listen-btn href`：`https://suno.com/s/xklMUyFosHCHBFyK`
- 歌詞：從 CSV `你的歌詞` 取，按 `[Section]` 切 stanza
- 故事：從 CSV `個人簡介` 取，空白行切段落、strip、保留 `"..."` 引號風格
- `.profile-photo`：`🧙‍♀️`
- `.name`：`北投女巫`
- `.title`：`自由業`
- `.bio`：首段精簡版「小生長在北投，與地熱谷比鄰而居。這裡的神秘氛圍讓我幻想自己是從外太空來的精靈。」

- [ ] **Step 2: 本地開啟驗證**

Run: `open stories/beitou-wizard.html`
Expected: Hero 深紫→粉煙漸層，album-cover 顯示「豆」，歌詞段落完整、故事保留 `"..."` 風格

- [ ] **Step 3: Commit**

```bash
git add stories/beitou-wizard.html
git commit -m "feat: add 北投女巫 page — 豆花袋影"
```

---

### Task 6: 建立 stories/johnson.html（Johnson · 雪地禮拜，歌詞 placeholder）

**Files:**
- Create: `stories/johnson.html`
- Ref: CSV 第 5 筆

**資料處理注意事項：**
- 歌詞欄位誤填 Suno URL → 歌詞區用 placeholder，提示「歌詞整理中，可點上方按鈕聆聽」
- 頭銜「私人企業公司退休」
- Suno URL 有效：`https://suno.com/s/ovPVW3K8ZhMZEa7z` → 按鈕可點
- Hero 色：`--hero-from: #D6DCE3; --hero-to: #6A8BA5;`（雪白 → 灰藍）
- album-cover：`雪`
- 簡介：「經營服裝公司 50 年，孩子已成家立業，任務已達成，過著退休生活了」

- [ ] **Step 1: 建立 johnson.html**

複製 `stories/nini.html` 為 `stories/johnson.html`，做以下替換：
- `<title>`：`雪地禮拜 — Johnson｜樂齡 AI 創作成果展`
- `og:description`：「經營服裝公司 50 年，孩子已成家立業⋯⋯」
- `body` style vars：`--hero-from: #D6DCE3; --hero-to: #6A8BA5;`
- `.hero h1`：`雪地禮拜`
- `.hero .subtitle`：`Johnson · 私人企業公司退休`
- `.album-cover`：`雪`
- `.song-title`：`雪地禮拜`
- `.listen-btn href`：`https://suno.com/s/ovPVW3K8ZhMZEa7z`
- 歌詞區：**用 `<div class="placeholder-note">` 取代 `<div class="lyrics">...</div>`**，內容：`🎼 歌詞整理中<br>點上方按鈕到 Suno 上聆聽`
- 故事區：**整個「📖 歌曲背後的故事」section 刪除**（CSV 無故事，只有短 bio）
- `.profile-photo`：`🧑`
- `.name`：`Johnson`
- `.title`：`私人企業公司退休`
- `.bio`：「經營服裝公司 50 年，孩子已成家立業，任務已達成，過著退休生活了」

- [ ] **Step 2: 本地開啟驗證**

Run: `open stories/johnson.html`
Expected: Hero 雪白→灰藍漸層，album-cover 顯示「雪」，Suno 按鈕可點，歌詞區顯示「歌詞整理中」placeholder，沒有故事區塊

- [ ] **Step 3: Commit**

```bash
git add stories/johnson.html
git commit -m "feat: add Johnson page — 雪地禮拜 (lyrics placeholder)"
```

---

### Task 7: 建立 stories/abeler.html（阿勃勒 · 端午的味道，歌詞+Suno 都 placeholder）

**Files:**
- Create: `stories/abeler.html`
- Ref: CSV 第 6 筆

**資料處理注意事項：**
- Suno 連結是 Gemini URL `https://gemini.google.com/share/399e6417ac83`（學員交錯檔）→ 不連過去，顯示「歌曲製作中」disabled 按鈕
- 歌詞空白 → placeholder
- 名字 `阿勃勒 ` strip
- 頭銜 `自 由 業 ` strip 並移除內部空白 → 「自由業」
- 故事完整，可以用
- Hero 色：`--hero-from: #7A8F3A; --hero-to: #B8952A;`（艾草綠 → 土金）
- album-cover：`端`

- [ ] **Step 1: 建立 abeler.html**

複製 `stories/nini.html` 為 `stories/abeler.html`，做以下替換：
- `<title>`：`端午的味道 — 阿勃勒｜樂齡 AI 創作成果展`
- `og:description`：故事首句
- `body` style vars：`--hero-from: #7A8F3A; --hero-to: #B8952A;`
- `.hero h1`：`端午的味道`
- `.hero .subtitle`：`阿勃勒 · 自由業`
- `.album-cover`：`端`
- `.song-title`：`端午的味道`
- `.listen-btn`：改成 `<a class="listen-btn disabled" aria-disabled="true">🎵 歌曲製作中</a>`（拿掉 href）
- 歌詞區：用 `<div class="placeholder-note">🎼 歌詞整理中，敬請期待</div>` 取代 lyrics block
- 故事區：從 CSV `個人簡介` 取，清理後分段
- `.profile-photo`：`🌳`
- `.name`：`阿勃勒`
- `.title`：`自由業`
- `.bio`：「出生就住在溫泉聞名的北投。好山好水不足以形容這個人文底蘊深厚的好所在。」

- [ ] **Step 2: 本地開啟驗證**

Run: `open stories/abeler.html`
Expected: Hero 艾草綠→土金，album-cover 顯示「端」，「歌曲製作中」按鈕灰色不可點，歌詞 placeholder 顯示，故事區完整

- [ ] **Step 3: Commit**

```bash
git add stories/abeler.html
git commit -m "feat: add 阿勃勒 page — 端午的味道 (song+lyrics placeholder)"
```

---

### Task 8: 建立 stories/xinpu-liang.html（新埔梁阿姨 · 永不退色的記憶）

**Files:**
- Create: `stories/xinpu-liang.html`
- Ref: CSV 第 7 筆

**資料處理注意事項：**
- Suno URL 格式不同：`https://suno.com/song/b55db7e2-7e1d-4854-835b-dfea0db9bc26?sh=ZXAfVQMel9wy8Ydu` → 整串放 href 即可（只是外連，不需解析 UUID）
- 頭銜「退休人員」
- 故事 477 字完整，歌詞 477 字完整
- Hero 色：`--hero-from: #1F2F5C; --hero-to: #B85C4A;`（夜藍 → 磚橘）
- album-cover：`憶`

- [ ] **Step 1: 建立 xinpu-liang.html**

複製 `stories/nini.html` 為 `stories/xinpu-liang.html`，做以下替換：
- `<title>`：`永不退色的記憶 — 新埔梁阿姨｜樂齡 AI 創作成果展`
- `og:description`：「我出生在台灣一個空軍眷村裡⋯⋯」
- `body` style vars：`--hero-from: #1F2F5C; --hero-to: #B85C4A;`
- `.hero h1`：`永不退色的記憶`
- `.hero .subtitle`：`新埔梁阿姨 · 退休人員`
- `.album-cover`：`憶`
- `.song-title`：`永不退色的記憶`
- `.listen-btn href`：`https://suno.com/song/b55db7e2-7e1d-4854-835b-dfea0db9bc26?sh=ZXAfVQMel9wy8Ydu`
- 歌詞：CSV 已有 `【歌詞】` 開頭 + `[Intro]`/`[Verse 1]`/`[Chorus]` 等段落 → 清除 `【歌詞】` 標頭、保留段落結構
- 故事：CSV `個人簡介` 完整散文 → 分段包 `<p>`
- `.profile-photo`：`👵`
- `.name`：`新埔梁阿姨`
- `.title`：`退休人員`
- `.bio`：「出生在台灣一個空軍眷村裡，家裡日子踏實溫暖。」

- [ ] **Step 2: 本地開啟驗證**

Run: `open stories/xinpu-liang.html`
Expected: Hero 夜藍→磚橘，album-cover 顯示「憶」，Suno 按鈕可點（長 URL 不會截斷），歌詞無「【歌詞】」標頭殘留

- [ ] **Step 3: Commit**

```bash
git add stories/xinpu-liang.html
git commit -m "feat: add 新埔梁阿姨 page — 永不退色的記憶"
```

---

### Task 9: 重寫 index.html 成為成果展首頁

**Files:**
- Modify: `index.html`（整份重寫）

新首頁以 Playlist 為主視覺，週次講義收進底部 `<details>` 摺疊區。

- [ ] **Step 1: 重寫 index.html**

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>樂齡 AI 創作成果展｜馬偕好厝邊松年大學</title>
  <meta property="og:title" content="樂齡 AI 創作成果展">
  <meta property="og:description" content="6 位學員、一位老師、7 首人生之歌。用 AI 把故事寫成了歌。">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎵</text></svg>">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Noto+Serif+TC:wght@400;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --bg: #FAFAF8;
      --text: #1A1A1A;
      --accent: #B5411F;
      --accent2: #9A5A1E;
      --green: #3D6E3C;
      --card-border: #C09A6E;
      --light: #F0E0CC;
      --muted: #6B6560;
    }

    body {
      font-family: 'Noto Sans TC', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.7;
    }

    .container {
      max-width: 820px;
      margin: 0 auto;
      padding: 48px 24px 80px;
    }

    /* Hero */
    .hero {
      text-align: center;
      margin-bottom: 48px;
    }
    .hero .icon { font-size: 4rem; margin-bottom: 16px; }
    .hero h1 {
      font-family: 'Noto Serif TC', serif;
      font-size: clamp(2rem, 5vw, 2.8rem);
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 12px;
      letter-spacing: 4px;
    }
    .hero .subtitle {
      font-size: 1.05rem;
      color: var(--muted);
      margin-bottom: 8px;
      letter-spacing: 2px;
    }
    .hero .lede {
      font-size: 1rem;
      color: #555;
      margin-top: 20px;
      max-width: 540px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.9;
    }

    /* Section heading */
    .section-heading {
      font-family: 'Noto Serif TC', serif;
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--accent2);
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--card-border);
      letter-spacing: 2px;
    }

    /* Track card */
    .track {
      display: flex;
      align-items: center;
      gap: 20px;
      background: white;
      border: 1.5px solid var(--card-border);
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 14px;
      text-decoration: none;
      color: inherit;
      transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
      position: relative;
    }
    .track:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(0,0,0,0.08);
      border-color: var(--accent);
    }
    .track .cover {
      width: 72px; height: 72px;
      flex-shrink: 0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: 'Noto Serif TC', serif;
      font-size: 1.8rem;
      font-weight: 700;
    }
    .track .info { flex: 1; min-width: 0; }
    .track .song {
      font-family: 'Noto Serif TC', serif;
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .track .artist {
      font-size: 0.88rem;
      color: var(--muted);
      margin-bottom: 6px;
    }
    .track .lede {
      font-size: 0.85rem;
      color: #777;
      line-height: 1.5;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .track .arrow {
      flex-shrink: 0;
      font-size: 1.3rem;
      color: var(--card-border);
      transition: color 0.15s, transform 0.15s;
    }
    .track:hover .arrow {
      color: var(--accent);
      transform: translateX(4px);
    }

    /* Cover gradients (match stories pages) */
    .cover-teacher   { background: linear-gradient(135deg, #9A7A3A, #2D4A6B); }
    .cover-nini      { background: linear-gradient(135deg, #8B5A3C, #B85C4A); }
    .cover-bella     { background: linear-gradient(135deg, #4A7B8C, #E8C4A0); }
    .cover-beitou    { background: linear-gradient(135deg, #4A2E5C, #C98FB3); }
    .cover-johnson   { background: linear-gradient(135deg, #D6DCE3, #6A8BA5); }
    .cover-abeler    { background: linear-gradient(135deg, #7A8F3A, #B8952A); }
    .cover-xinpu     { background: linear-gradient(135deg, #1F2F5C, #B85C4A); }

    /* Collapsible slides section */
    details.slides-section {
      margin-top: 56px;
      background: white;
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 20px 24px;
    }
    details.slides-section summary {
      cursor: pointer;
      font-family: 'Noto Serif TC', serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--accent2);
      letter-spacing: 2px;
      list-style: none;
    }
    details.slides-section summary::-webkit-details-marker { display: none; }
    details.slides-section summary::after {
      content: '▸';
      float: right;
      transition: transform 0.2s;
    }
    details.slides-section[open] summary::after { transform: rotate(90deg); }
    details.slides-section .slide-list { margin-top: 20px; }
    .slide-item {
      display: block;
      padding: 12px 14px;
      border-radius: 8px;
      text-decoration: none;
      color: var(--text);
      margin-bottom: 6px;
      transition: background 0.15s;
    }
    .slide-item:hover { background: var(--light); }
    .slide-item .num {
      display: inline-block;
      font-weight: 700;
      color: var(--accent);
      margin-right: 10px;
      letter-spacing: 1px;
    }
    .slide-item .title {
      font-weight: 500;
    }
    .slide-item .date {
      float: right;
      color: #999;
      font-size: 0.85rem;
    }

    /* Footer */
    .footer {
      text-align: center;
      margin-top: 56px;
      padding-top: 24px;
      border-top: 1px solid #e0d5c8;
      font-size: 0.9rem;
      color: #999;
      line-height: 1.8;
    }
    .footer a { color: var(--accent); text-decoration: none; }

    @media (max-width: 600px) {
      .container { padding: 32px 16px 60px; }
      .track { padding: 12px; gap: 14px; }
      .track .cover { width: 60px; height: 60px; font-size: 1.5rem; }
      .track .song { font-size: 1.05rem; }
      .slide-item .date { float: none; display: block; margin-top: 2px; }
    }
  </style>
</head>
<body>

<div class="container">

  <div class="hero">
    <div class="icon">🎵</div>
    <h1>樂齡 AI 創作成果展</h1>
    <p class="subtitle">馬偕好厝邊松年大學 · 114 下學期</p>
    <p class="lede">6 位學員、一位老師、7 首人生之歌。<br>用 AI 把故事寫成了歌。</p>
  </div>

  <div class="section-heading">🎵 班級畢業專輯</div>

  <a class="track" href="stories/teacher.html">
    <div class="cover cover-teacher">🎓</div>
    <div class="info">
      <div class="song">班級主題曲 <span style="font-size:0.75rem;color:#999;font-weight:400;">[待定]</span></div>
      <div class="artist">李柏緯（老師） · 課程指導</div>
      <div class="lede">謝謝大家陪我走過這學期。</div>
    </div>
    <div class="arrow">→</div>
  </a>

  <a class="track" href="stories/nini.html">
    <div class="cover cover-nini">人</div>
    <div class="info">
      <div class="song">人生重啟的旅程</div>
      <div class="artist">Nini · 家庭主婦</div>
      <div class="lede">二十五年前，我站在美國大學校園的門口，懷著一顆如小學新生般忐忑不安的心⋯⋯</div>
    </div>
    <div class="arrow">→</div>
  </a>

  <a class="track" href="stories/bella.html">
    <div class="cover cover-bella">海</div>
    <div class="info">
      <div class="song">我的故事-海風慢活</div>
      <div class="artist">Bella · 退休人員</div>
      <div class="lede">人生不一定要很快，但一定要有自己的節奏。最靠近自己的時候，通常是在有水的地方。</div>
    </div>
    <div class="arrow">→</div>
  </a>

  <a class="track" href="stories/beitou-wizard.html">
    <div class="cover cover-beitou">豆</div>
    <div class="info">
      <div class="song">豆花袋影</div>
      <div class="artist">北投女巫 · 自由業</div>
      <div class="lede">小生長在北投，與地熱谷比鄰而居，地熱谷的神秘氛圍讓我幻想自己是從外太空來的精靈。</div>
    </div>
    <div class="arrow">→</div>
  </a>

  <a class="track" href="stories/johnson.html">
    <div class="cover cover-johnson">雪</div>
    <div class="info">
      <div class="song">雪地禮拜</div>
      <div class="artist">Johnson · 私人企業公司退休</div>
      <div class="lede">經營服裝公司 50 年，孩子已成家立業，任務已達成，過著退休生活了。</div>
    </div>
    <div class="arrow">→</div>
  </a>

  <a class="track" href="stories/abeler.html">
    <div class="cover cover-abeler">端</div>
    <div class="info">
      <div class="song">端午的味道 <span style="font-size:0.75rem;color:#999;font-weight:400;">[製作中]</span></div>
      <div class="artist">阿勃勒 · 自由業</div>
      <div class="lede">出生就住在溫泉聞名的北投。好山好水，不足以形容這個人文底蘊深厚的好所在。</div>
    </div>
    <div class="arrow">→</div>
  </a>

  <a class="track" href="stories/xinpu-liang.html">
    <div class="cover cover-xinpu">憶</div>
    <div class="info">
      <div class="song">永不退色的記憶</div>
      <div class="artist">新埔梁阿姨 · 退休人員</div>
      <div class="lede">出生在台灣一個空軍眷村裡。父親隨軍隊來到台灣，家裡不算富裕，可我總覺得日子裡有一種踏實的溫暖。</div>
    </div>
    <div class="arrow">→</div>
  </a>

  <details class="slides-section">
    <summary>📚 本學期講義回顧（週 1–8）</summary>
    <div class="slide-list">
      <a class="slide-item" href="slides/week1.html">
        <span class="num">第 1 堂</span><span class="title">認識 AI — 你的聰明新助手</span>
        <span class="date">03.06</span>
      </a>
      <a class="slide-item" href="slides/week2.html">
        <span class="num">第 2 堂</span><span class="title">Prompt Template — AI 的食譜</span>
        <span class="date">03.14</span>
      </a>
      <a class="slide-item" href="slides/week3.html">
        <span class="num">第 3 堂</span><span class="title">用 AI 畫出你的想像世界</span>
        <span class="date">03.20</span>
      </a>
      <a class="slide-item" href="slides/week4.html">
        <span class="num">第 4 堂</span><span class="title">AI 幫你說故事</span>
        <span class="date">03.27</span>
      </a>
      <a class="slide-item" href="slides/week7.html">
        <span class="num">第 7 堂</span><span class="title">用 AI 說出你的故事，變成一首歌</span>
        <span class="date">04.10</span>
      </a>
      <a class="slide-item" href="slides/week8.html">
        <span class="num">第 8 堂</span><span class="title">完成你的個人單曲</span>
        <span class="date">04.17</span>
      </a>
    </div>
  </details>

  <div class="footer">
    <p>老師：李柏緯 · 馬偕好厝邊松年大學</p>
    <p style="margin-top:6px;">網址：<a href="https://tku-mackay.vercel.app">tku-mackay.vercel.app</a></p>
  </div>

</div>

</body>
</html>
```

- [ ] **Step 2: 本地開啟驗證**

Run: `open index.html`
Expected: Hero 居中 + 一句文案；7 張 Playlist 卡片（老師在第 1 張），每張封面漸層色對應學員頁 Hero 色；hover 卡片浮起；講義摺疊區預設收合，點擊展開顯示 6 堂課；手機寬度卡片縮小但結構不亂。

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: rewrite index.html — showcase homepage"
```

---

### Task 10: 整體驗證 + 修正跳轉

**Files:**
- Verify: all pages

- [ ] **Step 1: 啟動 local server**

Run:
```bash
cd /Users/pwlee/Documents/Github/tku-mackay
python3 -m http.server 8765
```

- [ ] **Step 2: 在瀏覽器開 http://localhost:8765/**

驗證 checklist：
- [ ] 首頁 Hero 正確顯示
- [ ] 7 張卡片排序正確（老師第 1、Nini、Bella、北投女巫、Johnson、阿勃勒、新埔梁阿姨）
- [ ] 每張卡片點進去可打開對應 story 頁（URL 正確）
- [ ] 每個 story 頁 Hero 漸層對應首頁封面漸層（視覺一致）
- [ ] 每個 story 頁點「← 回成果展」回到首頁 `/` 不是 `/stories/`
- [ ] Suno 按鈕：Nini、Bella、北投女巫、Johnson、新埔梁阿姨 可點外連；老師、阿勃勒 是灰色「製作中」
- [ ] 歌詞區：Nini、Bella、北投女巫、新埔梁阿姨 完整；Johnson、阿勃勒 顯示 placeholder；老師顯示 "歌還在寫中"
- [ ] 故事區：除 Johnson 外都有；Johnson 頁沒有故事 section
- [ ] 摺疊講義區可正常展開/收合，6 堂課連結可點
- [ ] 手機寬度（DevTools 切 iPhone SE 375px）檢查：首頁卡片不斷裂、stories 頁 profile 變垂直

- [ ] **Step 3: 關閉 server**

Ctrl+C 停止 python server

- [ ] **Step 4: 修正任何視覺/連結問題後 commit**

如果驗證時發現問題，修完後：
```bash
git add <改到的檔>
git commit -m "fix: <具體問題>"
```

---

### Task 11: Deploy

**Files:**
- Push to `main`（Vercel auto-deploy）

- [ ] **Step 1: 確認 main branch 乾淨**

Run: `git status && git log --oneline -10`
Expected: working tree clean，看到 Task 1–10 的所有 commits

- [ ] **Step 2: Push**

Run: `git push origin main`

- [ ] **Step 3: 驗證 Vercel deploy**

開 https://tku-mackay.vercel.app/ → 應看到新的成果展首頁
開 https://tku-mackay.vercel.app/stories/nini.html → 應看到 Nini 頁

- [ ] **Step 4: 回報完成**

告訴 Powei 上線了，可以把連結發群組請學員檢查自己的頁面、補資料、補封面圖。

後續學員補資料流程（範圍外，手動處理）：
- 收到歌詞 → 編輯對應 `stories/<slug>.html`，把 placeholder 換成歌詞 stanza
- 收到封面圖 → 放到 `stories/covers/<slug>.jpg`，把對應頁的 `<div class="album-cover">X</div>` 改成 `<div class="album-cover"><img src="covers/<slug>.jpg" alt=""></div>`；同步更新 index.html 的 `.track .cover` 內容成縮圖
- 老師寫完歌 → 編輯 `stories/teacher.html`，填歌詞、歌名、Suno URL；同步更新 index.html 卡片 `[待定]` 標籤
