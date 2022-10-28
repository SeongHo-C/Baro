import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './mypage_info.module.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor, Viewer } from '@toast-ui/react-editor';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import UserJob from '../user_job/user_job';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from '../../slices/loginSlice';
import { onRefresh } from '../../service/Login';

const MypageInfo = (props) => {
  const [imgSrc, setImgSrc] = useState('');
  const [file, setFile] = useState('');
  const [userData, setUserData] = useState('');
  const [email, setEmail] = useState('');
  const [jobs, setJobs] = useState();
  const [jobId, setJobId] = useState();
  const [jobLevel, setJobLevel] = useState();

  const imgRef = useRef();
  const editorRef = useRef();
  const emailRef = useRef();
  const nicknameRef = useRef();
  const jobLevelRef = useRef();
  const introduceRef = useRef();
  const url = process.env.REACT_APP_URL;
  const id = jwtDecode(localStorage.getItem('jwtToken')).sub;
  const dispatch = useDispatch();

  const getUserInfo = async (id) => {
    try {
      await axios
        .get(`${url}/member/${id}`)
        .then((res) => setUserData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getImage = async (image) => {
    try {
      axios
        .get(`${url}/image/member/${image}`, {
          responseType: 'blob',
        })
        .then((response) => {
          const reader = new FileReader();
          reader.readAsDataURL(response.data);
          return new Promise((resolve) => {
            reader.onload = () => {
              setImgSrc(reader.result);
              resolve();
            };
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onImgChange = (fileBlob) => {
    onImgRegister(fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        resolve();
      };
    });
  };

  const onImgRegister = async (file) => {
    const formdata = new FormData();
    formdata.append('file', file);
    try {
      await axios
        .post(`${url}/image?type=member`, formdata)
        .then((res) => setFile(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const imgUploadClick = (e) => {
    e.preventDefault();

    imgRef.current.click();
  };

  const onChange = (event) => {
    if (event.currentTarget == null) {
      return;
    }

    const updated = { ...userData };
    updated[event.currentTarget.name] = event.currentTarget.value;
    setUserData(updated);
  };

  const getJob = useCallback(async () => {
    try {
      await axios.get(`${url}/job`).then((response) => {
        setJobs(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  });

  const handleJobId = (jobId) => {
    setJobId(jobId);
  };

  const handleJobLevel = (jobLevel) => {
    setJobLevel(jobLevel);
  };

  const userInfoPatch = async (userInfo) => {
    const user = jwtDecode(localStorage.getItem('jwtToken'));

    try {
      await axios.patch(`/member/${id}`, userInfo).then(() => {
        alert('수정이 완료되었습니다.');
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userData);
  const onSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      imageUrl: file || '',
      jobId: jobId || userData.jobId,
      jobLevel: jobLevel || userData.jobLevel,
      introduce: introduceRef.current.value,
      nickname: nicknameRef.current.value,
    };

    userInfoPatch(userInfo);
  };

  useEffect(() => {
    getUserInfo(id);
    getJob();
  }, []);

  useEffect(() => {
    if (userData.imageUrl) getImage(userData.imageUrl);
  }, [userData]);

  return (
    <section>
      {userData && (
        <form className={styles.container} onSubmit={onSubmit}>
          <header className={styles.header}>
            <input
              ref={imgRef}
              type='file'
              className={styles.imgInput}
              accept='.jpg, .png'
              name='file'
              onChange={(e) => {
                onImgChange(e.target.files[0]);
              }}
            />
            <img
              className={styles.img}
              src={imgSrc ? imgSrc : '../../images/user.png'}
              alt=''
            />
            <button className={styles.imgBtn} onClick={imgUploadClick}>
              <i className='fa-solid fa-pencil'></i>
            </button>
            <span>{userData.nickname}</span>
          </header>
          <main className={styles.main}>
            <span className={styles.info}>정보</span>
            <ul>
              <li className={styles.card}>
                <div className={styles.cardStyle}>
                  <span className={styles.title}>이메일</span>
                  <input
                    type='email'
                    name='email'
                    value={userData.email}
                    disabled
                  />
                </div>
              </li>
              <li className={styles.card}>
                <div className={styles.cardStyle}>
                  <span className={styles.title}>닉네임</span>
                  <input
                    ref={nicknameRef}
                    type='text'
                    name='nickname'
                    value={userData.nickname}
                    onChange={onChange}
                    minLength={4}
                    maxLength={10}
                    placeholder='4 ~ 10자리 이내로 적어주세요!'
                  />
                </div>
              </li>
              <li className={styles.card}>
                <div className={styles.cardStyle}>
                  <span className={styles.title}>직무</span>
                  {
                    <UserJob
                      jobs={jobs}
                      onUpdateJobId={handleJobId}
                      onUpdateJobLevel={handleJobLevel}
                      jobParentName={userData.jobParentName}
                      jobChildName={userData.jobChildName}
                      jobLevel={userData.jobLevel}
                    />
                  }
                </div>
              </li>
              <li className={styles.card}>
                <div className={styles.cardStyle}>
                  <span className={styles.title}>학교</span>
                  <input type='text' value={userData.school} disabled />
                </div>
              </li>
              <li className={styles.card}>
                <span className={styles.title}>소개</span>
                <div className={styles.introduce}>
                  <textarea
                    ref={introduceRef}
                    maxLength='200'
                    name='introduce'
                    value={userData.introduce || ''}
                    onChange={onChange}
                  ></textarea>
                </div>
              </li>
            </ul>
            <footer className={styles.footer}>
              <button className={styles.button}>저장 하기</button>
            </footer>
          </main>
        </form>
      )}
    </section>
  );
};

export default MypageInfo;
