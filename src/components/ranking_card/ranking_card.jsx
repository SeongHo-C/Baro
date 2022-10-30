import React from 'react';
import styles from './ranking_card.module.css';

const RankingCard = ({ data, rank }) => {
  console.log(data);
  const { university, point, personnel } = data;

  return (
    <tr>
      <td>{rank}</td>
      <td>{university}</td>
      <td>{point}</td>
      <td>{personnel}</td>
    </tr>
  );
};
export default RankingCard;
