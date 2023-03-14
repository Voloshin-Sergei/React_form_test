import React, { useState, useEffect } from 'react';
import Feedback from './components/Feedback/Feedback';
import styles from './App.module.scss';

import db from './db.json';

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [dataMessage, setDataMessage] = useState<string>('');

  const showModal = (state: boolean): void => {
    setOpen(state);
    setIsSend(false);
  };

  const sendHandler = (state: boolean): void => {
    setIsSend(state);
  };

  useEffect(() => {
    const data = JSON.stringify(db.message);
    setDataMessage(data);
  }, []);

  return (
    <div className={styles.content}>
      <button onClick={() => showModal(true)} className={styles.btn}>
        Add feedback
      </button>
      {open && <Feedback setOpen={setOpen} sendHandler={sendHandler} />}
      {isSend && <h2 className={styles.message}>{dataMessage}</h2>}
    </div>
  );
}

export default App;
