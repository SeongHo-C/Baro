import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/modal';

const Header = (props) => {
  const [isToggle, setToggle] = useState(true);
  const [resize, setResize] = useState();
  const [modalOpen, setModalOpen] = useState(false);
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

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onLogin = () => {
    console.log('로그인');
  };

  return (
    <header className={styles.container}>
      <div className={styles.header}>
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
            <button
              className={styles.button}
              onClick={() => navigate('/rounge')}
            >
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
            <button className={styles.button} onClick={openModal}>
              SIGN IN
            </button>
            <Modal open={modalOpen} close={closeModal}>
              <div className={styles.modal}>
                <div className={styles.modalText}>
                  <span>아이디어 공유부터 팀빌딩까지</span>
                  <span>이곳에서 바로!</span>
                </div>
                <button className={styles.modalBtn} onClick={onLogin}>
                  <img src='../../images/google.png' alt='' />
                </button>
              </div>
            </Modal>
          </li>
        </ul>
        <button className={styles.toggle} onClick={toggleBtn}>
          <i className='fas fa-bars'></i>
          <span className={styles.toggleText}>menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
