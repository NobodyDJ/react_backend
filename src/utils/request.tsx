import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { message } from "antd";
import { showLoading, hideLoading } from "./loading";
import env from "@/config";
import { Result } from "../types/api.ts";
import storage from "./storage";
import { useStore } from "@/store/index.ts";
console.log("config", env);

interface IConfig {
	showLoading?: boolean;
	showError?: boolean;
}

// 创建一个axios的实例
const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_API,
	timeout: 8000,
	timeoutErrorMessage: "请求超时，请稍后再试",
	// 默认是跨域
	withCredentials: true,
	headers: {
		icode: "C48F7F904580838A",
	},
});

export default {
	get<T>(url: string, params?: object, options?: IConfig): Promise<T> {
		// 注意get请求是在请求地址后面拼接参数，形式为对象中包含params属性 详情见axios文档
		return instance.get(url, { params, ...options });
	},
	post<T>(url: string, params?: object, options?: IConfig): Promise<T> {
		return instance.post(url, params, { ...options });
	},
};
// 封装一个请求拦截器 关键是对token的拼接
// 拦截器本质是Promise对象
instance.interceptors.request.use(
	(config) => {
		if (config.showLoading) showLoading();
		const token = storage.get("token");
		if (token) {
			config.headers.Authorization = "Bearer " + token;
		}
		if (env.mock) {
			config.baseURL = env.mockApi;
		} else {
			config.baseURL = env.baseApi;
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
		const data: Result = response.data;
		hideLoading();
		// 登陆身份验证失败需要跳转到登陆界面重新登录
		if (data.code === 50001) {
			// message.error(data.msg);
			storage.remove("token");
			// location.href = "/login";
		} else if (data.code !== 0) {
			if (response.config.showError === false) {
				return Promise.resolve(data);
			} else {
				// message.error(data.msg)
				return Promise.reject(data);
			}
		}
		return data.data;
	},
	(error) => {
		hideLoading();
		return Promise.reject(error);
	}
);
