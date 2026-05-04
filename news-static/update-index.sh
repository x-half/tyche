#!/bin/bash
# 更新首页文章列表

STATIC_DIR="/home/tyche/news-static"
ARTICLES_DIR="$STATIC_DIR/articles"

# 获取所有文章日期（按日期倒序）
DATES=$(ls "$ARTICLES_DIR"/*.html 2>/dev/null | xargs -I {} basename {} .html | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' | sort -r)

if [ -z "$DATES" ]; then
    echo "No articles found"
    exit 1
fi

# 获取最新一期
LATEST_DATE=$(echo "$DATES" | head -1)
OLDER_DATES=$(echo "$DATES" | tail -n +2)

# 获取星期几
get_weekday() {
    local date=$1
    local weekday=$(date -d "$date" +%u)
    case $weekday in
        1) echo "周一" ;;
        2) echo "周二" ;;
        3) echo "周三" ;;
        4) echo "周四" ;;
        5) echo "周五" ;;
        6) echo "周六" ;;
        7) echo "周日" ;;
    esac
}

# 获取描述（从HTML文件的meta description中提取）
get_description() {
    local date=$1
    local file="$ARTICLES_DIR/$date.html"
    if [ -f "$file" ]; then
        grep -oP 'content="[^"]*"' "$file" | head -1 | sed 's/content="//;s/"$//'
    else
        echo "国际、AI、大模型 Agent 领域的今日要闻"
    fi
}

# 生成往期列表HTML
generate_archive_items() {
    local html=""
    local delay=0.3
    for date in $OLDER_DATES; do
        local month=$(echo "$date" | cut -d'-' -f2 | sed 's/^0//')
        local day=$(echo "$date" | cut -d'-' -f3 | sed 's/^0//')
        local weekday=$(get_weekday "$date")
        local desc=$(get_description "$date")
        
        html+="                <a href=\"/articles/$date.html\" class=\"archive-item\" style=\"animation-delay:${delay}s\">
                  <div class=\"archive-date-block\">
                    <span class=\"archive-date-month\">${month}月</span>
                    <span class=\"archive-date-day\">${day}日</span>
                    <span class=\"archive-weekday\">$weekday</span>
                  </div>
                  <div class=\"archive-content\">
                    <div class=\"archive-desc\">$desc</div>
                  </div>
                  <div class=\"archive-arrow\">→</div>
                </a>
"
        delay=$(echo "$delay + 0.05" | bc)
    done
    echo "$html"
}

# 获取最新一期的描述
LATEST_DESC=$(get_description "$LATEST_DATE")
LATEST_MONTH=$(echo "$LATEST_DATE" | cut -d'-' -f2 | sed 's/^0//')
LATEST_DAY=$(echo "$LATEST_DATE" | cut -d'-' -f3 | sed 's/^0//')
LATEST_WEEKDAY=$(get_weekday "$LATEST_DATE")

ARCHIVE_ITEMS=$(generate_archive_items)

# 生成首页HTML
cat > "$STATIC_DIR/index.html" << EOF
<!DOCTYPE html>
<html lang="zh" class="home-page">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>📮 国际・AI・Agent 日报</title>
  <meta name="description" content="每日国际、大模型、AI Agent 三个维度的要闻深度解读">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="site-header">
    <span class="site-name">📮 日报</span>
    <span class="site-date">每周一至周五 · 深度・克制・有认知增量</span>
  </header>

  <main class="home-layout page-enter">
    <div class="home-left">
      <section class="hero hero-enter">
        <div class="hero-eyebrow">
          <span class="hero-date-badge">Daily</span>
          <span class="hero-updated">每周一至周五更新</span>
        </div>
        <h1>国际・AI・Agent 日报</h1>
        <p class="hero-desc">
          每期聚焦三个板块各一条真正值得聊的新闻。不是快讯合集，是有"认知增量"的事件。有些读起来可能不舒服，但它发生了。
        </p>
      </section>

      <a href="/articles/$LATEST_DATE.html" class="latest-issue latest-enter">
        <div class="latest-issue-left">
          <div class="latest-issue-eyebrow">
            <span class="latest-issue-badge">$LATEST_DATE</span>
            <span class="latest-issue-weekday">$LATEST_WEEKDAY</span>
          </div>
          <div class="latest-issue-title">最新一期已发布</div>
          <div class="latest-issue-desc">$LATEST_DESC</div>
        </div>
        <div class="latest-issue-arrow">→</div>
      </a>

      <div class="home-slogan slogan-pc">天下大事，尽在 NEWS</div>
    </div>

    <div class="home-right archive-enter">
      <div class="archive-header">
        <span class="archive-header-text">往期</span>
      </div>
      <div class="archive-scroll">
$ARCHIVE_ITEMS      </div>
    </div>

    <div class="home-slogan slogan-mobile">天下大事，尽在 NEWS</div>
  </main>
  <script src="https://analytics.tyche.love/tracker.v2.js" defer></script>
</body>
</html>
EOF

echo "首页已更新，最新一期: $LATEST_DATE"
