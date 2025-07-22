import { useSidebar } from "@/components/ui/sidebar";

export function useIconSize(): number {
  const { isMobile } = useSidebar()
  return isMobile === true ? 18 : 22
}