<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal add-in-queue-modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <h3 class>Add New Customer in Queue</h3>
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <form class="add-form" @submit="addToQueue" novalidate>
              <div class="form-group">
                <label for="name">Name:</label>
                <input
                  type="text"
                  placeholder="Enter Customer Name"
                  class="form-control"
                  id="name"
                  name="custName"
                  v-model="newEntry.name"
                  v-validate="'required'"
                  data-vv-as="Customer Name"
                  v-bind:class="{'invaid-input' : errors.has('custName')}"
                  autocomplete="off"
                >
                <small
                  id="name"
                  class="form-text text-muted red-text"
                >{{ errors.first('custName') }}</small>
              </div>
              <div class="form-group">
                <label for="contact">Contact:</label>
                <input
                  type="contact"
                  placeholder="Enter Contact Number"
                  class="form-control"
                  id="contact"
                  v-model="newEntry.contact"
                  name="contact"
                  v-validate="'required|digits:10'"
                  data-vv-as="Contact"
                  v-bind:class="{'invaid-input' : errors.has('contact')}"
                  autocomplete="off"
                >
                <small id="name" class="form-text text-muted red-text">{{ errors.first('contact') }}</small>
              </div>
              <div class="form-group">
                <label for="contact">No. of Seats:</label>
                <select
                  name="noOfSeat"
                  class="form-control"
                  v-model="newEntry.noOfSeat"
                  v-validate="'required'"
                  data-vv-as="No. of Seats"
                  v-bind:class="{'invaid-input' : errors.has('noOfSeat')}"
                  autocomplete="off"
                >
                  <option value>Select No. of Seats</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <small id="name" class="form-text text-muted red-text">{{ errors.first('noOfSeat') }}</small>
              </div>
              <div class="form-group text-center mt-20">
                <button type="button" class="btn btn-primary" v-on:click="addToQueue">Submit</button>
              </div>
            </form>
          </slot>
        </section>
        <!-- <footer class="modal-footer">
            <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
            >Close me!</button>
        </footer>-->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  data: function() {
    return {
      newEntry: {
        name: "",
        contact: "",
        noOfSeat: "",
        status: 1
      }
    };
  },
  methods: {
    close() {
      this.newEntry = {
        name: "",
        contact: "",
        noOfSeat: "",
        status: 1
      };
      // console.log(this.$validator);
      // this.errors.clear();
      this.$validator.reset();
      this.$emit("close");
    },
    addToQueue() {
      // console.log(this.newEntry);
      // this.$emit('addToQueue', this.newEntry);
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.commit("addToQueue", {
            newEntry: this.newEntry,
            status: 1
          });
          this.newEntry = {
            name: "",
            contact: "",
            noOfSeat: "",
            status: 1
          };
          this.$validator.reset();
          this.$emit("close");
        }
        if (!result) {
          // console.log("Oops!");
        }
      });
    }
  },
  mounted: function() {
    // console.log('in mounted');
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
.add-in-queue-modal {
  width: 450px;
  height: 450px;
  margin: 10% auto;
}

.btn-group-vertical > .btn-group:after,
.btn-group-vertical > .btn-group:before,
.btn-toolbar:after,
.btn-toolbar:before,
.clearfix:after,
.clearfix:before,
.container-fluid:after,
.container-fluid:before,
.container:after,
.container:before,
.dl-horizontal dd:after,
.dl-horizontal dd:before,
.form-horizontal .form-group:after,
.form-horizontal .form-group:before,
.modal-footer:after,
.modal-footer:before,
.modal-header:after,
.modal-header:before,
.nav:after,
.nav:before,
.navbar-collapse:after,
.navbar-collapse:before,
.navbar-header:after,
.navbar-header:before,
.navbar:after,
.navbar:before,
.pager:after,
.pager:before,
.panel-body:after,
.panel-body:before,
.row:after,
.row:before {
  display: none !important;
}

.add-form {
  width: 350px;
  margin: 0 auto;
  /* padding: 0 15px; */
  text-align: left !important;
}
.mt-20 {
  margin-top: 20px;
}
</style>
