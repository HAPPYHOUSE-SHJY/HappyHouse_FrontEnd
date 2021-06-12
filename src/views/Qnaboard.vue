<template>
  <div style="min-height: 400px">
    <h2>Q&A 게시판 - 무엇이든 물어보살</h2>
    <br />
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

    <br />
    <br />

    <div v-if="articles.length">
      <table class="table">
        <thead>
          <tr>
            <th id="no">글번호</th>
            <th id="writer">글쓴이</th>
            <th id="title">제목</th>
            <th id="regtime">등록일</th>
            <th id="check">비고</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.no">
            <td v-html="article.no"></td>
            <td v-html="article.writer"></td>
            <td class="text-left">
              <span @click="detailArticle(article.no)">{{ article.title }}</span>
            </td>
            <td>
              <span> {{ $moment(article.regtime).format("YY년 MM월 DD일") }} </span>
            </td>
            <td>
              <v-btn color="blue" style="width: 30px" dark @click="detailArticle(article.no)">
                상세보기
              </v-btn>
              <v-btn
                v-if="getIsAdmin == 1 || getUserId == article.writer"
                color="red"
                style="width: 30px"
                dark
                @click="deleteArticle(article.no)"
              >
                삭제</v-btn
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>QnA가 존재하지 않습니다.</div>
  </div>
</template>

<script>
import Vue from "vue";
import VueMoment from "vue-moment";
import http from "@/util/http-common";
import { mapGetters } from "vuex";

Vue.use(VueMoment);

export default {
  name: "Qnaboard",
  data() {
    return {
      upHere: false,
      articles: [],
      loading: true,
      errored: false,
    };
  },
  computed: {
    ...mapGetters(["getAccessToken", "getUserId", "getUserName", "getIsAdmin"]),
  },
  methods: {
    detailArticle(did) {
      this.$router.push("/detailboard/" + did);
    },
    retrieveArticle() {
      http
        .get("/qnaboard")
        .then(({ data }) => {
          console.log(data);
          this.articles = data;
          console.log(this.articles);
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });
    },
    deleteArticle(did) {
      alert(did + "가 삭제합니다.");
      http
        .delete("/qnaboard/" + did)
        .then((response) => {
          if (response.data == "success") {
            alert("삭제처리를 하였습니다.");
            this.retrieveArticle();
          } else {
            alert("삭제처리를 하지 못했습니다.");
          }
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    moveList() {
      this.$router.push("/qnaboard");
    },
    moveInsert() {
      this.$router.push("/insertboard");
    },
  },
  mounted() {
    this.retrieveArticle();
  },
};
</script>

<style scoped>
#no {
  width: 10%;
}
#writer {
  width: 20%;
}
#title {
  width: 30%;
}
#comment_count {
  width: 10%;
}
#regitime {
  width: 10%;
}
#check {
  width: 20%;
}
#subtitle {
  float: right;
}
h2 {
  text-align: center;
}
button {
  margin-left: 30px;
}

table {
  border-top: 1px solid #444444;
  border-right: none;
  border-left: none;
  width: 60%;
  border-collapse: collapse;
}
th,
td {
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #444444;
  padding: 10px;
  border-collapse: collapse;
}
</style>
