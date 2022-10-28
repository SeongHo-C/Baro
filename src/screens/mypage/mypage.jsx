import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MypageInfo from '../../components/mypage_info/mypage_info';
import MypageProject from '../../components/mypage_project/mypage_project';
import RankingSolo from '../../components/ranking_solo/ranking_solo';
import RankingTeam from '../../components/ranking_team/ranking_team';
import styles from './mypage.module.css';

const Mypage = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const onTab = (tabId) => {
    setActiveTab(tabId);
  };

  const tabMenu = {
    0: <MypageInfo />,
    1: <MypageProject />,
  };

  const tab = ['회원 정보 수정', '프로젝트 현황'];

  const nickname = useSelector((state) => state.user.user.nickname);

  return (
    <section className={styles.ranking}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.headerText}>{`${nickname}'s`}</span>
          <span className={styles.headerText2}>마이페이지</span>
        </header>
        <div className={styles.container2}>
          <main className={styles.main}>
            <ul className={styles.tab}>
              {tab.map((v, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => onTab(i)}
                    className={
                      activeTab === i
                        ? `${styles.active}`
                        : `${styles.noActive}`
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
      </div>
    </section>
  );
};

export default Mypage;
