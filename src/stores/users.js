import { defineStore } from "pinia";

export const useUserStore = defineStore("counter", {
	state: () => ({
		listUsers: [],
		user: {},
	}),
	getters: {
		doubleCount: (state) => state.count * 2,
	},
	actions: {
		increment() {
			this.count++;
		},
		async fetchApi() {
			return fetch("https://reqres.in/api/users")
				.then((response) => response.json())
				.then((data) => {
					this.listUsers = data;
				});
		},

		async getUserId(id) {
			return fetch(`https://reqres.in/api/users/${id}`)
				.then((response) => response.json())
				.then((data) => {
					this.user = data;
				});
		},
	},
});
