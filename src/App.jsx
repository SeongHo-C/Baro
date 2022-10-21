import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Join from './screens/join/join';
import Main from './screens/main/main';
import Oauth from './screens/oauth/oauth';
import Project from './screens/project/project';
import Ranking from './screens/ranking/ranking';
import Rounge from './screens/rounge/rounge';
import { add } from './slices/loginSlice';
import jwtDecode from 'jwt-decode';
import ProjectCreate from './screens/project_create/project_create';
import ProjectDetail from './screens/project_detail/project_detail';
import Profile from './screens/profile/profile';
import Mypage from './screens/mypage/mypage';
import { onRefresh } from './service/Login';
import styles from './app.module.css';
import Modal from './components/modal/modal';

const App = (props) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const loginMaintain = () => {
    if (localStorage.getItem('jwtToken')) {
      const userInfo = jwtDecode(localStorage.getItem('jwtToken'));

      onRefresh();
      dispatch(add(userInfo));
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    loginMaintain();
  });

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' exact element={<Main />} />
          <Route path='/main' element={<Main />} />
          <Route
            path='/detail/:id'
            element={<ProjectDetail openModal={openModal} />}
          />
          <Route path='/project' element={<Project />} />
          <Route path='/rounge' element={<Rounge openModal={openModal} />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/join' element={<Join />} />
          <Route path='/oauth/saving' element={<Oauth />} />
          <Route path='/project/create' element={<ProjectCreate />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/mypage' element={<Mypage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
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
    </div>
  );
};

export default App;
