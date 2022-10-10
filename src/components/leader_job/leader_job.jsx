import axios from 'axios';
import styles from './leader_job.module.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const LeaderJob = ({ onUpdate, jobs }) => {
  const [Option, setOption] = useState(0);

  const selectRef = useRef();
  const jobIdRef = useRef();

  const handleJobId = (e) => {
    if (e.currentTarget === null) return;

    e.preventDefault();
    const firstIdx = selectRef.current.selectedIndex;
    const secondIdx = jobIdRef.current.selectedIndex;
    const jobid = jobs[firstIdx].children[secondIdx].id;

    setOption(firstIdx);
    // setJobId(jobid);
    console.log(jobid);
    onUpdate(jobid);
  };

  return (
    <section className={styles.container}>
      <div className={styles.selectBox}>
        <select
          ref={selectRef}
          className={styles.select}
          onChange={handleJobId}
        >
          {jobs &&
            jobs.map((job) => (
              <option key={job.id} name={job.name}>
                {job.name}
              </option>
            ))}
        </select>
        <select ref={jobIdRef} className={styles.select} onChange={handleJobId}>
          {jobs &&
            jobs[Option].children.map((job) => (
              <option key={job.id} name={job.name}>
                {job.name}
              </option>
            ))}
        </select>
      </div>
    </section>
  );
};

export default LeaderJob;
