import {
	createHashRouter,
	createBrowserRouter,
	Navigate,
	useRoutes,
} from "react-router-dom";
import Welcome from "@/views/Welcome";
import Login from "@/views/Login/Login";
import NotFound from "@/views/NotFound";
import NoAccess from "@/views/NoAccess";
import Layout from "../layout";

// 以什么模式创建一个路由信息
const router = createBrowserRouter([
	// 根组件路由
	{
		path: "/",
		element: <Navigate to="/login"></Navigate>,
	},
	{
		path: "/login",
		element: <Login></Login>,
	},
	{
		element: <Layout></Layout>,
		children: [
			{
				path: '/welcome',
				element: <Welcome></Welcome>
			}
		]
	},
	{
		path: "*",
		element: <Navigate to="/404" />,
	},
	// 页面找不到
	{
		path: "/404",
		element: <NotFound></NotFound>,
	},
	// 页面权限不足
	{
		path: "/403",
		element: <NoAccess></NoAccess>,
	},
]);

// const router = [
// 	// 根组件路由
// 	{
// 		path: "/",
// 		element: <Welcome></Welcome>,
// 	},
// 	{
// 		path: "/login",
// 		element: <Login></Login>,
// 	},
// 	{
// 		path: "*",
// 		element: <Navigate to="/404" />,
// 	},
// 	// 页面找不到
// 	{
// 		path: "/404",
// 		element: <NotFound></NotFound>,
// 	},
// 	// 页面权限不足
// 	{
// 		path: "/403",
// 		element: <NoAccess></NoAccess>,
// 	},
// ];

// 组件的形式
// export default function Router() {
// 	//使用hookAPI来创建一个组件
// 	return useRoutes(router);
// }

// api路由形式，相对来说会更加灵活可以使用更复杂的loader或action
export default router;
