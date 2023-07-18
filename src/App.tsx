import { memo, useState, useEffect, useMemo, useCallback, createContext, useContext, useReducer } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useWindowSize } from "./useWindowSize";
import "./App.css";

const UserContext = createContext({});
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
	// useEffect(() => {
	// 	// 关键在于useEffect的依赖项
	// 	const T = setInterval(() => {
	// 		setNum((num) => {
	// 			console.log(num);
	// 			return num + 1;
	// 		});
	// 	}, 1000);
	// 	// 注意卸载操作
	// 	return () => {
	// 		clearInterval(T);
	// 	};
	// }, []);
	const [size] = useWindowSize();
	// useMemo
	const [a, setA] = useState(0);
	const changeA = () => {
		setA(a + 1);
	}
	const total1 = () => {
		console.log('total1...');
		const list = [1, 3, 5, 7, 9];
		return list.reduce((prev, current) => prev + current, 0);
	}
	const total2 = useMemo(() => {
		console.log('total2...');
		const list = [1, 3, 5, 7, 9];
		return list.reduce((prev, current) => prev + current, 0);
	}, [])
	const handleChildClick = useCallback(() => {
		console.log('子节点点击')
	}, [])
	// useContext与useReducer来模拟类似vuex一样的全局状态管理器
	const reducer = (state: string, action: { type: string; name: string }) => {
		switch (action.type) {
			case 'update_name':
				return action.name
			default:
				return state
		}
	}
	const [name, dispatch] = useReducer(reducer, "Tom");
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
			<div>memo,useMemo,useCallback的用法</div>
			<div>
				<div>a的值:{a}</div>
				<button onClick={changeA}>点击修改a的值</button>
			</div>
			<div>total1的值：{total1()}</div>
			<div>total2的值：{total2}</div>
			<Child onClick={handleChildClick}></Child>
			<div>全局状态管理器模拟</div>
			<UserContext.Provider value={{ name, dispatch }}>
				<Child1></Child1>
				<Child2></Child2>
			</UserContext.Provider>
		</div>
	);
}

const Child = memo(({ onClick }: any) => {
	console.log('child...');
	return (
		<p>
			我是子节点<button onClick={onClick}>子节点按钮</button>
		</p>
	)
})

const Child1 = () => {
	const { dispatch }: any = useContext(UserContext);
	const handleName = () => {
		dispatch({
			type: 'update_name',
			name: Math.random()
		})
	}
	return (
		<p>
			<span>Child1</span>
			<button onClick={handleName}>点击改变名字</button>
		</p>
	)
}

const Child2 = () => {
	const { name }: any = useContext(UserContext);
	return (
		<>
			<span>Child2 {name}</span>
		</>
	)
}
export default App;
