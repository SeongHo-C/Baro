import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './mypage_info.module.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import UserJob from '../user_job/user_job';
import { useDispatch } from 'react-redux';
import { imageLookup } from '../../service/image_api';

const MypageInfo = ({ userData, handleChange }) => {
  const [imgSrc, setImgSrc] = useState('');
  const [file, setFile] = useState('');
  const [jobs, setJobs] = useState();
  const [jobId, setJobId] = useState();
  const [jobLevel, setJobLevel] = useState();

  const imgRef = useRef();
  const nicknameRef = useRef();
  const introduceRef = useRef();
  const url = process.env.REACT_APP_URL;
  const id = jwtDecode(localStorage.getItem('jwtToken')).sub;
  const dispatch = useDispatch();

  const updatedImg = (image) => {
    const updated = { ...userData };
    updated['imageUrl'] = image;
    handleChange(updated);
  };

  const onImgChange = (fileBlob) => {
    onImgRegister(fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        updatedImg(reader.result);
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

  const onChange = (event) => {
    if (event.currentTarget == null) {
      return;
    }

    const updated = { ...userData };
    updated[event.currentTarget.name] = event.currentTarget.value;
    handleChange(updated);
  };

  const userInfoPatch = async (userInfo) => {
    try {
      await axios.patch(`${url}/member/${id}`, userInfo).then(() => {
        alert('수정이 완료되었습니다.');
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    getJob();
  }, []);

  useEffect(() => {
    if (userData.imageUrl)
      imageLookup({ type: 'member', image: userData.imageUrl }).then(setImgSrc);
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
