import React from 'react';
import styles from './mypage_project.module.css';

const MypageProject = (props) => {
  return (
    <section className={styles.mypageProject}>
      <div className={styles.card}>
        <span>지원 현황</span>
      </div>
      <div className={styles.card}>
        <span>진행 현황</span>
      </div>
      <div className={styles.card}>
        <span>완료 현황</span>
      </div>
    </section>
  );
};

export default MypageProject;
