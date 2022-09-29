declare interface TableNormalData<K> {
  rowData: K[];
  total: number;
  [string]: {
    alias: string;
    [string]: any;
  };
}
