import React, { useEffect, useState } from 'react';
import LikeButton from '../like_button/like_button';
import styles from './project_card.module.css';
import _ from 'lodash';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
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

  const url = process.env.REACT_APP_URL;
  const totalRecruit = _.sumBy(jobs, (job) => job.recruitCount);
  const completeRecruit = _.sumBy(jobs, (job) => job.completeCount);
  const [imgSrc, setImgSrc] = useState('');

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

  const getImage = async (imagePath) => {
    try {
      axios
        .get(`${url}/image/project/${imagePath}`, {
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
  const onClick = () => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    getImage(imagePath);
  });

  return (
    <li className={styles.container} onClick={onClick}>
      {imgSrc ? <img className={styles.img} src={imgSrc} alt='로딩중' /> : ''}
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
      {/* <div className={styles.like}>{<LikeButton />}</div> */}
    </li>
  );
};

export default ProjectCard;
