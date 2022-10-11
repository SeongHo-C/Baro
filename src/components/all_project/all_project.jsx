import React from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from '../project_card/project_card';
import styles from './all_project.module.css';

const AllProject = (props) => {
  const projects = useSelector((state) => {
    return state.projects;
  });

  return (
    <section>
      <h1>전체 프로젝트</h1>
      <div className={styles.selectBox}>
        <select className={styles.select}>
          <option>인하공업전문대학</option>
        </select>
        <select className={styles.select}>
          <option>사이드 프로젝트</option>
        </select>
        <select className={styles.select}>
          <option>모집분야</option>
        </select>
        <input type='checkbox' /> 모집중
      </div>
      <div className={styles.projectCard}>
        <ul className={styles.project}></ul>
      </div>
    </section>
  );
};

export default AllProject;
