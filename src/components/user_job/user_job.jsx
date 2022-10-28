import axios from 'axios';
import styles from './user_job.module.css';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  jobLevel,
} from 'react';

const UserJob = ({
  onUpdateJobLevel,
  onUpdateJobId,
  jobs,
  jobParentName,
  jobChildName,
  jobLevel,
}) => {
  const [Option, setOption] = useState(0);
  const [child, setChild] = useState(jobChildName);
  const [level, setLevel] = useState(jobLevel);

  const selectRef = useRef();
  const jobLevelRef = useRef();
  const jobIdRef = useRef();
  const levels = [
    { id: 1, name: '초보' },
    { id: 2, name: '중수' },
    { id: 3, name: '고수' },
  ];

  const getJobParent = () => {
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].name === jobParentName) {
        setOption(i);
        return;
      }
    }
  };

  const handleParent = (e) => {
    if (e.currentTarget === null) return;

    e.preventDefault();
    const firstIdx = selectRef.current.selectedIndex;
    const job = jobs[firstIdx].children[0];

    setOption(firstIdx);
    setChild(job.name);
    onUpdateJobId(job.id);
  };

  const handleChild = (e) => {
    if (e.currentTarget === null) return;

    e.preventDefault();

    const secondIdx = jobIdRef.current.selectedIndex;
    const job = jobs[Option].children[secondIdx];

    setChild(job.name);
    onUpdateJobId(job.id);
  };

  const handleJobLevel = (e) => {
    if (e.currentTarget === null) return;
    e.preventDefault();

    const jobLevel = jobLevelRef.current.value;

    setLevel(jobLevel);
    onUpdateJobLevel(jobLevel);
  };

  useEffect(() => {
    if (jobs) getJobParent();
  }, [jobs]);

  return (
    <section className={styles.container}>
      {jobs && (
        <div className={styles.selectBox}>
          <select
            ref={selectRef}
            className={styles.select}
            onChange={handleParent}
            value={jobs[Option].name}
          >
            {jobs &&
              jobs.map((job) => (
                <option key={job.id} name={job.name}>
                  {job.name}
                </option>
              ))}
          </select>
          <select
            ref={jobIdRef}
            className={styles.select}
            onChange={handleChild}
            value={child}
          >
            {jobs &&
              jobs[Option].children.map((job) => (
                <option key={job.id} name={job.name}>
                  {job.name}
                </option>
              ))}
          </select>
          <select
            ref={jobLevelRef}
            className={styles.select}
            onChange={handleJobLevel}
            value={level}
          >
            {levels.map((level) => (
              <option key={level.id} name={level.name}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </section>
  );
};

export default UserJob;
