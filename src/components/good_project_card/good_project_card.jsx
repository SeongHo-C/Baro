import React from 'react';
import styles from './good_project_card.module.css';

const GoodProjectCard = ({ data, onMoveDetail }) => {
  const { id, image_url, project_name, content, recruit, cnt } = data;

  return (
    <li className={styles.container} onClick={() => onMoveDetail(id)}>
      <img className={styles.img} src={image_url} alt='' />
      <div className={styles.info}>
        <div className={styles.top}>
          <span>{project_name}</span>
          <span>
            <i className='fa-regular fa-eye'></i>
            {` ${cnt}`}
          </span>
        </div>
        <span className={styles.content}>{content}</span>
        <span className={styles.recruit}>{`[모집중] ${recruit}`}</span>
      </div>
    </li>
  );
};

export default GoodProjectCard;
