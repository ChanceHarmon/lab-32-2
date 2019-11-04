const io = require('socket.io-client');

const socket = io.connect('http://localhost:4000');

const useSocket = () => {
  const subscribe = (event, callback) => {
    socket.on(event, callback);
  };

  const publish = (event, payload) => {
    socket.emit(event, payload);
  };

  return [publish, subscribe];
};

export default useSocket;