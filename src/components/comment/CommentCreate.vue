<template>
  <v-form style="width: 800px; margin: 0 auto">
    <hr style="border: dashed 1px #949494; margin-bottom: 40px" />
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            type="text"
            class="form-control"
            id="content"
            ref="content"
            placeholder="댓글을 입력하세요"
            v-model="content"
            style="width: 500px"
            single-line
            solo
          ></v-text-field>
        </v-col>
        <v-col style="width: 30px; margin-left: 20px">
          <v-btn color="blue" dark @click="check"> 댓글달기 </v-btn>
        </v-col>
      </v-row>
    </v-container></v-form
  >
</template>

<!-- <template>
  <div class="insertComment">
    <textarea
      type="text"
      class="form-control"
      id="content"
      ref="content"
      placeholder="댓글을 입력하세요"
      v-model="content"
    ></textarea>
    <br />
    <v-btn color="blue" style="width: 30px; left: 235px" dark @click="check"> 댓글달기 </v-btn>
  </div>
</template> -->

<script>
import http from "@/util/http-common";

export default {
  name: "CommentCreate",
  props: ["boardno", "reloadComment"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    check() {
      let err = true;
      let msg = "";
      !this.content && ((msg = "내용을 입력해주세요!"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.insertComment();
    },

    insertComment: function () {
      http.post("/comment", { boardno: this.boardno, content: this.content }).then(() => {
        this.reloadComment();
      });
      this.content = "";
    },
  },
};
</script>

<style>
v-text-field {
  resize: none;
  padding: 5px;
  border: 1px solid #949494;
  border-radius: 10px;
}

.insertComment {
  position: relative;
  left: 40%;
}
</style>
