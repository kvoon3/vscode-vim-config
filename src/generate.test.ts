import { describe, expect, it } from 'vitest'
import { generate } from './generate'

describe('keybinding generate', () => {
  it('keybinding string to VSCode Vim config', () => {
    const keybindings: string[] = [
      'nnoremap <leader>.c.i :claude-code.runQuickFix',
      'nmap <c-w>.<c-l> <c-w>.l',
    ]

    expect(generate(keybindings)).toMatchInlineSnapshot(`
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
