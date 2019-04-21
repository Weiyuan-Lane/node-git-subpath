#!/usr/bin/env node

'use strict'

const logger = require('../src/logger')
const exec = require('../src/exec')
const cli = require('../src/cli')
const git = require('../src/git')
const TAG_STAGING_BRANCH = 'git-subpath'

// Step 0: Check for presence of compulsory arguments
cli.parse(process.argv)
logger.log('0. Checking for required process arguments')
if (!cli.path || !cli.module || !cli.tag ) {
  logger.error(`Invalid command: ${cli.args.join(' ')}\nSee --help for a list of available commands.`)
}

// Get the required fields
const targetPath = cli.path
const targetModule = cli.module
const targetTag = cli.tag
const targetFullTag = `${targetTag}-${targetModule}`

// Step 1: Check if git is supported by the machine's cli 
logger.log('1. Checking for git binary')
const gitPresence = exec('which git')
if (gitPresence.status !== 0) {
  logger.error('git binary is not install. Please install it before using this package')
}

// Step 2: Fetch changes from origin
logger.log('2. Fetch from origin')
const gitFetchOutput = exec('git fetch -p origin')
if (gitFetchOutput.status !== 0) {
  logger.error(`git fetch failed for the following reason(s): \n${gitFetchOutput.message}`)
}

// Step 3: Fetch tag changes
logger.log('3. Fetch tag version changes')
const gitPullTagOutput = exec('git pull --tag')
if (gitPullTagOutput.status !== 0) {
  logger.error(`git pull failed for the following reason(s): \n${gitPullTagOutput.message}`)
}

// Step 4: Check if tag exists
logger.log('4. Ensure target tag does not exist yet')
if (git.tagExists(targetFullTag)) {
  logger.error(`git tag for module "${targetModule}" at tag "${targetTag}" exists`)
}

// Step 5: Get local git config
logger.log('5. Getting local git config')
const gitGetRemoteOutput = exec('git remote get-url origin')
if (gitGetRemoteOutput.status !== 0) {
  logger.error(`git remote failed for the following reason(s): \n${gitGetRemoteOutput.message}`)
}
const gitRemoteUrl = gitGetRemoteOutput.message

// Step 6: Changing context to the directory and building the package
logger.log('6. Building module tag context in --path')
const targetPathOutput = exec(`cd ${targetPath}`)
if (targetPathOutput.status !== 0) {
  logger.error(`cd failed for the following reason(s): \n${targetPathOutput.message}`)
}
const gitInitOutput = exec(`cd ${targetPath} && git init`)
if (gitInitOutput.status !== 0) {
  logger.error(`git init failed for the following reason(s): \n${gitInitOutput.message}`)
}
const gitAddOriginOutput = exec(`cd ${targetPath} && git remote add origin ${gitRemoteUrl}`)
if (gitAddOriginOutput.status !== 0) {
  logger.error(`git remote failed for the following reason(s): \n${gitAddOriginOutput.message}`)
}

// Step 7. Push version to github
logger.log('7. Push module and tagged version to github')
const gitPushModuleOutput = exec(`cd ${targetPath} && git checkout -b ${TAG_STAGING_BRANCH} && git add --all && git commit -m ${targetTag} && git push -f --set-upstream origin ${TAG_STAGING_BRANCH} && git tag ${targetFullTag} && git push --tag`)
if (gitPushModuleOutput.status !== 0) {
  logger.error(`push module via git failed for the following reason(s): \n${gitPushModuleOutput.message}`)
}

// Step 8. Cleanup
logger.log('8. Remove created git repository and return to original path')
const rmGit = exec(`cd ${targetPath} && rm -rf .git`)
if (rmGit.status !== 0) {
  logger.error(`rm hidden git dir failed for the following reason(s): \n${rmGit.message}`)
}

logger.log('Example install paths (switch out protocol as long as the remote + tag works for you) - \n',
           `HTTPS install: "npm install --save git+https://${gitRemoteUrl}#${targetFullTag}"\n`,
           `SSH   install: "npm install --save git+ssh://${gitRemoteUrl}#${targetFullTag}"`)
