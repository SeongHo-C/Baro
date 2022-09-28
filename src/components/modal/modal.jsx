import React from 'react';
import styles from './modal.module.css';

const Modal = ({ open, close, children }) => {
  return (
    <div
      className={
        open ? `${styles.openModal} ${styles.modal}` : `${styles.modal}`
      }
    >
      {open ? (
        <section className={styles.container}>
          <header className={styles.header}>
            <div className={styles.logo}>
              <span className={styles.icon}>B</span>
              <h1 className={styles.title}>바로</h1>
            </div>
            <button className={styles.closeBtn} onClick={close}>
              <i className='fa-regular fa-rectangle-xmark'></i>
            </button>
          </header>
          <main className={styles.main}>{children}</main>
          {/* <footer className={styles.footer}>
            <button className={styles.footerBtn} onClick={close}>
              close
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
