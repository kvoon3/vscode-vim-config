import { describe, expect, it } from 'vitest'
import { parseCommandString, parseKeyString, parseNameString } from './parse'

describe('parse', () => {
  it('parse key', () => {
    expect(parseKeyString('d.a.m')).toEqual(['d', 'a', 'm'])
    expect(parseCommandString(':workbench.action.navigateUp')).toBe('workbench.action.navigateUp')
    expect(parseNameString('@Change...>Word_Case')).toEqual(['Change...', 'Word Case'])
  })
})
