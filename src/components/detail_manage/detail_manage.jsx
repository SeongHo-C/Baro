import React from 'react';
import ProfileCard from '../profile_card/profile_card';
import styles from './detail_manage.module.css';

const DetailManage = (props) => {
  const application = {
    1: {
      id: 1,
    },
    2: {
      id: 2,
    },
  };
  const onAccept = (id) => {
    console.log(id);
  };

  return (
    <section className={styles.detailInfo}>
      <div className={styles.container}>
        <span className={styles.name}>모집 현황</span>
        <div className={styles.recruitInfo}>
          <span className={styles.recruitJob}>웹 프론트엔드</span>
          <span style={{ color: 'red' }}>1 / 2</span>
        </div>
      </div>

      <div className={styles.leaderInfo}>
        <span className={styles.name}>현재 멤버 정보</span>
        {<ProfileCard />}
      </div>
      <div className={styles.memberInfo}>
        <span className={styles.memberTxt}>지원자</span>
        <ul className={styles.applicationCards}>
          {Object.keys(application).map((key) => {
            return (
              <li className={styles.applicationCard} key={key}>
                <ProfileCard />
                <button className={styles.btn} onClick={() => onAccept(key)}>
                  지원 수락
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default DetailManage;
