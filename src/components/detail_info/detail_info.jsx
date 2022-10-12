import React from 'react';
import ProfileCard from '../profile_card/profile_card';
import styles from './detail_info.module.css';

const DetailInfo = (props) => {
  const language = 'spring';
  return (
    <section className={styles.detailInfo}>
      <div className={styles.container}>
        <span className={styles.name}>모집 현황</span>
        <div className={styles.recruitInfo}>
          <span className={styles.recruitJob}>웹 프론트엔드</span>
          <span style={{ color: 'red' }}>0 / 1</span>
          <button className={styles.recruitBtn}>지원</button>
        </div>
      </div>
      <div className={styles.container}>
        <span className={styles.name}>소개</span>
        <span>
          모든 대학교 학생들이 프로젝트를 진행할 때 아이디어를 선정하는 것,
          아이디어는 존재하지만 같이 프로젝트를 진행할 학우를 모집하는 것에
          어려움을 가지고 있습니다. 이를 해결하기 위해 아이디어를 공유하고 팀을
          빌딩할 수 있는 웹 서비스를 개발하기로 하였습니다.
        </span>
        <div className={styles.ideas}>
          <span className={styles.idea}>@ good idea of lee1234</span>
        </div>
      </div>
      <div className={styles.container}>
        <span className={styles.name}>프로젝트 기간</span>
        <span>2022.10.07 ~ 2022.10.14 (8일)</span>
      </div>
      <div className={styles.container}>
        <span className={styles.name}>기술/언어</span>
        <span className={styles.tech}>
          <img
            src={`https://letspl.s3.ap-northeast-2.amazonaws.com/icons/${language}/${language}-original.svg`}
            alt='React'
          />
          <span>{language}</span>
        </span>
      </div>
      <div className={styles.leaderInfo}>
        <span className={styles.name}>리더</span>
        {<ProfileCard />}
      </div>
      <div className={styles.memberInfo}>
        <span className={styles.memberTxt}>멤버</span>
        <span className={styles.memberSubTxt}>
          이 프로젝트는 지원을 기다리는 중😁
        </span>
        {<ProfileCard />}
      </div>
    </section>
  );
};

export default DetailInfo;
