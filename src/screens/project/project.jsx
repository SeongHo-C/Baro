import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllProject from '../../components/all_project/all_project';
import GoodProject from '../../components/good_project/good_project';
import NewProject from '../../components/new_project/new_project';
import { getRecentProjects } from '../../slices/projectsSlice';
import styles from './project.module.css';
import Slider from 'react-slick';

const Project = (props) => {
  const newProjects = useSelector((state) => state.projects.recent);
  console.log(newProjects);

  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(getRecentProjects());
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.project}>
        <header className={styles.header}>
          <span className={styles.headerText}>프로젝트</span>
          <span className={styles.headerText2}>
            사이드 프로젝트 or 경진대회
          </span>
        </header>

        <div className={styles.container1}>
          <NewProject />
          <GoodProject />
        </div>
        <AllProject />
      </div>
    </section>
  );
};

export default Project;
