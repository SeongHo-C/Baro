import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
        <div className={styles.bannerWidth}>
          <span className={styles.bannerTxt}>
            <h1>학교 프로젝트 어떻게 하지?</h1>
            <p>아이디어 공유부터 팀 빌딩까지</p>
            <p>당신을 위한 바로 !</p>
          </span>
          <img
            className={styles.bannerImg}
            src='../../../images/bannerImg.PNG'
            alt=''
          />
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.moveContainer}>
          <div className={styles.moveProjects}>
            <button onClick={moveProjects}>
              <span className={styles.moveTxt}>
                따끈따끈, 다양한 프로젝트를 만나보세요 🚀
              </span>
            </button>
          </div>
        </div>
        <ul className={styles.project}>
          {projects &&
            Object.keys(projects).map((key) => (
              <ProjectCard key={projects[key].id} project={projects[key]} />
            ))}
        </ul>
      </main>
    </section>
  );
};

export default Main;
