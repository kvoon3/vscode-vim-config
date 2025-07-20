import { objectEntries } from '@antfu/utils'
import { logger } from 'tsdown/index'
import { ConfigurationTarget, workspace } from 'vscode'
import { generate } from './generate'

export async function fetchLatset(): Promise<string[]> {
  const url = 'https://raw.githubusercontent.com/kvoon3/vscode-vim-config-updater/refs/heads/main/README.md'
  const md = await fetch(url).then(r => r.text())
  const json = (md.match(/```jsonc([\s\S]*?)```/) || [])[1] || ''
  return JSON.parse(json) as string[]
}

export async function fetchAndUpdate(): Promise<void[]> {
  const keybindings = await fetchLatset()

  const vimConfig = workspace.getConfiguration('vim')

  return Promise.all(
    objectEntries(generate(keybindings)).map(async ([key, config]) => {
      const [_, scopedKey] = key.split('.')
      return vimConfig
        .update(`${scopedKey}`, config, ConfigurationTarget.Global)
        .then(() => logger.info('update done:', key))
    }),
  )
}
