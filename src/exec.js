'use strict'

const exec = require('child_process').execSync

/** Execute a command and returns result in the following format:
 * 
 * {
 *   status: number,
 *   message: string,
 * }
 */
module.exports  = function (execCommand){
  let commandResult, result

  try {
    commandResult = exec(execCommand)
    result = {
      status: 0,
      message: commandResult.toString(),
    }
  } catch (e) {
    result = {
      status: e.status,
      message: e.message,
    }
  }

  return result
}