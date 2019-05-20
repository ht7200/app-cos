import axios from 'axios'
import { Message } from 'element-ui';
import { setStore, removeStore } from './../util';

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async login({ commit }, param) {
    try {
      const { data } = await axios.post('http://crm.test.ahyzyx.cn/user/login', param)
      Message({ message: '该账户未分配角色,无法登录,请联系管理员!', type: 'warning'});
      if (data.status === 1) {
        if (!data.data.roles[0]) {
          Message.message({ message: '该账户未分配角色,无法登录,请联系管理员!', type: 'warning'});
          return resolve(data.data.roles[0]);
        }
        console.log(data)
        commit('SET_USER', data.data.name)
        // commit('user/SETNAME', data.data.name);
        // setStore('name', data.data.name);
        // commit('user/SETTOKEN', data.data.token);
        // setStore('token', data.data.token);
        // commit('user/SETALLROLE', data.data.roles);
        // setStore('allRole', data.data.roles);
        // commit('user/SETCURRENTROLE', data.data.roles[0].roleId);
        // setStore('currentRole', data.data.roles[0].roleId);
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }

}
