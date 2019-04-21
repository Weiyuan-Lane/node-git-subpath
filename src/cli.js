'use strict'

const program = require('commander')
program
  .version('0.0.6')
  .option('-p, --path <value>', 'Target path to submit')
  .option('-m, --module <value>', 'Module name')
  .option('-t, --tag <value>', 'Tag version of module')

module.exports = program