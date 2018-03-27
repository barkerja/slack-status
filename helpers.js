const fs = require('fs')
const yaml = require('js-yaml')
const { WebClient } = require('@slack/client')

let configFile

const USER_PATH = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
const YAML_PATH = `${USER_PATH}/.slack-status.yml`

try {
  configFile = yaml.safeLoad(fs.readFileSync(YAML_PATH, 'utf8'))
} catch(error) {
  console.error('There was an error loading your YAML config.')
  console.error('Make sure', YAML_PATH, 'exists.')
  
  process.exit(1)
}

const { statuses, token, user } = configFile
const web = new WebClient(token)

module.exports = {
  statuses,

  availableStatuses() {
    return Object.keys(statuses).map((status) => {
      const currentStatus = statuses[status]

      return { 
        name: status,
        emoji: currentStatus.emoji,
        text: currentStatus.text,
        dnd: currentStatus.dnd.enable ? `DND enabled for ${currentStatus.dnd.num_minutes} minutes.` : 'No DND'
      }
    })
  },

  clearStatus() {
    return module.exports.updateStatus({ emoji: '', text: '', dnd: false })
  },

  processArgs() {
    const args = {}

    const [,, ...systemArgs] = process.argv

    for (const arg of systemArgs) {
      if (!arg.startsWith('--')) continue

      const [key, value] = arg.split('=')
      args[key.replace('--', '')] = value ? value : true
    }

    return args
  },

  updateStatus({ emoji: status_emoji, text: status_text, dnd }) {
    const profile = { status_emoji, status_text }
  
    return Promise.all([
      web.users.profile.set({ user, profile }),
      module.exports.setDND(dnd.enable, dnd.num_minutes)
    ])
  },

  setDND(dnd = false, num_minutes = 60) {
    if (!dnd) {
      return web.dnd.endDnd({ user })
    }

    return web.dnd.setSnooze({ user, num_minutes })
  },

  showHelp() {
    console.log('Slack-Status')
    console.log(' --status=your_status\tSets your status to a predefined status.')
    console.log(' --help\t\t\tThis help message.')
  }
}