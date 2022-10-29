import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MypageInfo from '../../components/mypage_info/mypage_info';
import MypageProject from '../../components/mypage_project/mypage_project';
import RankingSolo from '../../components/ranking_solo/ranking_solo';
import RankingTeam from '../../components/ranking_team/ranking_team';
import styles from './mypage.module.css';

const Mypage = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [userData, setUserData] = useState('');

  const onTab = (tabId) => {
    setActiveTab(tabId);
  };
  const id = jwtDecode(localStorage.getItem('jwtToken')).sub;
  const url = process.env.REACT_APP_URL;

  const tab = ['회원 정보 수정', '프로젝트 현황'];

  const getUserInfo = async (id) => {
    try {
      await axios
        .get(`${url}/member/${id}`)
        .then((res) => setUserData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (updated) => {
    setUserData(updated);
  };

  const tabMenu = {
    0: <MypageInfo userData={userData} handleChange={handleChange} />,
    1: <MypageProject />,
  };

  useEffect(() => {
    getUserInfo(id);
  }, []);

  return (
    <section className={styles.ranking}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.headerText}>{`${userData.nickname}'s`}</span>
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
