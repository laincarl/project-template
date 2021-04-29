/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
const _self: Worker = self as any;
_self.onmessage = (e) => {
  _self.postMessage(`You said: ${e.data}`);
};
export {};
