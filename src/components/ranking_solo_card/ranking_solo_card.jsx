import React from 'react';
import styles from './ranking_solo_card.module.css';

const RankingSoloCard = ({ data, rank }) => {
  const { university, nickname, point } = data;

  return (
    <tr className={styles.card}>
      <td>{rank}</td>
      <td>{university}</td>
      <td>{nickname}</td>
      <td>{point}</td>
    </tr>
  );
};
export default RankingSoloCard;
