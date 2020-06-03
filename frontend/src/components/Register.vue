<template>
  <div>
    <img src="../assets/Logo-White_transparent.png" style="max-width: 500px" />
    <section id="register">
      <form autocomplete="off">
        <p class="h4 text-center mb-4">Sign up</p>
        <p class="h5 mb-4">Company Information</p>
        <label for="defaultFormRegisterNameEx" class="grey-text">Company Name</label>
        <input
          type="text"
          id="defaultFormRegisterNameEx"
          class="form-control"
          v-model="companyName"
          required
        />
        <br />
        <label for="defaultFormRegisterCompanyContact" class="grey-text">Company Mobile Number</label>
        <input
          type="text"
          id="defaultFormRegisterCompanyContact"
          class="form-control"
          v-model="companyContact"
          required
        />
        <br />
        <label for="defaultFormRegisterEmailEx" class="grey-text">Company email</label>
        <input
          type="email"
          id="defaultFormRegisterEmailEx"
          class="form-control"
          v-model="companyEmail"
          required
        />
        <br />
        <label for="defaultFormRegisterPasswordEx" class="grey-text">Your password</label>
        <input
          type="password"
          id="defaultFormRegisterPasswordEx"
          class="form-control"
          v-model="password"
          required
        />
        <br />
        <label for="defaultFormRegisterConfirmPasswordEx" class="grey-text">Confirm Your password</label>
        <input
          type="password"
          id="defaultFormRegisterConfirmPasswordEx"
          class="form-control"
          v-model="confirmPassword"
          required
        />
        <br />
        <p class="h5 mb-4">Personal Information</p>
        <label for="defaultFormRegisterFirstName" class="grey-text">First Name</label>
        <input
          type="text"
          id="defaultFormRegisterFirstName"
          class="form-control"
          v-model="firstName"
          required
        />
        <br />
        <label for="defaultFormRegisterLastName" class="grey-text">Last Name</label>
        <input
          type="text"
          id="defaultFormRegisterLastName"
          class="form-control"
          v-model="lastName"
          required
        />
        <br />
        <label
          for="defaultFormRegisterMobileNumber"
          class="grey-text"
        >Personal Mobile Number (Optional)</label>
        <input
          type="text"
          id="defaultFormRegisterMobileNumber"
          class="form-control"
          v-model="mobileNumber"
        />
        <br />
        <div class="text-center mt-4">
          <button class="btn btn-unique" @click="submitRegister">Register</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companyName: "",
      companyContact: "",
      companyEmail: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      mobileNumber: ""
    };
  },
  methods: {
    submitRegister() {
      if (this.password === this.confirmPassword) {
        alert("Thanks for Signup! Now you can Login");
        this.$router.replace("/");
      } else {
        alert("Password is not matching!");
      }
    }
  }
};
</script>

<style scoped>
section {
  background-color: #ffffff;
  width: 30%;
  min-height: 25%;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5%;
  text-align: left;
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
</style>