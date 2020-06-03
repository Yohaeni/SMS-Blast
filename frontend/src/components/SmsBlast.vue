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
        <b-input
          id="address"
          class="inputfield"
          placeholder="Mobile Number (Ex. 917xxxxxxx)"
          v-model="address"
        ></b-input>
      </div>
      <div class="col-sm"></div>
    </div>
    <!-- <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <b-input id="firstname" class="inputfield" placeholder="First Name" v-model="firstName"></b-input>
      </div>
      <div class="col-sm"></div>
    </div>
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <b-input id="lastname" class="inputfield" placeholder="Last Name" v-model="lastName"></b-input>
      </div>
      <div class="col-sm"></div>
    </div>
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <b-input id="pmessage" class="inputfield" placeholder="Personal Message" v-model="pMessage"></b-input>
      </div>
      <div class="col-sm"></div>
    </div>-->
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <label for="files">For the multiple sending, Please upload your CSV file here</label>
        <input
          id="files"
          type="file"
          class="inputfield"
          accept=".csv"
          @change="readCSV($event.target.files)"
        />
      </div>
      <div class="col-sm"></div>
    </div>
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <span class="limiter">{{charactersLeft}}</span>
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

    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <label id="history_label" for="history">
          <h1>SMS History</h1>
        </label>
        <div class="history_box">
          <table id="history" v-if="histories">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Message</th>
                <th>TimeStamp</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(history,idx) in histories">
                <td>{{history.recipients}}</td>
                <td>{{history.message}}</td>
                <td>{{history.timestamp}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "SMSBlast",
  data() {
    return {
      address: "",
      message: "",
      firstName: "",
      lastName: "",
      pMessage: "",
      msg: "SMS Blaster",
      histories: []
    };
  },

  methods: {
    //post mobile number and message to backend using api call
    sendMessage() {
      this.$http
        .post("/api", {
          address: this.address,
          message: this.message,
          firstname: this.firstName,
          lastname: this.lastName,
          pmessage: this.pMessage
        })
        .then(res => {
          console.log(res);
        });

      this.address = "";
      this.message = "";
      this.firstName = "";
      this.lastName = "";
      this.pMessage = "";

      this.getHistory();
    },
    readCSV(files) {
      // Check for the various File API support.
      if (window.FileReader) {
        // FileReader are supported.
        this.getAsText(files[0]);
      } else {
        alert("FileReader are not supported in this browser.");
      }
    },
    getAsText(fileToRead) {
      var reader = new FileReader();
      // Read file into memory as UTF-8
      reader.readAsText(fileToRead);
      // Handle errors load
      reader.onload = this.loadHandler;
      reader.onerror = this.errorHandler;
    },
    loadHandler(event) {
      var csv = event.target.result;
      this.processData(csv);
    },
    processData(csv) {
      var allTextLines = csv.split(/\r\n|\n/);
      var addresses = [];
      var firstNames = [];
      var lastNames = [];
      var pMessages = [];
      for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(";");
        var number = "";
        var firstName = "";
        var lastName = "";
        var pMessage = "";

        //select mobile numbers from each lines
        for (var j = 0; j < data.length; j++) {
          var lineData = data[j].split(",");
          number = lineData[0];
          firstName = lineData[1];
          lastName = lineData[2];
          pMessage = lineData[3];
        }
        addresses.push(number);
        firstNames.push(firstName);
        lastNames.push(lastName);
        pMessages.push(pMessage);
      }
      this.address = addresses.toString();
      this.firstName = firstNames.toString();
      this.lastName = lastNames.toString();
      this.pMessage = pMessages.toString();
    },
    errorHandler(evt) {
      if (evt.target.error.name == "NotReadableError") {
        alert("Cannot read file !");
      }
    },
    getHistory() {
      this.$http.post("/getHistory").then(res => {
        this.histories = res.data;
        console.log(this.histories);
      });
    }
  },
  computed: {
    //Count the number of input characters
    charactersLeft() {
      var char = this.message.length,
        limit = 160;

      return char + " / " + limit;
    }
  },
  mounted() {
    this.getHistory();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  color: #ffffff;
  font-weight: 700;
  text-align: left;
}
.limiter {
  color: #ffffff;
  margin-left: 400px;
}
.inputfield {
  height: 50px;
  width: 500px;
  margin-bottom: 10px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#history {
  background: #ffffff;
}
#history_label {
  padding-top: 40px;
}
#message {
  width: 500px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#send {
  margin-top: 20px;
}
h1 {
  padding: 10px;
  color: white;
  font-weight: 200;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.history_box {
  width: 500px;
  max-height: 300px;
  overflow-y: scroll;
  color: black;
  border-radius: 1.5%;
}
</style>
