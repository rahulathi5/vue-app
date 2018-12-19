<template>
  <div class="each-task">
    <div class="task-action">
      <input type="checkbox" v-model="task.isCompleted" v-if="!task.editable">
    </div>
    <div class="task-details">
      <span v-bind:class="{'completed-task' : task.isCompleted}" v-on:dblclick="editTask(task)" v-if="!task.editable">{{task.name | textFormat}}</span>
      <!-- <transition name="slide-fade"> -->
      <input type="text" v-model="task.name" v-on:blur="saveTodo(task)" v-if="task.editable" autofocus>
      <!-- </transition> -->
    </div>
    <div class="task-action">
      <button v-on:click="editTask(task)" v-if="!task.editable" :disabled="task.isCompleted">Edit Task</button> &nbsp;
      <button v-on:click="removeTask(task)" v-if="!task.editable">Remove Task</button>
    </div>
  </div>
</template>

<script>
import textFormat from '../filters/text-format-filter.js';
export default {
  name: 'TaskList',
  props: ['task'],
  filters:{
    textFormat
  },
  methods: {
    onTaskStatusChange: function(){
      this.tempTaskList = JSON.parse(JSON.stringify(this.taskList));
    },
    editTask: function(task){
      // console.log(task);
      if(!task.isCompleted){
        task.editable = true;
      }
    },
    saveTodo: function(task){
      task.editable = false;
    },
    removeTask: function(task){
      this.$emit('remove-task',task);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  /* margin: 40px 0 0; */
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.each-task{
  /* width:50%; */
  margin: 0px auto;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}
.task-details{
  display: inline-block;
  width: 50%;
}
.task-action{
  display: inline-block;
}
.completed-task {
  text-decoration: line-through;
}
</style>
