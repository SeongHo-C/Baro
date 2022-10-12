import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllProject from '../../components/all_project/all_project';
import NewProject from '../../components/new_project/new_project';
import {
  getPopularProjects,
  getRecentProjects,
} from '../../slices/projectsSlice';
import styles from './project.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectCard from '../../components/project_card/project_card';
import PopularProjectCard from '../../components/popular_project_card/popular_project_card';

const Project = (props) => {
  const newProjects = useSelector((state) => state.projects.recent);
  const popularProjects = useSelector((state) => state.projects.popular);
  console.log(popularProjects);
  const dispatch = useDispatch();

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          right: '2.2rem',
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          left: '2.2rem',
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  useEffect(() => {
    dispatch(getRecentProjects());
    dispatch(getPopularProjects());
  }, [dispatch]);

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
          <div className={styles.newProject}>
            <h1 className={styles.title}>신규 프로젝트</h1>
            <Slider className={styles.new} {...settings}>
              {newProjects &&
                newProjects.map((project) => (
                  <NewProject key={project.id} project={project} />
                ))}
            </Slider>
          </div>
          <div className={styles.popularProject}>
            <h1 className={styles.title}>주목할만한 프로젝트</h1>
            <ul>
              {popularProjects.map((project) => (
                <PopularProjectCard key={project.id} project={project} />
              ))}
            </ul>
          </div>
        </div>
        <AllProject />
      </div>
    </section>
  );
};

export default Project;
