import React from 'react';
import './style.less';

export default ({ color = ['white'], children }: {
  color: [string];
  // styles: React.CSSProperties;
  children: React.ReactDOM;
}) => {
  console.log(color);
  return (
    <div className="vis-decoration-area">
      { children }
    </div>);
};
