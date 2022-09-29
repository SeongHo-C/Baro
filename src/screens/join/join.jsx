import React, { useEffect, useRef, useState } from 'react';
import styles from './join.module.css';

const Join = (props) => {
  const [firstOption, setFirtstOption] = useState();
  const selectRef = useRef();

  const kinds = [
    { value: 1, name: '프론트엔드개발' },
    { value: 2, name: '백엔드개발' },
    { value: 3, name: '디자인' },
  ];

  const secondKinds = {
    프론트엔드개발: [
      { value: 1, name: 'IOS' },
      { value: 2, name: '안드로이드' },
      { value: 3, name: '웹프론트엔드' },
    ],
    백엔드개발: [
      { value: 1, name: '웹 서버' },
      { value: 2, name: '블록체인' },
      { value: 3, name: 'AI' },
    ],
    디자인: [
      { value: 1, name: '그래픽디자인' },
      { value: 2, name: 'UI/UX디자인' },
      { value: 3, name: '3D디자인' },
    ],
  };

  const thirdKinds = [
    { value: 1, name: '초보' },
    { value: 2, name: '중수' },
    { value: 3, name: '고수' },
  ];

  const handleChangeSelect = () => {
    setFirtstOption(selectRef.current.value);
  };

  useEffect(() => {
    handleChangeSelect();
  }, []);

  console.log(selectRef.current);
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <span className={styles.headerText}>본 캐릭터 설정</span>
        <span className={styles.headerText2}>회원 가입이 바로 완료됩니다.</span>
      </header>
      <form className={styles.main}>
        <div className={styles.input}>
          <span className={styles.name}>이메일</span>
          <div className={styles.email}>
            <input type='text' value='leeseong010@naver.com' disabled />
            <span className={styles.emailText}>인증 완료</span>
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>닉네임</span>
          <input type='text' />
        </div>
        <div className={styles.input}>
          <span className={styles.name}>직무</span>
          <div className={styles.selectBox}>
            <select
              ref={selectRef}
              className={styles.select}
              onChange={handleChangeSelect}
            >
              {kinds.map((kind) => (
                <option key={kind.value} name={kind.value}>
                  {kind.name}
                </option>
              ))}
            </select>

            <select className={styles.select}>
              {firstOption &&
                secondKinds[firstOption].map((kind) => (
                  <option key={kind.value} name={kind.value}>
                    {kind.name}
                  </option>
                ))}
            </select>
            <select className={styles.select}>
              {thirdKinds.map((kind) => (
                <option key={kind.value} name={kind.value}>
                  {kind.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>학교</span>
          <input type='text' />
        </div>
        <footer className={styles.footer}>
          <button className={styles.button}>가입 완료</button>
        </footer>
      </form>
    </section>
  );
};

export default Join;
