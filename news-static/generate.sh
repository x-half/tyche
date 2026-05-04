#!/bin/bash
# 生成静态HTML页面

STATIC_DIR="/home/tyche/news-static"
ARTICLES_DIR="/home/tyche/news-site/app/articles"

# 获取所有文章日期
DATES=$(ls "$ARTICLES_DIR" | grep -E "^[0-9]{4}-[0-9]{2}-[0-9]{2}$" | sort)

# 获取最新一期
LATEST_DATE=$(echo "$DATES" | tail -1)

# 获取描述的函数
get_description() {
    local date=$1
    local file="$ARTICLES_DIR/$date/page.tsx"
    if [ -f "$file" ]; then
        grep -oP "description:\s*'[^']+'" "$file" | head -1 | sed "s/description: '//;s/'$//"
    else
        echo "国际、AI、大模型 Agent 领域的今日要闻"
    fi
}

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

# 生成主页
generate_index() {
    local articles_html=""
    local first=true
    
    for date in $(echo "$DATES" | tac); do
        local month=$(echo "$date" | cut -d'-' -f2 | sed 's/^0//')
        local day=$(echo "$date" | cut -d'-' -f3 | sed 's/^0//')
        local weekday=$(get_weekday "$date")
        local desc=$(get_description "$date")
        
        if [ "$first" = true ]; then
            articles_html+="
        <a href=\"/articles/$date\" class=\"latest-issue latest-enter\">
          <div class=\"latest-issue-left\">
            <div class=\"latest-issue-eyebrow\">
              <span class=\"latest-issue-badge\">$date</span>
              <span class=\"latest-issue-weekday\">$weekday</span>
            </div>
            <div class=\"latest-issue-title\">最新一期已发布</div>
            <div class=\"latest-issue-desc\">$desc</div>
          </div>
          <div class=\"latest-issue-arrow\">→</div>
        </a>"
            first=false
        else
            articles_html+="
                <a href=\"/articles/$date\" class=\"archive-item archive-item-enter\">
                  <div class=\"archive-date-block\">
                    <span class=\"archive-date-month\">${month}月</span>
                    <span class=\"archive-date-day\">$day</span>
                    <span class=\"archive-weekday\">$weekday</span>
                  </div>
                  <div class=\"archive-content\">
                    <div class=\"archive-desc\">$desc</div>
                  </div>
                  <div class=\"archive-arrow\">→</div>
                </a>"
        fi
    done
    
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
      $articles_html
      <div class="home-slogan slogan-pc">天下大事，尽在 NEWS</div>
    </div>

    <div class="home-right archive-enter">
      <div class="archive-header">
        <span class="archive-header-text">往期</span>
      </div>
      <div class="archive-scroll">
        <!-- 往期列表会在JS中动态生成 -->
      </div>
    </div>

    <div class="home-slogan slogan-mobile">天下大事，尽在 NEWS</div>
  </main>
  <script src="https://analytics.tyche.love/tracker.v2.js" defer></script>
</body>
</html>
EOF
    echo "Generated index.html"
}

# 生成文章页面
generate_article() {
    local date=$1
    local file="$ARTICLES_DIR/$date/page.tsx"
    local output_dir="$STATIC_DIR/articles/$date"
    local weekday=$(get_weekday "$date")
    
    mkdir -p "$output_dir"
    
    # 从tsx文件中提取内容
    local title="📮 $date · 国际・AI・Agent 日报"
    local desc=$(get_description "$date")
    
    # 提取编者按
    local editor_note=$(grep -oP '编者按：</strong>[^<]+' "$file" | sed 's/编者按：<strong>//')
    
    # 提取各个section的内容
    local sections=""
    local section_num=0
    local section_titles=("国际" "大模型" "AI Agent")
    local section_ens=("International" "Large Language Models" "AI Agent")
    
    # 简单方式：直接复制整个article内容
    # 这里我们用一个更简单的方法，直接生成包含所有内容的HTML
    
    cat > "$output_dir/index.html" << EOF
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title</title>
  <meta name="description" content="$desc">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="site-header">
    <a href="/" class="site-name">📮 日报</a>
    <a href="/" style="font-size: 13px; color: #aaa; text-decoration: none;">← 返回目录</a>
  </header>

  <main class="article-container">
    <section class="article-hero">
      <div class="article-eyebrow">
        <span class="article-date-badge">$date</span>
        <span class="article-weekday">$weekday</span>
      </div>
      <h1>国际・AI・Agent 日报</h1>
      <div class="article-note">
        <strong>编者按：</strong>$editor_note
      </div>
    </section>

    <!-- 内容将通过JS从原始页面提取或直接嵌入 -->
    <div id="article-content"></div>

    <footer class="article-footer">
      📮 国际・AI・Agent 日报 · $date · 编发于同日 10:00
    </footer>
  </main>
  <script src="https://analytics.tyche.love/tracker.v2.js" defer></script>
</body>
</html>
EOF
    echo "Generated articles/$date/index.html"
}

# 生成主页
generate_index

# 生成所有文章页面
for date in $DATES; do
    generate_article "$date"
done

echo "Done! Generated $(echo "$DATES" | wc -l) article pages"
