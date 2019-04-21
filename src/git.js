'use strict'

const exec = require('./exec')

exports.branchExists = function (branchName) {
  const branchOutput = exec(`git branch -a | egrep "remotes/origin/${branchName}"`)
  return branchOutput.status === 0 && branchOutput.message !== ''
}

exports.tagExists = function (branchName) {
  const tagOutput = exec(`git branch -a | egrep "remotes/origin/${branchName}"`)
  return tagOutput.status === 0 && tagOutput.message !== ''
}

