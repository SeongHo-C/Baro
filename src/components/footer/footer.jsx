import React from 'react';
import styles from './footer.module.css';

const Footer = (props) => {
  return (
    <footer className={styles.container}>
      <div className={styles.footer}>
        <i className='fa-regular fa-copyright'></i>
        <span> Copyright 인하공업전문대학 이성호, 박인우</span>
      </div>
    </footer>
  );
};
export default Footer;
