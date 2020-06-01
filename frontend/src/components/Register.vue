<template>
  <div>
    <section id="register">
      <form>
        <p class="h4 text-center mb-4">Sign up</p>
        <p class="h5 mb-4">Company Information</p>
        <label for="defaultFormRegisterNameEx" class="grey-text">Company Name</label>
        <input
          type="text"
          id="defaultFormRegisterNameEx"
          class="form-control"
          v-model="companyName"
        />
        <br />
        <label for="defaultFormRegisterCompanyContact" class="grey-text">Company Mobile Number</label>
        <input
          type="text"
          id="defaultFormRegisterCompanyContact"
          class="form-control"
          v-model="companyContact"
        />
        <br />
        <label for="defaultFormRegisterEmailEx" class="grey-text">Company email</label>
        <input
          type="email"
          id="defaultFormRegisterEmailEx"
          class="form-control"
          v-model="companyEmail"
        />
        <br />
        <label for="defaultFormRegisterPasswordEx" class="grey-text">Your password</label>
        <input
          type="password"
          id="defaultFormRegisterPasswordEx"
          class="form-control"
          v-model="password"
        />
        <br />
        <label for="defaultFormRegisterConfirmPasswordEx" class="grey-text">Confirm Your password</label>
        <input
          type="password"
          id="defaultFormRegisterConfirmPasswordEx"
          class="form-control"
          v-model="confirmPassword"
        />
        <br />
        <p class="h5 mb-4">Personal Information</p>
        <label for="defaultFormRegisterFirstName" class="grey-text">First Name</label>
        <input
          type="text"
          id="defaultFormRegisterFirstName"
          class="form-control"
          v-model="firstName"
        />
        <br />
        <label for="defaultFormRegisterLastName" class="grey-text">Last Name</label>
        <input type="text" id="defaultFormRegisterLastName" class="form-control" v-model="lastName" />
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
          <button class="btn btn-unique" type="submit">Register</button>
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