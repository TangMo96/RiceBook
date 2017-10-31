import {  resource } from './resource';

export {login, loginFail, logOut, fetchArticles, fetchProfile, updateHeadline};

const login = (username, password) => {

  return resource('POST', 'loginSuccess', {
    username,
    password
  });
};

const loginFail = (username, password) => {

  return resource('POST', 'loginFail', {
    username,
    password
  });
};

const logOut = (username) => {
  return resource('PUT', 'logOut', username);
};

const fetchArticles = () => {
  return resource('GET', 'fetchArticles', {
  });
}

const fetchProfile = () => {
  return resource('GET', 'fetchProfile', {
  });
}

const updateHeadline = (username, headline) => {
  return resource('POST', 'updateHeadline', {
    username,
    headline
  });
}


