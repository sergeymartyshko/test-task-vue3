import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/home-page/home-page.vue";

const routeInfos = [
    {
        path: "/",
        component: HomePage
    },
];

const router = createRouter({
    history : createWebHistory(),
    routes : routeInfos,
    strict: true
});

export default router;
