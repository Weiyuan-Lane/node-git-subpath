'use strict'

const program = require('commander')
program
  .version('0.0.1')
  .option('-p, --path', 'Target path to submit')
  .option('-m, --module', 'Module name')
  .option('-t, --tag', 'Tag version of module')

module.exports = program