import React from 'react';
import styles from './profile_card.module.css';

const ProfileCard = ({ data }) => {
  const { userProfileImage, nickname, school, profileJobName, projectJobName } =
    data;

  return (
    <section className={styles.profileCard}>
      <div className={styles.header}>
        <img
          className={styles.userImg}
          src={userProfileImage ? '' : '../../images/user.png'}
          alt=''
        />
        <div className={styles.user}>
          <span className={styles.name}>{nickname}</span>
          <div className={styles.school}>
            <span>{school}</span>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <span className={styles.footerName}>[직무]</span>
          <span>{profileJobName}</span>
        </div>
        <div>
          <span className={styles.footerName}>[담당]</span>
          <span>{projectJobName}</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
