import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './image_card.module.css';

const ImageCard = ({ image }) => {
  const [imgSrc, setImgSrc] = useState('');

  const url = process.env.REACT_APP_URL;

  const getImage = async () => {
    try {
      axios
        .get(`${url}/image/project/${image}`, {
          responseType: 'blob',
        })
        .then((response) => {
          const reader = new FileReader();
          reader.readAsDataURL(response.data);
          return new Promise((resolve) => {
            reader.onload = () => {
              setImgSrc(reader.result);
              resolve();
            };
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <section className={styles.imageCard}>
      {imgSrc && (
        <img className={styles.img} src={imgSrc} alt='프로젝트 이미지' />
      )}
    </section>
  );
};
export default ImageCard;
