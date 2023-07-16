import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// 因为typeScript的原因引入path对象需要先安装types/node插件
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	// 给路径名称取别名
	server: {
		host: "localhost",
		port: 8080,
		proxy: {
			"/api": "http://api-driver.marsview.cc",
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	plugins: [react()],
});
