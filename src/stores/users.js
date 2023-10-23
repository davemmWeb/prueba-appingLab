import { defineStore } from "pinia";
import { getUsersApi } from "../api";

export const userStore = defineStore("users", {
	state: () => ({
		userList: [],
		userCurrent: {},
		permissionUsers: [],
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
			return (this.userList = await getUsersApi());
		},

		async search_user(nameOrEmail) {
			const user = this.userList.data.find(
				(user) =>
					user.first_name.toLowerCase() === nameOrEmail.toLowerCase() ||
					user.email.toLowerCase() === nameOrEmail.toLowerCase()
			);
			user ? (this.userCurrent = user) : alert("User not found");
		},
		give_permission(idUser, permission) {
			const user = this.permissionUsers.find((user) => user.id === idUser);
			if (!user) {
				this.permissionUsers.push({
					id: idUser,
					permission: [permission],
				});
				alert("Permission added");
			} else {
				if (!user.permission.includes(permission)) {
					user.permission.push(permission);
					alert("Permission added");
				} else {
					return alert("Permission already exists");
				}
			}
		},

		get_permission(idUser) {
			const userPermission = this.permissionUsers.find(
				(user) => user.id === idUser
			);
			return userPermission ? userPermission.permission : "No permissions";
		},
	},
	getters: {
		totalPages: (state) => state.userList.total_pages,
		page: (state) => state.userList.page,
	},
});
