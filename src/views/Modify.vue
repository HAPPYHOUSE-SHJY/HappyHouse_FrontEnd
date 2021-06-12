<template>
  <v-container>
    <v-form class="modify-form" ref="form">
      <v-col cols="12" sm="10">
        <v-text-field
          v-model="user.userid"
          :counter="14"
          :rules="idRules"
          label="ID"
          required
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="10">
        <v-text-field
          v-model="user.username"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="modifyPassword"
          :counter="10"
          :rules="nameRules"
          label="New Password"
          type="password"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="verifyPassword"
          :counter="10"
          :rules="nameRules"
          label="Verify Password"
          ref="verifyPassword"
          type="password"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="10">
        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="E-mail"
          ref="email"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <v-text-field
          v-model="user.address"
          :rules="addressRules"
          label="Address"
          required
          readonly
        >
        </v-text-field>
        <v-btn color="primary" class="mr-4" @click="searchAddress"> 우편번호 검색 </v-btn>
      </v-col>

      <div class="modify-btn">
        <v-btn color="primary" class="mr-4" @click.prevent="check"> 수정완료 </v-btn>
        <v-btn color="error" @click="moveMain" class="mr-4"> 취소</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import http from "@/util/http-common";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  data() {
    return {
      user: null,
      modifyPassword: "",
      verifyPassword: "",
    };
  },

  created() {
    axios.defaults.headers.common["auth-token"] = this.$store.state.accessToken;
    axios
      .get(`${SERVER_URL}/user/info`)
      .then((response) => {
        this.user = response.data;
      })
      .catch(() => {
        this.$store.dispatch("LOGOUT").then(() => this.$router.replace("/"));
      });
  },
  methods: {
    check() {
      let err = true;
      let msg = "";
      this.modifyPassword &&
        !(this.modifyPassword == this.verifyPassword) &&
        ((msg = "새로운 비밀번호가 일치하지 않습니다"),
        (err = false),
        this.$refs.verifyPassword.focus());
      err &&
        !this.user.email &&
        ((msg = "이메일을 입력해주세요"), (err = false), this.$refs.email.focus());
      err &&
        !this.user.address &&
        ((msg = "주소를 선택해주세요"), (err = false), this.searchAddress());

      if (!err) alert(msg);
      else this.modify();
    },
    modify: function () {
      console.log("수정 ㄱㄱ");
      http
        .put("/user", {
          userid: this.user.userid,
          username: this.user.username,
          userpwd: this.modifyPassword == "" ? this.user.userpwd : this.modifyPassword,
          address: this.user.address,
          email: this.user.email,
        })
        .then(({ data }) => {
          if (data == "success") {
            alert("회원 정보 수정이 완료 되었습니다");
            this.$router.push("/mypage");
          } else {
            alert("회원 정보 수정을 처리 하지 못했습니다.");
          }
        })
        .catch(() => {
          alert("서버에 오류가 생겼습니다 ㅈㅅ");
        });
    },
    searchAddress() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백(”)값을 가지므로, 이를 참고하여 분기 한다.
          let fullAddr = ""; // 최종 주소 변수
          let extraAddr = ""; // 조합형 주소 변수
          // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            fullAddr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddr = data.jibunAddress;
          }
          // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
          if (data.userSelectedType === "R") {
            //법정동명이 있을 경우 추가한다.
            if (data.bname !== "") {
              extraAddr += data.bname;
            }
            // 건물명이 있을 경우 추가한다.
            if (data.buildingName !== "") {
              extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            }
            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
            fullAddr += extraAddr !== "" ? " (" + extraAddr + ")" : "";
          }
          // 우편번호와 주소 정보를 해당 필드에 넣는다.

          this.user.address = fullAddr;
        },
      }).open();
    },

    moveMain() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.modify-form {
  max-width: 700px;
  margin: 0 auto;
}
.modify-btn {
  float: right;
}
</style>
