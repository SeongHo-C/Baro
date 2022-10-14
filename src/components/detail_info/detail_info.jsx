import React from 'react';
import ProfileCard from '../profile_card/profile_card';
import styles from './detail_info.module.css';

const DetailInfo = ({ data }) => {
  const { jobs, leaderId } = data.summary;
  const {
    description,
    loungeId,
    startDate,
    endDate,
    skill,
    ideaProviderName,
    team,
  } = data;

  console.log(team[0]);
  const getSkill = (skill) => {
    return skill.toLowerCase();
  };

  const getDate = (start, end) => {
    const st = new Date(start).getTime();
    const et = new Date(end).getTime();

    const sec = parseInt(et - st) / 1000;
    const days = parseInt(sec / 60 / 60 / 24);

    return days;
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
              <button className={styles.recruitBtn}>지원</button>
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
        {<ProfileCard data={team[0]} />}
      </div>
      <div className={styles.memberInfo}>
        <span className={styles.memberTxt}>멤버</span>
        <span className={styles.memberSubTxt}>
          이 프로젝트는 지원을 기다리는 중😁
        </span>
        {team.length > 1 &&
          team.map((member) => {
            if (member.memberId !== leaderId) {
              return <ProfileCard data={member} />;
            }
          })}
      </div>
    </section>
  );
};

export default DetailInfo;
