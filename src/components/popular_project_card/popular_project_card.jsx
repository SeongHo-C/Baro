import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageLookup } from '../../service/image_api';
import styles from './popular_project_card.module.css';

const PopularProjectCard = ({ project }) => {
  const {
    id,
    leaderNickname,
    imagePath,
    purpose,
    title,
    state,
    jobs,
    tech,
    viewCount,
    likeCount,
  } = project;
  const [image, setImage] = useState('');

  const totalRecruit = _.sumBy(jobs, (job) => job.recruitCount);
  const completeRecruit = _.sumBy(jobs, (job) => job.completeCount);

  const getState = (state) => {
    switch (state) {
      case 'R':
        return '모집중';
      case 'C':
        return '진행중';
      case 'E':
        return '완료';
    }
  };

  const navigate = useNavigate();

  const onMoveDetail = () => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    imageLookup({ type: 'project', image: imagePath }).then(setImage);
  }, [imagePath]);

  return (
    <li className={styles.container} onClick={() => onMoveDetail(id)}>
      <img className={styles.img} src={image} alt='' />
      <div className={styles.info}>
        <span className={styles.purpose}>{purpose}</span>
        <span className={styles.projectName}>{title}</span>
        <span className={styles.leaderNickname}>{leaderNickname}</span>
        <div className={styles.recruitCount}>
          <div className={styles.recruit}>
            <span>{`${getState(state)}`}</span>
            <span
              className={styles.recruitText}
            >{`${completeRecruit} / ${totalRecruit}`}</span>
          </div>
          <div className={styles.counts}>
            <span className={styles.count}>
              <i className='fa-regular fa-heart'></i>
              <span>{` ${likeCount}`}</span>
            </span>
            <span className={styles.count}>
              <i className='fa-regular fa-eye'></i>
              <span>{` ${viewCount}`}</span>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PopularProjectCard;
