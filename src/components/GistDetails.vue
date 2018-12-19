<template>
    <div>
        <router-link to='/dashboard'>Back to Dashboard</router-link>
        <div class="page-header">
            <h3 class="pull-left">Gist Details</h3>  
            <router-link class="pull-right mt-25" to='/gists'>Back to Gist List</router-link>
        </div>
        <div class="gist-details-wrapper" v-if="gistDetails">
            <div class="mt-10">
                <img v-bind:src="gistDetails.owner.avatar_url" alt="" width="100">
            </div>
            <div class="mt-10">
                <div>
                Name : <a v-bind:href="gistDetails.owner.html_url" target="_blank">{{gistDetails.owner.login}}</a>
                </div>
                <div class="mt-10 xtext-left">
                    Description: <span v-if="gistDetails.description">{{gistDetails.description}}</span>
                    <em v-if="!gistDetails.description">Not Available</em>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'GistDetails',
  data: function() {
      return {
          gistDetails: null,
          gistId: ''
      }
  },
  methods: {
    getGistDetails: function() {
        axios({ method: "GET", "url": "https://api.github.com/gists/"+this.gistId }).then(result => {
            // console.log(result);
            this.gistDetails = result.data;
        }, error => {
            // console.error(error);
        });
    }
  },
  created() {
      this.gistId = this.$route.params.id;
    //   console.log('route', this.$route, this.gistId);
  },
  mounted: function() {
    //   console.log('in mounted');
      this.getGistDetails();
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
.gist-details-wrapper{
    overflow: auto;
    width: 60%;
    margin: 0 auto;
}
.pl-10{
    padding-left: 10px;
}
.mt-10{
    margin-top: 10px;
}
.mt-25 {
    margin-top: 25px;
}
</style>
