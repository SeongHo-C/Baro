import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './screens/main/main';
import Project from './screens/project/project';
import Ranking from './screens/ranking/ranking';
import Rounge from './screens/rounge/rounge';

const App = (props) => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' exact element={<Main />} />
        <Route path='/main' element={<Main />} />
        <Route path='/project' exact element={<Project />} />
        <Route path='/rounge' exact element={<Rounge />} />
        <Route path='/ranking' exact element={<Ranking />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
