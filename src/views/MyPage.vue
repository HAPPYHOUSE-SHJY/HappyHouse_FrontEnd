<template>
  <div style="min-height: 400px">
    <h2>마이페이지</h2>
    <br /><br />
    <table>
      <tr>
        <th>이름</th>
        <td>
          {{ user.username }}
        </td>
      </tr>
      <tr>
        <th>아이디</th>
        <td>{{ user.userid }}</td>
      </tr>
      <tr>
        <th>이메일</th>
        <td>{{ user.email }}</td>
      </tr>
      <tr>
        <th>주소</th>
        <td>{{ user.address }}</td>
      </tr>
      <tr>
        <th>가입일</th>
        <td>{{ user.joindate }}</td>
      </tr>
    </table>
    <br /><br />
    <div class="mypage-btn">
      <v-btn @click="moveModify" color="success">
        <v-icon left> mdi-pencil </v-icon>
        회원정보 수정
      </v-btn>
      <v-btn style="margin-left: 20px" color="error" @click.prevent="leave"> 탈퇴 </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import http from "@/util/http-common";

const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  data() {
    return {
      user: null,
    };
  },

  created() {
    axios.defaults.headers.common["auth-token"] = this.$store.state.accessToken;
    axios
      .get(`${SERVER_URL}/user/info`)
      .then((response) => {
        this.user = response.data;
        console.log("MyPage : ");
        console.log(response.data.user);
      })
      .catch(() => {
        this.$store.dispatch("LOGOUT").then(() => this.$router.replace("/"));
      });
  },
  methods: {
    leave: function () {
      http
        .delete("/user/" + this.user.userid)
        .then((response) => {
          if (response.data == "success") {
            alert("삭제처리를 하였습니다.");
          } else {
            alert("삭제처리를 하지 못했습니다.");
          }
        })
        .catch(() => {
          alert("서버에 오류가 생겼습니다 ㅈㅅ");
        })
        .finally(() =>
          this.$store.dispatch("LOGOUT").then(() => this.$router.replace("/").catch(() => {}))
        );
    },
    moveModify() {
      this.$router.push("/modify");
    },
  },
};
</script>

<style>
table,
tr,
td {
  border: 1px solid;
  border-collapse: collapse;
  text-align: center;
}

table {
  width: 40%;
  height: 200px;
  margin: auto;
}
.btn-list {
  margin-left: 20px;
}
.mypage-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
