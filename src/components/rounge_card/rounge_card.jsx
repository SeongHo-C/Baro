import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageLookup } from '../../service/image_api';
import styles from './rounge_card.module.css';

const RoungeCard = ({ data }) => {
  const { id, content, createDate, memberNickname, memberProfileUrl } = data;
  const [image, setImage] = useState();

  const navigate = useNavigate();

  const moveProjectCreate = () => {
    navigate('/project/create', {
      state: {
        loungeId: id,
      },
    });
  };

  useEffect(() => {
    memberProfileUrl &&
      imageLookup({ type: 'member', image: memberProfileUrl }) //
        .then(setImage);
  }, [memberProfileUrl]);

  return (
    <li className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img
            className={styles.img}
            src={image ? image : '../../images/user.png'}
            alt=''
          />
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
