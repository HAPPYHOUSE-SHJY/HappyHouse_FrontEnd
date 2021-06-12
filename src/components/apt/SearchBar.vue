<template>
  <v-row>
    <v-col>
      <input
        class="underline"
        type="text"
        minlength="5"
        v-model="aptname"
        placeholder=" 아파트 명"
        @keypress.enter="aptName"
        required
      />
      <v-btn depressed color="primary" @click="aptName"> 검색 </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      aptname: "",
    };
  },
  methods: {
    aptName: function () {
      console.log(this.aptname);
      this.$emit("apt-name", this.aptname); //발생할 이벤트 이름, 보낼 데이터
    },
  },
};
</script>

<style>
.underline {
  background: linear-gradient(rgb(151, 151, 151), rgb(151, 151, 151)) center bottom 5px /
    calc(100% - 10px) 1px no-repeat;
  background-color: #fcfcfc;
  padding: 10px;
}
</style>
