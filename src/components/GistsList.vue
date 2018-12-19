<template>
    <div>
        <router-link to='/dashboard'>Back to Dashboard</router-link>
        <div class="page-header">
            <h3 class="pull-left">List of public Gists</h3>  
        </div>
        <table class="table table-striped gists-table" v-if="gistsList.length">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Created AT</th>
                <th scope="col">Owner Avatar</th>
                <th scope="col">Owner Name</th>
                <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in gistsListToShow" v-bind:key="item.id" v-on:click="gotoDetails(item)">
                    <td>{{index+1}}</td>
                <td>{{filterDate(item.created_at)}}</td>
                <td>
                    <img v-bind:src="item.owner.avatar_url" alt="" width="30">
                    </td>
                <td>
                    <a v-bind:href="item.owner.html_url" target="_blank">{{item.owner.login}}</a></td>
                <td>
                    <span v-if="item.description">{{item.description}}</span>
                    <em v-if="!item.description">Not Available</em>
                </td>
                </tr>
            </tbody>
        </table>  
        <div class="page-footer" v-if="gistsList.length">
          <ul class="pagination-list pull-right">
                <li v-bind:class="{'current-page' : currentPage===n}" class="each-page" v-for="n in (gistsList.length / itemPerPage)" v-bind:key="n" v-on:click="pageChange(n)">{{ n }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from '../routers/app-router';
import config from '../config.js'

export default {
  name: 'GistsList',
  data: function() {
      return {
          gistsList: [],
          gistsListToShow:[],
          currentPage: 1,
          itemPerPage: 5,
          loadingData: false
      }
  },
  methods: {
      filterDate: function(date){
          return new Date(date).toLocaleDateString();
      },
      pageChange: function(n){
          this.currentPage = n;
          this.gistsListToShow = [];
          for (var i = (this.currentPage-1) * this.itemPerPage; i < (this.currentPage * this.itemPerPage) && i < this.gistsList.length; i++){
            this.gistsListToShow.push(this.gistsList[i]);
        }
      },
      getGistsList: function() {
        this.loadingData = true;
        axios({ method: "GET", "url": config.baseUrl + "public" }).then(result => {
            // console.log(result);
            this.gistsList = result.data;
            this.pageChange(this.currentPage);
            this.loadingData = false;
        }
        // error => {
        //     this.loadingData = false;
        //     // console.error(error);
        // }
        );
      },
      gotoDetails: function(item) {
        //   console.log(item);
          router.push({ name: 'gistDetails', params: { id: item.id } });
      }
  },
  mounted: function() {
    // console.log(config);
    this.getGistsList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-header, .page-footer{
    overflow: auto;
    width: 60%;
    margin: 0 auto;
}
.gists-table{
    width: 60%;
    margin: 0 auto;
}
th{
    text-align: center;
}
.pagination-list{
    list-style-type: none;
    margin: 15px 0 0 0;
    height: 30px;
}
.each-page {
    display: inline;
    padding: 5px 15px;
    border: 1px solid #6cb485;
    border-right: none;
    font-weight: bold;
    cursor: pointer;
}
.each-page:last-child{
    border-right: 1px solid #6cb485;
}
.current-page {
    background: #6cb485;
    color: #fff;

}
</style>
