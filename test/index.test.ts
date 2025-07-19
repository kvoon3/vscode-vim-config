import type { Keybinding } from '../src/utils'
import { describe, expect, it } from 'vitest'
import { toVimKeybinding } from '../src/utils'

describe('should', () => {
  it('exported', () => {
    const keybindings: Keybinding[] = [
      ['nnoremap', ['<leader>', 'c', 'i'], [], ['claude-code.runQuickFix']],
      ['nmap', ['<c-w>', '<c-l>'], ['<c-w>', 'l'], []],
      // ['', [], [], []],
    ]

    expect(toVimKeybinding(keybindings)).toMatchInlineSnapshot(`
      {
        "vim.normalModeKeyBindings": [
          {
            "after": [
              "<c-w>",
              "l",
            ],
            "before": [
              "<c-w>",
              "<c-l>",
            ],
            "commands": [],
            "silent": false,
          },
        ],
        "vim.normalModeKeyBindingsNonRecursive": [
          {
            "after": [],
            "before": [
              "<leader>",
              "c",
              "i",
            ],
            "commands": [
              "claude-code.runQuickFix",
            ],
            "silent": false,
          },
        ],
      }
    `)
  })
})
