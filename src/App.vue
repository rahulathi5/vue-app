<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="100">
    {{count}}
    <!-- <AddTask v-on:new-task-added="updateTaskList"/>
    <h3>List of {{filterType}} Tasks</h3>
    <div v-if="taskList.length" class="task-list-wrapper">
      <TaskList v-for="task in filterTaskList" v-bind:key="task.id" v-bind:task="task" v-on:remove-task="deleteTask"/>
    </div>
    <div v-if="taskList.length" class="filter-list">
      <a v-bind:class="{'seledted-filter' : filterType==='all'}" v-on:click="filterType='all'">All</a> &nbsp;
      <a v-bind:class="{'seledted-filter' : filterType==='active'}" v-on:click="filterType='active'">Active</a> &nbsp;
      <a v-bind:class="{'seledted-filter' : filterType==='completed'}" v-on:click="filterType='completed'">Completed</a>
    </div> -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<router-view/>
 <!-- https://api.github.com/gists/public -->
  </div>
</template>

<script>
import routes from './routers/app-router.js';
// import jwt_decode from 'jwt-decode';
import toastr from 'toastr';

import store from './store/app-store';

export default {
  name: 'app',
  router:routes,
  store:store,
  data: function(){
    return {
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  mounted: function() {
    toastr.info('hello');
    // var decoded = jwt_decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMDhmODM2Y2QyMTRjNzhlZmExOTUzZiIsIl9pZCI6IjVjMDhmODM2Y2QyMTRjNzhlZmExOTUzZiIsIndlZGRpbmdJZCI6IjVjMDhmODM2Y2QyMTRjNzhlZmExOTUzZSIsIl93ZWRkaW5nIjoiNWMwOGY4MzZjZDIxNGM3OGVmYTE5NTNlIiwicGhvbmUiOiIrOTE5NzQ4MTkxMzM4IiwiaXNIb3N0Ijp0cnVlLCJpc0NvaG9zdCI6ZmFsc2UsImlzR3Vlc3QiOmZhbHNlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTQ1MDUwNjUyLCJleHAiOjE1NDc2NDI2NTJ9.3EJ6iXZKOleP6LplvDEtW5tQwbKRfg1uTU88R6Hf9Yc');
    // console.log(decoded);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.task-list-wrapper{
  border: 1px solid #ddd;
  width: 50%;
  margin: 0 auto;
}

.filter-list{
  margin-top: 20px;
  cursor: pointer;
}

.seledted-filter{
  padding: 5px;
  border: 1px solid #6db485;
  border-radius: 10px;
  width: 90px;
  display: inline-block;
}
</style>
