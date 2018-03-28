#!/usr/local/bin/node

const slackStatus = require('./helpers')
const args = slackStatus.processArgs()

async function main() {
  if (Object.keys(args).includes('help')) {
    slackStatus.showHelp()
    process.exit(0)
  }

  if (Object.keys(args).includes('statuses')) {
    console.log("Available Statuses:\n")

    slackStatus.availableStatuses().forEach((status) => {
      console.log(status.name)
      console.log(`  ${status.emoji} ${status.text} - ${status.dnd}`)

      console.log()
    })

    process.exit(0)
  }
  
  if (!args.clear && !args.status) {
    console.error('You did not provide a status. It is required')
    process.exit(1)
  }
  
  if (args.clear || args.status === 'clear') {
    await slackStatus.clearStatus().then(() => {
      console.log('Cleared current Slack status and removed DND')
      process.exit(0)
    })
  }
  
  const status = slackStatus.statuses[args.status]
  
  if (!status) {
    console.error(`${args.status} does not appear to exist. Check your YAML file for its existence.`)
    process.exit(1)
  }
  
  await slackStatus.updateStatus(status).then((resp) => {
    console.log('Set your Slack status to:', status.emoji, status.text)
  
    if (status.dnd.enable) {
      console.log('Enabling DND for', status.dnd.num_minutes, 'minutes.')
    }
  })
}

main()