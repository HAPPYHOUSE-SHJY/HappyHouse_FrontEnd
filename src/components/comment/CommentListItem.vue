<template>
  <div :class="{ 'mouse-over-bgcolor': isColor }">
    <v-form v-if="isModify" style="width: 800px; margin: 0 auto">
      <!--수정 가능 모드 -->
      <v-container>
        <v-row>
          <v-col>
            <!-- 댓글 수정 입력창 -->
            <textarea
              style="resize: none; width: 500px; margin-left: 0%"
              id="content"
              ref="content"
              v-model="content"
              value="commentObj.content"
              placeholder="댓글을 작성해주세요."
            ></textarea>
          </v-col>
          <v-col style="width: 30px; margin-left: 20px">
            <!-- 댓글 수정 확인버튼 -->
            <v-btn color="blue" dark @click="check"> 완료 </v-btn>
            <!-- 댓글 수정 취소버튼 -->
            <v-btn color="red" dark @click="change">취소</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <div v-else>
      <!--수정 불가능 모드 -->
      <template>
        <v-form style="width: 800px; margin: 0 auto">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  style="width: 500px"
                  v-model="commentObj.content"
                  single-line
                  solo
                  readonly
                ></v-text-field>
              </v-col>
              <v-col v-if="getIsAdmin == 1" style="width: 30px; margin-left: 20px">
                <v-btn color="blue" dark @click="change"> 수정 </v-btn>
                <v-btn color="red" dark @click="deleteComment(commentObj.no)">삭제</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/util/http-common";
export default {
  name: "CommentListItem",
  props: ["commentObj", "reloadComment"],
  data() {
    return {
      isColor: false,
      isModify: false,
      content: "",
    };
  },
  computed: {
    ...mapGetters(["getAccessToken", "getUserId", "getUserName", "getIsAdmin"]),
  },
  methods: {
    bgColorChange: function (flag) {
      this.isColor = flag;
    },
    change() {
      this.isModify = !this.isModify;
      if (this.isModify) this.content = this.commentObj.content;
    },

    check() {
      let err = true;
      let msg = "";
      !this.content && ((msg = "내용을 입력해주세요!"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.updateComment();
    },

    updateComment: function () {
      http
        .put("/comment/" + this.commentObj.no, { content: this.content, no: this.commentObj.no })
        .then(() => {
          this.isModify = !this.isModify;
          this.reloadComment();
        });
    },
    deleteComment() {
      http.delete("/comment/" + this.commentObj.no).then(() => {
        this.reloadComment();
      });
    },
  },
};
</script>
<style>
.mouse-over-bgcolor {
  background-color: #e0eeee;
  font-size: 13pt;
}
textarea {
  resize: none;
  padding: 5px;
  border: 1px solid #949494;
  border-radius: 10px;
}
</style>
