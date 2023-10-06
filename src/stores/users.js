import { defineStore } from "pinia";

export const userStore = defineStore("users", {
	state: () => ({
		userList: [],
		userCurrent: {},
	}),
	actions: {
		set_users(data) {
			this.userList = data;
		},
		async change_page(data) {
			this.userList = data;
		},
		searchUser(name) {
			this.userList = this.userList.filter((user) => {
				return user.name.toLowerCase().includes(name.toLowerCase());
			});
		},
	},
	getters: {
		totalPages: (state) => state.userList.total_pages,
		page: (state) => state.userList.page,
	},
});
