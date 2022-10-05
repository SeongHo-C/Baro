import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import setAuthorizationToken from '../../service/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../slices/loginSlice';
import axios from 'axios';

const Oauth = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_URL;

  const onRefresh = async () => {
    const accessToken = localStorage.getItem('jwtToken');
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      await axios
        .post(`${url}/token/reissue`, {
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
        .then((response) => response.data)
        .then((data) => {
          onLoginSuccess(data.accessToken, data.refreshToken);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onLoginSuccess = (accessToken, refreshToken) => {
    const userInfo = jwtDecode(accessToken);
    localStorage.setItem('jwtToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAuthorizationToken(accessToken);
    dispatch(add(userInfo));

    setTimeout(onRefresh, userInfo.exp - 100000);
  };

  const isGoogleLogin = () => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const isJoin = searchParams.get('isFirst');
    const userInfo = jwtDecode(accessToken);

    onLoginSuccess(accessToken, refreshToken);

    // isJoin으로 판별해야함.
    if (!userInfo.nickname) {
      navigate('/join', {
        state: jwtDecode(accessToken),
      });
    } else {
      navigate('/');
    }
    // setIsLogin(isJoin);
  };

  // const isCheckJoin = () => {
  //   if (isLogin) navigate('/join');
  // };

  useEffect(() => {
    isGoogleLogin();
    // isCheckJoin();
  }, []);

  return;
};

export default Oauth;
