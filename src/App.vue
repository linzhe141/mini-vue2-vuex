<template>
  <div>
    <div>age {{ $store.state.age }}</div>
    <!-- <button @click="$store.state.age++">increment</button> -->
    <div>getters doubleAge:{{ $store.getters.doubleAge }}</div>
    <button @click="increment">increment mutation commit</button>
    <div>=============</div>
    <div>arr {{ $store.state.arr }}</div>
    <div>getters arrLength:{{ $store.getters.arrLength }}</div>
    <button @click="pushitem">pushitem mutation commit</button>
    <div>=============</div>
    <div>actions age {{ $store.state.age }}</div>
    <button @click="actionMethod">increment async action dispatch</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    increment() {
      const age = this.$store.state.age;
      this.$store.commit('SET_AGE', age + 1);
    },
    pushitem() {
      this.$store.commit('PUSH_ITEM', 1);
    },
    actionMethod() {
      const age = this.$store.state.age;
      this.$store.dispatch('asyncSetAge', age + 1);
    }
  }
};
</script>
