<template>
  <div>
    <div class="container">
      <div class="row">
        <p class="welcome-message">Welcome, {{user}}</p>
      </div>
      <div class="row">
        <div class="col-6">
          <b-card class="card-content">
            <p class="card-text">Promotions</p>
          </b-card>
          <b-card class="card-content">
            <p class="card-text">Promotion 1 - {{date}}</p>
            <ul class="card-text">
              <li>Sent- success : {{success}}, fail : {{fail}}</li>
            </ul>
          </b-card>
        </div>
        <div class="col-6">
          <b-card class="card-content">
            <b-button variant="light" @click="moveOn">Compose SMS/Promotion</b-button>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Audit",
  data() {
    return {
      user: "Yohan",
      date: "2020-06-09",
      success: "",
      fail: ""
    };
  },
  methods: {
    moveOn() {
      this.$router.push("/sms");
    },
    getStatus() {
      this.$http.get("/getStatus").then(res => {
        this.success = res.data[0].success;
        this.fail = res.data[0].fail;
      });
    }
  },
  mounted() {
    this.getStatus();
  }
};
</script>

<style scoped>
.card-text {
  text-align: left;
}
.card-content {
  margin-top: 10px;
}
.welcome-message {
  color: #ffffff;
}
</style>