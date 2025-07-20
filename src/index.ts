import { defineExtension } from 'reactive-vscode'
import { ConfigurationTarget } from 'vscode'
import { config } from './config'
import { fetchAndUpdate } from './fetch'

const { activate, deactivate } = defineExtension(() => {
  fetchAndUpdate().then(() => {
    config.$update('updatedAt', new Date().toISOString(), ConfigurationTarget.Global)
  })
})

export { activate, deactivate }
