import { defineExtension } from 'reactive-vscode'
import { ConfigurationTarget } from 'vscode'
import { config } from './config'
import { fetchAndUpdate } from './fetch'
import { logger } from './log'

const { activate, deactivate } = defineExtension(() => {
  fetchAndUpdate().then(() => {
    const updateAt = new Date().toISOString()
    logger.info('updateAt', updateAt)
    config.$update('updatedAt', updateAt, ConfigurationTarget.Global)
  })
})

export { activate, deactivate }
