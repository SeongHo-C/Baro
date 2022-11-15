import React, { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './rounge.module.css';
import axios from 'axios';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import RoungeCard from '../../components/rounge_card/rounge_card';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getRounge } from '../../slices/rounge/roungeSlice';
import Paging from '../../components/paging/paging';

const Rounge = (props) => {
  const [page, setPage] = useState(1);
  const editorRef = useRef();
  const dispatch = useDispatch();

  const url = process.env.REACT_APP_URL;

  const isLoginId = jwtDecode(localStorage.getItem('jwtToken')).sub;

  const datas = useSelector((state) => state.rounge.data);
  const totalElements = useSelector((state) => state.rounge.totalElements);

  const onRegister = async (e) => {
    const content = editorRef.current.getInstance().getHTML();

    try {
      await axios.post(`${url}/lounge`, {
        content,
        memberId: isLoginId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleRounge = () => {
    dispatch(getRounge(page));
  };

  useEffect(() => {
    handleRounge();
  }, [page]);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <span className={styles.headerText}>라운지</span>
        <span className={styles.headerText2}>나의 아이디어가 세상으로 🙏</span>
      </header>
      <form className={styles.main} onSubmit={onRegister}>
        <div className={styles.input}>
          <span className={styles.name}>아이디어를 말해봐요~</span>
          <div className={styles.editor}>
            <Editor
              initialValue={
                !isLoginId
                  ? '<span style="color: red">로그인을 해주셔야 작성 버튼이 나타납니다.</span>'
                  : ''
              }
              previewStyle='vertical'
              height='250px'
              initialEditType='wysiwyg'
              useCommandShortcut={false}
              hideModeSwitch={true}
              plugins={[colorSyntax]}
              ref={editorRef}
            />
            <div className={styles.registerBtnPos}>
              {isLoginId && (
                <button className={styles.registerBtn}>등록</button>
              )}
            </div>
          </div>
        </div>
      </form>
      <div className={styles.listsStyle}>
        <ul className={styles.lists}>
          {datas &&
            Object.keys(datas).map((key) => (
              <RoungeCard key={datas[key].id} data={datas[key]} />
            ))}
        </ul>
        {totalElements.length !== 0 && (
          <Paging
            onPageChange={handlePageChange}
            totalElements={totalElements}
            page={page}
            size={5}
          />
        )}
      </div>
    </section>
  );
};

export default Rounge;
