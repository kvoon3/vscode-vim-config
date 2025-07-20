import type { VimConfig } from './types'
import { objectEntries } from '@antfu/utils'
import { ConfigurationTarget, workspace } from 'vscode'
import { generate } from './generate'
import { logger } from './log'

export async function fetchLatset(): Promise<string[]> {
  const url = 'https://raw.githubusercontent.com/kvoon3/vscode-vim-config/refs/heads/main/README.md'
  const md = await fetch(url)
    .then(r => r.text())
    .catch((err) => {
      logger.error('err', err)
      return ''
    })

  const content = (md.match(/```jsonc([\s\S]*?)```/) || [])[1] || ''
  const json: string[] = JSON.parse(content)
  return json.filter(i => !i.startsWith('//'))
}

export async function updateSettings(config: VimConfig) {
  const settings = workspace.getConfiguration('vim')
  return Promise.all(
    objectEntries(config).map(async ([key, config]) => {
      const [_, scopedKey] = key.split('.')
      return settings
        .update(`${scopedKey}`, config, ConfigurationTarget.Global)
        .then(() => logger.info('update done:', key))
    }),
  )
}

export async function fetchAndUpdate(): Promise<void[]> {
  const keybindings = await fetchLatset()

  return updateSettings(generate(keybindings))
}
