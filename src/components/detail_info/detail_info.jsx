import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Modal from '../modal/modal';
import ProfileCard from '../profile_card/profile_card';
import styles from './detail_info.module.css';

const DetailInfo = ({ data }) => {
  const { jobs, leaderId, id, state } = data.summary;
  const {
    description,
    loungeId,
    startDate,
    endDate,
    skill,
    ideaProviderName,
    team,
    applicants,
  } = data;
  const url = process.env.REACT_APP_URL;
  const jwtToken = localStorage.getItem('jwtToken');
  const loginId = jwtToken && jwtDecode(jwtToken).sub;
  const [apply, setApply] = useState(false);
  const [member, setMember] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const getDate = (start, end) => {
    const st = new Date(start).getTime();
    const et = new Date(end).getTime();

    const sec = parseInt(et - st) / 1000;
    const days = parseInt(sec / 60 / 60 / 24);

    return days;
  };

  console.log(data);
  const handleProjectApply = async (jobId) => {
    if (loginId !== null) {
      try {
        await axios
          .post(`${url}/project/apply`, {
            projectId: id,
            jobId,
          })
          .then(() => setApply(true));
      } catch (error) {
        console.log(error);
      }
    } else {
      openModal();
    }
  };

  const handleProjectReject = async () => {
    try {
      await axios
        .post(`${url}/project/apply/cancel/${id}`)
        .then(() => setApply(false));
    } catch (error) {
      console.log(error);
    }
  };

  const applyCheck = () => {
    let check = false;
    applicants.map((applicant) => {
      if (applicant.memberId === loginId) {
        check = true;
      }
    });
    setApply(check);
  };

  const memberCheck = () => {
    let check = false;
    team.map((member) => {
      if (member.memberId === loginId) {
        check = true;
      }
    });
    setMember(check);
  };

  useEffect(() => {
    applyCheck();
    memberCheck();
  }, []);

  return (
    <section className={styles.detailInfo}>
      <div className={styles.container}>
        <span className={styles.name}>모집 현황</span>
        <div className={styles.recruitInfo}>
          {jobs.map((job) => (
            <div key={job.jobId} className={styles.recruitCard}>
              <span className={styles.recruitJob}>{job.jobName}</span>
              <span
                style={{ color: 'red' }}
              >{`${job.completeCount} / ${job.recruitCount}`}</span>
              {job.completeCount === job.recruitCount ? (
                <button
                  className={`${styles.recruitBtn} ${styles.rejectBtn}`}
                  disabled
                >
                  모집 완료
                </button>
              ) : member ? (
                ''
              ) : apply ? (
                <button
                  className={`${styles.recruitBtn} ${styles.rejectBtn}`}
                  onClick={handleProjectReject}
                >
                  지원 취소
                </button>
              ) : (
                <button
                  className={styles.recruitBtn}
                  onClick={() => handleProjectApply(job.jobId)}
                >
                  지원
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.container}>
        <span className={styles.description}>소개</span>
        <span dangerouslySetInnerHTML={{ __html: description }}></span>
        {loungeId && (
          <div className={styles.ideas}>
            <span className={styles.idea}>
              @ good idea of lee1234{`@ good idea of ${ideaProviderName}`}
            </span>
          </div>
        )}
      </div>
      <div className={styles.container}>
        <span className={styles.name}>프로젝트 기간</span>
        <span>{`${startDate} ~ ${endDate} (${getDate(
          startDate,
          endDate
        )}일)`}</span>
      </div>
      <div className={styles.container}>
        <span className={styles.name}>기술/언어</span>
        <div className={styles.techs}>
          {skill &&
            skill.map((skill) => (
              <span key={skill} className={styles.tech}>
                <img
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.toLowerCase()}/${skill.toLowerCase()}-original.svg`}
                  alt={''}
                />
                <span>{skill}</span>
              </span>
            ))}
        </div>
      </div>
      <div className={styles.leaderInfo}>
        <span className={styles.name}>리더</span>
        {team.length > 0 && <ProfileCard data={team[0]} />}
      </div>
      <div className={styles.memberInfo}>
        <span className={styles.memberTxt}>멤버</span>
        {state === 'R' ? (
          <span className={styles.memberSubTxt}>
            이 프로젝트는 지원을 기다리는 중😁
          </span>
        ) : (
          <span className={styles.memberSubTxt}>
            이 프로젝트는 더이상 지원할 수 ❌
          </span>
        )}
        {team.length > 1 &&
          team.map((member) => {
            if (member.memberId !== leaderId) {
              return <ProfileCard key={member.id} data={member} />;
            }
          })}
      </div>
      {modalOpen && (
        <Modal open={modalOpen} close={closeModal}>
          <div className={styles.modal}>
            <div className={styles.modalText}>
              <span>아이디어 공유부터 팀빌딩까지</span>
              <span>이곳에서 바로!</span>
            </div>
            <a href='http://bestinwoo.hopto.org:8080/oauth2/authorization/google'>
              <img src='../../images/google.png' alt='' />
            </a>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default DetailInfo;
