import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import setAuthorizationToken from '../../service/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../slices/loginSlice';
import axios from 'axios';
import { onLoginSuccess } from '../../service/Login';

const Oauth = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isGoogleLogin = () => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
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
