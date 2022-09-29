import React from 'react';

function Layouts({ children }) {
  return (
    <div style={{ border: 'solid 1px red' }}>
      {children}
    </div>
  );
}

export default Layouts;
