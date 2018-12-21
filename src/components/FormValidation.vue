<template>
  <div>Form Validation
    <br>
    <router-link to="/dashboard">Back to Dashboard</router-link>
    <!-- <form @submit="submitData" novalidate>
      <input type="text" v-model="user.email" placeholder="Enter email">
      <div>{{error.email}}</div>
    </form>-->
    <form @submit="submitData" novalidate>
      <input
        v-model="user.email"
        v-validate="'required|email'"
        data-vv-as="Email"
        name="emailId"
        type="text"
        v-bind:class="{'invaid-input' : errors.has('emailId')}"
        autocomplete="off"
      > &nbsp;
      <button v-on:click="submitData">Submit</button>
      <div class="red-text">{{ errors.first('emailId') }}</div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import { Validator } from "vee-validate";

const dictionary = {
  // en: {
  //   messages:{
  //     email: () => 'Please enter a valid email',
  //     required: () => 'This field is required'
  //   }
  // },
  custom: {
    emailId: {
      required: () => "Please enter your email",
      email: () => "Please enter a valid email"
    },
    name: {
      required: () => "Your name is empty"
    },
    password:{
      required: () => 'Please enter your password'
    }
  }
};

// Override and merge the dictionaries
Validator.localize("en", dictionary);

// const validator = new Validator({ email: 'email' });

// validator.localize('en'); // now this validator will generate messages in Arabic.
Vue.use(VeeValidate);
export default {
  name: "FormValidation",
  data: function() {
    return {
      user: {
        email: ""
      }
      // error: {
      //   email: ""
      // }
    };
  },
  methods: {
    submitData: function(e) {
      e.preventDefault();

      this.$validator.validateAll().then(result => {
        if (result) {
          // do axois or whatever on validate true
          // console.log(this.user.email);
          // console.log("All is well");
          return;
        }
        if (!result) {
          // console.log("Oops!");
        }
      });
    }
  }
};
</script>

<style>
.red-text {
  color: red;
}
.invaid-input {
  border: 1px solid red;
}
</style>