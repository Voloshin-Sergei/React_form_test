import React, { useState } from 'react';
import Feedback from './components/Feedback/Feedback';
import styles from './App.module.scss';

function App() {
  const [open, setOpen] = useState<boolean>(false);

  const showModal = (state: boolean): void => {
    setOpen(state);
  };

  return (
    <div className={styles.content}>
      <button onClick={() => showModal(true)} className={styles.btn}>
        Add feedback
      </button>
      {open && <Feedback setOpen={setOpen} />}
    </div>
  );
}

export default App;
