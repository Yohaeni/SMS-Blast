<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <input placeholder="mobile number" v-model="address">
    </div>
    <div>
      <textarea placeholder="Enter the message" v-model="message"></textarea>
    </div>
    <div>
       <button @click="sendMessage">Send Message</button>
    </div> 
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      address: "",
      message: ""
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
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
