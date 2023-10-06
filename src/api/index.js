export const getUsersApi = async () => {
	try {
		const res = await fetch("https://reqres.in/api/users");
		const data = await res.json();
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

export const getUserPage = async (page) => {
	try {
		const res = await fetch(`https://reqres.in/api/users?page=${page}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log("error", error);
	}
};
