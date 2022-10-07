import React, { useEffect, useRef, useState } from 'react';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './rounge.module.css';
import axios from 'axios';
import Job from '../../components/job/job';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

const Rounge = (props) => {
  const editorRef = useRef();
  const url = process.env.REACT_APP_URL;

  const onRegister = (e) => {
    e.preventDefault();

    console.log(editorRef.current.getInstance().getHTML());
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <span className={styles.headerText}>라운지</span>
        <span className={styles.headerText2}>나의 아이디어가 세상으로 🙏</span>
      </header>
      <form className={styles.main}>
        <div className={styles.input}>
          <span className={styles.name}>아이디어를 말해봐요~</span>
          <div className={styles.editor}>
            <Editor
              initialValue='hello'
              previewStyle='vertical'
              height='250px'
              initialEditType='wysiwyg'
              useCommandShortcut={false}
              hideModeSwitch={true}
              plugins={[colorSyntax]}
              ref={editorRef}
            />
            <div className={styles.registerBtnPos}>
              <button className={styles.registerBtn} onClick={onRegister}>
                등록
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Rounge;
