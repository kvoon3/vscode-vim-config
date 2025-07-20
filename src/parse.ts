import type { Keybinding } from './types'

export function parseStringKeybinding(keybinding: string): Keybinding {
  const parts = keybinding.trim().split(/\s+/)

  if (parts.length < 2) {
    throw new Error('Invalid keybinding format: must have at least mode and before')
  }

  const [mode, beforeStr, ...rest] = parts

  const before = parseKeyString(beforeStr)

  const { commands, after, names, silent } = rest.reduce(
    (acc, part) => {
      if (isCommand(part)) {
        acc.commands.push(parseCommandString(part))
      }
      else if (isNames(part)) {
        acc.names.push(...parseNameString(part))
      }
      else if (isArg(part)) {
        if (['-s', '--silent'].includes(part))
          acc.silent = true
      }
      else if (isKey(part)) {
        acc.after.push(...parseKeyString(part))
      }

      return acc
    },
    {
      commands: [] as string[],
      after: [] as string[],
      names: [] as string[],
      silent: false,
    },
  )

  return [mode, before, after, commands, names, silent]
}

export function parseKeyString(keyStr: string): string[] {
  return keyStr.split('.')
}

export function parseCommandString(cmdStr: string): string {
  return cmdStr.slice(1)
}

export function parseNameString(cmdStr: string): string[] {
  return cmdStr.slice(1)?.replaceAll('_', ' ')?.split('>').filter(Boolean)
}
export function isNames(str: string): boolean {
  return str.startsWith('@')
}export function isCommand(str: string): boolean {
  return str.startsWith(':')
}
export function isArg(str: string): boolean {
  return str.startsWith('-')
}
export function isKey(str: string): boolean {
  return str.length > 0
}

