import React, { useState } from 'react';
import styles from './Feedback.module.scss';

interface FeedbackProps {
  setOpen: (state: boolean) => void;
  sendHandler: (state: boolean) => void;
}

interface Data {
  value: string;
  valid: boolean;
  hasError: boolean;
  error: string;
}

const Feedback: React.FC<FeedbackProps> = ({ setOpen, sendHandler }) => {
  const [phone, SetPhone] = useState<Data>({
    value: '',
    valid: false,
    hasError: false,
    error: '',
  });
  const [name, SetName] = useState<Data>({
    value: '',
    valid: false,
    hasError: false,
    error: '',
  });
  const [message, SetMessage] = useState<Data>({
    value: '',
    valid: false,
    hasError: false,
    error: '',
  });

  const [isShow, setIsShow] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getNumbersValue = (value: string): string => {
    return value.replace(/\D/g, '');
  };

  const handlePhone = (value: string) => {
    let numbersValue = getNumbersValue(value);
    let formattedInputValue = '';

    if (!numbersValue) {
      SetPhone({ ...phone, valid: false, hasError: false, value: '' });
      return;
    }

    if (['7', '8'].includes(numbersValue[0])) {
      let firstSymbol = '+7';
      formattedInputValue = firstSymbol + ' ';

      if (numbersValue.length > 1) {
        formattedInputValue += '(' + numbersValue.substring(1, 4);
      }
      if (numbersValue.length >= 5) {
        formattedInputValue += ') ' + numbersValue.substring(4, 7);
      }
      if (numbersValue.length >= 8) {
        formattedInputValue += '-' + numbersValue.substring(7, 9);
      }
      if (numbersValue.length >= 10) {
        formattedInputValue += '-' + numbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = '+7 ' + numbersValue;
    }

    SetPhone({
      ...phone,
      value: formattedInputValue,
      valid: false,
      hasError: false,
    });
  };

  const inputPhoneKeyDow = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Backspace' && getNumbersValue(phone.value).length === 1) {
      SetPhone({ ...phone, value: '' });
    }
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const input = e.target.name;
    const value = e.currentTarget.value;
    const newData = { value: value, valid: false, hasError: false, error: '' };

    switch (input) {
      case 'phone':
        handlePhone(value);
        break;
      case 'name':
        SetName({ ...name, ...newData });
        break;
      case 'message':
        SetMessage({ ...message, ...newData });
        break;
      default:
        return;
    }
  };

  const postData = () => {
    setIsShow(false);
    setError(false);

    const requestBody = JSON.stringify({
      phone: phone.value.replace(/[^0-9+]/g, ''),
      name: name.value.trim(),
      message: message.value.trim(),
    });

    fetch('http:example.com', {
      method: 'POST',
      body: requestBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsShow(true);
      })
      .catch((err) => {
        console.log('error', err.message);
        setIsShow(true);
        setError(true);
      });

    setTimeout(() => setIsShow(false), 3000);
    setTimeout(() => sendHandler(true), 4000);
    setTimeout(() => setOpen(false), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleValidate();

    postData();
  };

  const handleValidate = () => {
    const regName = /^[a-zA]+$/;
    const regMessage = /^[0-9a-z_]+$/;
    const regPhone = /\+7\ \(\d{3}\)\ \d{3}-\d{2}-\d{2}/;
    const emptyInputError = 'This field must not be empty';
    const wrongPhoneFormat = 'Only format +7 (999) 999-99-99';
    const wrongName = 'Only uppercase or lowercase letters';
    const wrongMessage = 'Only uppercase or lowercase letters and numbers';

    if (phone.value) {
      if (!regPhone.test(String(phone.value))) {
        SetPhone({
          ...phone,
          valid: false,
          hasError: true,
          error: wrongPhoneFormat,
        });
      } else {
        SetPhone({ ...phone, valid: true, error: '' });
      }
    }
    if (!phone.value) {
      SetPhone({
        ...phone,
        valid: false,
        hasError: true,
        error: emptyInputError,
      });
    }

    if (!name.value.trim()) {
      SetName({
        ...name,
        valid: false,
        hasError: true,
        error: emptyInputError,
      });
    } else {
      if (name.value) {
        if (!regName.test(String(name.value.trim()))) {
          SetName({ ...name, valid: false, hasError: true, error: wrongName });
        } else {
          SetName({ ...name, valid: true, error: '' });
        }
      }
    }

    if (!message.value.trim()) {
      SetMessage({
        ...message,
        valid: false,
        hasError: true,
        error: emptyInputError,
      });
    } else {
      if (!regMessage.test(String(message.value.trim()))) {
        SetMessage({
          ...message,
          valid: false,
          hasError: true,
          error: wrongMessage,
        });
      } else {
        SetMessage({ ...message, valid: true, error: '' });
      }
    }
  };

  return (
    <div className={styles.layout}>
      {isShow && (
        <div className={`${styles.toast} ${error ? styles.toast__error : ''}`}>
          {error ? 'Server Error' : 'Your feedback send'}
        </div>
      )}
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
                onKeyDown={(e) => inputPhoneKeyDow(e)}
                className={`${styles.input} ${phone.hasError ? styles.input__error : ''} ${
                  phone.valid && !phone.hasError ? styles.input__valid : ''
                }`}
                type="tel"
                name="phone"
                placeholder="+7 (999) 999-99-99"
                value={phone.value}
                maxLength={18}
              />
            </label>
            {phone.error && phone.hasError && <p className={styles.error}>{phone.error}</p>}
          </div>
          <div className={styles.group}>
            <label htmlFor="name">
              <p className={styles.text}>Your Name:</p>
              <input
                onChange={(e) => handleChangeInput(e)}
                className={`${styles.input} ${name.hasError ? styles.input__error : ''} ${
                  name.valid && !name.hasError ? styles.input__valid : ''
                }`}
                type="text"
                name="name"
                placeholder="Enter your name"
                value={name.value}
              />
            </label>
            {name.error && name.hasError && <p className={styles.error}>{name.error}</p>}
          </div>
          <div className={styles.group}>
            <p className={styles.text}>Your Message:</p>
            <textarea
              onChange={(e) => handleChangeInput(e)}
              className={`${styles.input} ${styles.area} ${
                message.hasError ? styles.input__error : ''
              } ${message.valid && !message.hasError ? styles.input__valid : ''}`}
              placeholder="Enter your message here..."
              name="message"
              value={message.value}
            />
            {message.error && message.hasError && <p className={styles.error}>{message.error}</p>}
          </div>
        </div>
        <input
          onClick={handleSubmit}
          className={styles.btn_submit}
          type="submit"
          value={'Send Feedback'}
        ></input>
      </form>
    </div>
  );
};

export default Feedback;
