<template>
  <div style="min-height: 400px">
    <h2>QnA 수정하기</h2>
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
    <v-btn
      class="mx-2"
      fab
      color="primary"
      width="40px"
      height="40px"
      @click="moveInsert"
      style="float: right"
    >
      <v-icon dark> mdi-pencil </v-icon>
    </v-btn>
    <br /><br />
    <div class="form-group">
      <table>
        <tr>
          <th><label for="writer">글번호</label></th>
          <td>
            <input
              type="text"
              class="form-control"
              id="no"
              ref="no"
              v-model="article.no"
              readonly
            />
          </td>
        </tr>
        <tr>
          <th>
            <label for="writer">작성자</label>
          </th>
          <td>
            <input
              type="text"
              class="form-control"
              id="writer"
              ref="writer"
              v-model="article.writer"
              readonly
            />
          </td>
        </tr>
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
              style="width: 95%; margin: 10px"
              placeholder="제목을 입력하세요"
              v-model="article.title"
            />
          </td>
        </tr>
        <tr>
          <th>
            <label for="content">내용</label>
          </th>
          <td>
            <textarea
              type="text"
              class="form-control"
              style="width: 95%; margin: 5px auto 5px"
              id="contnet"
              ref="content"
              placeholder="내용을 입력하세요"
              v-model="article.content"
            ></textarea>
          </td>
        </tr>
      </table>
      <br /><br />
      <v-btn color="blue" style="width: 80px; left: 45%" dark @click="check"> 수정완료 </v-btn>
    </div>
    <br />
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "SelectBoardByNo",
  props: ["no"],
  data() {
    return {
      upHere: false,
      article: {},
      loading: true,
      errored: false,
    };
  },
  methods: {
    check() {
      let err = true;
      let msg = "";
      err &&
        !this.article.title &&
        ((msg = "제목 입력해주세요"), (err = false), this.article.$refs.title.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.article.$refs.content.focus());

      if (!err) alert(msg);
      else this.updateBoard();
    },
    updateBoard() {
      http
        .put("/qnaboard/" + this.article.no, {
          no: this.article.no,
          regtime: this.article.regtime,
          writer: this.article.writer,
          title: this.article.title,
          content: this.article.content,
        })
        .then((response) => {
          if (response.data == "success") {
            alert("글등록 업데이트처리를 하였습니다.");
            this.$router.push("/qnaboard/");
          } else {
            alert("글등록 업데이트처리를 하지 못했습니다.");
          }
        })
        .catch(() => {
          alert("서버에 오류가 생겼습니다 ㅈㅅ");
        });
    },

    moveList() {
      this.$router.push("/qnaboard");
    },
    moveInsert() {
      this.$router.push("/insertboard");
    },
  },
  mounted() {
    http
      .get("/qnaboard/" + this.no)
      .then((response) => (this.article = response.data))
      .catch(() => {
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style scoped>
#text {
  text-align: left;
}
#card {
  position: relative;
}
#subtitle {
  float: right;
}
#no,
#writer {
  font-weight: bold;
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
  padding: 20px;
}
table {
  width: 50%;
  height: 40%;
  margin: auto;
}
</style>
