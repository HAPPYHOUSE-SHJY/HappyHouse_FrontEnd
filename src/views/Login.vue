<template>
  <v-container>
    <h2>Welcome to Happy House!</h2>
    <br />
    <v-form class="login-form" ref="loginForm" lazy-validation>
      <!-- ID 입력 -->
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field v-model="user.userid" :rules="idRules" label="ID" required></v-text-field>
        </v-col>
      </v-row>
      <!-- PWD 입력 -->
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="user.userpwd"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 5 characters"
            counter
            @click:append="show = !show"
            @keypress.enter="login"
          ></v-text-field>
        </v-col>
        <!-- <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col> -->
      </v-row>
      <!-- 로그인 버튼 -->
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12" sm="12">
          <v-btn block color="success" @click.prevent="login"> Login </v-btn>
        </v-col>
        <v-col cols="12" sm="12">
          <v-btn @click="moveFind" block color="warning"> forgot your password? </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export default {
  name: "Login",

  data() {
    return {
      valid: true,
      user: {
        userid: "",
        userpwd: "",
      },
      show: false,
      idRules: [(v) => !!v || "ID is required"],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 5) || "Min 5 characters",
      },
    };
  },
  computed: {
    nextRoute() {
      return this.$route.params.nextRoute ? this.$route.params.nextRoute : "";
    },
  },
  methods: {
    login: function () {
      // LOGIN 액션 실행
      // 서버와 통신(axios)을 해 토큰값을 얻어야 하므로 Actions를 호출.
      this.$store
        .dispatch("LOGIN", this.user)
        //현재 표시되는 주소를 변경  => 로그인후 갈곳 없으면 / index,
        // nextRoute가 있으면 해당 페이지로 이동  => 인증이 필요한 곳에 로그인 없이 접근시 로그인 페이지로 이동, 로그인한후 원래 접근하려던 페이지로 이동
        .then(() => {
          this.$router.replace(`/${this.nextRoute}`);
        })
        .catch(({ message }) => (this.msg = message));
    },
    moveFind() {
      this.$router.push("/find/");
    },
  },
};
</script>
<style>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
