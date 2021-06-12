<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid>
        <div style="height: 30px"></div>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/common/Header";
// import Footer from "@/components/common/Footer";

export default {
  name: "App",
  components: {
    Header,
    // Footer,
  },
};
</script>

<style></style>
