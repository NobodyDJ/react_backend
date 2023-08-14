import { RouterProvider } from "react-router";
import Router from "./router/index";
import "./App.css";
import { BrowserRouter, HashRouter } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Router></Router>
		</BrowserRouter>
	);
	// return <RouterProvider router={router} />;
}

export default App;
