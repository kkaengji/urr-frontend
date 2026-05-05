import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/logout";
import { tokenStore } from "@/shared/api/tokenStore";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return async () => {
    try {
      await logout();
    } catch {
      // 서버 로그아웃 실패해도 로컬 상태는 항상 클리어
    }
    tokenStore.clearToken();
    queryClient.clear();
    router.replace("/landing");
  };
}
