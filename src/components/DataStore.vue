<template>
  <div>
    Data Store {{count}}
    <button v-on:click="increment">+</button> &nbsp;
    <button v-on:click="decrement">-</button>
  </div>
</template>

<script>

export default {
  name: 'DataStore',
  data: function(){
    return {
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    increment: function(){
      this.$store.commit('increment')
    },
    decrement: function() {
      this.$store.commit('decrement')
    }
  }
}
</script>

<style>

</style>
