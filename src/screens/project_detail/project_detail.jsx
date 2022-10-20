import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailInfo from '../../components/detail_info/detail_info';
import DetailManage from '../../components/detail_manage/detail_manage';
import Modal from '../../components/modal/modal';
import styles from './project_detail.module.css';

const ProjectDetail = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState();
  const url = process.env.REACT_APP_URL;
  const id = useParams().id;
  const [like, setLike] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const jwtToken = localStorage.getItem('jwtToken');
  const loginId = jwtToken && jwtDecode(jwtToken).sub;

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onTab = (tabId) => {
    setActiveTab(tabId);
  };

  const getData = async () => {
    try {
      await axios
        .get(`${url}/project/${id}`, {
          params: {
            memberId: loginId || '',
          },
        })
        .then((res) => {
          setData(res.data);
          setLike(res.data.like);
          setLikeCount(res.data.summary.likeCount);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      await axios
        .post(`${url}/like`, {
          projectId: id,
        })
        .then(() => {
          setLike(!like);
          setLikeCount(likeCount + 1);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisLike = async () => {
    try {
      await axios
        .delete(`${url}/unlike`, {
          data: {
            projectId: id,
          },
        })
        .then(() => {
          setLike(!like);
          setLikeCount(likeCount - 1);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const tabMenu = {
    0: data && (
      <DetailInfo data={data} getData={getData} openModal={openModal} />
    ),
    1: <DetailManage data={data} getData={getData} />,
  };

  const tab = ['정보', '관리'];

  const getState = (state) => {
    switch (state) {
      case 'R':
        return '모집중';
      case 'C':
        return '진행중';
      case 'E':
        return '완료';
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className={styles.detail}>
      {data && (
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.kind}>{data.summary.purpose}</span>
            <span className={styles.title}>{data.summary.title}</span>
            <div className={styles.leaderSelect}>
              <div className={styles.leader}>
                <i className='fa-regular fa-user'></i>
                <span className={styles.leaderInfo}>
                  {data.summary.leaderNickname}
                </span>
              </div>
              <div className={styles.cnt}>
                <div className={styles.heart}>
                  {like ? (
                    <button
                      className={styles.heartBtn}
                      style={{ color: 'red' }}
                      onClick={handleDisLike}
                    >
                      <i className='fa-regular fa-heart'></i>
                    </button>
                  ) : (
                    <button
                      className={styles.heartBtn}
                      onClick={() => {
                        if (loginId) handleLike();
                        else openModal();
                      }}
                    >
                      <i className='fa-regular fa-heart'></i>
                    </button>
                  )}

                  <span className={styles.selectCnt}>{likeCount}</span>
                </div>
                <div>
                  <i className='fa-regular fa-eye'></i>
                  <span className={styles.selectCnt}>
                    {data.summary.viewCount}
                  </span>
                </div>
              </div>
            </div>
            <span className={styles.situation}>{`${getState(
              data.summary.state
            )}`}</span>
          </header>
          <main className={styles.main}>
            <ul className={styles.tab}>
              {tab.map((v, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      if (data.summary.leaderId !== loginId) {
                        alert('리더에게만 허락된 공간입니다.');
                      } else {
                        onTab(i);
                      }
                    }}
                    className={
                      activeTab === i
                        ? `${styles.active}`
                        : `${styles.noActive}`
                    }
                  >
                    {v === '관리' ? (
                      <span>
                        <i className='fa-solid fa-lock'></i>
                        <span className={styles.tabManage}>{v}</span>
                      </span>
                    ) : (
                      <span>{v}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className={styles.contents}>{tabMenu[activeTab]}</div>
          </main>
        </div>
      )}
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
    </section>
  );
};

export default ProjectDetail;
