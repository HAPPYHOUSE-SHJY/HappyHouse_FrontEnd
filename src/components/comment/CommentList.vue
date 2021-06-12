<template>
  <div>
    <div :key="item.no" v-for="item in comments">
      <comment-list-item :commentObj="item" :reloadComment="reloadComment" />
    </div>
    <comment-create v-if="getIsAdmin == 1" :boardno="boardno" :reloadComment="reloadComment" />
  </div>
</template>

<script>
import http from "@/util/http-common";
import { mapGetters } from "vuex";
import CommentListItem from "@/components/comment/CommentListItem.vue";
import CommentCreate from "@/components/comment/CommentCreate.vue";

export default {
  name: "CommentList",
  props: ["boardno"],
  components: {
    CommentListItem,
    CommentCreate,
  },
  data() {
    return {
      comments: [],
    };
  },
  computed: {
    ...mapGetters(["getAccessToken", "getUserId", "getUserName", "getIsAdmin"]),
  },
  methods: {
    reloadComment() {
      http.get("/comment/" + this.boardno).then((response) => {
        this.comments = response.data;
      });
    },
  },
  mounted() {
    setTimeout(() => {
      http.get("/comment/" + this.boardno).then((response) => {
        this.comments = response.data;
      });
    }, 150);
  },
};
</script>
