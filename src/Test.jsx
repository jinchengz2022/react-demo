import React, { useEffect,  } from "react";

import { useState } from './z_useState'

export const Test = () => {
  const [num, updateNum] = useState(0);

  return (
    <div className="App">
      <div>111</div>
      <div onClick={() => {
        // debugger;
        updateNum((pre) => pre + 1)
      }}>{num}</div>
    </div>
  );
};
