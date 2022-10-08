import React from 'react';
import RankingSoloCard from '../ranking_solo_card/ranking_solo_card';
import styles from './ranking_solo.module.css';

const RankingSolo = (props) => {
  const data = {
    1: {
      id: 1,
      ranking: 1,
      school: '인하공업전문대학',
      point: 20000,
      name: '이성호',
    },
    2: {
      id: 2,
      ranking: 2,
      school: '인하공업전문대학',
      point: 20000,
      name: '이성호',
    },
    3: {
      id: 3,
      ranking: 3,
      school: '인하공업전문대학',
      point: 20000,
      name: '이성호',
    },
    4: {
      id: 4,
      ranking: 4,
      school: '인하공업전문대학',
      point: 20000,
      name: '이성호',
    },
    5: {
      id: 5,
      ranking: 5,
      school: '인하공업전문대학',
      point: 20000,
      name: '이성호',
    },
    6: {
      id: 6,
      ranking: 6,
      school: '인하공업전문대학',
      point: 20000,
      name: '이성호',
    },
    7: {
      id: 7,
      ranking: 7,
      school: '인하공업전문대학',
      point: 20000,
      name: '이성호',
    },
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>순위</th>
          <th>이름</th>
          <th>학교명</th>
          <th>포인트</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((key) => (
          <RankingSoloCard key={key} data={data[key]} />
        ))}
      </tbody>
    </table>
  );
};

export default RankingSolo;
