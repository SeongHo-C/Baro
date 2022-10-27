import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { Viewer } from '@toast-ui/react-editor';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = (props) => {
  const [userData, setUserData] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  console.log(userData);
  const id = useParams().id;
  const url = process.env.REACT_APP_URL;

  const getUserInfo = async (id) => {
    try {
      await axios
        .get(`${url}/member/${id}`)
        .then((res) => setUserData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getUserInfo(id);
  }, []);

  useEffect(() => {
    if (userData.imageUrl) getImage(userData.imageUrl);
  }, [userData]);

  return (
    <section className={styles.profile}>
      {userData && (
        <div className={styles.container}>
          <header className={styles.header}>
            <img
              className={styles.img}
              src={userData.imageUrl ? imgSrc : '../../images/user.png'}
              alt=''
            />
            <span>{userData.nickname}</span>
          </header>
          <main className={styles.main}>
            <span className={styles.info}>정보</span>
            <ul>
              <li className={styles.card}>
                <span className={styles.title}>직무</span>
                <span className={styles.subTitle}>{userData.jobChildName}</span>
              </li>
              <li className={styles.card}>
                <span className={styles.title}>능력치</span>
                <span className={styles.subTitle}>{userData.jobLevel}</span>
              </li>
              <li className={styles.card}>
                <span className={styles.title}>개인 랭킹</span>
                <span
                  className={styles.subTitle}
                >{`1등(${userData.point}포인트)`}</span>
              </li>
              <li className={styles.card}>
                <span className={styles.title}>학교</span>
                <span className={styles.subTitle}>{userData.school}</span>
              </li>
              <li className={styles.card}>
                <span className={styles.title}>소개</span>
                <div className={styles.viewerStyle}>
                  <Viewer
                    initialValue={userData.introduce}
                    className={styles.viewer}
                  />
                </div>
              </li>
            </ul>
          </main>
        </div>
      )}
    </section>
  );
};

export default Profile;
