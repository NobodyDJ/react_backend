import { RouterProvider } from "react-router";
import router from "./router/index";
import { ConfigProvider, App as AntdApp } from "antd";
import "./App.css";
// import { BrowserRouter, HashRouter } from "react-router-dom";

function App() {
	// return (
	// 	<BrowserRouter>
	// 		<Router></Router>
	// 	</BrowserRouter>
	// );
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#ed6c00'
				}
			}}
		>
			<AntdApp>
			  <RouterProvider router={router} />
			</AntdApp>
	</ConfigProvider>);
}

export default App;
