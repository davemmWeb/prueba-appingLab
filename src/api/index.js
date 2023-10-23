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

export const getUserId = async (id) => {
	try {
		const res = await fetch(`https://reqres.in/api/users/${id}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

export const getPermissions = [
	{
		id: 1001,
		name: "Ver información de vuelos",
		access: false,
	},
	{
		id: 1002,
		name: "Modificar itinerarios",
		access: false,
	},
	{
		id: 1003,
		name: "Gestionar tripulación",
		access: false,
	},
	{
		id: 1004,
		name: "Generar informes financieros",
		access: false,
	},
	{
		id: 1005,
		name: "Gestionar usuarios",
		access: false,
	},
	{
		id: 1006,
		name: "Gestionar permisos",
		access: false,
	},
	{
		id: 1007,
		name: "Gestionar roles",
		access: false,
	},
	{
		id: 1008,
		name: "Gestionar configuración",
		access: false,
	},
	{
		id: 1009,
		name: "Gestionar aeronaves",
		access: false,
	},
	{
		id: 1010,
		name: "Control de vuelos",
		access: false,
	},
];
