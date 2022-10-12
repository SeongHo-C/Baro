import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllProject from '../../components/all_project/all_project';
import GoodProject from '../../components/good_project/good_project';
import NewProject from '../../components/new_project/new_project';
import { getRecentProjects } from '../../slices/projectsSlice';
import styles from './project.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectCard from '../../components/project_card/project_card';

const Project = (props) => {
  const newProjects = useSelector((state) => state.projects.recent);
  console.log(newProjects);

  const dispatch = useDispatch();

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
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
          right: '5rem',
          background: 'lightgray',
          width: '1.5rem',
          borderRadius: '50%',
          textAlign: 'center',
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
          background: 'lightgray',
          left: '5rem',
          zIndex: 1,
          width: '1.5rem',
          borderRadius: '50%',
          textAlign: 'center',
        }}
        onClick={onClick}
      />
    );
  }

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
          <div className={styles.newProject}>
            <h1 className={styles.title}>신규 프로젝트</h1>
            <Slider className={styles.new} {...settings}>
              {newProjects &&
                newProjects.map((project) => (
                  <NewProject key={project.id} project={project} />
                ))}
            </Slider>
          </div>
          <div>
            <h1 className={styles.title}>주목할만한 프로젝트</h1>
            <GoodProject />
          </div>
        </div>
        <AllProject />
      </div>
    </section>
  );
};

export default Project;
