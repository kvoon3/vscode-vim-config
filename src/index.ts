import { defineExtension } from 'reactive-vscode'
import { ConfigurationTarget } from 'vscode'
import { config } from './config'
import { fetchAndUpdate } from './fetch'
import { logger } from './log'

const { activate, deactivate } = defineExtension(() => {
  const update = () => {
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
})

export { activate, deactivate }
