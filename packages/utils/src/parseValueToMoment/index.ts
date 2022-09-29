import moment from 'moment';

type DateValue = moment.Moment | moment.Moment[] | string | string[] | number | number[];

const parseValueToMoment = (
  value: DateValue,
  formatter?: string,
): moment.Moment | moment.Moment[] | null | undefined => {
  if (Array.isArray(value)) {
    return (value as any[]).map((v) => parseValueToMoment(v, formatter) as moment.Moment);
  }
  if (typeof value === 'number') return moment(value);
  return moment(value, formatter);
};

export default parseValueToMoment;
