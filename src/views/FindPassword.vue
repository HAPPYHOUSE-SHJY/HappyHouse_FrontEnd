<template>
  <v-container>
    <h2>비밀번호 찾기</h2>
    <h4 style="text-align: center; height: 50px">이메일로 임시 비밀번호를 전송해드립니다.</h4>
    <v-form class="findPwd-form" ref="findPwdForm" lazy-validation>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field v-model="user.userid" :rules="idRules" label="ID" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-btn block color="primary" @click.prevent="sendEmail"> Send Password </v-btn>
        </v-col>
        <v-col cols="12" sm="12">
          <v-btn block color="error" @click="moveLogin"> Cancel </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import Vue from "vue";
import VueRouter from "vue-router";
import http from "@/util/http-common";

Vue.use(VueRouter);
export default {
  name: "Login",

  data() {
    return {
      valid: true,
      user: {
        userid: "",
        email: "",
      },
      idRules: [(v) => !!v || "ID is required"],
      emailRules: [(v) => !!v || "E-mail is required"],
    };
  },
  methods: {
    sendEmail: function () {
      http
        .post("/user/find", {
          userid: this.user.userid,
          email: this.user.email,
        })
        .then((response) => {
          alert(response.data);
          this.$router.push("/login/");
        })
        .catch(() => {
          alert("서버에 문제가 발생하였습니다.");
        });
    },
    moveLogin() {
      this.$router.push("/login/");
    },
  },
};
</script>
<style>
.login-form {
  max-width: 500px;
}
.findPwd-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
