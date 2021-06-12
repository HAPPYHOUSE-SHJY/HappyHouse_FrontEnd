<template>
  <div style="min-height: 400px">
    <h2>공지사항 등록하기</h2>
    <br />
    <v-btn
      class="mx-2"
      width="40px"
      height="40px"
      fab
      dark
      color="teal"
      @click="moveList"
      style="float: right"
    >
      <v-icon dark>mdi-format-list-bulleted-square</v-icon>
    </v-btn>

    <br /><br />
    <div v-if="!submitted">
      <div class="form-group">
        <table>
          <tr>
            <th>
              <label for="title">제목</label>
            </th>
            <td>
              <input
                type="text"
                class="form-control"
                id="title"
                ref="title"
                placeholder="제목을 입력하세요"
                v-model="title"
              />
            </td>
          </tr>
          <tr>
            <th><label for="content">내용</label></th>
            <td>
              <textarea
                type="text"
                class="form-control"
                id="contnet"
                ref="content"
                placeholder="내용을 입력하세요"
                v-model="content"
              ></textarea>
            </td>
          </tr>
        </table>
      </div>
      <br /><br />
      <v-btn color="blue" style="width: 80px; left: 45%" dark @click="check"> 등록 </v-btn>
    </div>

    <!-- <div class="div-complete" v-else>
      <h4 style="width: 500px; left: 50%">성공적으로 글등록이 완료하였습니다!</h4>
      <router-link class="btn btn-primary" to="/insertnotice">새 글 작성</router-link>
      |
      <router-link class="btn btn-primary" to="/notice">목록으로</router-link>
    </div> -->
  </div>
</template>
<script>
import http from "@/util/http-common";
//import axios from 'axios';
//const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  name: "InsertNotice",
  data: function () {
    return {
      info: null,
      loading: true,
      errored: false,
      content: "",
      no: "",
      regtime: "",
      title: "",
      submitted: false,
    };
  },
  methods: {
    check() {
      let err = true;
      let msg = "";
      !this.title && ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err &&
        !this.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.insertNotice();
    },
    insertNotice() {
      http
        .post("/notice", {
          title: this.title,
          content: this.content,
        })
        .then(({ data }) => {
          if (data == "success") {
            alert("글등록 처리를 하였습니다.");
            this.submitted = true;
            this.moveList();
          } else {
            alert("글등록 처리를 하지 못했습니다.");
          }
        })
        .catch(() => {
          alert("서버에 오류가 생겼습니다 ㅈㅅ");
        });
    },
    moveList() {
      this.$router.push("/notice");
    },
  },
};
</script>

<style scoped>
#subtitle {
  float: right;
}
button {
  margin-left: 30px;
}
table,
tr,
td {
  border: 1px solid;
  border-collapse: collapse;
}
th {
  text-align: center;
}
input,
textarea {
  text-align: left;
  margin: 5px;
  padding: 5px;
  width: 100%;
  height: 100%;
}
textarea {
  margin-top: 20px;
}
table {
  width: 50%;
  height: 200px;
  margin: auto;
}
</style>
