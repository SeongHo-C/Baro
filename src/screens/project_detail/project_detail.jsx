import React, { useState } from 'react';
import DetailInfo from '../../components/detail_info/detail_info';
import DetailManage from '../../components/detail_manage/detail_manage';
import styles from './project_detail.module.css';

const ProjectDetail = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const onTab = (tabId) => {
    setActiveTab(tabId);
  };

  const tabMenu = {
    0: <DetailInfo />,
    1: <DetailManage />,
  };

  const tab = ['정보', '관리'];

  return (
    <section className={styles.detail}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.kind}>사이드 프로젝트</span>
          <span className={styles.title}>
            [인하공업전문대학] 아이디어 공유 및 팀빌딩 서비스
          </span>
          <div className={styles.leaderSelect}>
            <div className={styles.leader}>
              <i className='fa-solid fa-user'></i>
              <span className={styles.leaderInfo}>lee1234</span>
            </div>
            <div className={styles.cnt}>
              <div className={styles.heart}>
                <i className='fa-regular fa-heart'></i>
                <span className={styles.selectCnt}>14</span>
              </div>
              <div>
                <i className='fa-regular fa-eye'></i>
                <span className={styles.selectCnt}>20</span>
              </div>
            </div>
          </div>
          <span className={styles.situation}>모집중</span>
        </header>
        <main className={styles.main}>
          <ul className={styles.tab}>
            {tab.map((v, i) => {
              return (
                <li
                  key={i}
                  onClick={() => onTab(i)}
                  className={
                    activeTab === i ? `${styles.active}` : `${styles.noActive}`
                  }
                >
                  {v}
                </li>
              );
            })}
          </ul>
          <div className={styles.contents}>{tabMenu[activeTab]}</div>
        </main>
      </div>
    </section>
  );
};

export default ProjectDetail;
