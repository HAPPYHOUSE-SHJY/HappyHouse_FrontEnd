<template>
  <div>
    <v-data-table :headers="headers" :items="users" sort-by="username" class="elevation-1"
      ><template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>User Management</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit User</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.userid"
                        label="userid"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.username"
                        label="username"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="email"
                        ref="email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.address" label="address"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="check"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
//import axios from "axios";
import http from "@/util/http-common";

//const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "Management",
  data() {
    return {
      headers: [
        {
          text: "아이디",
          align: "start",
          value: "userid",
        },
        { text: "이름", value: "username" },
        { text: "이메일", value: "email" },
        { text: "주소", value: "address" },
        { text: "비고", value: "actions", sortable: false },
      ],
      users: [],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        userid: "",
        username: "",
        address: "",
        email: "",
      },
      defaultItem: {
        userid: "",
        username: "",
        address: "",
        email: "",
      },
    };
  },
  created() {
    http
      .get("/user")
      .then((response) => {
        this.users = response.data;
        console.log(this.users);
      })
      .catch(() => {
        alert("서버에 오류가 생겼습니다 ㅈㅅ");
      });
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      http
        .delete("/user/" + this.editedItem.userid)
        .then((response) => {
          if (response.data == "success") {
            alert("삭제처리를 하였습니다.");
          } else {
            alert("삭제처리를 하지 못했습니다.");
          }
        })
        .catch(() => {
          alert("서버에 오류가 생겼습니다 ㅈㅅ");
        });

      this.editedItem = Object.assign({}, this.defaultItem);
      http
        .get("/user")
        .then((response) => {
          this.users = response.data;
          console.log(this.users);
        })
        .catch(() => {
          alert("서버에 오류가 생겼습니다 ㅈㅅ");
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },
    check() {
      let err = true;
      let msg = "";
      !this.editedItem.email &&
        ((msg = "이메일을 입력해주세요"), (err = false), this.$refs.email.focus());
      err &&
        !this.editedItem.address &&
        ((msg = "주소를 선택해주세요"), (err = false), this.searchAddress());

      if (!err) alert(msg);
      else this.save();
    },
    save() {
      http
        .put("/user", {
          userid: this.editedItem.userid,
          username: this.editedItem.username,
          address: this.editedItem.address,
          email: this.editedItem.email,
        })
        .then(({ data }) => {
          if (data == "success") {
            alert("회원 정보 수정이 완료 되었습니다");
          } else {
            alert("회원 정보 수정을 처리 하지 못했습니다.");
          }
        })
        .catch(() => {
          alert("서버에 오류가 생겼습니다 ㅈㅅ");
        });

      this.editedItem = Object.assign({}, this.defaultItem);
      http
        .get("/user")
        .then((response) => {
          this.users = response.data;
          console.log(this.users);
        })
        .catch(() => {
          alert("서버에 오류가 생겼습니다 ㅈㅅ");
        });
      this.editedItem = Object.assign({}, this.defaultItem);
      this.close();
    },
  },
};
</script>

<style></style>
