import React, { useState } from 'react';
import RankingSolo from '../../components/ranking_solo/ranking_solo';
import RankingTeam from '../../components/ranking_team/ranking_team';
import styles from './ranking.module.css';

const Ranking = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const onTab = (tabId) => {
    setActiveTab(tabId);
  };

  const tabMenu = {
    0: <RankingTeam />,
    1: <RankingSolo />,
  };

  const tab = ['학교 랭킹', '개인 랭킹'];

  return (
    <section className={styles.ranking}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.headerText}>랭킹</span>
          <span className={styles.headerText2}>
            랭킹이 높을수록 프로젝트에 참여할 수 있는 확률이 높아져요~😁
          </span>
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

export default Ranking;
