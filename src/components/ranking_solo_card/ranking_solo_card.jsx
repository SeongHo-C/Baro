import React from 'react';
import styles from './ranking_solo_card.module.css';

const RankingSoloCard = ({ data }) => {
  const { ranking, school, point, name } = data;

  return (
    <tr className={styles.card}>
      <td>{ranking}</td>
      <td>{name}</td>
      <td>{school}</td>
      <td>{point}</td>
    </tr>
  );
};
export default RankingSoloCard;
