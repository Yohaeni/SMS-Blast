<template>
  <div class="container"></div>
</template>

<script>
import axios from "axios";
export default {
  name: "SMS Blast - Recipients Directory",
  data() {
    return {
      recipients: {}
    };
  },

  methods: {
    //post mobile number and message to backend using api call
    getRecipients() {
      this.$http.get("/get-recipients", {}).then(res => {
        console.log(res);
      });

      this.address = "";
      this.message = "";
    }
  },
  computed: {},
  mounted() {
    this.getRecipients();
  }
};
</script>