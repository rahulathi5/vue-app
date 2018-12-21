import Vue from 'vue'
import firebase from 'firebase';
import App from './App.vue'
import VueProgressBar from 'vue-progressbar'
Vue.config.productionTip = false;
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '10px'
})
let firebaseConfig= {
  apiKey: "AIzaSyCLU3kRoeqe2VHcLmU8ouh0BsrPn8YvmVI",
  authDomain: "vue-easy-queue.firebaseapp.com",
  databaseURL: "https://vue-easy-queue.firebaseio.com",
  projectId: "vue-easy-queue",
  storageBucket: "vue-easy-queue.appspot.com",
  messagingSenderId: "328853842024"
}
firebase.initializeApp(firebaseConfig);
new Vue({
  render: h => h(App),
}).$mount('#app')
