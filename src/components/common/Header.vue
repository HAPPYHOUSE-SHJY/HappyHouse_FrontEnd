<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#FFFFFF"
      src="@/assets/logo2.png"
      shrink-on-scroll
      prominent
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
      dark
      href="/"
    >
      <v-spacer></v-spacer>
      <template v-slot:extension>
        <router-link to="/" style="margin: 2px">
          <img src="/favicon.ico" style="width: 50px; height: 50px" />
        </router-link>
        <v-btn
          class="menuItem"
          v-for="(menu, index) in menuItems"
          :key="index"
          :to="menu.path"
          text
          x-large
        >
          {{ menu.title }}
        </v-btn>
        <v-spacer></v-spacer>

        <v-spacer></v-spacer>
        <div v-if="getAccessToken">
          <v-avatar color="primary" size="35">
            <span class="white--text headline">{{ getUserName.charAt(0).toUpperCase() }}</span>
          </v-avatar>
          <router-link to="/management">
            <v-btn x-large text v-if="getIsAdmin == 1">
              <span class="mr-2">Management</span>
            </v-btn>
          </router-link>

          <v-btn x-large @click="moveMyPage" text>
            <span class="mr-2">My Page </span>
          </v-btn>

          <v-btn x-large text @click.prevent="onClickLogout">
            <span class="mr-2">logout</span>
          </v-btn>
        </div>
        <div v-else>
          <v-btn x-large @click="moveLogin" text>
            <span class="mr-2">login</span>
          </v-btn>

          <v-btn x-large @click="moveRegister" text>
            <span class="mr-2">signup</span>
          </v-btn>
        </div>
      </template>
    </v-app-bar>
    <!-- <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="600"> -->
    <v-container style="height: 220px"></v-container>
    <!-- </v-sheet> -->
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      menuItems: [
        { title: "공지사항", path: "/notice" },
        { title: "아파트 실거래가", path: "/apt" },
        { title: "무엇이든 물어보살", path: "/qnaboard" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getAccessToken", "getUserId", "getUserName", "getIsAdmin"]),
  },
  methods: {
    onClickLogout() {
      this.$store.dispatch("LOGOUT").then(() => this.$router.replace("/").catch(() => {}));
    },
    moveMyPage() {
      this.$router.push("/mypage");
    },
    moveLogin() {
      this.$router.push("/login");
    },
    moveRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
