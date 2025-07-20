import { readFileSync, writeFileSync } from 'node:fs'
// @ts-expect-error type error
import { keybindings } from './keybindings.mjs'
import { generate } from './src/generate'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
pkg.contributes.configurationDefaults = generate(keybindings)
pkg.contributes.configuration.properties['vimConfig.keybindings'].default = keybindings

writeFileSync('./package.json', JSON.stringify(pkg, null, 2))
