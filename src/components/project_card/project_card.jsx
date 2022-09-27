import React from 'react';
import styles from './project_card.module.css';

const ProjectCard = ({ project }) => {
  const { id, image_url, kind, project_name, tech, complete, member, cnt } =
    project;

  const onClick = () => {
    console.log(id);
  };
  return (
    <li className={styles.container} onClick={onClick}>
      <img className={styles.img} src={image_url} alt='' />
      <div className={styles.info}>
        <span className={styles.kind}>{kind}</span>
        <span className={styles.projectName}>{project_name}</span>
        <div className={styles.techCount}>
          <span className={styles.tech}>{tech}</span>
          <span className={styles.count}>
            <i className='fa-regular fa-eye'></i>
            {cnt}
          </span>
        </div>
      </div>
      <div className={styles.recruit}>
        <span>모집완료</span>
        <span className={styles.recruitText}>{`${complete}/${member}`}</span>
      </div>
    </li>
  );
};

export default ProjectCard;
