import type { ModeMap } from './constants'
import type { Keybinding, VimConfig, VimKeybinding } from './types'
import { modeMap } from './constants'
import { parseStringKeybinding } from './parse'

export function generate(keybindings: (Keybinding | string)[]): VimConfig {
  const result: VimConfig = {}

  for (const item of keybindings) {
    const [mode, before, after, commands, names, silent]
      = typeof item === 'string'
        ? parseStringKeybinding(item)
        : item

    const target = modeMap[mode as keyof ModeMap]
    if (!target)
      continue

    if (!result[target])
      result[target] = []

    const config: VimKeybinding = {
      before,
    }

    if (after.length)
      config.after = after

    if (commands.length)
      config.commands = commands

    if (names.length)
      config.names = names

    if (silent)
      config.silent = silent

    result[target].push(config)
  }

  return result
}
