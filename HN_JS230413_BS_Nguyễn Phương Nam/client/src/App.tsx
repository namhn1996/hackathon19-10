import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

interface Todo {
  id: number;
  name: string;
  status: string;
}

function App() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [completed, setCompleted] = useState(false);
  const fetchAll = () => {
    axios
      .get("http://localhost:3000/api/v1/todo")
      .then((res) => {
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchAll();
  }, []);

  const handleAddTodo = () => {
    axios
      .post("http://localhost:3000/api/v1/todo", { name: todoName })
      .then((res) => {
        setTodoName("");
        fetchAll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/api/v1/todo/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchAll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCompleted = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    const status = isChecked ? "completed" : "uncompleted";

    axios
      .put(`http://localhost:3000/api/v1/todo/${id}`, {
        status,
      })
      .then((res) => {
        console.log(res.data);
        fetchAll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container w-25 mt-5 p-4 bg-danger text-white">
        <h1>Todo list</h1>
        <span>Get thing done in no time</span>
        <ul className="list-group mt-4">
          {todos?.length > 0 &&
            todos.map((todo: any, index: number) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger"
                key={index}
              >
                <p
                  className={`mb-0 text-black ${
                    todo.status == "completed"
                      ? "text-decoration-line-through"
                      : ""
                  }`}
                >
                  {todo.name}
                </p>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="checkbox"
                    checked={todo.status === "completed" ? true : false}
                    onClick={(e) => handleCompleted(todo.id, e)}
                  />
                  <i
                    className="fa-solid fa-trash text-black"
                    onClick={() => handleDelete(todo.id)}
                  ></i>
                </div>
              </li>
            ))}
        </ul>
        <div className="mt-5">
          <p>Add new todo</p>
          <div className="d-flex gap-2 align-items-center ">
            <div className="flex-grow-1">
              <input
                type="text"
                className="w-100 p-2"
                name={todoName}
                onChange={(e) => setTodoName(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleAddTodo}>
              {" "}
              add item
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
