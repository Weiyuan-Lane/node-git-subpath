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
  let result

  try {
    const commandResult = exec(execCommand)
    const commandResultStr = commandResult.toString()
    const cleanResultStr = commandResultStr.replace(/\n$/g, '');
    result = {
      status: 0,
      message: cleanResultStr,
    }
  } catch (e) {
    result = {
      status: e.status,
      message: e.message,
    }
  }

  return result
}