import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const TodoModal = props => {
  const { todos, setTodos, task, open, toggle } = props;
  const [form, setForm] = useState({});

  useEffect(() => {
    if (task.status) {
      const currentTask = todos.find(item => item.status === task.status)
        ?.elements[task.index];
      if (currentTask) {
        setForm({ status: task.status, task: currentTask.title });
      }
    } else {
      setForm({});
    }
  }, [task, todos]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newTodos = [...todos];

    if (task.status) {
      newTodos.forEach(item => {
        if (item.status === task.status) {
          item.elements.splice(task.index, 1);
        }
      });
    }

    const targetList = newTodos.find(item => item.status === form.status);
    if (targetList) {
      targetList.elements.push({ title: form.task });
    } else {
      newTodos.push({
        status: form.status,
        elements: [{ title: form.task }],
      });
    }

    setTodos(newTodos);
    toggle();
  };

  const statuses = [...new Set(todos.map(item => item.status))];

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Task Modal</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              value={form.status || ""}
              onChange={handleChange}
              required
            >
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Task</label>
            <input
              type="text"
              className="form-control"
              name="task"
              value={form.task || ""}
              onChange={handleChange}
              required
            />
          </div>
          <ModalFooter>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggle}
            >
              Cancel
            </button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default TodoModal;
