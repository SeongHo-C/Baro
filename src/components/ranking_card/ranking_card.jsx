import React from 'react';
import styles from './ranking_card.module.css';

const RankingCard = ({ data }) => {
  const { ranking, school, point, student } = data;

  return (
    <tr>
      <td>{ranking}</td>
      <td>{school}</td>
      <td>{point}</td>
      <td>{student}</td>
    </tr>
  );
};
export default RankingCard;
