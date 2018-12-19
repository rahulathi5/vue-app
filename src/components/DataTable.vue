<template>
    <div>
        <router-link to='/dashboard'>Back to Dashboard</router-link>
        <h3>This is a Datatable</h3>
        <div style="width:60%; margin:0 auto;">
            <div style="margin-bottom: 10px">
                <el-row>
                    <!-- <el-col :span="18">
                    <el-button @click="onCreate">create 1 row</el-button>
                    <el-button @click="onCreate100">create 100 row</el-button>
                    <el-button @click="bulkDelete">bulk delete</el-button>
                    </el-col> -->

                    <el-col :span="6">
                    <el-input placeholder="search.." v-model="filters[0].value"></el-input>
                    </el-col>
                </el-row>
            </div>
            <data-tables-server :data="tableData" :action-col="actionCol" :loading="loading"
             :filters="filters" @selection-change="handleSelectionChange" :total="total" @query-change="loadData" :pagination-props="{ pageSizes: [1, 5, 10]}">
                <el-table-column type="selection" width="55">
                </el-table-column>

                <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom">
                </el-table-column>
            </data-tables-server>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// set language to EN
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import VueDataTables from 'vue-data-tables'
Vue.use(VueDataTables)

locale.use(lang)

export default {
  name: 'DataTable',
  data:function() {
    return {
      loading: false,
      total: 0,
      data:[],
      tableData:[],
      titles:[{
          prop: 'name',
          label: 'Name',
      },{
          prop:'email',
          label:'Email'
      },{
          prop:'contact',
          label:'Contact Number'
      }],
      filters: [{
        prop: 'name',
        value: ''
      }],
      actionCol: {
        props: {
          label: 'Actionssss',
        },
        buttons: [{
          props: {
            type: 'primary'
          },
          handler: row => {
            this.$message('Edit clicked')
            row.flow_no = 'hello word' + Math.random()
            row.content = Math.random() > 0.5 ? 'Water flood' : 'Lock broken'
            row.flow_type = Math.random() > 0.5 ? 'Repair' : 'Help'
          },
          label: 'Edit'
        }, {
          handler: row => {
            this.data.splice(this.data.indexOf(row), 1)
            this.$message('delete success')
          },
          label: 'delete'
        }]
      },
      selectedRow: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedRow = val
    },
    loadData(queryInfo) {
      console.log('loadData', queryInfo)
      this.loading = true;
      setTimeout(() => {
        //   console.log('here');
          this.data = [{
          name:'1Lorem ipsum',
          email:'loremipsum@gmail.com',
          contact:'9876543210'
      },{
          name:'2Ipsum lorem',
          email:'loremipsum@gmail.com',
          contact:'0123456789'
      },{
          name:'3Ipsum lorem',
          email:'loremipsum@gmail.com',
          contact:'0123456789'
      },{
          name:'4Ipsum lorem',
          email:'loremipsum@gmail.com',
          contact:'0123456789'
      }];
      queryInfo && queryInfo.filters && queryInfo.filters.forEach(filter => {
        this.data = this.data.filter(data => {
          let props = (filter.prop && [].concat(filter.prop)) || allKeys
          return props.some(prop => {
            if (!filter.value || filter.value.length === 0) {
              return true
            }
            return [].concat(filter.value).some(val => {
              return data[prop].toString().toLowerCase().indexOf(val.toLowerCase()) > -1
            })
          })
        })
      })

  // do sort
  if (queryInfo.sort && queryInfo.sort.order) {
    let order = queryInfo.sort.order
    let prop = queryInfo.sort.prop
    let isDescending = order === 'descending'

    this.data.sort(function(a, b) {
      if (a[prop] > b[prop]) {
        return 1
      } else if (a[prop] < b[prop]) {
        return -1
      } else {
        return 0
      }
    })
    if (isDescending) {
      this.data.reverse()
    }
  }

      this.tableData = this.data.slice((queryInfo.page - 1) * queryInfo.pageSize, queryInfo.page * queryInfo.pageSize)
      this.total = this.data.length;
      this.loading = false;
      },1000);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
