<template>
  <div style="min-height: 400px">
    <h2>공지사항</h2>
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
    <br />
    <br />
    <div v-if="articles.length">
      <table class="table">
        <thead>
          <tr>
            <th id="no">글번호</th>
            <th id="title">제목</th>
            <th id="regtime">날짜</th>
            <th id="check">비고</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.no">
            <td v-html="article.no"></td>
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
                v-if="getIsAdmin == 1"
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
import { mapGetters } from "vuex";
import VueMoment from "vue-moment";
import http from "@/util/http-common";

Vue.use(VueMoment);

export default {
  name: "Notice",
  data() {
    return {
      header: [
        { text: "글번호", value: "no" },
        { text: "제목", value: "title" },
        { text: "등록일", value: "regtime" },
        { text: "비고", value: "check" },
      ],
      upHere: false,
      articles: [],
      loading: true,
      errored: false,
      articleDate: "",
    };
  },
  computed: {
    ...mapGetters(["getAccessToken", "getUserId", "getUserName", "getIsAdmin"]),
  },
  methods: {
    detailArticle(did) {
      this.$router.push("/detailnotice/" + did);
    },
    retrieveArticle() {
      http
        .get("/notice")
        .then(({ data }) => {
          console.log(data);
          this.articles = data;
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });
    },
    deleteArticle(did) {
      http
        .delete("/notice/" + did)
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
      this.$router.push("/notice");
    },
    moveInsert() {
      this.$router.push("/insertnotice");
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
  border-collapse: collapse;
  /* border-right: 1px solid #ffffff;
  border-left: 1px solid #ffffff; */
  border-bottom: 1px solid #444444;
  width: 60%;
}

th,
td {
  border-bottom: 1px solid #444444;
  border-right: none;
  border-left: none;
  padding: 10px;
}
</style>
