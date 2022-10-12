import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './new_project.module.css';

const NewProject = ({ project }) => {
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

  const navigate = useNavigate();
  const moveProjectDetail = () => {
    navigate(`/detail/${id}`);
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

  useEffect(() => {
    getImage(imagePath);
  }, []);

  return (
    <section className={styles.newProject}>
      <div className={styles.container} onClick={moveProjectDetail}>
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
      </div>
    </section>
  );
};

export default NewProject;
