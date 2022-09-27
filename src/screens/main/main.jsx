import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from '../../components/project_card/project_card';
import styles from './main.module.css';

const Main = (props) => {
  const projects = useSelector((state) => {
    return state.projects;
  });

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
