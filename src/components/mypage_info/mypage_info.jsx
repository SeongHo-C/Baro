import React from 'react';
import styles from './mypage_info.module.css';

import { Viewer } from '@toast-ui/react-editor';

const MypageInfo = (props) => {
  const data = '<p>hello</p><p>hello</p><p>hello</p><p>hello</p>';

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <img className={styles.img} src='../../images/testImage.png' alt='' />
        <span>lee1234</span>
      </header>
      <main className={styles.main}>
        <span className={styles.info}>정보</span>
        <form>
          <ul>
            <li className={styles.card}>
              <span className={styles.title}>이메일</span>
              <span className={styles.subTitle}>bestinwoo@gmail.com</span>
            </li>
            <li className={styles.card}>
              <span className={styles.title}>닉네임</span>
              <span className={styles.subTitle}>박인으</span>
            </li>
            <li className={styles.card}>
              <span className={styles.title}>직무</span>
              <span className={styles.subTitle}>웹 프론트엔드</span>
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
          <footer className={styles.footer}>
            <button className={styles.button}>저장 하기</button>
          </footer>
        </form>
      </main>
    </section>
  );
};

export default MypageInfo;
