import axios, { AxiosError } from "axios";
import { message } from "antd";
import { showLoading, hideLoading } from "./loading";
console.log(import.meta.env);

// 创建一个axios的实例
const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_API,
	timeout: 8000,
	timeoutErrorMessage: "请求超时，请稍后再试",
	// 默认是跨域
	withCredentials: true,
});

export default {
	get<T>(url: string, params?: object): Promise<T> {
		// 注意get请求是在请求地址后面拼接参数，形式为对象中包含params属性
		return instance.get(url, { params });
	},
	post<T>(url: string, params?: object): Promise<T> {
		return instance.post(url, params);
	},
};
// 封装一个请求拦截器 关键是对token的拼接
// 拦截器本质是Promise对象
instance.interceptors.request.use(
	(config) => {
		showLoading();
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = "Token" + token;
		}
		if (import.meta.env.VITE_MOCK === "true") {
			config.baseURL = import.meta.env.VITE_MOCK_API;
		} else {
			config.baseURL = import.meta.env.VITE_BASE_API;
		}
		return {
			...config,
		};
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// 封装一个响应拦截器
instance.interceptors.response.use(
	(response) => {
		const data = response.data;
		hideLoading();
		// 登陆身份验证失败需要跳转到登陆界面重新登录
		if (data.code === 50001) {
			message.error(data.msg);
			localStorage.removeItem("token");
			// location.href = "/login";
		} else if (data.code !== 0) {
			message.error(data.msg);
			return Promise.reject();
		}
		return data.data;
	},
	(error) => {
		hideLoading();
		return Promise.reject(error);
	}
);
