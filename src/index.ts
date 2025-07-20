import { defineExtension, watch } from 'reactive-vscode'
import { ConfigurationTarget } from 'vscode'
import { config } from './config'
import { fetchAndUpdate, updateSettings } from './fetch'
import { generate } from './generate'
import { logger } from './log'

const { activate, deactivate } = defineExtension(() => {
  const update = () => {
    if (!config.enableAutoUpdater) {
      logger.info('disabled')
      return
    }

    fetchAndUpdate().then(() => {
      config.$update('updatedAt', Date.now(), ConfigurationTarget.Global)
    })
  }

  if (!config.updatedAt)
    update()
  else
    logger.info('has init')

  if (config.updatedAt && Date.now() - config.updatedAt >= 60_000)
    update()
  else
    logger.info('not expired')

  watch(() => config.keybindings, (value) => {
    logger.info('keybindings update triggered')
    updateSettings(generate(value))
  })
})

export { activate, deactivate }
