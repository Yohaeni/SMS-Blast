<template>
  <div id="main">
    <p id="welcome-message" style="text-align: left">Welcome, {{ username }}!</p>
    <p id="title"><h2>{{ company_name }} Online Performance</h2></p>
    <p>This part is for content</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "Demo",
      company_name: "Test"
    };
  }
};
</script>

<style scoped>
#main {
  color: #ffffff;
}
#welcome-message {
  padding: 20px;
}
#title {
  padding: 20px;
}
</style>