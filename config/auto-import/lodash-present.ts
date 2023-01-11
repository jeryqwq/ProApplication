import * as lodash from 'lodash';
// console.log(
//   'all',
//   Object.keys(all).map((i) => {
//     return [i, `__${i}`];
//   }),
// );
export const lodashPresent = Object.keys(lodash).map((i) => {
  return [i, `__${i}`]
})
