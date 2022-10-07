import { Viewer } from '@toast-ui/react-editor';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './rounge_card.module.css';

const RoungeCard = (props) => {
  const data = '<p>hello</p><p>hello</p><p>hello</p><p>hello</p>';
  const navigate = useNavigate();

  const moveProjectCreate = () => {
    navigate('/project/create');
  };

  return (
    <li className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img className={styles.img} src='../../images/testImage.png' alt='' />
          <span className={styles.text}>lee1234</span>
        </div>
        <span>22.10.07 11:25</span>
      </div>
      <section className={styles.list}>
        <Viewer initialValue={data || ''} className={styles.Viewer} />
      </section>
      <div className={styles.btnPos}>
        <button className={styles.btn} onClick={moveProjectCreate}>
          바로 프로젝트 생성
        </button>
      </div>
    </li>
  );
};

export default RoungeCard;
