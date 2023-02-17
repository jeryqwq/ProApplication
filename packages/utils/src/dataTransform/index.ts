export type StandardDataType = {
  columnList: Array<{
    alias: string;
    name: string;
  }>;
  data: any[][];
};

export const transformList2Standard = (
  standardData: StandardDataType,
): Array<Record<string, any>> => {
  const { columnList, data } = standardData;
  const ret: Array<Record<string, any>> = [];
  console.log(data);
  data?.forEach((i) => {
    const temp: any = {};
    i.forEach((j, jdx) => {
      temp[columnList[jdx].alias] = j;
    });
    ret.push(temp);
  });
  return ret;
};
