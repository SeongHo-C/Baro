import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
  const [isToggle, setToggle] = useState(true);
  const [resize, setResize] = useState();
  const navigate = useNavigate();

  const handleResize = debounce(() => {
    setResize(window.innerWidth);
  }, 1000);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleBtn = () => {
    setToggle(!isToggle);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.icon}>B</span>
        <button onClick={() => navigate('/')}>
          <h1 className={styles.title}>바로</h1>
        </button>
      </div>
      <ul
        className={styles.menu}
        style={{ display: isToggle || resize > 992 ? 'flex' : 'none' }}
      >
        <li>
          <button
            className={styles.button}
            onClick={() => navigate('/project')}
          >
            프로젝트
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={() => navigate('/rounge')}>
            라운지
          </button>
        </li>
        <li>
          <button
            className={styles.button}
            onClick={() => navigate('/ranking')}
          >
            랭킹
          </button>
        </li>
        <li>
          <button className={styles.button}>SIGN IN</button>
        </li>
      </ul>
      <button className={styles.toggle} onClick={toggleBtn}>
        <i className='fas fa-bars'></i>
        <span className={styles.toggleText}>menu</span>
      </button>
    </header>
  );
};

export default Header;
