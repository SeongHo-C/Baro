import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import setAuthorizationToken from '../../service/setAuthorizationToken';
import styles from './join.module.css';

const Join = (props) => {
  const [jobs, setJobs] = useState();
  const [Option, setOption] = useState(0);
  const [nickname, setNickname] = useState('');

  const location = useLocation();
  const url = process.env.REACT_APP_URL;
  const email = location.state.email;
  const id = location.state.sub;
  const navigate = useNavigate();

  const selectRef = useRef();
  const nicknameRef = useRef();
  const jobLevelRef = useRef();
  const jobIdRef = useRef();
  const universityRef = useRef();

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

  // const handleJobId = (e) => {
  //   const index = e.target.selectedIndex;

  //   setJobId(jobId);
  //   console.log(jobId);
  // };

  const requestJoin = async (data) => {
    if (nickname.length > 3) {
      try {
        await axios
          .post(`${url}/member/signup`, data) //
          .then((response) => {
            const status = response.status;

            if (status === 204) {
              navigate('/');
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('닉네임을 네 글자 이상 적어주세요.');
      nicknameRef.current.focus();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const index = jobIdRef.current.selectedIndex;
    const jobId = jobs[Option].children[index].id;

    const data = {
      id: id,
      nickname: nicknameRef.current.value || '',
      jobId: jobId || '',
      jobLevel: jobLevelRef.current.value || '',
      university: universityRef.current.value || '',
    };
    requestJoin(data);
  };

  const handleNickname = (e) => {
    setNickname(e.currentTarget.value);
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
      <form className={styles.main} onSubmit={onSubmit}>
        <div className={styles.input}>
          <span className={styles.name}>이메일</span>
          <div className={styles.email}>
            <input type='text' value={email} disabled />
            <span className={styles.emailText}>인증 완료</span>
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>닉네임</span>
          <input
            ref={nicknameRef}
            type='text'
            minLength={4}
            maxLength={10}
            placeholder='4 ~ 10자리 이내로 적어주세요!'
            onChange={handleNickname}
          />
          <span className={styles.verification}>
            {nickname.length > 3 ? (
              ''
            ) : (
              <span>
                닉네임을 네 글자 이상 적어주세요. ({nickname.length} / 4)
              </span>
            )}
          </span>
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
            <select ref={jobIdRef} className={styles.select}>
              {jobs &&
                jobs[Option].children.map((job) => (
                  <option key={job.id} id={job.id} name={job.name}>
                    {job.name}
                  </option>
                ))}
            </select>
            <select ref={jobLevelRef} className={styles.select}>
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
          <input
            ref={universityRef}
            type='text'
            placeholder='ex) 인하공업전문대학'
          />
        </div>
        <footer className={styles.footer}>
          <button className={styles.button}>작성 완료</button>
        </footer>
      </form>
    </section>
  );
};

export default Join;
