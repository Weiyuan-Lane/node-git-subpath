'use strict'

const exec = require('./exec')

exports.branchExists = function (branchName) {
  const branchOutput = exec(`git branch -a | egrep "remotes/origin/${branchName}"`)
  return branchOutput.status === 0 && branchOutput.message !== ''
}

exports.tagExists = function (tagName) {
  const tagOutput = exec(`git tag -l | egrep "${tagName}"`)
  return tagOutput.status === 0 && tagOutput.message !== ''
}

