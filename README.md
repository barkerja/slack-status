# Slack-Status: CLI
Slack-Status is a basic nodejs CLI app that lets you define preset statuses. Currently, Slack does not provide this feature on a per-user basis; only 4 pre-defined statuses for the entire team.

If you're a Slack user that depends heavily on statuses and you spend a considerable amount of time in your terminal, this CLI app is for you!

**NOTE:** You must have NodeJS 6.0 or greater installed on your system to run this application.

## Examples
Set a status:
```
slack-status --status=coding
> Set your slack status to :terminal: {:coding, john} |> User.setStatus
> Enabling DND for 60 minutes.
```

Clear status:
```
slack-status --clear
> Cleared current Slack status and removed DND
```

See available statuses:
```
slack-status --statuses
> Available Statuses:

coding
  :terminal: {:coding, john} |> User.setStatus - DND enabled for 60 minutes.

doctor
  :doctor: Out of Office: Doctor Visit - No DND

late-lunch
  :fork_and_knife: Late Lunch - No DND

lunch
  :fries: Lunch - No DND

pomodoro
  :tomato: Pomodoro - DND enabled for 15 minutes.
```

---

### INSTALL
NPM:
	`npm install -g github.com/barkerja/slack-status`

YARN:
	`yarn global add github.com/barkerja/slack-status`

### CONFIGURE
1. You will first need to acquire a Slack access token. Head to [Legacy tokens | Slack](https://api.slack.com/custom-integrations/legacy-tokens) and generate one for the team you wish to use.
2. Acquire your Member ID (see: [Profile Example](http://share.johnbarker.in/qTNk)):
	1. In the team you will be using this, click on your profile.
	2. Select the dropdown arrow.
	3. Copy Member ID

Next, you will need to create and configure the YAML file. This should be located in your user's root directory.

Use the provided slack-status-example.yml as a template.

#### macOS
 `/Users/{username}/.slack-status.yml`

#### Windows
 `C:\Users\{username}\.slack-status.yml`