"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  useEffect(() => {
    router.replace(`/courses/${courseId}`);
  }, [courseId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent" style={{ borderColor: "var(--color-primary)", borderTopColor: "transparent" }} />
    </div>
  );
}
