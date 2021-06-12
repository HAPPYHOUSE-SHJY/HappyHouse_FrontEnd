<template>
  <div>
    <v-row>
      <v-carousel
        v-model="model"
        cycle
        height="100%"
        style="width: 60%; height: 100%; margin: 0 auto"
      >
        <v-carousel-item v-for="img in imgs" :key="img">
          <v-sheet color="#e0eeee" height="100%" tile>
            <img :src="img" style="height: 100%; width: 100%" />
            <v-container fill-height fluid pa-0 ma-0 pb-3>
              <v-layout fill-height align-end pb-4 mb-4>
                <v-flex xs6>
                  <v-card color="black" class="pa-2"> </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

      <v-container style="margin: 0 auto; width: 30%; height: 80%">
        <v-row>
          <h2 style="width: 100%; margin: 50px auto 20px">실시간 뉴스</h2>
        </v-row>
        <v-row>
          <!-- 뉴스 -->
          <v-data-table
            style="width: 100%; margin: 0px auto 20px"
            :headers="headers"
            :items="news"
            sort-by="pubDate"
            hide-default-header
            hide-default-footer
            class="elevation-1"
            @click:row="moveArticle"
          >
            <template v-slot:item.pubDate="{ item }">
              <span>
                {{ $moment(item.pubDate).format("MM월 DD일") }}
              </span>
              <!-- <span>{{ new Date(item.pubDate).toLocaleString() }}</span> -->
            </template>
          </v-data-table>
        </v-row>
        <v-row><h2 style="width: 100%; margin: 20px auto">공지사항</h2></v-row>
        <v-row>
          <!-- 공지사항 -->
          <v-data-table
            style="width: 100%; margin: 0px auto"
            :headers="noticeHeaders"
            :items="notices"
            sort-by="regtime"
            hide-default-header
            hide-default-footer
            class="elevation-1"
            @click:row="moveNotice"
          >
            <template v-slot:item.regtime="{ item }">
              <span>
                {{ $moment(item.regtime).format("MM월 DD일") }}
              </span>
              <!-- <span>{{ new Date(item.pubDate).toLocaleString() }}</span> -->
            </template>
          </v-data-table>
          <router-link to="/notice">
            <v-btn text>
              <span class="mr-2">More </span>
            </v-btn>
          </router-link>
        </v-row>
      </v-container>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue";
import VueMoment from "vue-moment";
import http from "@/util/http-common";

Vue.use(VueMoment);

export default {
  name: "Home",
  data() {
    return {
      imgs: [
        require("@/assets/home1.jpg"),
        require("@/assets/home2.jpg"),
        require("@/assets/home3.jpg"),
        require("@/assets/home4.jpg"),
        require("@/assets/home5.jpg"),
      ],
      headers: [
        {
          text: "제목",
          value: "title",
          align: "left",
        },
        { text: "내용", align: "center", value: "pubDate", dataType: "Date" },
      ],
      news: [],
      noticeHeaders: [
        {
          text: "제목",
          value: "title",
          align: "left",
        },
        { text: "내용", align: "center", value: "regtime" },
      ],
      notices: [],
    };
  },
  created() {
    http
      .get("/news")
      .then((response) => {
        this.news = response.data;
      })
      .catch(() => {
        alert("서버에 오류가 생겼습니다 지송~~");
      });
    http
      .get("/notice/main")
      .then((response) => {
        this.notices = response.data;
      })
      .catch(() => {
        alert("서버에 오류가 생겼습니다 ㅈㅅ");
      });
  },
  methods: {
    moveArticle(val) {
      window.open(val.link);
    },
    moveNotice(val) {
      console.log(val);
      this.$router.push(`/detailnotice/${val.no}`);
    },
  },
};
</script>
