import Vue from 'vue';
// import Vuex from "vuex";
import Vuex from '../vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    age: 1,
    arr: []
  },
  // TODO 计算属性
  getters: {
    doubleAge: state => state.age * 2,
    arrLength: state => state.arr.length
  },
  mutations: {
    SET_AGE: (state, data) => {
      state.age = data;
    },
    PUSH_ITEM: (state, data) => {
      state.arr.push(data);
    }
  },
  actions: {
    asyncSetAge({ commit }, data) {
      setTimeout(() => {
        commit('SET_AGE', data);
      }, 1000);
    }
  },
  // TODO
  modules: {}
});
