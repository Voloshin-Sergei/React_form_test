import React, { useState } from 'react';
import styles from './Feedback.module.scss';

interface FeedbackProps {
  setOpen: (state: boolean) => void;
}

const Feedback: React.FC<FeedbackProps> = ({ setOpen }) => {
  const [phone, SetPhone] = useState<string>('');
  const [phoneError, SetPhoneError] = useState<string>('');
  const [phoneDirty, SetPhoneDirty] = useState<boolean>(false);

  const [name, SetName] = useState<string>('');
  const [nameError, SetNameError] = useState<string>('');
  const [nameDirty, SetNameDirty] = useState<boolean>(false);

  const [message, SetMessage] = useState<string>('');
  const [messageError, SetMessageError] = useState<string>('');
  const [messageDirty, SetMessageDirty] = useState<boolean>(false);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const name = e.target.name;
    const value = e.currentTarget.value;

    switch (name) {
      case 'phone':
        SetPhoneDirty(false);
        SetPhoneError('');
        SetPhone(value);
        break;
      case 'name':
        SetNameDirty(false);
        SetNameError('');
        SetName(value);
        break;
      case 'message':
        SetMessageDirty(false);
        SetMessageError('');
        SetMessage(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleError();

    console.log(JSON.stringify({ phone: phone.replace(/[^0-9+]/g, ''), name, message }));
  };

  const handleError = () => {
    const regText = /^[a-zA]+$/;
    const regPhone = /\+7\ \(\d{3}\)\ \d{3}-\d{2}-\d{2}/;

    if (phone) {
      if (!regPhone.test(String(phone))) {
        SetPhoneDirty(true);
        SetPhoneError('Only format +7 (999) 999-99-99');
      } else {
        SetPhoneError('');
      }
    }

    if (!phone) {
      SetPhoneDirty(true);
      SetPhoneError('This field must not be empty');
    }

    if (name) {
      if (!regText.test(String(name).toLowerCase())) {
        SetNameDirty(true);
        SetNameError('Only uppercase or lowercase letters');
      } else {
        SetNameError('');
      }
    }

    if (!name) {
      SetNameDirty(true);
      SetNameError('This field must not be empty');
    }

    if (message) {
      if (!regText.test(String(message).toLowerCase())) {
        SetMessageDirty(true);
        SetMessageError('Only uppercase or lowercase letters');
      } else {
        SetMessageError('');
      }
    }

    if (!message) {
      SetMessageDirty(true);
      SetMessageError('This field must not be empty');
    }
  };

  return (
    <div className={styles.layout}>
      <form onSubmit={handleSubmit} className={styles.modal}>
        <button onClick={() => setOpen(false)} className={styles.btn_close}>
          &#10006;
        </button>
        <h2 className={styles.title}>Give Your Feedback</h2>
        <div className={styles.content}>
          <div className={styles.group}>
            <label htmlFor="phone">
              <p className={styles.text}>Your Phone:</p>
              <input
                onChange={(e) => handleChangeInput(e)}
                className={`${styles.input} ${phoneDirty ? styles.input__error : ''}`}
                type="tel"
                name="phone"
                placeholder="+7 (999) 999-99-99"
                value={phone}
              />
            </label>
            {phoneError && phoneDirty && <p className={styles.error}>{phoneError}</p>}
          </div>
          <div className={styles.group}>
            <label htmlFor="name">
              <p className={styles.text}>Your Name:</p>
              <input
                onChange={(e) => handleChangeInput(e)}
                className={`${styles.input} ${nameDirty ? styles.input__error : ''}`}
                type="text"
                name="name"
                placeholder="Enter your name"
                value={name}
              />
            </label>
            {nameError && nameDirty && <p className={styles.error}>{nameError}</p>}
          </div>
          <div className={styles.group}>
            <p className={styles.text}>Your Message:</p>
            <textarea
              onChange={(e) => handleChangeInput(e)}
              className={`${styles.input} ${styles.area} ${
                messageDirty ? styles.input__error : ''
              }`}
              placeholder="Enter your message here..."
              name="message"
              value={message}
            />
            {messageError && messageDirty && <p className={styles.error}>{messageError}</p>}
          </div>
        </div>
        <button onClick={handleSubmit} className={styles.btn_submit} type="submit">
          Send Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
