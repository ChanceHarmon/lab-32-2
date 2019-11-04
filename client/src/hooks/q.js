const Q = require('@nmq/q/client');

const useQ = (q) => {
  const queue = new Q(q);

  const subscribe = (event, callback) => {
    queue.subscribe(event, (payload) => callback(payload));
  };

  const publish = (aQ, event, message) => {
    Q.publish(aQ, event, message);
  };

  return [publish, subscribe];
};

export default useQ;