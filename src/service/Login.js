import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { add } from '../slices/loginSlice';
import setAuthorizationToken from './setAuthorizationToken';

const url = process.env.REACT_APP_URL;

export const onRefresh = async () => {
  const access = localStorage.getItem('jwtToken');
  const refresh = localStorage.getItem('refreshToken');

  try {
    await axios
      .post(`${url}/token/reissue`, {
        accessToken: access,
        refreshToken: refresh,
      })
      .then((response) => response.data)
      .then((data) => {
        onLoginSuccess(data.accessToken, data.refreshToken);
        console.log('refresh 완료');
      });
  } catch (error) {
    console.log(error);
  }
};

export const onLoginSuccess = (accessToken, refreshToken) => {
  const userInfo = jwtDecode(accessToken);

  localStorage.setItem('jwtToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  setAuthorizationToken(accessToken);

  setTimeout(onRefresh, userInfo.exp - 10000);
};
