import axios from 'axios';
import styles from './job.module.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const Job = (props) => {
  const [jobs, setJobs] = useState();
  const [Option, setOption] = useState(0);
  const [jobId, setJobId] = useState();

  const url = process.env.REACT_APP_URL;
  const selectRef = useRef();
  const jobIdRef = useRef();
  const recruitRef = useRef();

  const recruitCount = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
  ];

  const getJob = useCallback(async () => {
    try {
      await axios.get(`${url}/job`, {}).then((response) => {
        setJobs(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  });

  const handleOption = (e) => {
    const index = e.target.selectedIndex;
    setOption(index);
  };

  const getJobId = (e) => {
    const index = jobIdRef.current.selectedIndex;
    const jobid = jobs[Option].children[index].id;

    setJobId(jobid);
  };

  useEffect(() => {
    getJob();
  }, []);

  return (
    <li className={styles.container}>
      <div className={styles.selectBox}>
        <select
          ref={selectRef}
          className={styles.select}
          onChange={handleOption}
        >
          {jobs &&
            jobs.map((job) => (
              <option key={job.id} name={job.name}>
                {job.name}
              </option>
            ))}
        </select>
        <select ref={jobIdRef} className={styles.select} onChange={getJobId}>
          {jobs &&
            jobs[Option].children.map((job) => (
              <option key={job.id} name={job.name}>
                {job.name}
              </option>
            ))}
        </select>
        <select
          ref={recruitRef}
          className={`${styles.select} ${styles.selectRecruit}`}
        >
          {recruitCount.map((count) => (
            <option key={count.id} value={count.value}>
              {count.value}
            </option>
          ))}
        </select>
      </div>
    </li>
  );
};

export default Job;
