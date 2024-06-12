import React, { useState } from "react";
import TodoModal from "./todo-modal";
const App = () => {
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState({});
  const [todos, setTodos] = useState([
    { id: 1, status: "open", elements: [{ title: "task-1" }] },
    { id: 2, status: "pending", elements: [{ title: "task-2" }] },
    { id: 3, status: "inprogress", elements: [{ title: "task-3" }] },
  ]);

  const openModal = () => {
    setModal(true);
  };

  const deleteTask = (status, index) => {
    const newTodos = todos.map(item => {
      if (item.status === status) {
        return {
          ...item,
          elements: item.elements.filter((_, i) => i !== index),
        };
      }
      return item;
    });
    setTodos(newTodos);
  };

  const editTask = (status, index) => {
    setTask({ status, index });
    setModal(true);
  };

  const closeModal = () => {
    setTask({});
    setModal(false);
  };

  return (
    <div className="container">
      <TodoModal
        open={modal}
        toggle={closeModal}
        todos={todos}
        setTodos={setTodos}
        task={task}
      />
      <div className="row mt-4">
        {todos.map((item, index) => (
          <div key={index} className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h1 className="text-center">{item.status}</h1>
              </div>
              <div className="card-body">
                {item.elements.map((el, i) => (
                  <div
                    key={i}
                    className="d-flex gap-2 align-items-center justify-content-center"
                  >
                    <p>{el.title}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => editTask(item.status, i)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTask(item.status, i)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <div className="card-footer">
                <button className="btn btn-success" onClick={openModal}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
