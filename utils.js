const { BadRequestError } = require("./expressError");

/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  let result = [];
  for (let strNum of strNums) {
    result.push(Number(strNum));
  }
  return result;

  // const result = strNums.map((strNum) => Number(strNum));
  // if (result) {
  //   return result;
  // } else {
  //   throw new BadRequestError();
  // }
}

module.exports = { convertStrNums };
