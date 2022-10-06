import React, { useState } from 'react';
import styles from './new_project.module.css';

const NewProject = (props) => {
  const [data, setData] = useState({
    id: 1,
    kind: '사이드 프로젝트',
    image_url: '../../../images/testImage.png',
    project_name: '아이디어 공유 및 팀빌딩 서비스',
    content: '아이디어를 공유하고 팀을 빌딩해보세요~',
    member: 4,
    currentMember: 1,
    cnt: 20,
  });

  return (
    <section className={styles.newProject}>
      <h1 className={styles.title}>신규 프로젝트</h1>
      <div className={styles.container}>
        <img className={styles.img} src={data.image_url} alt='' />
        <div className={styles.info}>
          <span className={styles.kind}>사이드 프로젝트</span>
          <span className={styles.name}>아이디어 공유 및 팀빌딩 서비스</span>
          <span className={styles.content}>
            이 프로젝트는 아이디어를 공유하는 프로젝트입니다. 대학교에 다니고
            있는 친구들이 프로젝트를 하는데 있어서 부담감을 줄일 수 있도록 하기
            위함입니다. 하하하하
          </span>
        </div>
        <div className={styles.subContent}>
          <span className={styles.count}>
            <i className='fa-regular fa-eye'></i>
            {` ${data.cnt}`}
          </span>
          <span>모집완료 {`${data.currentMember} / ${data.member}`}</span>
        </div>
      </div>
    </section>
  );
};

export default NewProject;
