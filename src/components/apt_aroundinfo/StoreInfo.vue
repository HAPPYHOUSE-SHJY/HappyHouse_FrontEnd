<template>
  <!-- 주변 상가 정보 Vue -->
  <div>
    <div v-if="stores.length == 0">
      <h2>해당 지역의 상가정보 데이터가 없습니다.</h2>
    </div>
    <v-data-table
      :headers="headers"
      :items="stores"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "StoreInfo",
  props: ["gugunname", "dong", "stores"],
  data() {
    return {
      headers: [
        {
          text: "업체명",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "분류", value: "section" },
        { text: "도로명주소", value: "address" },
      ],
    };
  },
};
</script>

<style>
h2 {
  margin: 20px auto;
}
</style>
