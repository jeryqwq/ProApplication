declare interface SingCompConfig {
  [string]: {
    alias: string;
    [string]: any;
  };
}

declare interface StandardData {
  columnList: Array<{
    alias: string;
    name: string;
  }>;
  data: any[][];
}

declare type SettingComp = ({ comp, onChange }: { comp: CompItem; onChange: (_: CompItem) => void}) => any;
declare interface ViewProps { comp: CompItem; emit: (item: Record<string, any>, index: number) => void }
