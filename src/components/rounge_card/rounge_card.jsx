import { Viewer } from '@toast-ui/react-editor';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './rounge_card.module.css';

const RoungeCard = ({ data }) => {
  const { id, content, createDate, memberNickname, memberProfileUrl } = data;
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState();
  const url = process.env.REACT_APP_URL;

  const moveProjectCreate = () => {
    navigate('/project/create', {
      state: {
        loungeId: id,
      },
    });
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
    if (memberProfileUrl) getImage(memberProfileUrl);
  });

  return (
    <li className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user}>
          {imgSrc ? (
            <img className={styles.img} src={imgSrc} alt='' />
          ) : (
            <img className={styles.img} src='../../images/user.png' alt='' />
          )}

          <span className={styles.text}>{memberNickname}</span>
        </div>
        <span>{createDate}</span>
      </div>
      <div className={styles.list}>
        <span dangerouslySetInnerHTML={{ __html: content }}></span>
      </div>
      <div className={styles.btnPos}>
        <button className={styles.btn} onClick={moveProjectCreate}>
          바로 프로젝트 생성
        </button>
      </div>
    </li>
  );
};

export default RoungeCard;
