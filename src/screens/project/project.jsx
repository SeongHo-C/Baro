import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import GoodProject from '../../components/good_project/good_project';
import NewProject from '../../components/new_project/new_project';
import styles from './project.module.css';

const Project = (props) => {
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
      </div>
    </section>
  );
};

export default Project;
