'use strict'

function log() {
  console.log("\n=========================\n")
  console.log(...arguments)
}

exports.log = log

exports.error = function () {
  log(...arguments)
  process.exit(1)
}