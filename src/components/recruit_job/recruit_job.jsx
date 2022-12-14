import axios from 'axios';
import styles from './recruit_job.module.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const Job = ({ onUpdate, recruit, jobs }) => {
  const [Option, setOption] = useState(0);

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

  const handleJobId = (e) => {
    if (e.currentTarget === null) return;

    e.preventDefault();
    const firstIdx = selectRef.current.selectedIndex;
    const secondIdx = jobIdRef.current.selectedIndex;
    const jobid = jobs[firstIdx].children[secondIdx].id;

    setOption(firstIdx);
    // setJobId(jobid);

    onUpdate({
      ...recruit,
      jobId: jobid,
    });
  };

  const handleCount = (e) => {
    onUpdate({
      ...recruit,
      recruitCount: Number(recruitRef.current.value),
    });
  };

  return (
    <li className={styles.container}>
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
        <select
          ref={recruitRef}
          className={`${styles.select} ${styles.selectRecruit}`}
          onChange={handleCount}
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
