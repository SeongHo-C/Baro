import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailInfo from '../../components/detail_info/detail_info';
import DetailManage from '../../components/detail_manage/detail_manage';
import DetailResult from '../../components/detail_result/detail_result';
import { imageLookup } from '../../service/image_api';
import styles from './project_detail.module.css';

const ProjectDetail = ({ openModal }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [data, setData] = useState();
  const [like, setLike] = useState();
  const [image, setImage] = useState();

  const url = process.env.REACT_APP_URL;
  const id = useParams().id;

  const jwtToken = localStorage.getItem('jwtToken');
  const loginId = jwtToken && jwtDecode(jwtToken).sub;

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
        .then((res) => res.data)
        .then((data) => {
          const {
            like,
            summary: { likeCount },
            team,
          } = data;

          setData(data);
          setLike(like);
          setLikeCount(likeCount);
          imageLookup({ type: 'member', image: team[0].userProfileImage }).then(
            (image) => setImage(image)
          );
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

  const tab = ['정보', '결과물', '관리'];

  const tabMenu = {
    0: data && (
      <DetailInfo data={data} getData={getData} openModal={openModal} />
    ),
    1: <DetailResult />,
    2: <DetailManage data={data} getData={getData} />,
  };

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
      {data ? (
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.kind}>{data.summary.purpose}</span>
            <span className={styles.title}>{data.summary.title}</span>
            <div className={styles.leader}>
              <img
                className={styles.img}
                src={image ? image : '../../images/user.png'}
              ></img>
              <span className={styles.leaderInfo}>
                {data.summary.leaderNickname}
              </span>
            </div>

            <div className={styles.situationLike}>
              <span className={styles.situation}>{`${getState(
                data.summary.state
              )}`}</span>
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
          </header>
          <main className={styles.main}>
            <ul className={styles.tab}>
              {tab.map((v, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      if (data.summary.leaderId !== loginId && i === 2) {
                        alert('리더에게만 허락된 공간입니다.');
                        return;
                      }

                      if (data.summary.state !== 'E' && i === 1) {
                        alert('아직 완료된 프로젝트가 아닙니다.');
                        return;
                      }

                      onTab(i);
                    }}
                    className={
                      activeTab === i
                        ? `${styles.active}`
                        : `${styles.noActive}`
                    }
                  >
                    {(v === '관리' && data.summary.leaderId !== loginId) ||
                    (v === '결과물' && data.summary.state !== 'E') ? (
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
      ) : (
        <div style={{ height: '100vh' }}></div>
      )}
    </section>
  );
};

export default ProjectDetail;
