import fs from 'node:fs'
import { keybindings } from './keybindings.mjs'

const today = new Date().toISOString()

fs.writeFileSync('README.md', fs.readFileSync('README.md', 'utf-8')
  .replace(/```json([\s\S]*?)```/, () => {
    return `\`\`\`jsonc
${JSON.stringify([`// ${today}`, ...keybindings], null, 2)}
\`\`\``.trim()
  }), 'utf-8')
