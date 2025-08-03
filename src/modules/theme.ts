const themesMap = Object.fromEntries(Object.entries(import.meta.glob('../styles/theme-*.css'))
  .map(([path, loadTheme]) => [path.match(/theme-([\w-]*)\.css$/)?.[1], loadTheme]),
) as Record<string, () => Promise<{ default: Record<string, string> }>>

export const availableThemes = Object.keys(themesMap)

export const loadedThemes: string[] = []

export async function loadThemeAsync(theme: string) {
  if (loadedThemes.includes(theme))
    return
  await themesMap[theme]()
  loadedThemes.push(theme)
}
