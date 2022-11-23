import React, { useEffect, useState } from 'react';
import styles from './project_card.module.css';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { imageLookup } from '../../service/image_api';

const ProjectCard = ({ project }) => {
  const {
    id,
    leaderNickname,
    imagePath,
    purpose,
    title,
    state,
    jobs,
    viewCount,
    likeCount,
  } = project;

  const totalRecruit = _.sumBy(jobs, (job) => job.recruitCount);
  const completeRecruit = _.sumBy(jobs, (job) => job.completeCount);
  const [image, setImage] = useState();

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

  const onClick = () => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    imageLookup({ type: 'project', image: imagePath }).then((image) =>
      setImage(image)
    );
  }, [project]);

  return (
    <li className={styles.container} onClick={onClick}>
      <div className={styles.cardImage}>
        {image ? <img className={styles.img} src={image} alt='로딩중' /> : ''}
      </div>
      <div className={styles.info}>
        <span className={styles.kind}>{purpose}</span>
        <span className={styles.projectName}>{title}</span>
        <span className={styles.leaderNickname}>{leaderNickname}</span>
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
      <div className={styles.recruit}>
        <span>{`${getState(state)}`}</span>
        <span
          className={styles.recruitText}
        >{`${completeRecruit} / ${totalRecruit}`}</span>
      </div>
    </li>
  );
};

export default ProjectCard;
