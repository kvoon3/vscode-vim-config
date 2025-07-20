export const modeMap = {
  nmap: 'vim.normalModeKeyBindings',
  nnoremap: 'vim.normalModeKeyBindingsNonRecursive',
  imap: 'vim.insertModeKeyBindings',
  inoremap: 'vim.insertModeKeyBindingsNonRecursive',
  vmap: 'vim.visualModeKeyBindings',
  vnoremap: 'vim.visualModeKeyBindingsNonRecursive',
} as const

export const reverseModeMap = {
  'vim.normalModeKeyBindings': 'nmap',
  'vim.normalModeKeyBindingsNonRecursive': 'nnoremap',
  'vim.insertModeKeyBindings': 'imap',
  'vim.insertModeKeyBindingsNonRecursive': 'inoremap',
  'vim.visualModeKeyBindings': 'vmap',
  'vim.visualModeKeyBindingsNonRecursive': 'vnoremap',
} as const

export type ModeMap = typeof modeMap
