import { Viewer } from '@toast-ui/react-editor';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './detail_result.module.css';

const DetailResult = (props) => {
  const [data, setData] = useState();

  const url = process.env.REACT_APP_URL;
  const id = useParams().id;

  const getProjectResult = async () => {
    try {
      await axios
        .get(`${url}/project/completion/${id}`)
        .then((res) => setData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectResult();
  }, []);
  console.log(data);
  return (
    <section className={styles.detailResult}>
      {data && (
        <>
          <div className={styles.container}>
            <span className={styles.name}>프로젝트 개요</span>
            <span>{data.summary}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.name}>개발 설명</span>
            <span dangerouslySetInnerHTML={{ __html: data.description }}></span>
          </div>
          <div className={styles.container}>
            <span className={styles.name}>성과</span>
            <span>{data.projectResult}</span>
          </div>
          <div className={styles.container}>
            <span className={styles.name}>깃허브 주소</span>
            <span>
              {data.githubLink
                ? data.githubLink
                : '깃허브 주소가 존재하지 않습니다.'}
            </span>
          </div>
          <div className={styles.footer}>
            <span className={styles.name}>프로젝트 이미지</span>
            <span></span>
          </div>
        </>
      )}
    </section>
  );
};

export default DetailResult;
