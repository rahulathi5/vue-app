<template>
  <div>
      <h3>This is a Dashboard</h3>
      <div class="each-page">
        <router-link to='/todo'>Todo List</router-link>
      </div>
      <div class="each-page">
        <router-link to='/gists'>Gists List</router-link>
      </div>
      <div class="each-page">
        <router-link to='/data-table'>Data Table</router-link>
      </div>
      <div class="each-page">
        <router-link to='/form'>Form Validation</router-link>
      </div>
      <div class="each-page">
        <router-link to='/store'>Data Store Vuex</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.each-page{
  display: inline-block;
  margin-right:15px;
  /* border: 1px solid #ddd; */
  /* padding: 5px; */
}
</style>
