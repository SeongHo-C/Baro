import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import RankingCard from '../ranking_card/ranking_card';
import styles from './ranking_team.module.css';

const RankingTeam = (props) => {
  const [rank, setRank] = useState();
  const [page, setPage] = useState(1);
  const url = process.env.REACT_APP_URL;

  const getRankingTeam = async () => {
    try {
      await axios
        .get(`${url}/rank/school?page=${page}&size=8`)
        .then((res) => res.data)
        .then((data) => setRank(data.content));
    } catch (error) {
      console.log(error);
    }
  };

  const getRank = (key) => {
    return (page - 1) * 10 + (Number(key) + 1);
  };

  useEffect(() => {
    getRankingTeam();
  }, []);

  console.log(rank);
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
        {rank &&
          Object.keys(rank).map((key) => {
            return (
              <RankingCard
                key={key}
                data={rank[key]}
                rank={`${getRank(key)}`}
              />
            );
          })}
      </tbody>
    </table>
  );
};

export default RankingTeam;
