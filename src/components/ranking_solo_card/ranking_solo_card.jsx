import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ranking_solo_card.module.css';

const RankingSoloCard = ({ data, rank }) => {
  const { id, university, nickname, point } = data;

  const navigate = useNavigate();
  const moveProfile = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <tr className={styles.card} onClick={moveProfile}>
      <td>{rank}</td>
      <td>{university}</td>
      <td>{nickname}</td>
      <td>{point}</td>
    </tr>
  );
};
export default RankingSoloCard;
