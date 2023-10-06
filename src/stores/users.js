import { defineStore } from "pinia";

export const userStore = defineStore("users", {
	state: () => ({
		userList: [],
		userCurrent: {},
		error: null,
	}),
	actions: {
		set_users(data) {
			this.userList = data;
		},
		async change_page(page) {
			try {
				const response = await fetch(
					`https://reqres.in/api/users?page=${page}`
				);
				const data = await response.json();
				this.userList = data;
			} catch (error) {
				this.error = error;
			}
		},
		async get_data_api() {
			try {
				const response = await fetch("https://reqres.in/api/users");
				const data = await response.json();
				this.userList = data;
			} catch (error) {
				this.error = error;
			}
		},

		async search_user(nameOrEmail) {
			this.userCurrent = this.userList.data.find(
				(user) =>
					user.first_name.toLowerCase() === nameOrEmail.toLowerCase() ||
					user.email.toLowerCase() === nameOrEmail.toLowerCase()
			);
		},
	},
	getters: {
		totalPages: (state) => state.userList.total_pages,
		page: (state) => state.userList.page,
	},
});
