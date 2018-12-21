import Vue from 'vue'
import Router from 'vue-router'
import toastr from 'toastr'

import Dashboard from '@/components/dashboard'
import GistsList from '@/components/GistsList'
import Todo from '@/components/Todo'
import GistDetails from '@/components/GistDetails'
import DataTable from '@/components/DataTable'
import FormValidation from '@/components/FormValidation'
import DataStore from '@/components/DataStore'
import EasyQueue from '@/components/EasyQueue'
import EasyQueueLogin from '@/components/EasyQueueLogin'

// import store from '../store/app-store'

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },{
        path: '/todo',
        name: 'todo',
        component: Todo
      },
      {
        path:'/data-table',
        name:'dataTable',
        component: DataTable
      },
      {
        path: '/gists',
        name: 'gists',
        component: GistsList,
        meta:{ type: 'public'},
        // beforeEnter: (to, from, next) => {
        //   console.log(to, from);
        //   if(to.meta.type==='public'){
        //     next();
        //   }else{

        //   }
        // }
      },{
        path:'/gist/:id',
        name:'gistDetails',
        component: GistDetails
      },{
        path:'/form',
        name:'form',
        component:FormValidation
      },{
        path:'/store',
        name:'store',
        component:DataStore
      },{
        path:'/easy-queue-dashboard',
        name:'easyQueueDashboard',
        component: EasyQueue,
        beforeEnter: (to, from, next) => {
          // console.log(to, from, store.state.refreshToken);
          if(localStorage.refreshToken){
            // console.log('here');
            next();
          }else{
            next('/easy-queue-login');
            // event.preventDefault();
            toastr.warning('Please login to access the dashboard.');
          }
        }
      },
      {
        path:'/easy-queue-login',
        name:'easyQueueLogin',
        component: EasyQueueLogin
      }
    ]
  })