<template>
  <div>
    <router-link to='/dashboard'>Back to Dashboard</router-link>
    <AddTask v-on:new-task-added="updateTaskList"/>
     <h3>List of {{filterType}} Tasks</h3>
    <div v-if="taskList.length" class="task-list-wrapper">
      <TaskList v-for="task in filterTaskList" v-bind:key="task.id" v-bind:task="task" v-on:remove-task="deleteTask"/>
    </div>
    <div v-if="!taskList.length">
      No Task Avalable now.
    </div>
    <div v-if="taskList.length" class="filter-list">
      <a v-bind:class="{'seledted-filter' : filterType==='all'}" v-on:click="filterType='all'">All</a> &nbsp;
      <a v-bind:class="{'seledted-filter' : filterType==='active'}" v-on:click="filterType='active'">Active</a> &nbsp;
      <a v-bind:class="{'seledted-filter' : filterType==='completed'}" v-on:click="filterType='completed'">Completed</a>
    </div>
  </div>
</template>

<script>
import AddTask from './AddTask.vue';
import TaskList from './TaskList.vue';

export default {
  name: 'Todo',
  data: function(){
    return {
      taskList:[],
      filterType:'all'
    }
  },
   components: {
    AddTask,
    TaskList
  },
  methods:{
    updateTaskList: function(data){
      this.taskList = data;
      // console.log(data);
    },
    deleteTask: function(task){
      this.taskList.splice(this.taskList.indexOf(task),1);
    }
  },
  computed: {
      filterTaskList: function(){
        if(this.filterType==='all'){
          return this.taskList;
        } else if(this.filterType ==='active') { 
        return this.taskList.filter(function(each){
            return !each.isCompleted;
          })
        }else if(this.filterType ==='completed') { 
        return this.taskList.filter(function(each){
            return each.isCompleted;
          })
      }
    }
  }
}
</script>

<style>

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
