import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../slices/projects/listSlice';
import ProjectCard from '../project_card/project_card';
import styles from './all_project.module.css';

const AllProject = (props) => {
  const [jobs, setJobs] = useState();
  const url = process.env.REACT_APP_URL;
  const schoolRef = useRef();
  const purposeRef = useRef();
  const jobIdRef = useRef();
  const stateRef = useRef();

  const projects = useSelector((state) => state.list.project);
  console.log(projects);

  const dispatch = useDispatch();

  const getJob = useCallback(async () => {
    try {
      await axios.get(`${url}/job`).then((response) => {
        setJobs(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  });

  const handleProjectList = (e) => {
    const index = jobIdRef.current.selectedIndex;
    const jobId = index === 0 ? '' : e.nativeEvent.target[index].id;
    const school =
      schoolRef.current.value === '학교' ? '' : schoolRef.current.value;
    const purpose =
      purposeRef.current.value === '목적' ? '' : purposeRef.current.value;
    const state = stateRef.current.value === '모집중' ? 'R' : '';

    dispatch(getProjects([school, purpose, jobId, state]));
  };

  useEffect(() => {
    getJob();
    dispatch(getProjects(['', '', '', '']));
  }, []);

  return (
    <section>
      <h1>전체 프로젝트</h1>
      <div className={styles.selectBox}>
        <select
          ref={schoolRef}
          className={styles.select}
          onChange={handleProjectList}
        >
          <option>학교</option>
          <option>인하공업전문대학</option>
          <option>인하대학교</option>
        </select>
        <select
          ref={purposeRef}
          className={styles.select}
          onChange={handleProjectList}
        >
          <option>목적</option>
          <option>사이드 프로젝트</option>
          <option>경진대회</option>
        </select>
        <select
          ref={jobIdRef}
          className={styles.select}
          onChange={handleProjectList}
        >
          <option>모집분야</option>
          {jobs &&
            jobs.map((job) =>
              job.children.map((child) => {
                return (
                  <option key={child.id} name={child.name} id={child.id}>
                    {child.name}
                  </option>
                );
              })
            )}
        </select>
        <input
          ref={stateRef}
          type='checkbox'
          value='모집중'
          onChange={handleProjectList}
        />{' '}
        모집중
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

export default AllProject;
