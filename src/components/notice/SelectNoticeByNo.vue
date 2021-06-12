<template>
  <div style="min-height: 400px">
    <h2>공지사항 상세보기</h2>
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
      v-if="getIsAdmin == 1"
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
    <card class="mt-3" id="card">
      <table>
        <tr>
          <td style="width: 100px">글번호</td>
          <td id="text" v-html="article.no"></td>
        </tr>
        <tr>
          <td>제목</td>
          <td id="text" v-html="article.title"></td>
        </tr>
        <tr>
          <td>내용</td>
          <td id="text" v-html="article.content"></td>
        </tr>
        <tr>
          <td>작성시간</td>
          <td id="text">
            <span> {{ $moment(article.regtime).format("YY년 MM월 DD일 HH시 mm분") }} </span>
          </td>
        </tr>
      </table>
    </card>
    <br />

    <v-btn
      v-if="getIsAdmin == 1"
      tile
      color="success"
      style="left: 45%"
      @click="updateNotice(article.no)"
    >
      <v-icon left> mdi-pencil </v-icon>
      수정하기
    </v-btn>

    <br /><br />
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import VueMoment from "vue-moment";
import http from "@/util/http-common";

Vue.use(VueMoment);

export default {
  name: "SelectNoticeByNo",
  props: ["no"],
  data() {
    return {
      upHere: false,
      article: {},
      user: "",
      comments: [],
      loading: true,
      errored: false,
    };
  },

  computed: {
    ...mapGetters(["getAccessToken", "getUserId", "getUserName", "getIsAdmin"]),
  },
  methods: {
    updateNotice(did) {
      this.$router.push("/updatenotice/" + did);
    },
    moveList() {
      this.$router.push("/notice");
    },
    moveInsert() {
      this.$router.push("/insertnotice");
    },
  },
  mounted() {
    http
      .get("/notice/" + this.no)
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
button {
  margin-left: 30px;
}
table,
tr,
td {
  border: 1px solid;
  border-collapse: collapse;
  text-align: center;
}

table {
  width: 60%;
  height: 200px;
  margin: auto;
}

#text {
  padding: 20px;
}
</style>
