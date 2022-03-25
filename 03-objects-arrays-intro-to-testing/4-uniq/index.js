/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
import index from "../../01-intro/1-sum";

export function uniq(arr) {
  return [...new Set(arr)];
}

// Another solution:
// export function uniq(arr) {
//   const result = [];
//   arr.forEach(item => {
//     if (result.indexOf(item) < 0)
//     {result.push(item);}
//   });
//   return result;
// }


