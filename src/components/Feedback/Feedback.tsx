import React from 'react';
import styles from './Feedback.module.scss';

interface FeedbackProps {
  setOpen: (state: boolean) => void;
}

const Feedback: React.FC<FeedbackProps> = ({ setOpen }) => {
  return (
    <div className={styles.layout}>
      <form className={styles.modal}>
        <button onClick={() => setOpen(false)} className={styles.btn_close}>
          &#10006;
        </button>
        <h2 className={styles.title}>Give Your Feedback</h2>
        <div className={styles.content}>
          <div className={styles.group}>
            <label htmlFor="phone">
              <p className={styles.text}>Your Phone:</p>
              <input
                className={styles.input}
                type="tel"
                name="phone"
                placeholder="+7 (999) 999-99-99"
              />
            </label>
            <p className={styles.error}>This field must not be empty</p>
          </div>
          <div className={styles.group}>
            <label htmlFor="name">
              <p className={styles.text}>Your Name:</p>
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Enter your name"
              />
            </label>
            <p className={styles.error}>This field must not be empty</p>
          </div>
          <div className={styles.group}>
            <p className={styles.text}>Your Message:</p>
            <textarea
              className={`${styles.input} ${styles.area}`}
              placeholder="Enter your message here..."
            />
            <p className={styles.error}>This field must not be empty</p>
          </div>
        </div>
        <button className={styles.btn_submit} type="submit">
          Send Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
