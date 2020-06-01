<template>
  <div>
    <section id="login" v-bind:class="isShake">
      <form>
        <h2>Login</h2>
        <div class="info" v-bind:class="good">
          <p>{{ alert.message }}</p>
        </div>
        <label for="emailId" class="grey-text" style="text-align: left;">Email address</label>
        <input id="emailId" type="text" v-model="login.login" />
        <br />
        <label for="password" class="grey-text" style="text-align: left;">Password</label>
        <input id="password" type="password" v-model="login.password" />
        <br />
        <p>
          {{ alert.register }}
          <router-link :to="Register">Click Here</router-link>
        </p>
        <button v-on:click="onSubmit">Log in</button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      alert: {
        message: "Kindly login to use our services",
        register: "Don't you have an account?"
      },
      login: {
        login: "",
        password: ""
      },
      shake: false,
      good: "",
      fake: {
        login: "vincent",
        password: "admin"
      }
    };
  },
  computed: {
    isShake: function() {
      console.log(this.shake);
      if (this.shake == true) {
        return "shake";
      }
      return "none";
    }
  },
  methods: {
    onSubmit: function(event) {
      event.preventDefault();
      this.shake = false;
      setTimeout(function() {
        if (
          this.fake.login == this.login.login &&
          this.fake.password == this.login.password
        ) {
          this.alert.message = "Hello Huston !";
        } else {
          this.shake = true;
          this.alert.message = "Huston, we got a problem !";
        }
      }, 3000);
      console.log(this.shake);
    }
  }
};
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
}

body {
  background-image: url("https://images-assets.nasa.gov/image/6900952/6900952~orig.jpg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}

section {
  background-color: #ffffff;
  width: 25%;
  min-height: 25%;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5%;
}
form {
  display: flex;
  flex-direction: column;
  padding: 15px;
}
h2 {
  color: #1b1a1a;
  margin-left: auto;
  margin-right: auto;
}

.info {
  width: 100%;
  padding: 1em 5px;
  text-align: center;
  min-height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info.error {
  border: 1px solid #a90e00;
  background-color: #ff3c41;
  color: #a90e00;
}
.info p {
  margin: auto;
  padding: 5px;
}
.info.good {
  border: 1px solid #416d50;
  background-color: #47cf73;
  color: #416d50;
}

input {
  height: 40px;
}
button {
  height: 40px;
  padding: 5px 5px;
  margin: 10px 0px;
  font-weight: bold;
  background-color: #526bbe;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #711f1b;
}

@-webkit-keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }
  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate(10px, 0, 0);
  }
}

.shake {
  animation-name: shake;
  animation-duration: 1s;
  /*animation-fill-mode: both;*/
}

@media screen and (max-width: 780px) {
  section {
    width: 90%;
  }
}
</style>

