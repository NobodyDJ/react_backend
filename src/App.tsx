import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useWindowSize } from "./useWindowSize";
import "./App.css";

function App({ type }: { type: string }) {
	console.log("update app...");
	const h1 = <h1>react后台管理</h1>;
	const list = ["tom", "Jack", "Lucy", "Lily"];
	const style = { color: "pink", fontSize: "16px" };
	const value = "123";
	let condition = 2;
	const [user, setUser] = useState({
		name: "terrence",
		gender: "male",
	});
	const [title, setTitle] = useState("标题1");
	const changeTitle = () => {
		setTitle("标题2");
	};
	const changeUserName = () => {
		// 如果是一个数组元素，则修改方式同理
		setUser({ ...user, name: "Bob" });
	};
	const changeUser = () => {
		setUser({ name: "Lily", gender: "female" });
	};
	// 初始值可以写成函数的形式来表达
	const [count, setCount] = useState(() => {
		if (condition > 0) {
			return 100;
		} else {
			return 0;
		}
	});
	const changeCount = () => {
		// 多次操作回合并为一次，因为多次操作之后没有赋值吧
		setCount(count + 1);
		condition++;
	};
	// useEffect的用法
	const [num, setNum] = useState(0);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		document.title = "React后台课程";
	});
	useEffect(() => {
		setNum(num + 1);
	}, []);
	useEffect(() => {
		setTotal(num * 5);
	}, [num]);
	useEffect(() => {
		const T = setInterval(() => {
			setNum(num + 1);
		}, 1000);
		// 注意卸载操作
		return () => {
			clearInterval(T);
		};
	}, [num]);
	const [size] = useWindowSize();
	return (
		<div className="APP">
			{h1}
			<div>
				{list.map((item) => (
					<span key={item} style={style}>
						{item}
					</span>
				))}
			</div>
			<div>{title}</div>
			<div>
				<div>用户名称：{user.name}</div>
				<div>用户性别：{user.gender}</div>
			</div>
			<input type={type} value={value}></input>
			<br />
			<div style={{ marginTop: "10px" }}>
				<button onClick={changeTitle}>修改标题</button>
				<button onClick={changeUserName}>修改用户名称</button>
				<button onClick={changeUser}>修改用户</button>
			</div>
			<div>{count}</div>
			<button onClick={changeCount}>修改count</button>
			<div>useEffect的用法</div>
			<p>
				Num:{num}, Total:{total}
			</p>
			<p>
				window width:{size.width}, window height: {size.height}
			</p>
		</div>
	);
}

export default App;
