import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../slices/projects/listSlice';
import Paging from '../paging/paging';
import ProjectCard from '../project_card/project_card';
import styles from './all_project.module.css';

const AllProject = (props) => {
  const [jobs, setJobs] = useState();
  const [page, setPage] = useState(1);
  const [jobId, setJobId] = useState('');
  const [recruiting, setRecruiting] = useState(false);

  const url = process.env.REACT_APP_URL;
  const schoolRef = useRef();
  const purposeRef = useRef();
  const jobIdRef = useRef();
  const stateRef = useRef();

  const datas = useSelector((state) => state.list);

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

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleChangeJobId = (e) => {
    const index = jobIdRef.current.selectedIndex;
    const jobId = index === 0 ? '' : e.nativeEvent.target[index].id;
    setPage(1);
    setJobId(jobId);
  };

  const handleProjectList = () => {
    const school =
      schoolRef.current.value === '학교' ? '' : schoolRef.current.value;
    const purpose =
      purposeRef.current.value === '목적' ? '' : purposeRef.current.value;
    const state = recruiting ? 'R' : '';
    dispatch(getProjects([school, purpose, jobId, state, page]));
  };

  useEffect(() => {
    getJob();
  }, []);

  useEffect(() => {
    handleProjectList();
  }, [page, jobId, recruiting]);

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
          onChange={handleChangeJobId}
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
          onChange={() => setRecruiting(!recruiting)}
        />{' '}
        모집중
      </div>
      <ul className={styles.project}>
        {datas.project &&
          Object.keys(datas.project).map((key) => (
            <ProjectCard
              key={datas.project[key].id}
              project={datas.project[key]}
            />
          ))}
      </ul>
      <div>
        {datas.totalElements.length !== 0 && (
          <Paging
            onPageChange={handlePageChange}
            totalElements={datas.totalElements}
            page={page}
            size={8}
          />
        )}
      </div>
    </section>
  );
};

export default AllProject;
