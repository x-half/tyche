"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNo = searchParams.get("orderNo");
  const courseId = searchParams.get("courseId");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    if (!orderNo) {
      setStatus("failed");
      return;
    }

    // 轮询订单状态（最多 5 次，间隔 2 秒）
    let attempts = 0;
    const maxAttempts = 5;

    const checkStatus = () => {
      attempts++;
      fetch(`/api/payment/status/${orderNo}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === "paid") {
            setStatus("success");
            // 2 秒后跳回课程页
            setTimeout(() => {
              if (courseId) {
                router.push(`/courses/${courseId}?enrolled=1`);
              } else {
                router.push("/profile/orders");
              }
            }, 2000);
          } else if (attempts < maxAttempts) {
            setTimeout(checkStatus, 2000);
          } else {
            setStatus("failed");
          }
        })
        .catch(() => {
          if (attempts < maxAttempts) {
            setTimeout(checkStatus, 2000);
          } else {
            setStatus("failed");
          }
        });
    };

    checkStatus();
  }, [orderNo, courseId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--background)" }}>
      <div className="w-full max-w-md rounded-2xl border p-8 text-center" style={{ background: "var(--color-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-lg)" }}>
        {status === "loading" && (
          <>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "var(--color-primary-soft)" }}>
              <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--color-primary)" }} />
            </div>
            <h1 className="text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>支付处理中...</h1>
            <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>请稍候，正在确认您的支付状态</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "var(--color-success-light)" }}>
              <CheckCircle className="h-8 w-8" style={{ color: "var(--color-success)" }} />
            </div>
            <h1 className="text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>支付成功！</h1>
            <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>
              {courseId ? "课程已解锁，正在跳转..." : "正在跳转到订单页面..."}
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "var(--color-error-light)" }}>
              <XCircle className="h-8 w-8" style={{ color: "var(--color-error)" }} />
            </div>
            <h1 className="text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>支付失败</h1>
            <p className="text-sm mb-6" style={{ color: "var(--foreground-secondary)" }}>支付过程中出现问题，请稍后重试</p>
            <button
              onClick={() => router.push(courseId ? `/courses/${courseId}` : "/courses")}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.01]"
              style={{ background: "var(--color-primary)", color: "#fff" }}
            >
              返回课程
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--color-primary)" }} />
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}
