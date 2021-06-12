import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import MyPage from "@/views/MyPage.vue";
import Modify from "@/views/Modify.vue";
import store from "@/store";
import Management from "@/views/Management.vue";
import FindPassword from "@/views/FindPassword.vue";

import Notice from "@/views/Notice.vue";
import SelectNoticeByNo from "@/components/notice/SelectNoticeByNo.vue";
import InsertNotice from "@/components/notice/InsertNotice.vue";
import UpdateNotice from "@/components/notice/UpdateNotice.vue";

import Apt from "@/views/Apt.vue";

import Qnaboard from "@/views/Qnaboard.vue";
import SelectBoardByNo from "@/components/board/SelectBoardByNo.vue";
import InsertBoard from "@/components/board/InsertBoard.vue";
import UpdateBoard from "@/components/board/UpdateBoard.vue";

Vue.use(VueRouter);

const requireAuth = () => (to, from, next) => {
  const nextRoute = to.path;

  if (store.getters.getAccessToken) {
    //토큰이 있으면
    return next(); //요청한 경로로 이동
  } else next("/login" + nextRoute); //토큰이 없으면 로그인으로 이동
};

const routes = [
  // 메인페이지
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
    beforeEnter: requireAuth(),
  },
  {
    path: "/modify",
    name: "Modify",
    component: Modify,
    beforeEnter: requireAuth(),
  },
  // 관리자 - 회원정보 관리
  {
    path: "/management",
    name: "Management",
    component: Management,
    beforeEnter: requireAuth(),
  },
  // 비밀번호 찾기
  {
    path: "/find",
    name: "FindPassword",
    component: FindPassword,
  },
  // 공지사항
  {
    path: "/notice",
    name: "Notice",
    component: Notice,
    beforeEnter: requireAuth(),
  },
  // 공지사항 추가하기
  {
    path: "/insertnotice",
    name: "InsertNotice",
    component: InsertNotice,
    beforeEnter: requireAuth(),
  },
  // 공지사항 자세히 보기
  {
    path: "/detailnotice/:no",
    name: "SelectNoticeByNo",
    component: SelectNoticeByNo,
    props: true,
    beforeEnter: requireAuth(),
  },
  // 공지사항 수정하기
  {
    path: "/updatenotice/:no",
    name: "UpdateNotice",
    component: UpdateNotice,
    props: true,
    beforeEnter: requireAuth(),
  },
  // 아파트 실거래가 페이지
  {
    path: "/apt",
    name: "Apt",
    component: Apt,
    beforeEnter: requireAuth(),
  },
  // QnA 페이지
  {
    path: "/qnaboard",
    name: "Qnaboard",
    component: Qnaboard,
    beforeEnter: requireAuth(),
  },
  // QnA 추가하기
  {
    path: "/insertboard",
    name: "InsertBoard",
    component: InsertBoard,
    beforeEnter: requireAuth(),
  },
  // QnA 자세히 보기
  {
    path: "/detailboard/:no",
    name: "SelectBoardByNo",
    component: SelectBoardByNo,
    props: true,
    beforeEnter: requireAuth(),
  },
  // QnA 수정하기
  {
    path: "/updateboard/:no",
    name: "UpdateBoard",
    component: UpdateBoard,
    props: true,
    beforeEnter: requireAuth(),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
