<template>
  <div>
    <button v-on:click="logout">Logout</button>
    <h3>Easy Queue</h3>
    <div class="page-wrapper">
      <div class="page-header">
        <div class="pull-left">
          <select name id class="form-control seat-no" v-model="selectedNoOfSeatToAssign">
            <option value="0">Select No. of seat</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button class="btn btn-default" v-on:click="findBooking">Assign</button>
        </div>
        <div class="pull-right">
          <button class="btn btn-primary" v-on:click="openAddCustomerModal">+ Add</button>
          <!-- <modal v-if="showModal">  -->
          <!-- <h3 slot="header">custom header</h3> -->
          <!-- </modal> -->
          <modal v-show="isModalVisible" @close="closeModal"/>
        </div>
      </div>
      <div class="table-wrapper">
        <h3 class="text-left">In Queue</h3>
        <table class="table table-striped gists-table" v-if="inQueue.length">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              <th scope="col">No. of Seats</th>
              <th scope="col">Booking Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in inQueue"
              v-bind:key="item.id"
              v-on:click="assignTable(item, index)"
            >
              <td>{{index + 1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.contact}}</td>
              <td>{{item.noOfSeat}}</td>
              <td>{{filterDate(item.bookingTime)}}</td>
              <td>
                {{bookingStatus[item.status]}}
                <!-- &nbsp;<i class="fa fa-check" v-if="item.status===2"></i> -->
              </td>
            </tr>
          </tbody>
        </table>
        <div class="well" v-else>No Booking in queue yet.</div>
      </div>
      <div class="table-wrapper">
        <h3 class="text-left">Confirmed Bookings</h3>
        <table class="table table-striped gists-table" v-if="confirmedBooking.length">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              <th scope="col">No. of Seats</th>
              <th scope="col">Booking Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in confirmedBooking"
              v-bind:key="item.id"
              v-on:click="markAsCompleted(item, index)"
            >
              <td>{{index + 1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.contact}}</td>
              <td>{{item.noOfSeat}}</td>
              <td>{{filterDate(item.bookingTime)}}</td>
              <td>{{bookingStatus[item.status]}}</td>
            </tr>
          </tbody>
        </table>
        <div class="well" v-else>No Confirmed Booking yet.</div>
      </div>
      <div>
        <h3 class="text-left">Completed Bookings</h3>
        <table class="table table-striped gists-table" v-if="completedBookings.length">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              <th scope="col">No. of Seats</th>
              <th scope="col">Booking Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in completedBookings" v-bind:key="item.id">
              <td>{{index + 1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.contact}}</td>
              <td>{{item.noOfSeat}}</td>
              <td>{{filterDate(item.bookingTime)}}</td>
              <td>{{bookingStatus[item.status]}}</td>
            </tr>
          </tbody>
        </table>
        <div class="well" v-else>No Completed Booking yet.</div>
      </div>
    </div>
    {{refreshToken}}
  </div>
</template>

<script>
import config from "../config";
import modal from "./AddModal.vue";
import firebase from "firebase";
import toastr from "toastr";
import router from "../routers/app-router";

export default {
  name: "EasyQueue",
  components: {
    modal
  },
  template: "#modal-template",
  data: function() {
    return {
      bookingStatus: {},
      selectedNoOfSeatToAssign: "0",
      isModalVisible: false
    };
  },
  computed: {
    inQueue() {
      return this.$store.state.inQueue;
    },
    confirmedBooking() {
      return this.$store.state.confirmedBooking;
    },
    completedBookings() {
      return this.$store.state.completedBookings;
    },
    refreshToken() {
      return this.$store.getters.getToken;
    }
  },
  methods: {
    filterDate: function(date) {
      return new Date(date).toLocaleString();
    },
    findBooking: function() {
      // console.log(this.selectedNoOfSeatToAssign);
      var queueList = JSON.parse(JSON.stringify(this.inQueue));
      queueList.sort((booking1, booking2) => {
        return new Date(booking1.bookingTime) - new Date(booking2.bookingTime);
      });
      // moment(booking1.bookingTime).isBefore(booking2.bookingTime) ? -1 : 1);
      var itemToBook = queueList.filter(each => {
        return (
          Number(each.noOfSeat) === Number(this.selectedNoOfSeatToAssign) &&
          each.status === 1
        );
      })[0];
      // console.log(itemToBook, this.inQueue.indexOf(itemToBook));
      if (itemToBook) {
        this.$store.commit("queueUpdate", {
          itemToBook: itemToBook,
          status: 2
        });
      }
    },
    assignTable: function(item, index) {
      if (item.status === 2) {
        this.$store.commit("confirmBooking", { item, index });
      }
    },
    markAsCompleted(item, index) {
      // console.log(item);
      if (item.status === 3) {
        this.$store.commit("markAsCompleted", { item, index });
      }
    },
    openAddCustomerModal: function() {
      this.isModalVisible = true;
    },
    addCustomerInQueue() {
      // console.log(data);
      this.isModalVisible = false;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            toastr.success("Successfully Logged out.");
            this.$store.commit("setToken", "");
            localStorage.removeItem("refreshToken");
            router.push({ name: "easyQueueLogin" });
            // Sign-out successful.
          },
          error => {
            toastr.error(error.message);
            // An error happened.
          }
        );
    }
  },
  mounted: function() {
    this.bookingStatus = config.bookingStatus;
  }
};
</script>

<style>
.page-wrapper {
  width: 60%;
  margin: 0 auto;
}
.page-header {
  overflow: auto;
}
.seat-no {
  width: auto !important;
  display: inline-block !important;
  margin-right: 10px;
}

.table-wrapper {
  margin-bottom: 45px;
}
th {
  text-align: center !important;
}
</style>
