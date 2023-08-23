import { RouterProvider } from "react-router";
import router from "./router/index";
import { ConfigProvider } from "antd";
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
		<RouterProvider router={router} />
	</ConfigProvider>);
}

export default App;
