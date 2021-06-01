import { useCallback, useMemo, useState } from 'react';

const WorkerDemo = () => {
  const [message, setMessage] = useState('');
  const worker = useMemo(() => {
    // TODO 目前不加webpack注释有问题，待探索
    const w = new Worker(new URL('../../workers/demo-worker.ts', import.meta.url), {
      name: 'demo-worker',
    /* webpackEntryOptions: { filename: "workers/[name].js" } */
    });
    w.onmessage = (e) => {
      setMessage(`${message}\n${e.data}`);
    };
    return w;
  }, []);

  const sendMessage = useCallback(() => {
    worker.postMessage('hello');
  }, []);
  return (
    <div>
      {message}
      <button type="button" onClick={sendMessage}>向worker发送消息</button>
    </div>
  );
};
export default WorkerDemo;
