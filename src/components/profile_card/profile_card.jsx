import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [imgSrc, setImgSrc] = useState();

  const url = process.env.REACT_APP_URL;

  const getImage = async (image) => {
    try {
      axios
        .get(`${url}/image/member/${image}`, {
          responseType: 'blob',
        })
        .then((response) => {
          const reader = new FileReader();
          reader.readAsDataURL(response.data);
          return new Promise((resolve) => {
            reader.onload = () => {
              setImgSrc(reader.result);
              resolve();
            };
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const moveProfile = () => {
    navigate(`/profile/${memberId}`);
  };

  useEffect(() => {
    getImage(userProfileImage);
  }, []);

  return (
    <section className={styles.profileCard} onClick={moveProfile}>
      <div className={styles.header}>
        <img
          className={styles.userImg}
          src={imgSrc ? imgSrc : '../../images/user.png'}
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
