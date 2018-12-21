<template>
  <div>
    <router-link to="/dashboard">Back to Dashboard</router-link>
    <h3>Easy Queue Authentication</h3>
    <div class="page-wrapper">
      <form class="login-form">
        <h4>Please Login to access Easy Queue Dashboard</h4>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="text"
            class="form-control"
            id="email"
            v-model.trim="user.email"
            placeholder="Enter Email"
            v-validate="'required|email'"
            data-vv-as="Email"
            name="emailId"
            v-bind:class="{'invaid-input' : errors.has('emailId')}"
          >
          <small id="name" class="form-text text-muted red-text">{{ errors.first('emailId') }}</small>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model.trim="user.password"
            v-validate="'required'"
            placeholder="Enter Password"
            name="password"
            data-vv-as="Password"
            v-bind:class="{'invaid-input' : errors.has('password')}"
          >
          <small id="name" class="form-text text-muted red-text">{{ errors.first('password') }}</small>
        </div>
        <div class="text-center mt-25">
          <button type="button" class="btn btn-primary" v-on:click="login">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import config from "../config";
import firebase from "firebase";
import toastr from "toastr";
import router from "../routers/app-router";

export default {
  name: "EasyQueueLogin",
  data: function() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$Progress.start()
          firebase
            .auth()
            .signInWithEmailAndPassword(this.user.email, this.user.password)
            .then(
              user => {
                // console.log(user);
                localStorage.setItem("refreshToken", user.user.refreshToken);
                this.$store.commit("setToken", user.user.refreshToken);
                router.push({ name: "easyQueueDashboard" });
                this.$Progress.finish();
              },
              error => {
                // console.log(error);
                this.$Progress.fail();
                toastr.error(error.message);
              }
            );
          this.$validator.reset();
        }
        if (!result) {
          // console.log("Oops!");
        }
      });
    }
  },
  created: function() {
    this.firebaseConfig = config.firebaseConfig;
  }
};
</script>

<style>
.page-wrapper {
  width: 60%;
  margin: 0 auto;
}
h4 {
  margin-bottom: 20px;
}
.form-group{
  /* height: 75px; */
}
.login-form {
  width: 435px;
  /* height: 333px; */
  text-align: left;
  margin: 35px auto 0;
  border: 1px solid #ddd;
  padding: 25px;
  border-radius: 20px;
}
.mt-25 {
  margin-top: 25px;
}
</style>
