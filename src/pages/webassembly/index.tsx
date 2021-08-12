import { useState, useEffect } from 'react';

const WebAssembly = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // @ts-ignore
    import('./dist/module.optimized.wasm').then((module) => {
      const { add } = module;
      setCount(add(1, 2));
    });
  }, []);
  return (
    <div>
      {count}
    </div>
  );
};
export default WebAssembly;
