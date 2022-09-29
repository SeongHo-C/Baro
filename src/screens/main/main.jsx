import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../../components/project_card/project_card';
import styles from './main.module.css';

const Main = (props) => {
  const projects = useSelector((state) => {
    return state.projects;
  });
  const navigate = useNavigate();

  const moveProjects = () => {
    navigate('/project');
  };

  useEffect(() => {}, []);

  return (
    <section className={styles.container}>
      <div className={styles.banner}>
        <img
          className={styles.bannerImg}
          src='../../../images/banner.png'
          alt=''
        />
      </div>
      <div className={styles.moveContainer}>
        <div className={styles.moveProjects}>
          <span>따끈따끈, 신규 프로젝트를 만나보세요</span>
          <button onClick={moveProjects}>
            <span style={{ color: 'red' }}>new!!! </span>
            <i className='fa-solid fa-angle-right'></i>
          </button>
        </div>
      </div>
      <div className={styles.projectCard}>
        <ul className={styles.project}>
          {Object.keys(projects).map((key) => (
            <ProjectCard key={key} project={projects[key]} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Main;
