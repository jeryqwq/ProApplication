export const strNumSize = (tempNum: string | number) => {
  const stringNum = tempNum.toString();
  const index = stringNum.indexOf('.');
  let newNum = stringNum;
  if (index !== -1) {
    newNum = stringNum.substring(0, index);
  }
  return newNum.length;
};
export const isToFixedFun = (currentNum: number, dividend: number) => {
  const numStr = String(currentNum);
  return currentNum < dividend && !numStr.includes('.');
};
// 数字转化为带单位
export const unitConvert = (num: number, length = 0) => {
  if (num !== undefined) {
    const moneyUnits = ['', '万', '亿', '万亿'];
    const dividend = 10000;
    let currentNum = Number(num);
    const isToFixed = isToFixedFun(currentNum, dividend); // 小于10000不带小数点的数字 不转换小数点
    if (isNaN(currentNum)) {
      return { num: '', unit: '' };
    }
    // 转换数字
    let currentUnit = moneyUnits[0];
    // 转换单位
    for (let i = 0; i < 4; i++) {
      currentUnit = moneyUnits[i];
      if (strNumSize(currentNum) < 5) {
        break;
      }
      currentNum /= dividend;
    }
    return {
      // eslint-disable-next-line no-nested-ternary
      num:
        num === 0
          ? currentNum
          : isToFixed
          ? currentNum
          : currentNum.toFixed(length),
      unit: currentUnit,
    };
  }
  return false;
};
export const isNumber = (val: any) => {
  return typeof val !== 'boolean' && typeof +val === 'number' && !isNaN(val);
};
// 数字格式化处理
export const numberFormat = (num: string | undefined, useGrouping = true) => {
  let formatNum = num;
  if (num && isNumber(num) && useGrouping) {
    const splitNum = num.toString().split('.');
    // 整数每3位加","处理
    if (splitNum) {
      const integer = splitNum[0]
        ?.split('')
        ?.reverse()
        ?.join('')
        ?.match(/(\d{1,3})/g)
        ?.join(',')
        ?.split('')
        ?.reverse()
        ?.join('');
      formatNum = splitNum[1] ? `${integer}.${splitNum[1]}` : integer;
    }
  }
  return formatNum;
};
