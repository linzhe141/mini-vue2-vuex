# 实现`Vue2`简易版的`Vuex`插件

这是一个简单的 Vue2 的 Vuex 的实现，包含如下功能：

- getters
- mutations
- actions

## TODO

- getter 的计算属性
- modules 模块化

```js
// store.js
import Vue from "vue";
import Vuex from "../../vuex";

Vue.use(Vuex);
new Vuex.Store({
  state: {
    age: 1,
    arr: [],
  },
  // TODO 计算属性
  getters: {
    doubleAge: (state) => state.age * 2,
    arrLength: (state) => state.arr.length,
  },
  mutations: {
    SET_AGE: (state, data) => {
      state.age = data;
    },
    PUSH_ITEM: (state, data) => {
      state.arr.push(data);
    },
  },
  actions: {
    asyncSetAge({ commit }, data) {
      setTimeout(() => {
        commit("SET_AGE", data);
      }, 1000);
    },
  },
  // TODO
  modules: {},
});
```

```js
// main.js
...
import store from "./store";


new Vue({
  ...
  store,
  ...
}).$mount("#app");
```
