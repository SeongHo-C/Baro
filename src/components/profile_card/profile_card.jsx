import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageLookup } from '../../service/image_api';
import styles from './profile_card.module.css';

const ProfileCard = ({ data }) => {
  const {
    userProfileImage,
    nickname,
    school,
    profileJobName,
    projectJobName,
    memberId,
  } = data;
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const moveProfile = () => {
    navigate(`/profile/${memberId}`);
  };

  useEffect(() => {
    imageLookup({ type: 'member', image: userProfileImage }).then(setImage);
  }, [userProfileImage]);

  return (
    <section className={styles.profileCard} onClick={moveProfile}>
      <div className={styles.header}>
        <img
          className={styles.userImg}
          src={image ? image : '../../images/user.png'}
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
