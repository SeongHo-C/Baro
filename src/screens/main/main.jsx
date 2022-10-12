import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProjectCard from '../../components/project_card/project_card';
import { getRecentProjects } from '../../slices/projects/recentSlice';
import styles from './main.module.css';

const Main = (props) => {
  const projects = useSelector((state) => state.recent.project);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveProjects = () => {
    navigate('/project');
  };

  useEffect(() => {
    dispatch(getRecentProjects());
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.banner}>
        <img
          className={styles.bannerImg}
          src='../../../images/banner2.png'
          alt=''
        />
      </div>
      <div className={styles.moveContainer}>
        <div className={styles.moveProjects}>
          <span className={styles.moveTxt}>
            따끈따끈, 신규 프로젝트를 만나보세요
          </span>
          <button onClick={moveProjects}>
            <span style={{ color: 'red' }}>new!!! </span>
            <i className='fa-solid fa-angle-right'></i>
          </button>
        </div>
      </div>
      <div className={styles.projectCard}>
        <ul className={styles.project}>
          {projects &&
            Object.keys(projects).map((key) => (
              <ProjectCard key={key} project={projects[key]} />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Main;
