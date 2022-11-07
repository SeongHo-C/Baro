import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ProjectCard from '../../components/project_card/project_card';
import styles from './project_completion.module.css';

const ProjectCompletion = (props) => {
  const [projects, setProjects] = useState();

  const url = process.env.REACT_APP_URL;

  const getProjects = async () => {
    try {
      await axios
        .get(`${url}/project?size=8`, {
          params: {
            state: 'E',
            page: 1,
          },
        })
        .then((res) => setProjects(res.data.content));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <section className={styles.completion}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.headerTxt}>완성작</span>
          <span className={styles.headerSubTxt}>
            두려움에 부딪히고 나서야 비로소 멋진 완성작이 탄생 💩
          </span>
        </header>
        <div className={styles.projectCard}>
          <ul className={styles.project}>
            {projects &&
              Object.keys(projects).map((key) => (
                <ProjectCard key={key} project={projects[key]} />
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectCompletion;
