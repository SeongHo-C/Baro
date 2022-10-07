import React from 'react';
import styles from './profile_card.module.css';

const ProfileCard = (props) => {
  return (
    <section className={styles.profileCard}>
      <div className={styles.header}>
        <img
          className={styles.userImg}
          src='../../images/testImage.png'
          alt=''
        />
        <div className={styles.user}>
          <span className={styles.name}>lee1234</span>
          <div className={styles.school}>
            <span>인하공업전문대학</span>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <span className={styles.footerName}>[직무]</span>
          <span>웹 프론트엔드</span>
        </div>
        <div>
          <span className={styles.footerName}>[담당]</span>
          <span>웹 프론트엔드</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
