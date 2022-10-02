import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './join.module.css';

const Join = (props) => {
  const [jobs, setJobs] = useState();
  const [Option, setOption] = useState(0);

  const location = useLocation();
  const url = process.env.REACT_APP_URL;
  const email = location.state.email;
  const selectRef = useRef();

  const getJob = useCallback(async () => {
    try {
      await axios.get(`${url}/job`, {}).then((response) => {
        setJobs(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  });

  const jobLevel = [
    { id: 1, name: '초보' },
    { id: 2, name: '중수' },
    { id: 3, name: '고수' },
  ];

  const handleOption = (e) => {
    const index = e.target.selectedIndex;
    setOption(index);
  };

  useEffect(() => {
    getJob();
  }, []);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <span className={styles.headerText}>본 캐릭터 설정</span>
        <span className={styles.headerText2}>회원 가입이 바로 완료됩니다.</span>
      </header>
      <form className={styles.main}>
        <div className={styles.input}>
          <span className={styles.name}>이메일</span>
          <div className={styles.email}>
            <input type='text' value={email} disabled />
            <span className={styles.emailText}>인증 완료</span>
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>닉네임</span>
          <input type='text' />
        </div>
        <div className={styles.input}>
          <span className={styles.name}>직무</span>
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
            <select className={styles.select}>
              {jobs &&
                jobs[Option].children.map((job) => (
                  <option key={job.id} name={job.name}>
                    {job.name}
                  </option>
                ))}
            </select>
            <select className={styles.select}>
              {jobLevel.map((level) => (
                <option key={level.id} name={level.name}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>학교</span>
          <input type='text' />
        </div>
        <footer className={styles.footer}>
          <button className={styles.button}>가입 완료</button>
        </footer>
      </form>
    </section>
  );
};

export default Join;
