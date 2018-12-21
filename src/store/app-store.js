import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      count: 1,
      inQueue:[{
        id: 1,
        name:'Customer 1',
        contact: '9876543210',
        bookingTime: "2018-12-20T08:16:17.586Z",
        noOfSeat: 2,
        status: 1
      },{
        id: 2,
        name:'Customer 2',
        contact: '9876543210',
        bookingTime: '2018-12-20T08:18:23.424Z',
        noOfSeat: 3,
        status: 1
      },{
        id: 3,
        name:'Customer 3',
        contact: '9876543210',
        bookingTime: '2018-12-20T08:19:18.586Z',
        noOfSeat: 3,
        status: 1
      }],
      confirmedBooking:[],
      completedBookings:[],
      refreshToken:''
    },
    getters:{
      getToken: (state) => {
        // console.log('here====>',localStorage.refreshToken);
        if(localStorage.refreshToken){
          state.refreshToken = localStorage.refreshToken
          return state.refreshToken;
        }else{
          return ''
        }
      }
    },
    mutations: {
      increment (state) {
        state.count++
      },
      decrement (state) {
        state.count--
      },
      addToQueue (state, data){
        // console.log(state, data);
        data.newEntry.bookingTime = new Date().toISOString();
        data.newEntry.id = state.inQueue.length + 1;
        state.inQueue.push(data.newEntry);
      },
      queueUpdate (state, data){
        var index = state.inQueue.indexOf(state.inQueue.find((each) => {return each.id === data.itemToBook.id}));
        // console.log(state, data, index);
        state.inQueue[index].status = data.status;
      },
      confirmBooking(state, data){
        // console.log(data);
        state.inQueue.splice(data.index,1);
        data.item.status = 3;
        state.confirmedBooking.push(data.item);
      },
      markAsCompleted(state, data) {
        state.confirmedBooking.splice(data.index,1);
        data.item.status = 4;
        state.completedBookings.push(data.item);
      },
      setToken(state, token){
        state.refreshToken = token;
      }
    }
})