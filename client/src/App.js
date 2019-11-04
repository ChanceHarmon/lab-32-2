/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import useForm from './hooks/form';
import useSocket from './hooks/socket';
import useQ from './hooks/q';

const App = (props) => {
  const handlePublish = (values) => {
    queuePublish('deeds', 'work', values);
    socketPublish('words', values);
  };

  const { handleChange, handleSubmit, values } = useForm(handlePublish);
  const [queueMessage, setQueueMessage] = useState({});
  const [socketMessage, setSocketMessage] = useState({});
  const [socketPublish, socketSubscribe] = useSocket();
  const [queuePublish, queueSubscribe] = useQ('deeds');

  useEffect(() => {
    queueSubscribe('work', (message) => {
      setQueueMessage(message);
    });

    socketSubscribe('incoming', (message) => {
      setSocketMessage(message);
    });
  }, []);


  return (
    <>
      <pre>Form Values: {JSON.stringify(values)}</pre>
      <pre>Queue Values: {JSON.stringify(queueMessage)}</pre>
      <pre>Socket Values: {JSON.stringify(socketMessage)}</pre>
      <form onSubmit={handleSubmit}>
        <input name='firstName' placeholder="First Name" onChange={handleChange} />
        <input name='lastName' placeholder="Last Name" onChange={handleChange} />
        <button>Save</button>
      </form>
    </>
  );
};

export default App;