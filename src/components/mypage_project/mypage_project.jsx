import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from '../project_card/project_card';
import styles from './mypage_project.module.css';

const MypageProject = (props) => {
  const [projects, setProjects] = useState();

  const url = process.env.REACT_APP_URL;
  const id = useSelector((state) => state.user.user.sub);

  const getUserProjects = async () => {
    try {
      await axios
        .get(`${url}/member/${id}/project`)
        .then((res) => setProjects(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProjects();
  }, []);

  console.log(projects);
  return (
    <section className={styles.mypageProject}>
      <div className={styles.card}>
        <span className={styles.title}>지원 현황</span>
        <div className={styles.projectCard}>
          <ul className={styles.project}>
            {projects &&
              Object.keys(projects.apply).map((key) => (
                <ProjectCard key={key} project={projects.apply[key]} />
              ))}
          </ul>
        </div>
      </div>
      <div className={styles.card}>
        <span className={styles.title}>진행 현황</span>
        <div className={styles.projectCard}>
          <ul className={styles.project}>
            {projects &&
              Object.keys(projects.progress).map((key) => (
                <ProjectCard key={key} project={projects.progress[key]} />
              ))}
          </ul>
        </div>
      </div>
      <div className={styles.card}>
        <span className={styles.title}>완료 현황</span>
        {projects &&
          Object.keys(projects.complete).map((key) => (
            <ProjectCard key={key} project={projects.complete[key]} />
          ))}
      </div>
    </section>
  );
};

export default MypageProject;
