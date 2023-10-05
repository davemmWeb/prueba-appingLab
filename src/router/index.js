import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/components/Home.vue"),
	},
	// {
	// 	path: "/comments",
	// 	name: "Comments",
	// 	component: () => import("@/components/Comments.vue"),
	// },
	// {
	// 	path: "/images",
	// 	name: "Images",
	// 	component: () => import("@/components/Images.vue"),
	// },
	// {
	// 	path: "/users",
	// 	name: "Users",
	// 	component: () => import("@/components/Users.vue"),
	// },
	{
		path: "/detail/:id",
		name: "Detail",
		component: () => import("@/components/Detail.vue"),
	},
	// {
	// 	path: "/login",
	// 	name: "Login",
	// 	component: () => import("@/components/Login.vue"),
	// },
	// {
	// 	path: "/register",
	// 	name: "Register",
	// 	component: () => import("@/components/Register.vue"),
	// },
	{
		path: "/:catchAll(.*)",
		redirect: "/",
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
