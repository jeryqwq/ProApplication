import dayjs, { Dayjs } from 'dayjs';

type DateValue = Dayjs | Dayjs[] | string | string[] | number | number[];

const parseValueToMoment = (
  value: DateValue,
  formatter?: string,
): Dayjs | Dayjs[] | null | undefined => {
  if (Array.isArray(value)) {
    return (value as any[]).map(
      (v) => parseValueToMoment(v, formatter) as Dayjs,
    );
  }
  if (typeof value === 'number') return dayjs(value);
  return dayjs(value, formatter);
};

export default parseValueToMoment;
