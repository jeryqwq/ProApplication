import { RoutersType } from '@/layouts/base';
import { useState } from 'react';

const memoHistory = () => {
  const [memoHistory, setMemoHistory] = useState<RoutersType[]>([]);
  return {
    memoHistory,
    setMemoHistory,
    remove(key: string) {
      const idx = memoHistory.findIndex((i) => i.key === key);
      idx >= 0 &&
        setMemoHistory([...(memoHistory.splice(idx, 1) && memoHistory)]);
    },
    push(item: RoutersType) {
      const isExist = memoHistory.find((i) => i.key === item.key);
      if (!isExist) {
        if (memoHistory.length >= 20) {
          // 超过20退出最开始的一个
          setMemoHistory([...(memoHistory.shift(), memoHistory)]);
        } else {
          setMemoHistory(memoHistory.concat(item));
        }
      }
    },
  };
};

export default memoHistory;
