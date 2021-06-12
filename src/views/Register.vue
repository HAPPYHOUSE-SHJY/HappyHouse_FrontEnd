<template>
  <v-container>
    <h2>회원가입</h2>
    <v-form class="register-form" ref="form">
      <v-col cols="12" sm="12">
        <v-text-field
          v-model="id"
          :counter="14"
          :rules="idRules"
          label="ID"
          required
          ref="id"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
          ref="name"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12">
        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[passwordRules.required, passwordRules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show = !show"
          ref="password"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <v-text-field
          block
          v-model="verify"
          :append-icon="verifyShow ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[passwordRules.required, passwordMatch]"
          :type="verifyShow ? 'text' : 'password'"
          name="input-10-1"
          label="Confirm Password"
          counter
          @click:append="verifyShow = !verifyShow"
          ref="verify"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <v-text-field
          v-model="address"
          :rules="addressRules"
          label="Address"
          required
          readonly
        ></v-text-field>
        <v-btn color="primary" class="mr-4" @click="searchAddress"> 우편번호 검색 </v-btn>
      </v-col>
      <div class="signup-btn">
        <v-btn color="primary" class="mr-4" @click="check"> 회원가입 </v-btn>
        <v-btn color="error" class="mr-4" @click="reset"> 초기화 </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "Register",
  data() {
    return {
      valid: true,
      id: "",
      idRules: [
        (v) => !!v || "ID is required",
        (v) => (v && v.length <= 10) || "ID must be less than 10 characters",
      ],
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      show: false,
      verifyShow: false,
      password: "",
      passwordRules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      verify: "",
      address: "",
      subaddress: "",
      addressRules: [(v) => !!v || "Address is required"],
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    check() {
      let err = true;
      let msg = "";
      !this.id && ((msg = "아이디를 입력해주세요"), (err = false), this.$refs.id.focus());
      err && !this.name && ((msg = "이름을 입력해주세요"), (err = false), this.$refs.name.focus());
      err &&
        !this.password &&
        ((msg = "비밀번호를 입력해주세요"), (err = false), this.$refs.password.focus());
      err &&
        !this.verify &&
        ((msg = "비밀번호를 입력해주세요"), (err = false), this.$refs.verify.focus());
      err &&
        !this.email &&
        ((msg = "이메일을 입력해주세요"), (err = false), this.$refs.email.focus());
      err && !this.address && ((msg = "주소를 선택해주세요"), (err = false), this.searchAddress());

      if (!err) alert(msg);
      else this.register();
    },
    register: function () {
      http
        .post("/user", {
          userid: this.id,
          username: this.name,
          userpwd: this.password,
          address: this.address,
          email: this.email,
        })
        .then(({ data }) => {
          if (data == "success") {
            alert("회원 가입이 완료 되었습니다. 로그인 후 이용해주세요");
            this.moveList();
          } else {
            alert("회원가입 처리를 하지 못했습니다.");
          }
        })
        .catch(() => {
          alert("서버에 오류가 생겼습니다 ㅈㅅ");
        });
    },
    moveList() {
      this.$router.push("/login");
    },
    searchAddress() {
      console.log("메서드 시작 : " + this.address);
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

          console.log(this.address + " / " + fullAddr);
          this.address = fullAddr;
          console.log(this.address + " / " + fullAddr);
        },
      }).open();
    },
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
};
</script>
<style>
.register-form {
  max-width: 500px;
  margin: 0 auto;
}
.signup-btn {
  float: right;
}
</style>
