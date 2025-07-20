export const modeMap = {
  nmap: 'vim.normalModeKeyBindings',
  nnoremap: 'vim.normalModeKeyBindingsNonRecursive',
  imap: 'vim.insertModeKeyBindings',
  inoremap: 'vim.insertModeKeyBindingsNonRecursive',
  vmap: 'vim.visualModeKeyBindings',
  vnoremap: 'vim.visualModeKeyBindingsNonRecursive',
} as const

export type ModeMap = typeof modeMap
