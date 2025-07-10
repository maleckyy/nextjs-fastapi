import { createThemeCookie, ThemeType } from "@/actions/themeActions"
import { useTheme } from "next-themes"

export function useManageTheme() {
  const { setTheme } = useTheme()

  const selectTheme = (value: ThemeType) => {
    createThemeCookie(value)
    setTheme(value)
  }

  return { selectTheme }
}