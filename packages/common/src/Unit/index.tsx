// @ts-nocheck
import { isNumber, numberFormat, unitConvert } from '@vis/utils';
import { CSSProperties } from 'react';

declare interface UnitType {
  data: number | string;
  show?: boolean;
  numberConversion?: boolean;
  useGrouping?: boolean;
  pointLength?: number;
  numStyle?: CSSProperties;
  unitStyle?: CSSProperties;
}

function Unit({
  data,
  show,
  numberConversion,
  pointLength,
  useGrouping = false,
  numStyle,
  unitStyle,
}: UnitType) {
  let numberDom = <span>{numberFormat(data, useGrouping)}</span>;
  if (numberConversion && isNumber(data)) {
    const transed = unitConvert(data as number, pointLength);
    const num = transed?.num;
    const unit = transed?.unit;
    const formatNum = numberFormat(num, useGrouping);
    numberDom = (
      <>
        <span>{formatNum}</span>
        <span style={unitStyle}>{unit}</span>
      </>
    );
  }
  const dom = <div style={numStyle}>{numberDom}</div>;
  return show ? dom : null;
}

export default Unit;
