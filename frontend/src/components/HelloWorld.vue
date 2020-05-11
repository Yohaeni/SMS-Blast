<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <h1>{{ msg }}</h1>
      </div>
      <div class="col-sm-2"></div>
    </div>
    
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <b-input id="address" placeholder="mobile number" v-model="address"></b-input>
      </div>
      <div class="col-sm"></div>
    </div>
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <b-textarea id="message" placeholder="Enter the message" v-model="message" rows="10"></b-textarea>
      </div>
      <div class="col-sm"></div>
    </div>
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <b-button id="send" @click="sendMessage">Send Message</b-button>
      </div>
      <div class="col-sm"></div>
    </div> 
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "SMS Blast",
  data() {
    return {
      address: "",
      message: "",
      msg: "SMS Blast Demo Page"
    }
  },

  methods: {
    sendMessage() {
      this.$http.post('/api', {
        address: this.address, message: this.message
      })
      .then((res) => {
        console.log(res)
      })

      this.address = ""
      this.message = ""
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#address {
  margin-bottom: 30px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#message {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#send {
  margin-top: 20px;
}
h1 {
  padding: 10px;
  color: white;
  font-weight: 200;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
