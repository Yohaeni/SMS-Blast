<template>
  <div class="container">
    <div class="row">
      <p class="welcome-message">Welcome, {{user}}</p>
    </div>
    <div class="row">
      <div class="col-12">
        <b-card class="card-content">
          <p class="card-text">Subscribe to our SMS Blaster to reach your audience via SMS!</p>
          <p>
            <a
              href="http://developer.globelabs.com.ph/dialog/oauth/zodGIE6Rb8tBginKBEcR6gtEaoozIyoy"
              target="_blank"
            >Click to Subscribe</a>
          </p>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Subscribe",
  data() {
    return {
      user: "Yohan"
    };
  }
};
</script>

<style scoped>
.welcome-message {
  color: #ffffff;
}
</style>