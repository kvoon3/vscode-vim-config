import type { ModeMap } from './constants'
import type { Keybinding, VimConfig } from './types'
import { modeMap } from './constants'

export function generate(keybindings: (Keybinding | string)[]): VimConfig {
  const result: VimConfig = {}

  for (const item of keybindings) {
    const [mode, before, after, commands]
      = typeof item === 'string'
        ? parseStringKeybinding(item)
        : item

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

export function parseKeyString(keyStr: string): string[] {
  return keyStr.split('.')
}

export function parseCommandString(cmdStr: string): string[] {
  return cmdStr.slice(1).split(':').filter(Boolean)
}

export function parseStringKeybinding(keybinding: string): Keybinding {
  const parts = keybinding.trim().split(/\s+/)

  if (parts.length < 2) {
    throw new Error('Invalid keybinding format: must have at least mode and before')
  }

  const [mode, beforeStr, ...rest] = parts

  // Use single reduce to split commands and non-commands
  const { commandParts, nonCommandParts } = rest.reduce(
    (acc, part) => {
      if (isCommand(part)) {
        acc.commandParts.push(part)
      }
      else {
        acc.nonCommandParts.push(part)
      }
      return acc
    },
    { commandParts: [] as string[], nonCommandParts: [] as string[] },
  )

  const commands = commandParts.flatMap(cmd => parseCommandString(cmd))
  const afterStr = nonCommandParts[0] || ''

  const before = parseKeyString(beforeStr)
  const after = afterStr ? parseKeyString(afterStr) : []

  return [mode, before, after, commands]
}

export function isCommand(str: string): boolean {
  return str.startsWith(':')
}

export function isKey(str: string): boolean {
  return !isCommand(str) && str.length > 0
}
