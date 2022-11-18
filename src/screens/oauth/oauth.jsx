import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
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

    if (!userInfo.nickname) {
      navigate('/join', {
        state: jwtDecode(accessToken),
      });
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    isGoogleLogin();
  }, []);

  return;
};

export default Oauth;
