import axios from "axios";

const API = axios.create({
	baseURL: "https://dummyjson.com",
	headers: {
		"Content-Type": "application/json",
	},
});

const getProducts = () => {
	return API.get("/products/?limit=0");
};

const getProduct = (id: Number) => {
	return API.get(`/products/${id}`);
};

const getAllCategories = () => {
	return API.get(`/products/categories/`);
};

const getCategory = (id: string) => {
	return API.get(`/products/categories/${id}`);
};

const getAllCarts = () => {
	return API.get(`/carts`);
};

const getCart = (id: string) => {
	return API.get(`/carts/${id}`);
};

const getCartsByIdUser = (id: string) => {
	return API.get(`/carts/user/${id}`);
};

export const APIHelper = {
	getProducts,
	getProduct,
	getAllCategories,
	getCategory,
	getAllCarts,
	getCart,
	getCartsByIdUser,
};
