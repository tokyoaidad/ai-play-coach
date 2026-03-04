# AI Play Coach (Next.js App Router)

面向 3–5 岁孩子家长的「AI Play Coach」亲子陪玩网站，使用 Next.js 14 App Router、TypeScript 和 Tailwind CSS。  
每个玩法都是 5–15 分钟的「玩法卡片」，帮助在日常游戏中自然聊起 AI 的基础直觉。

## 功能概览

- **首页 `/`**
  - Hero 区：产品名 + 副标题，强调寓教于乐、无需屏幕和编程
  - 今日推荐：默认展示 3 个推荐玩法，可以点击「换一批」重新随机
  - 快速筛选：精简版筛选卡片 + 少量玩法预览
- **活动库 `/activities`**
  - 搜索框 + 多维度筛选（时长 / 场景 / 主题）
  - 列表展示所有玩法卡片，移动端单列，≥md 两列
- **活动详情 `/activities/[id]`**
  - 展示单个玩法的完整信息：步骤、家长台词、变化玩法、安全提示等
  - 支持收藏当前玩法
- **收藏页 `/favorites`**
  - 使用 `localStorage` 记录收藏，跨页面、刷新后仍保留
  - 支持一键清空收藏

## 技术栈

- **框架**：Next.js 14（App Router）
- **语言**：TypeScript
- **样式**：Tailwind CSS（移动优先、奶油暖色系卡片 UI）
- **状态**：
  - `lib/favorites.tsx` 内的 `FavoritesProvider` + `useFavorites()`（localStorage 收藏）
  - 过滤和搜索逻辑在 `lib/activities.ts`
- **数据源**：`data/activities.json` 本地 JSON 文件

## 目录结构

```text
app/
  layout.tsx              # 全局布局，挂载 LayoutShell + FavoritesProvider
  page.tsx                # 首页
  activities/
    page.tsx              # 活动库列表页
    [id]/page.tsx         # 活动详情页
  favorites/
    page.tsx              # 收藏页

components/
  LayoutShell.tsx         # 带顶部导航的布局组件（sticky header）
  ActivityCard.tsx        # 活动卡片（标题/标签/一句话说明/收藏）
  FiltersBar.tsx          # 搜索 + 筛选 chips
  FavoriteButton.tsx      # 收藏按钮（localStorage 同步）
  TagChip.tsx             # 小标签样式
  HomePageClient.tsx      # 首页逻辑组件
  ActivitiesPageClient.tsx# 活动库列表逻辑组件
  FavoritesPageClient.tsx # 收藏页逻辑组件

lib/
  types.ts                # Activity 类型定义，与 data/activities.json 对齐
  activities.ts           # 过滤、搜索、随机推荐等纯函数
  favorites.tsx           # FavoritesProvider 和 useFavorites hook（localStorage）

data/
  activities.json         # 至少 10 条玩法种子数据
```

## 本地运行

### 环境要求

- Node.js 18+
- npm（或 pnpm/yarn，以下以 npm 为例）

### 安装依赖并启动开发服务器

```bash
npm install
npm run dev
```

浏览器访问 `http://localhost:3000`。

## 数据结构与扩展玩法

玩法数据存放在 `data/activities.json` 中，每条记录类似：

```json
{
  "id": "robot-sort-001",
  "title": "训练小机器人：把玩具分到篮子里",
  "age_range": "3-4",
  "minutes": 10,
  "location": "indoor",
  "materials": ["玩具或积木10个", "两个盒子/篮子"],
  "themes": ["classification", "rules"],
  "ai_concepts": ["分类", "特征（颜色/大小/形状）", "规则会影响结果"],
  "skills": ["logic", "attention", "language"],
  "setup": "把玩具随意堆在一起，准备两个盒子。",
  "steps": ["……"],
  "adult_script": ["……"],
  "variations": {
    "easier": ["……"],
    "harder": ["……"],
    "outdoor": ["……"]
  },
  "safety": ["……"]
}
```

- **字段说明（面向内容编辑）**：
  - `id`：唯一 ID，用英文+数字，便于路由使用
  - `title`：玩法标题，建议简短+场景感
  - `age_range`：年龄段，如 `"3-4"`
  - `minutes`：建议时长（目前支持 5 / 10 / 15 为主）
  - `location`：`"indoor" | "outdoor" | "both"`
  - `materials`：需要的材料列表（为空数组表示“只需要你和孩子”）
  - `themes`：AI 直觉主题（如 `classification` / `labeling` / `rules` 等）
  - `ai_concepts`：这一局想带出的 AI 概念，用简短中文短句
  - `skills`：能力标签（language / attention / logic / math / motor / emotion / social）
  - `setup`：开场准备说明，家长先读一遍
  - `steps`：按步骤的玩法引导，尽量简单直接
  - `adult_script`：家长可以直接照读的台词（口语、温柔、鼓励）
  - `variations`：可选，多一些「加难度 / 户外版」的点子
  - `safety`：安全提示（避免误吞、避免奔跑跌倒等）

> 注意：不要修改已有字段名。若要扩展新信息，建议只**新增字段**，并保持现有字段不变。

## 部署到 Vercel

1. 将整个项目提交到 Git 仓库（GitHub / GitLab 等）。
2. 打开 Vercel，点击「New Project」，选择对应仓库。
3. 保持默认设置：
   - Framework：Next.js
   - Build Command：`next build`（对应 `npm run build`）
   - Output Directory：`.next`
4. 点击 Deploy，构建完成后即可获得一个可分享的在线链接。

本项目不依赖任何后端数据库或环境变量，直接部署即可使用。

## 手动验收步骤（关键路径）

建议按以下流程手动点一遍页面进行验收：

1. 打开 `/` 首页：
   - 确认顶部导航始终可见（LayoutShell sticky header），Home 链接为激活状态。
   - 在「今日推荐玩法」中点击「换一批」（`data-testid="shuffle-recommendations"`），推荐卡片顺序或内容发生变化。
2. 在首页「快速找玩法」区块：
   - 看到包含 minutes/location/themes chips 的区域（`data-testid="quick-filters"`）。
   - 点击「去全部玩法」按钮（`data-testid="go-to-activities"`）跳转到 `/activities`。
3. 在 `/activities` 活动库：
   - 顶部看到搜索框 + 筛选 chips（`data-testid="filters-bar"` 及各子 testid）。
   - 只选 minutes=5 和 10，确认列表内仅有 5 或 10 分钟玩法；再叠加 location 和 themes，结果数量按预期收窄。
   - 在搜索框输入某个标题关键词，列表只保留命中的玩法；点击「清空筛选」（`data-testid="clear-filters"`）恢复全量。
4. 在 `/activities`：
   - 点击任意卡片主体进入详情页 `/activities/[id]`。
   - 点击卡片右下角收藏按钮，只切换收藏状态，不会跳转页面。
5. 在详情页 `/activities/[id]`：
   - 检查各区块是否存在并填充：`detail-title`、`detail-meta-chips`、`detail-ai-concepts`、`detail-materials`、`detail-steps`、`detail-adult-script`、`detail-variations`（若有）和 `detail-safety`。
   - 点击详情页的收藏按钮（`data-testid="detail-favorite-btn"`），返回 `/activities` 查看对应卡片收藏状态保持一致。
6. 刷新浏览器：
   - 确认收藏状态仍然保留（`localStorage` 持久化）。
7. 打开 `/favorites`：
   - 能看到刚才收藏的玩法卡片列表（`data-testid="favorites-grid"`）。
   - 点击「清空收藏」（`data-testid="clear-favorites"`）后列表变为空，再刷新页面仍为空。
8. 使用键盘 Tab：
   - 焦点能依次遍历导航链接、搜索框、筛选 chips、卡片和收藏按钮，可正常操作。
9. 打开浏览器控制台：
   - 页面切换和操作过程中，不出现 `window is not defined`、hydration mismatch 或未处理异常。

