import React, { useEffect, useState } from "react";
import { Test } from "./Test";

import { useCallback } from "./ReactHooks/which-hook";

export default function App() {
  const [num, updateNum] = useState(0);

  const count = useCallback(() => {
    console.log(num + 1);
  }, [num]);
  // useEffect(() => {
  //   debugger;
  //   console.log('test');

  // }, []);

  return (
    <div className="App">
      <button onClick={() => updateNum(num + 1)}>add</button>
      {/* {count} */}
      {/* <Test/> */}
    </div>
  );
}
