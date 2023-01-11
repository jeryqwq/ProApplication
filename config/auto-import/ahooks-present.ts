import * as ahooks from 'ahooks';

export const AhooksPresent = Object.keys(ahooks).map((i) => {
  return [i, `_${i}`];
});
