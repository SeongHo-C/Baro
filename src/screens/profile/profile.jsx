import React from 'react';
import styles from './profile.module.css';
import { Viewer } from '@toast-ui/react-editor';

const Profile = (props) => {
  const data = '<p>hello</p><p>hello</p><p>hello</p><p>hello</p>';

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <img className={styles.img} src='../../images/testImage.png' alt='' />
        <span>lee1234</span>
      </header>
      <main className={styles.main}>
        <span className={styles.info}>정보</span>
        <ul>
          <li className={styles.card}>
            <span className={styles.title}>직무</span>
            <span className={styles.subTitle}>웹 프론트엔드</span>
          </li>
          <li className={styles.card}>
            <span className={styles.title}>능력치</span>
            <span className={styles.subTitle}>초보</span>
          </li>
          <li className={styles.card}>
            <span className={styles.title}>개인 랭킹</span>
            <span className={styles.subTitle}>1등 / 7000포인트</span>
          </li>
          <li className={styles.card}>
            <span className={styles.title}>학교</span>
            <span className={styles.subTitle}>인하공업전문대학</span>
          </li>
          <li className={styles.card}>
            <span className={styles.title}>소개</span>
            <div className={styles.viewerStyle}>
              <Viewer initialValue={data || ''} className={styles.viewer} />
            </div>
          </li>
        </ul>
      </main>
    </section>
  );
};

export default Profile;
