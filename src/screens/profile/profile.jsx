import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { Viewer } from '@toast-ui/react-editor';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { imageLookup } from '../../service/image_api';

const Profile = (props) => {
  const [userData, setUserData] = useState('');
  const [image, setImage] = useState();

  const id = useParams().id;
  const url = process.env.REACT_APP_URL;

  const getUserInfo = async (id) => {
    try {
      await axios
        .get(`${url}/member/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setUserData(data);
          imageLookup({ type: 'member', image: data.imageUrl }).then((image) =>
            setImage(image)
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo(id);
  }, []);

  return (
    <section className={styles.profile}>
      {userData && (
        <div className={styles.container}>
          <header className={styles.header}>
            <img
              className={styles.img}
              src={image ? image : '../../images/user.png'}
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
                >{`${userData.point} 포인트`}</span>
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
