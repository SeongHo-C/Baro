import React, { useEffect, useRef, useState } from 'react';
import styles from './header.module.css';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../../slices/loginSlice';
import jwtDecode from 'jwt-decode';

const Header = (props) => {
  const [isToggle, setToggle] = useState(true);
  const [resize, setResize] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropDownRef = useRef(null);

  const isUser = useSelector((state) => state.user.isAuthenticated);
  const token = localStorage.getItem('jwtToken');
  const id = token ? jwtDecode(token).sub : '';

  const handleResize = debounce(() => {
    setResize(window.innerWidth);
  }, 1000);

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

  const onLogout = () => {
    localStorage.clear();
    dispatch(remove());
    navigate('/');
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          {isUser ? (
            <li>
              <button
                className={styles.button}
                onClick={() => navigate('/project/create')}
              >
                프로젝트 생성
              </button>
            </li>
          ) : (
            ''
          )}
          {!isUser ? (
            <li>
              <button className={styles.button} onClick={openModal}>
                SIGN IN
              </button>
              {modalOpen && (
                <Modal open={modalOpen} close={closeModal}>
                  <div className={styles.modal}>
                    <div className={styles.modalText}>
                      <span>아이디어 공유부터 팀빌딩까지</span>
                      <span>이곳에서 바로!</span>
                    </div>
                    <a href='http://bestinwoo.hopto.org:8080/oauth2/authorization/google'>
                      <img src='../../images/google.png' alt='' />
                    </a>
                  </div>
                </Modal>
              )}
            </li>
          ) : (
            <div ref={dropDownRef}>
              <button
                className={`${styles.button} ${styles.profile}`}
                onClick={() => {
                  setLogoutOpen(!logoutOpen);
                }}
              >
                <i className='fa-regular fa-user'></i>
              </button>
              <ul
                className={
                  logoutOpen
                    ? `${styles.dropDownMenu} ${styles.active}`
                    : `${styles.dropDownMenu}`
                }
              >
                <li
                  onClick={() => {
                    navigate('/mypage');
                    setLogoutOpen(!logoutOpen);
                  }}
                >
                  <i className='fa-solid fa-house-user'></i>
                  <span className={styles.dropDownTxt}>마이페이지</span>
                </li>
                <li
                  onClick={() => {
                    navigate(`/profile/${id}`);
                    setLogoutOpen(!logoutOpen);
                  }}
                >
                  <i className='fa-solid fa-address-card'></i>
                  <span className={styles.dropDownTxt}>프로필</span>
                </li>
                <li onClick={onLogout}>
                  <span>로그아웃</span>
                </li>
              </ul>
            </div>
          )}
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
