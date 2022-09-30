import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import setAuthorizationToken from '../../service/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../slices/loginSlice';

const Oauth = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isGoogleLogin = () => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const isJoin = searchParams.get('isFirst');

    localStorage.setItem('jwtToken', accessToken);
    setAuthorizationToken(accessToken);
    dispatch(add(jwtDecode(accessToken)));

    if (isJoin) {
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
