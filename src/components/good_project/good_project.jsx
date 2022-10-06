import React, { useState } from 'react';
import GoodProjectCard from '../good_project_card/good_project_card';
import styles from './good_project.module.css';

const GoodProject = (props) => {
  const [data, setData] = useState({
    1: {
      id: 1,
      kind: '사이드 프로젝트',
      image_url: '../../../images/testImage.png',
      project_name: '아이디어 공유 및 팀빌딩 서비스',
      content: '아이디어를 공유하고 팀을 빌딩해보세요~',
      member: 4,
      currentMember: 1,
      cnt: 20,
      recruit: '웹서버',
    },
    2: {
      id: 2,
      kind: '사이드 프로젝트',
      image_url: '../../../images/testImage.png',
      project_name: '아이디어 공유 및 팀빌딩 서비스',
      content: '아이디어를 공유하고 팀을 빌딩해보세요~',
      member: 4,
      currentMember: 1,
      cnt: 20,
      recruit: '웹서버',
    },
    3: {
      id: 3,
      kind: '사이드 프로젝트',
      image_url: '../../../images/testImage.png',
      project_name: '아이디어 공유 및 팀빌딩 서비스',
      content:
        '이 프로젝트는 아이디어를 공유하는 프로젝트입니다. 대학교에 다니고있는 친구들이 프로젝트를 하는데 있어서 부담감을 줄일 수 있도록 하기 위함입니다.',
      member: 4,
      currentMember: 1,
      cnt: 20,
      recruit: '웹서버',
    },
  });

  return (
    <section className={styles.goodProject}>
      <h1>주목할만한 프로젝트</h1>
      <ul className={styles.projects}>
        {Object.keys(data).map((key) => (
          <GoodProjectCard key={key} data={data[key]} />
        ))}
      </ul>
    </section>
  );
};
export default GoodProject;
