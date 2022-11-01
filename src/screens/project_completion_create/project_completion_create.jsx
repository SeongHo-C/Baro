import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './project_completion_create.module.css';
import axios from 'axios';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';

const ProjectCreate = (props) => {
  const [imgSrc, setImgSrc] = useState();
  const [file, setFile] = useState([]);

  const content = `<h2>1. 프로젝트 기능 명세</h2>
<p>ex) 홈 - 최신 프로젝트를 볼 수 있는 페이지이다.</p>
<h2>2. 프로젝트 완성 후기</h2>
 <p>ex) 이성호 - 프로젝트를 하며 웹 서비스에 대한 이해도가 높아졌다.</p>`;

  const url = process.env.REACT_APP_URL;
  const summaryRef = useRef();
  const editorRef = useRef();
  const resultRef = useRef();
  const githubRef = useRef();
  const imgRef = useRef();
  const id = useParams().id;

  const navigate = useNavigate();

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          right: '1.3rem',
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          zIndex: 1,
          left: '0.1rem',
        }}
        onClick={onClick}
      />
    );
  }

  const onImgRegister = async (file, fileList) => {
    const formdata = new FormData();
    formdata.append('file', file);
    try {
      await axios.post(`${url}/image?type=project`, formdata).then((res) => {
        fileList.push(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const onImgChange = (fileBlob) => {
  //   onImgRegister(fileBlob);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(fileBlob);
  //   return new Promise((resolve) => {
  //     reader.onload = () => {
  //       setImgSrc(reader.result);
  //       resolve();
  //     };
  //   });
  // };

  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    const imageUrlLists = [];
    const fileList = [];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);

      onImgRegister(imageLists[i], fileList);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setImgSrc(imageUrlLists);
    setFile(fileList);
  };

  const onImgUploadBtn = (e) => {
    e.preventDefault();
    imgRef.current.click();
  };

  const onProjectCompletion = async (data) => {
    try {
      await axios
        .post(`${url}/project/completion`, data)
        .then(() => navigate(`/detail/${id}`));
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const description = editorRef.current.getInstance().getHTML();
    console.log(description);
    const data = {
      summary: summaryRef.current.value || '',
      description,
      projectResult: resultRef.current.value || '',
      githubLink: githubRef.current.value || '',
      imageList: file,
      projectId: id,
    };

    console.log(data);
    onProjectCompletion(data);
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <span className={styles.headerText}>프로젝트 완성작 생성</span>
        <span className={styles.headerText2}>
          완성된 프로젝트를 모두에게 자랑해보세요~😎
        </span>
      </header>
      <form className={styles.main} onSubmit={onSubmit}>
        <div className={styles.input}>
          <span className={styles.name}>프로젝트 개요</span>
          <div>
            <textarea
              ref={summaryRef}
              maxLength='200'
              name='summary'
              className={styles.projectSummary}
              placeholder='ex) 아이디어 공유 및 팀 빌딩 서비스이다.'
            ></textarea>
          </div>
        </div>
        <div className={styles.input}>
          <span className={styles.name}>개발 설명</span>
          <div className={styles.projectContent}>
            <Editor
              initialValue={content}
              previewStyle='vertical'
              height='400px'
              initialEditType='wysiwyg'
              useCommandShortcut={false}
              hideModeSwitch={true}
              plugins={[colorSyntax]}
              ref={editorRef}
              // language='ko-kr'
            />
          </div>
          <div className={styles.input}>
            <span className={styles.name}>성과</span>
            <div>
              <input
                ref={resultRef}
                type='text'
                className={styles.result}
                placeholder='ex) SW 개발 보안 경진대회 대상 수상'
              />
            </div>
          </div>
          <div className={styles.input}>
            <span className={styles.name}>깃허브 주소</span>
            <div>
              <input
                ref={githubRef}
                type='text'
                className={styles.github}
                placeholder='ex) https://github.com/SeongHo-C'
              />
            </div>
          </div>
          <div className={styles.input}>
            <span className={styles.name}>프로젝트 이미지</span>
            <input
              ref={imgRef}
              type='file'
              multiple
              className={styles.imgInput}
              accept='.jpg, .png'
              name='file'
              onChange={handleAddImages}
            />
            {/* <Slider className={styles.new} {...settings}>
              {recentProjects &&
                recentProjects.map((project) => (
                  <NewProject key={project.id} project={project} />
                ))}
            </Slider> */}
            <div className={styles.preview}>
              <div className={styles.previewBtn}>
                {imgSrc ? (
                  <Slider className={styles.slider} {...settings}>
                    {imgSrc.map((img) => (
                      <div key={img}>
                        <img
                          className={styles.previewImg}
                          src={img}
                          alt='preview'
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <span className={styles.cameraImg}>
                    <i className={`fa-solid fa-camera ${styles.camera}`}></i>
                  </span>
                )}
              </div>
              <div className={styles.imgUpload}>
                <button
                  className={styles.imgUploadBtn}
                  onClick={onImgUploadBtn}
                >
                  이미지 업로드
                </button>
              </div>
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <button className={styles.footerBtn}>작성 완료</button>
        </footer>
      </form>
    </section>
  );
};

export default ProjectCreate;
