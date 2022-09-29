import { createContext } from 'react';

export enum ActionType {
  'change'
}
export default function (state: FrameWorkProps, action: { data: FrameWorkProps; type: ActionType }) {
  const { data, type } = action;
  switch (type) {
    case ActionType.change:
      return data;
    default:
      break;
  }
  return data;
}

export const FrameWorkContent = createContext<{ data: FrameWorkProps; dispatch: React.Dispatch<{
  type: ActionType;
  data: FrameWorkProps;
}>;}>({} as any);
