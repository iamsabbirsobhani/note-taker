import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreateNote from "../views/CreateNote.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/createnote",
    name: "CreateNote",
    component: CreateNote,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
