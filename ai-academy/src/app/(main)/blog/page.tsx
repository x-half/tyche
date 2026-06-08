"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, BookOpen } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background-secondary)" }}>
      <div className="border-b" style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--foreground)" }}>博客</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--foreground-secondary)" }}>AI技术动态和学习资源</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12 text-sm" style={{ color: "var(--foreground-muted)" }}>加载中...</div>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border p-5 card-hover transition-all"
                style={{ background: "var(--color-card)", borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {post.category && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ background: "var(--color-hover)", color: "var(--foreground-secondary)" }}>{post.category}</span>
                  )}
                  <span className="text-xs" style={{ color: "var(--foreground-muted)" }}>{new Date(post.publishedAt || post.createdAt).toLocaleDateString("zh-CN")}</span>
                </div>
                <h2 className="font-medium mb-1" style={{ color: "var(--foreground)" }}>{post.title}</h2>
                {post.excerpt && <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>{post.excerpt}</p>}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: "var(--color-hover)" }}>
              <BookOpen className="h-7 w-7" style={{ color: "var(--foreground-muted)" }} />
            </div>
            <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>暂无文章</p>
          </div>
        )}
      </div>
    </div>
  );
}
