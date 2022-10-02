import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Join from './screens/join/join';
import Main from './screens/main/main';
import Oauth from './screens/oauth/oauth';
import Project from './screens/project/project';
import Ranking from './screens/ranking/ranking';
import Rounge from './screens/rounge/rounge';
import setAuthorizationToken from './service/setAuthorizationToken';
import { add } from './slices/loginSlice';
import jwtDecode from 'jwt-decode';

const App = (props) => {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' exact element={<Main />} />
        <Route path='/main' element={<Main />} />
        <Route path='/project' element={<Project />} />
        <Route path='/rounge' element={<Rounge />} />
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/join' element={<Join />} />
        <Route path='/oauth/saving' element={<Oauth />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
