import axios from 'axios';
import React from 'react';
import ProfileCard from '../profile_card/profile_card';
import styles from './detail_manage.module.css';

const DetailManage = ({ data, getData }) => {
  const url = process.env.REACT_APP_URL;
  const { jobs, leaderId } = data.summary;
  const { team, applicants } = data;

  const onAccept = async (id) => {
    try {
      await axios.post(`${url}/project/apply/${id}`).then(() => getData());
    } catch (error) {
      console.log(error);
    }
  };

  const onReject = async (id) => {
    try {
      await axios.delete(`${url}/project/apply/${id}`).then(() => getData());
    } catch (error) {
      console.log(error);
    }
  };

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
            </div>
          ))}
        </div>
      </div>

      <div className={styles.leaderInfo}>
        <span className={styles.name}>현재 멤버 정보</span>
        {team.length > 1 ? (
          team.map((member) => {
            if (member.memberId !== leaderId) {
              return <ProfileCard key={member.id} data={member} />;
            }
          })
        ) : (
          <span>같이할 멤버를 기다리는 중~😢</span>
        )}
      </div>
      <div className={styles.memberInfo}>
        <span className={styles.memberTxt}>지원자</span>
        <ul className={styles.applicationCards}>
          {applicants.length > 0 ? (
            applicants.map((applicant) => (
              <li className={styles.applicationCard} key={applicant.id}>
                <ProfileCard data={applicant} />
                <div className={styles.btns}>
                  <button
                    className={styles.btn}
                    onClick={() => onAccept(applicant.id)}
                  >
                    지원 수락
                  </button>
                  <button
                    className={`${styles.btn} ${styles.rejectBtn}`}
                    onClick={() => onReject(applicant.id)}
                  >
                    지원 거절
                  </button>
                </div>
              </li>
            ))
          ) : (
            <span>이 프로젝트는 지원을 기다리는 중😁</span>
          )}
        </ul>
      </div>
    </section>
  );
};

export default DetailManage;
