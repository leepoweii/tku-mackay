# 松年大學 AI 課程

淡水馬偕松年大學 114 下「人工智慧(AI)生活應用」課程資料。

## 結構

```
slides/          ← 每週投影片（HTML，瀏覽器打開即可）
app/             ← AI 畫圖工具（Gradio + Gemini API）
docs/            ← 教學大綱與時間表
```

## AI 畫圖工具

### 本地測試

```bash
cd app
export GEMINI_API_KEY="your-key"
uv run main.py
```

打開 http://localhost:7860

### 部署到 Zeabur

設定環境變數 `GEMINI_API_KEY`，啟動命令：

```bash
cd app && uv run main.py
```
