Task List
<template>
  <div class="add-task">
    <h3>Add Task Component</h3>
    <input type="text" class="todo-input" placeholder="What needs to be done.." v-model="newTask.name" v-on:keyup.enter="addTask"> &nbsp;
    <button v-on:click="addTask">Add task</button>
  </div>
</template>

<script>
export default {
  name: 'AddTask',
  data: function() {
    return {
      newTask: { name:'', id: Date.now(), isCompleted:false, editable:false},
      taskList:[]
    }
  },
  methods:{
    addTask: function(){
      if(!this.newTask.name.trim().length){
        return;
      }
      this.taskList.push(this.newTask);
      this.newTask={ name:'', id: Date.now(), isCompleted:false, editable:false};
      console.log('taskList: ', this.taskList);
      this.$emit('new-task-added', this.taskList);
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
.add-task{
  border: 1px solid #ddd;
  width: 50%;
  margin: 0 auto;
  padding-bottom: 20px;
}
.todo-input{
  padding: 7px;
}
</style>
