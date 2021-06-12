<template>
  <!-- 검색된 아파트 리스트 정보 Vue -->
  <div>
    <template>
      <v-data-table
        :headers="headers"
        :items="aptlistBydong"
        :sort-by="['name']"
        multi-sort
        class="elevation-1"
      ></v-data-table>

      <!--    :sort-by="['name']"
          :sort-desc="[false, true]"-->
    </template>
  </div>
</template>

<script>
export default {
  name: "AptList",
  props: {
    aptlist: Array,
    dongCode: String,
  },
  data() {
    return {
      headers: [
        {
          text: "일련번호",
          align: "start",
          value: "aptid",
        },
        { text: "아파트이름", value: "name" },
        { text: "법정동", value: "dong" },
        { text: "층수", value: "floor" },
        { text: "거래금액", value: "price" },
      ],
      aptlistBydong: [],
    };
  },
  methods: {
    selectApt: function (apt) {
      this.$emit("select-apt", apt);
    },
    selectImage: function (img) {
      this.$emit("select-img", img);
    },
  },
};
</script>

<style></style>

<!-- <template>
  
  <div>
    <v-card elevation="16" max-width="500" class="mx-auto">
      <v-virtual-scroll :items="aptlist" height="500" item-height="100">
        <template v-slot:default="{ item }">
          <v-list-item>
            <apt-list-item
              :key="item"
              :apt="item"
              @select-apt="selectApt"
              @select-img="selectImage"
            />
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>

<script>
import AptListItem from "@/components/apt/AptListItem.vue";

export default {
  name: "AptList",
  components: {
    AptListItem,
  },
  props: {
    aptlist: Array,
    dongCode: String,
  },
  data() {
    return {
      aptlistBydong: [],
    };
  },
  methods: {
    selectApt: function (apt) {
      this.$emit("select-apt", apt);
    },
    selectImage: function (img) {
      this.$emit("select-img", img);
    },
  },
};
</script>

<style></style>
-->
