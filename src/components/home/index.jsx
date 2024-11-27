import {useReducer, useRef, useState} from "react";
import {AiOutlineDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import {Modal, Button} from "antd";

function HomeComponent() {
	let reducer = (state, action) => {
		switch (action.type) {
			case `add`:
				return {
					...state,
					texts: [
						...state.texts,
						{
							text: action.text,
							id: Date.now(),
						},
					],
				};
			case `delete`:
				return {
					...state,
					texts: state.texts.filter((value) => value.id !== action.id),
				};
			case `edit`:
				return {
					...state,
					texts: state.texts.map((value) =>
						value.id === action.id ? {...value, text: action.text} : value
					),
				};
			default:
				return state;
		}
	};

	let addRefInput = useRef(null);
	let initialState = {
		texts: [
			{text: `text 1`, id: 1},
			{text: `text 2`, id: 2},
		],
	};

	let [state, dispatch] = useReducer(reducer, initialState);
	let [editingItem, setEditingItem] = useState(null);

	let addBtn = () => {
		let addInput = addRefInput.current.value;
		addRefInput.current.value = "";
		if (addInput) {
			dispatch({type: `add`, text: addInput});
		} else {
			console.log("Text kiritilmadi");
		}
	};

	let deleteFunc = (idx) => {
		dispatch({
			type: "delete",
			id: idx,
		});
	};

	const showModal = (item) => {
		setEditingItem(item);
	};

	const handleOk = () => {
		let editInput = editRefInput.current?.value;
		editRefInput.current.value = "";
		if (editInput && editingItem) {
			dispatch({type: `edit`, text: editInput, id: editingItem.id});
		} else {
			console.log("Text yangilanmadi");
		}
		setEditingItem(null);
	};

	const handleCancel = () => {
		setEditingItem(null);
	};

	let editRefInput = useRef(null);

	return (
		<div className="flex flex-col items-center justify-start min-w-full min-h-screen pt-[6em] bg-gray-100">
			<div className="w-full max-w-xl px-4 py-6 bg-white border rounded-md shadow-md">
				<h1 className="mb-6 text-4xl font-bold text-center">To Do List</h1>
				<input
					type="text"
					placeholder="Search"
					className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<div className="flex mb-4">
					<input
						ref={addRefInput}
						type="text"
						placeholder="Add card"
						className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none "
					/>
					<button
						onClick={addBtn}
						className="px-4 bg-gray-300 hover:bg-gray-400 rounded-r-md">
						Add
					</button>
				</div>
				<div className="space-y-2">
					{state.texts.map((value) => {
						return (
							<div
								key={value.id}
								className="flex items-center px-4 py-2 border rounded-md">
								<span className="flex-1">{value.text}</span>
								<span
									className="mr-4 text-gray-600 cursor-pointer hover:text-blue-500"
									onClick={() => showModal(value)}>
									<FaEdit />
								</span>
								<span className="text-gray-600 scale-110 cursor-pointer hover:text-red-500">
									<AiOutlineDelete
										id={value.id}
										onClick={() => deleteFunc(value.id)}
									/>
								</span>
							</div>
						);
					})}
				</div>
			</div>
			<Modal
				title="Edit Text"
				open={editingItem}
				onOk={handleOk}
				onCancel={handleCancel}>
				<input
					ref={editRefInput}
					defaultValue={editingItem?.text}
					type="text"
					placeholder="edit card text"
					className="flex-1 w-full px-4 py-2 border rounded-md focus:outline-none "
				/>
			</Modal>
		</div>
	);
}

export default HomeComponent;