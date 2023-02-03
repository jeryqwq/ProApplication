import React, { useRef } from 'react';
import {MicroApp} from '@umijs/max';

function Dash() {
  const microAppRef = useRef<any>();
 
  // 执行此方法时，更新子应用
  const updateMicroApp = () => {
    microAppRef?.current?.update();
  };
  return (
    <div>
      <MicroApp name={'dash'} basename='/subApp/dash' ref={microAppRef} autoSetLoading/>
    </div>
  );
}

export default Dash;
