export const modeMap = {
  nmap: 'vim.normalModeKeyBindings',
  nnoremap: 'vim.normalModeKeyBindingsNonRecursive',
  imap: 'vim.insertModeKeyBindings',
  inoremap: 'vim.insertModeKeyBindingsNonRecursive',
  vmap: 'vim.visualModeKeyBindings',
  vnoremap: 'vim.visualModeKeyBindingsNonRecursive',
} as const

export function toVimKeybinding(keybindings: Keybinding[]): Record<ModeMap[keyof ModeMap], VimKeybinding[]> {
  const result: Record<string, VimKeybinding[]> = {}

  for (const [mode, before, after, commands] of keybindings) {
    const target = modeMap[mode as keyof ModeMap]
    if (!target)
      continue

    if (!result[target]) {
      result[target] = []
    }

    result[target].push({
      before,
      silent: false,
      after,
      commands,
    })
  }

  return result
}

export interface VimKeybinding {
  silent?: boolean
  before: string[]
  after?: string[]
  commands?: string[]
}

export type ModeMap = typeof modeMap

export type Keybinding = [string, string[], string[], string[]]
