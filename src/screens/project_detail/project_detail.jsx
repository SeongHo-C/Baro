import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailInfo from '../../components/detail_info/detail_info';
import DetailManage from '../../components/detail_manage/detail_manage';
import styles from './project_detail.module.css';

const ProjectDetail = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState();
  const url = process.env.REACT_APP_URL;
  const id = useParams().id;

  const loginId = jwtDecode(localStorage.getItem('jwtToken')).sub;

  const onTab = (tabId) => {
    setActiveTab(tabId);
  };

  const tabMenu = {
    0: data && <DetailInfo data={data} />,
    1: <DetailManage data={data} />,
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

  const getData = async () => {
    try {
      axios.get(`${url}/project/${id}`).then((res) => setData(res.data));
    } catch (error) {
      console.log(error);
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
                  <i className='fa-regular fa-heart'></i>
                  <span className={styles.selectCnt}>
                    {data.summary.likeCount}
                  </span>
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
    </section>
  );
};

export default ProjectDetail;
