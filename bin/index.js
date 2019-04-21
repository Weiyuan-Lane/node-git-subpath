#!/usr/bin/env node

'use strict'

const logger = require('../src/logger')
const exec = require('../src/exec')
const cli = require('../src/cli')

// Step 0: Check for presence of compulsory arguments
cli.parse(process.argv)
logger.log('0. Checking for required process arguments')
if (!cli.path || !cli.module || !cli.tag ) {
  logger.error(`Invalid command: ${cli.args.join(' ')}\nSee --help for a list of available commands.`)
}

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

