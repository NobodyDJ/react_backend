// 用于扩展类型的声明文件
// 扩展了request请求中的loading
import { AxiosRequestConfig } from 'axios'
declare module 'axios' {
	// 相同的interface做一个继承而不是覆盖
  interface AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
  }
}
