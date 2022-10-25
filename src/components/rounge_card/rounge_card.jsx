import { Viewer } from '@toast-ui/react-editor';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './rounge_card.module.css';

const RoungeCard = ({ data }) => {
  const { content, createDate, memberNickname, memberProfileUrl } = data;
  const navigate = useNavigate();

  const moveProjectCreate = () => {
    navigate('/project/create');
  };

  return (
    <li className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img className={styles.img} src='../../images/testImage.png' alt='' />
          <span className={styles.text}>{memberNickname}</span>
        </div>
        <span>{createDate}</span>
      </div>
      <span className={styles.list}>
        <Viewer initialValue={content} className={styles.Viewer} />
      </span>
      <div className={styles.btnPos}>
        <button className={styles.btn} onClick={moveProjectCreate}>
          바로 프로젝트 생성
        </button>
      </div>
    </li>
  );
};

export default RoungeCard;
