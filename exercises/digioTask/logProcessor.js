/**
 * Code By: Kevin He
 */
import readline from 'readline';
import fs from 'fs';

/**
 * processLog: function returns promise on resolve returns count of URL and IP addresses
 * @param filePath
 * @returns 
 */
export async function processLogByLine(filePath) {
  try {
    const fileStream = fs.createReadStream(filePath);
    const readInterface = readline.createInterface({
      input: fileStream
    })
    let ipCount = {};
    let urlCount = {};
    for await(const line of readInterface) {
      const lineArray = line.split(' ')
      if (!(ipCount[lineArray[0]])) {
        let ipObj = {
          count: 1
        }
        ipCount[lineArray[0]] = ipObj
      } else {
        ipCount[lineArray[0]].count += 1
      }

      // counts and pushes IP to result
      if (!(urlCount[lineArray[6]])) {
        let urlObj = {
          count: 1
        }
        urlCount[lineArray[6]] = urlObj
      } else {
        urlCount[lineArray[6]].count += 1
      }
    }
    return {
      ipCount,
      urlCount
    }
  } catch(err) {
    console.error('processing log error: ', error)
  }

}

/**
 * Function returns length of unique keys given object
 * @param obj 
 * @returns 
 */
export function getUniqueCount(obj) {
  return Object.keys(obj).length
}

/**
 * Function returns top X number of param based on count of obj
 * @param obj 
 * @param top 
 * @returns 
 */
export function getTopActivity(obj, top) {
  if (!obj) {
    throw new Error('getTopActivity: obj passed is invalid')
  }
  if (!(top > 0)) {
    throw new Error('getTopActivity: top must be greater 0')
  }

  // sort object by count descending order
  let sortedDesc = Object.keys(obj).sort((a, b) => {
    return obj[b].count - obj[a].count
  }).map(key => {
    return {
      key,
      count: obj[key].count
    }
  })

  if (top >= Object.keys(obj).length) {
    return sortedDesc
  }

  // retrieve the top ranking objects if they are the same count then ranking is equal
  let result = []
  let currentTop = 1
  let index = 0
  let previous = -1
  while (currentTop <= top && index < sortedDesc.length) {
    result.push(sortedDesc[index])
    if (previous !== sortedDesc[index].count) {
      currentTop += 1
      previous = sortedDesc[index].count
    }
    index += 1
  }
  return result
}

/**
 * Function returns first X number of param based on count of obj
 * @param obj 
 * @param top 
 * @returns 
 */
export function getTopNumber(obj, top) {
  let sortedDesc = Object.keys(obj).sort((a, b) => {
    return obj[b].count - obj[a].count
  }).map(key => {
    return {
      key,
      count: obj[key].count
    }
  })
  return sortedDesc.slice(0, top)
}