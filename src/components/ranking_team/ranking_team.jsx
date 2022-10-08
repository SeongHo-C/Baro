import React from 'react';
import RankingCard from '../ranking_card/ranking_card';
import styles from './ranking_team.module.css';

const RankingTeam = (props) => {
  const data = {
    1: {
      id: 1,
      ranking: 1,
      school: '인하공업전문대학',
      point: 20000,
      student: 2000,
    },
    2: {
      id: 2,
      ranking: 2,
      school: '인하공업전문대학',
      point: 20000,
      student: 2000,
    },
    3: {
      id: 3,
      ranking: 3,
      school: '인하공업전문대학',
      point: 20000,
      student: 2000,
    },
    4: {
      id: 4,
      ranking: 4,
      school: '인하공업전문대학',
      point: 20000,
      student: 2000,
    },
    5: {
      id: 5,
      ranking: 5,
      school: '인하공업전문대학',
      point: 20000,
      student: 2000,
    },
    6: {
      id: 6,
      ranking: 6,
      school: '인하공업전문대학',
      point: 20000,
      student: 2000,
    },
    7: {
      id: 7,
      ranking: 7,
      school: '인하공업전문대학',
      point: 20000,
      student: 2000,
    },
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>순위</th>
          <th>학교명</th>
          <th>포인트</th>
          <th>인원</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((key) => (
          <RankingCard key={key} data={data[key]} />
        ))}
      </tbody>
    </table>
  );
};

export default RankingTeam;
