"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { tokenStore } from "@/shared/api/tokenStore";

function Spinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export function AuthInitializer({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 포폴 모드: sessionStorage에 토큰 있으면 그대로 사용, 없으면 비로그인 상태
    // tokenStore는 모듈 초기화 시 sessionStorage에서 자동 복원됨
    void tokenStore.getToken();
    setTimeout(() => setReady(true), 0);
  }, []);

  if (!ready) return <Spinner />;

  return <>{children}</>;
}
