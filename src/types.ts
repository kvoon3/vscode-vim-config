import type { ModeMap } from './constants'

export interface VimKeybinding {
  silent?: boolean
  before: string[]
  after?: string[]
  commands?: string[]
}

export type Keybinding = [string, string[], string[], string[]]

export type VimConfig = {
  [key in ModeMap[keyof ModeMap]]?: VimKeybinding[]
}
