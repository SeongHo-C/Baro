import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './project_create.module.css';
import axios from 'axios';
import Job from '../../components/recruit_job/recruit_job';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import jwtDecode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import setAuthorizationToken from '../../service/setAuthorizationToken';
import LeaderJob from '../../components/leader_job/leader_job';

const ProjectCreate = (props) => {
  const [selectPurpose, setSelectPurpose] = useState('사이드 프로젝트');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [imgSrc, setImgSrc] = useState('');
  const [file, setFile] = useState('');
  const imgRef = useRef();
  const [recruits, setRecruits] = useState({
    1: { id: 1, jobId: 7, recruitCount: 1 },
  });
  const [jobs, setJobs] = useState();
  const [leaderJobId, setLeaderJobId] = useState(7);

  const url = process.env.REACT_APP_URL;
  const nameRef = useRef();
  const editorRef = useRef();
  const skillRef = useRef();
  const openTalkRef = useRef();
  const purposes = ['사이드 프로젝트', '경진대회'];
  const location = useLocation();
  const loungeId = location.state ? location.state.loungeId : '';

  const navigate = useNavigate();
  const handlePurpose = (e) => {
    setSelectPurpose(e.target.value);
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
        .post(`${url}/image?type=project`, formdata)
        .then((res) => setFile(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const onImgUploadBtn = (e) => {
    e.preventDefault();
    imgRef.current.click();
  };

  const onUpdateRecruit = (recruit) => {
    const updated = { ...recruits };
    updated[recruit.id] = recruit;
    setRecruits(updated);
  };

  const deleteRecruit = (e) => {
    e.preventDefault();

    const len = Object.keys(recruits).length;

    if (len === 1) {
      alert('최소 모집인원은 한 명입니다.');
      return;
    }

    const lastRecruitId = Object.keys(recruits)[len - 1];

    const updated = { ...recruits };
    delete updated[lastRecruitId];
    setRecruits(updated);
  };

  const addRecruit = (e) => {
    e.preventDefault();

    const recruit = {
      id: Date.now(),
      jobId: 7,
      recruitCount: 1,
    };
    onUpdateRecruit(recruit);
  };

  const handleLeaderJobId = (id) => {
    setLeaderJobId(id);
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

  const onProjectCreate = async (data) => {
    const { title, thumbnailLink } = data;
    if (!title) {
      alert('프로젝트명을 입력해주세요.');
      return;
    }
    if (!thumbnailLink) {
      alert('이미지를 등록해주세요.');
      return;
    }

    try {
      await axios
        .post(`${url}/project`, data) //
        .then((response) => {
          const status = response.status;
          if (status === 201) {
            navigate('/');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const skills = skillRef.current.value.split(', ');
    const description = editorRef.current.getInstance().getHTML();
    const leaderId = jwtDecode(localStorage.getItem('jwtToken')).sub;

    const data = {
      title: nameRef.current.value || '',
      purpose: selectPurpose || '',
      thumbnailLink: file || '',
      recruitJobs: Object.values(recruits) || [],
      skillIds: skills || [],
      description: description,
      openTalkLink: openTalkRef.current.value || '',
      loungeId,
      startDate,
      endDate,
      leaderId,
      leaderJobId,
    };
    onProjectCreate(data);
  };

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      setAuthorizationToken(localStorage.getItem('jwtToken'));
    } else {
      console.log('token error');
    }
  }, []);

  useEffect(() => {
    getJob();
  }, []);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <span className={styles.headerText}>프로젝트 생성</span>
        <span className={styles.headerText2}>
          만들고 싶은 프로젝트가 있다면 바로와 같이 시작해보세요.
        </span>
      </header>
      <form className={styles.main} onSubmit={onSubmit}>
        <div className={styles.input}>
          <span className={styles.name}>프로젝트명</span>
          <div className={styles.projectName}>
            <input
              ref={nameRef}
              type='text'
              placeholder='프로젝트명을 적어주세요.'
            />
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>프로젝트 목적</span>
          <ul className={styles.purposes}>
            {purposes.map((purpose, idx) => (
              <li className={styles.purpose} key={idx}>
                <input
                  id={purpose}
                  value={purpose}
                  name='purpose'
                  type='radio'
                  checked={selectPurpose === purpose}
                  onChange={handlePurpose}
                />
                <span className={styles.purposeText}>{purpose}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>프로젝트 기간</span>
          <div className={styles.date}>
            <span className={styles.dateText}>프로젝트 시작일:</span>
            <span className={styles.datePicker}>
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setEndDate(date);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                locale={ko}
                dateFormat='yyyy-MM-dd'
              />
            </span>
          </div>
          <div className={styles.date}>
            <span className={styles.dateText}>프로젝트 종료일:</span>
            <span className={styles.datePicker}>
              <ReactDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                locale={ko}
                dateFormat='yyyy-MM-dd'
              />
            </span>
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>대표 이미지</span>
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
          <div className={styles.preview}>
            <button className={styles.previewBtn} onClick={onImgUploadBtn}>
              {imgSrc ? (
                <img className={styles.previewImg} src={imgSrc} alt='preview' />
              ) : (
                <span>
                  <i className={`fa-solid fa-camera ${styles.camera}`}></i>
                </span>
              )}
            </button>
            <div className={styles.imgUpload}>
              <button className={styles.imgUploadBtn} onClick={onImgUploadBtn}>
                이미지 업로드
              </button>
            </div>
          </div>
        </div>

        <div className={styles.input}>
          <span className={styles.name}>모집 인원</span>
          <ul>
            {jobs &&
              Object.keys(recruits).map((key) => (
                <Job
                  key={key}
                  recruit={recruits[key]}
                  onUpdate={onUpdateRecruit}
                  jobs={jobs}
                />
              ))}
          </ul>
          <div className={styles.recruitBtns}>
            <button
              className={`${styles.recruitBtn} ${styles.remove}`}
              onClick={deleteRecruit}
            >
              삭제
            </button>
            <button
              className={`${styles.recruitBtn} ${styles.add}`}
              onClick={addRecruit}
            >
              추가
            </button>
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>프로젝트 설명</span>
          <div className={styles.projectContent}>
            <Editor
              initialValue='프로젝트에 대해 설명해주세요.'
              previewStyle='vertical'
              height='400px'
              initialEditType='wysiwyg'
              useCommandShortcut={false}
              hideModeSwitch={true}
              plugins={[colorSyntax]}
              ref={editorRef}
              // language='ko-kr'
            />
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>기술/언어</span>
          {/* <span className={styles.subName}>
            주의❗ 쉼표(,) 를 사용하여 여러 기술/언어를 작성해주세요.
          </span> */}
          <div className={styles.projectSkill}>
            <input
              ref={skillRef}
              type='text'
              placeholder='ex) JavaScript, Spring'
            />
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>오픈 채팅방 주소</span>
          <div className={styles.projectChat}>
            <input
              ref={openTalkRef}
              type='text'
              placeholder='오픈 채팅방 주소를 적어주세요.'
            />
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>리더 담당</span>
          {<LeaderJob jobs={jobs} onUpdate={handleLeaderJobId} />}
        </div>
        <footer className={styles.footer}>
          <button className={styles.footerBtn}>작성 완료</button>
        </footer>
      </form>
    </section>
  );
};

export default ProjectCreate;
