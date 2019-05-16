import axios from 'axios'

export default {
  /* 用户登录*/
  login(params, cb) {
    Post('user/login', params, res => {
      cb(res);
    });
  },
}