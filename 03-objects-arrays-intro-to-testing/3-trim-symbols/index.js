/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) { return '';}
  if (size === undefined) { return string;}
  if (string === '') { return string;}

  let previousChar = '';
  let count = 0;
  let newString = '';

  for (const char of string) {
    if (char === previousChar) {
      count++;
    }
    else {
      count = 0;
    }
    if (count < size) {
      newString += char;
    }
    previousChar = char;
  }
  return newString;
}
