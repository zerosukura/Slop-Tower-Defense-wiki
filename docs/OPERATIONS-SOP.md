# Slop Tower Defense Wiki 运维与增长 SOP

这份文档记录已经验证过的流程。后续更新优先遵守这里的检查顺序，避免因为一次改动同时影响抓取、部署和广告。

## 1. 关键词研究

不要只看一个工具或搜索结果页就建站。每个候选词至少完成：

1. Similarweb Keyword Generator：记录近 28 天量、平均量、趋势、竞争页面和意图。
2. Google Trends：确认关键词确实有 Roblox/游戏语境，并检查最近趋势，而不是只看短期尖峰。
3. Google 搜索：检查结果页是否已有强竞品、官方页面、同名无关主题，以及是否存在明显的 wiki/代码搜索意图。
4. 记录结论：搜索词、验证日期、来源、风险、建站建议和优先级。

不要因为词看起来相关就直接进入开发；Similarweb 和 Trends 都无法验证时，标记为待验证。

## 2. 域名与部署

- 生产 canonical 域名只保留一个，本项目当前是 `https://slop-tower-defense.wiki`。
- `www` 只做 301 跳转，不把 `www` 单独提交给 GSC。
- `NEXT_PUBLIC_SITE_URL` 必须使用生产域名，不能使用 localhost。
- Netlify 的 Git 部署保持连接 `main`，推送后观察最新 Production deploy。
- 环境变量修改不会自动改变旧构建；保存变量后必须重新部署，必要时使用 `Clear cache and deploy site`。
- 生产站点切换后，先验证首页、一个文章页、robots.txt、sitemap.xml，再做 SEO 提交。

## 3. 广告接入

当前广告变量：

```text
NEXT_PUBLIC_ADSTERRA_BANNER_320X50
NEXT_PUBLIC_ADSTERRA_BANNER_300X250
```

当前广告布局：

- 320×50：首页和文章页顶部粘性广告，可关闭。
- 300×250：文章页内容后的矩形广告。
- 每个广告位使用独立 key，通过 iframe 隔离，不共享全局 `atOptions`。
- 广告模板必须使用广告平台实际提供的脚本域名；本项目当前是 `highrevenueformat.com`。
- 广告 key 只放 Netlify 环境变量，不提交到 Git；本地测试使用被忽略的 `.env.local`。
- `ads.txt` 没有广告平台授权记录时保持不伪造，拿到真实 publisher 行后再添加。

上线后必须检查页面源代码中是否出现：

- 首页：`/ads/banner-320x50.html?key=...`
- 文章页：320×50 和 `/ads/banner-300x250.html?key=...`

## 4. GSC 与抓取检查

上线或迁移后检查：

```text
https://slop-tower-defense.wiki/robots.txt
https://slop-tower-defense.wiki/sitemap.xml
```

预期结果：

- sitemap HTTP 200，内容类型为 `application/xml`。
- XML 能解析，URL 唯一，全部使用 canonical 域名。
- robots.txt 包含正确的 Sitemap 行。
- GSC 显示“无法抓取”时，先用浏览器或 curl 验证线上真实响应；如果当前已恢复，通常是历史失败记录，重新提交 sitemap，不要立刻改 URL 结构。
- 站点短暂不可用不会自动等于排名丢失；先恢复可访问性，再观察 GSC 重新抓取。

## 5. 发布前后检查清单

```text
[ ] bun run build 通过
[ ] 首页 HTTP 200
[ ] 主要文章页 HTTP 200
[ ] robots.txt HTTP 200
[ ] sitemap.xml HTTP 200 且 XML 可解析
[ ] canonical 和 JSON-LD 存在
[ ] 广告 iframe 尺寸、key、脚本域名正确
[ ] Netlify 最新部署为 Published
[ ] GSC sitemap 已成功读取
```

## 6. 维护原则

- 这个站已经证明关键词选择比页面能否及时显示更关键；不要因为短期数据波动频繁改页面结构。
- 不要同时改域名、canonical、广告布局和内容；一次只改一个变量，方便定位问题。
- 广告刚接入时先观察 24 小时和 3–7 天，不按几个小时的收入线性外推。
- 每次维护只做必要改动，先检查生产结果，再提交新的 SEO 或广告配置。
