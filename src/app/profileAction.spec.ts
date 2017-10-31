import { TestBed, async } from '@angular/core/testing';
import fetch, { mock } from 'fetch-mock';
import { login, loginFail, logOut, fetchArticles, fetchProfile ,updateHeadline} from './profileAction';
import {  url } from './resource';
import 'fetch-mock';

const mockery = require('fetch-mock/es5/client');

describe('loginActions', () => {
  const fetchMock = require('fetch-mock');
  beforeEach(async(() => {
    if (mockery.enable) {
      mockery.enable({warnOnUnregistered: false});
      mockery.registerMock('node-fetch', fetch);
      require('node-fetch');
    }
  }));

  afterEach(async(() => {

  }));

  it('should log in a user', (done) => {
    const userName = 'tangmo';
    const userPassword = 'powerful-three-word';

    fetchMock.mock(`${url}/loginSuccess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {username: userName, password: userPassword,   msg: 'success'}
    });

    login(userName, userPassword).then(r => {
      expect(r.username).toEqual(userName);
      expect(r.password).toEqual(userPassword);
      expect(r.msg).toEqual('success');
    }).then(done)
      .catch(done);

  });

  it('should not log in an invalid user', (done) => {
    const noUser = 'cuihao';
    const noPassword = 'simple password';

    fetchMock.mock(`${url}/loginFail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {username: noUser, password: noPassword, msg: 'No user'}
    });

    loginFail(noUser, noPassword).then(r => {
      expect(r.username).toEqual(noUser);
      expect(r.password).toEqual(noPassword);
      expect(r.msg).toEqual('No user');
    }).then(done)
      .catch(done);
  });


  it('should log out a user', (done) => {
    const outUser = 'tangmo';

    fetchMock.mock(`${url}/logOut`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {username: outUser, msg: 'logOut'}
    });
    logOut(outUser).then(r => {
      expect(r.username).toEqual(outUser);
      expect(r.msg).toEqual('logOut');
    }).then(done)
      .catch(done);
  });

  it('should fetch articles', (done) => {
    const articles = {
      article: {
        Name: 'Lijiaorou',
        context: 'dasd14qrear',
        time: '2017-02-10'
      }
    }

    fetchMock.mock(`${url}/fetchArticles`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: articles
    });
    fetchArticles().then(r => {
      expect(r).toEqual(articles);
    }).then(done)
      .catch(done);
  });

  it('should fetch the user\'s profile information', (done) => {
    const profile = {
      tangmo: {
        name: 'tangmo',
        password: 'powerful',
        birthday: '1996-2-10',
        zipcode: '12121',
        email: ''
      }
    }

    fetchMock.mock(`${url}/fetchProfile`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: profile
    });
    fetchProfile().then(r => {
      expect(r).toEqual(profile);
    }).then(done)
      .catch(done);
  });

  it('should update headline', (done) => {
    const userMe = 'migu';
    const headline = 'work hard';

    fetchMock.mock(`${url}/updateHeadline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {username: userMe, headline: headline,   msg: 'succeed !'}
    });

    updateHeadline(userMe, headline).then(r => {
      expect(r.username).toEqual(userMe);
      expect(r.headline).toEqual(headline);
      expect(r.msg).toEqual('succeed !');
    }).then(done)
      .catch(done);

  });
});
